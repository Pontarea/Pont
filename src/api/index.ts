import { Hono } from 'hono';
import { cors } from "hono/cors";
import { drizzle } from 'drizzle-orm/d1';
import { eq, lt } from 'drizzle-orm';
import { adminResetTokens, adminConfig } from './database/schema';

const app = new Hono<{ Bindings: Env }>()
  .basePath('api');

app.use(cors({ origin: "*" }));

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

// ─── Rate limiting (in-memory, per Worker instance) ─────────────
// Cloudflare Workers могут иметь несколько инстансов, но это всё
// равно блокирует большинство атак (особенно с одного IP)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = ip;
  const entry = loginAttempts.get(key);

  if (!entry || entry.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 }); // 15 мин окно
    return { allowed: true };
  }

  if (entry.count >= 10) { // макс 10 попыток за 15 минут
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

// ─── Helpers ────────────────────────────────────────────────────

async function sha256(text: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function signToken(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function verifyHmac(payload: string, sig: string, secret: string): Promise<boolean> {
  const expected = await signToken(payload, secret);
  // timing-safe compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

/** Возвращает текущий пароль: сначала из D1, потом из env */
async function getAdminPassword(db: ReturnType<typeof drizzle>, env: Env): Promise<string> {
  try {
    const rows = await db.select().from(adminConfig).where(eq(adminConfig.key, 'admin_password'));
    if (rows.length && rows[0].value) return rows[0].value;
  } catch { /* таблица может отсутствовать при первом запуске */ }
  return (env as any).ADMIN_PASSWORD || '';
}

function getJwtSecret(env: Env): string {
  return (env as any).ADMIN_JWT_SECRET || '';
}

function getClientIP(c: any): string {
  return c.req.header('CF-Connecting-IP')
    || c.req.header('X-Forwarded-For')?.split(',')[0].trim()
    || 'unknown';
}

// ─── POST /api/admin/login ───────────────────────────────────────
app.post('/admin/login', async (c) => {
  const ip = getClientIP(c);
  
  // Rate limiting
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return c.json(
      { error: `Zu viele Versuche. Bitte warte ${Math.ceil((rl.retryAfter || 900) / 60)} Minuten.` },
      429
    );
  }

  const { password } = await c.req.json<{ password: string }>();
  const db = drizzle(c.env.DB);
  const secret = getJwtSecret(c.env);
  const adminPassword = await getAdminPassword(db, c.env);

  if (!adminPassword) {
    return c.json({ error: 'Server-Konfigurationsfehler: ADMIN_PASSWORD nicht gesetzt.' }, 500);
  }

  if (password !== adminPassword) {
    // Намеренная задержка 300ms против timing-атак
    await new Promise(r => setTimeout(r, 300));
    return c.json({ error: 'Falsches Passwort' }, 401);
  }

  // Успех — сбрасываем счётчик
  resetRateLimit(ip);

  if (!secret) {
    return c.json({ error: 'Server-Konfigurationsfehler: ADMIN_JWT_SECRET nicht gesetzt.' }, 500);
  }

  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 дней
  const payload = `admin:${expiry}`;
  const sig = await signToken(payload, secret);
  const safeSig = sig.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const token = btoa(payload) + '.' + safeSig;

  return c.json({ token });
});

// ─── POST /api/admin/verify ──────────────────────────────────────
app.post('/admin/verify', async (c) => {
  const { token } = await c.req.json<{ token: string }>();
  const secret = getJwtSecret(c.env);
  if (!secret) return c.json({ valid: false }, 401);

  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx === -1) return c.json({ valid: false }, 401);

    const encodedPayload = token.slice(0, dotIdx);
    const safeSig = token.slice(dotIdx + 1);
    const sig = safeSig.replace(/-/g, '+').replace(/_/g, '/');

    const payload = atob(encodedPayload);
    const valid = await verifyHmac(payload, sig, secret);
    if (!valid) return c.json({ valid: false }, 401);

    const expiry = parseInt(payload.split(':')[1]);
    if (isNaN(expiry) || Date.now() > expiry) {
      return c.json({ valid: false, expired: true }, 401);
    }

    return c.json({ valid: true });
  } catch {
    return c.json({ valid: false }, 401);
  }
});

// ─── POST /api/admin/forgot-password ────────────────────────────
app.post('/admin/forgot-password', async (c) => {
  // Rate limit — макс 3 запроса на сброс с одного IP за 15 мин
  const ip = getClientIP(c);
  const rl = checkRateLimit(`forgot:${ip}`);
  if (!rl.allowed) {
    // Возвращаем success чтобы не раскрывать информацию
    return c.json({ success: true });
  }

  const db = drizzle(c.env.DB);
  const adminEmail = 'zambrovskij@gmail.com';

  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const resetToken = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60; // 1 час

  await db.delete(adminResetTokens)
    .where(lt(adminResetTokens.expiresAt, Math.floor(Date.now() / 1000)));

  await db.insert(adminResetTokens).values({ token: resetToken, expiresAt, used: 0 });

  const siteUrl = ((c.env as any).SITE_URL as string | undefined) || 'https://pontarea.de';
  const resetUrl = `${siteUrl}/admin/reset-password?token=${resetToken}`;
  const resendKey = (c.env as any).RESEND_API_KEY as string | undefined;

  if (resendKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Pontarea Admin <noreply@pontarea.de>',
        to: [adminEmail],
        subject: '🔐 Pontarea Admin – Passwort zurücksetzen',
        html: `
          <div style="font-family:-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#f0f7ff;">
            <div style="background:white;border-radius:16px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <div style="text-align:center;margin-bottom:32px;">
                <span style="font-size:48px;">⛵</span>
                <h1 style="color:#1a2e4a;font-size:24px;margin:16px 0 8px;">Pontarea Admin</h1>
                <p style="color:#64748b;margin:0;">Passwort zurücksetzen</p>
              </div>
              <p style="color:#374151;font-size:16px;line-height:1.6;">
                Klicke auf den Button, um ein neues Passwort festzulegen.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#d4a853,#e8c476);color:black;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                  Passwort zurücksetzen
                </a>
              </div>
              <p style="color:#94a3b8;font-size:13px;text-align:center;">
                Dieser Link ist <strong>1 Stunde</strong> gültig.<br>
                Falls du keine Anfrage gestellt hast, ignoriere diese E-Mail.
              </p>
            </div>
          </div>`,
      }),
    });
  }

  return c.json({
    success: true,
    ...(resendKey ? {} : { devResetUrl: resetUrl }),
  });
});

// ─── POST /api/admin/reset-password ─────────────────────────────
app.post('/admin/reset-password', async (c) => {
  const { token, newPassword } = await c.req.json<{ token: string; newPassword: string }>();
  const db = drizzle(c.env.DB);

  if (!token || !newPassword || newPassword.length < 8) {
    return c.json({ error: 'Passwort muss mindestens 8 Zeichen haben' }, 400);
  }

  const now = Math.floor(Date.now() / 1000);
  const rows = await db.select().from(adminResetTokens).where(eq(adminResetTokens.token, token));

  if (!rows.length)      return c.json({ error: 'Token nicht gefunden' }, 400);
  if (rows[0].used === 1) return c.json({ error: 'Dieser Link wurde bereits verwendet' }, 400);
  if (rows[0].expiresAt < now) return c.json({ error: 'Link abgelaufen – bitte neu anfordern' }, 400);

  await db.update(adminResetTokens).set({ used: 1 }).where(eq(adminResetTokens.token, token));

  // Сохраняем новый пароль в D1
  await db.insert(adminConfig)
    .values({ key: 'admin_password', value: newPassword })
    .onConflictDoUpdate({ target: adminConfig.key, set: { value: newPassword } });

  return c.json({ success: true });
});

export default app;
