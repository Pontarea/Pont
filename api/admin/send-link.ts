import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limit: не более 3 запросов за 10 минут
const attempts = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const e = attempts.get(ip);
  if (!e || e.resetAt < now) { attempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 }); return true; }
  if (e.count >= 3) return false;
  e.count++; return true;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Buffer.from(buf).toString('base64url');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 'unknown';
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Zu viele Anfragen. Bitte 10 Minuten warten.' });
  }

  const secret = process.env.ADMIN_JWT_SECRET;
  const resendKey = process.env.RESEND_API_KEY;
  const siteUrl = (process.env.SITE_URL || 'https://pontarea.de').replace(/\/$/, '');

  if (!secret) return res.status(500).json({ error: 'ADMIN_JWT_SECRET nicht konfiguriert.' });

  // Строим подписанный токен: expiry + nonce → hmac
  const expiry = Date.now() + 15 * 60 * 1000; // 15 минут
  const nonce = crypto.randomUUID();
  const payload = `magic:${expiry}:${nonce}`;
  const sig = await hmac(payload, secret);
  const token = Buffer.from(payload).toString('base64url') + '.' + sig;
  const loginUrl = `${siteUrl}/admin/login?token=${encodeURIComponent(token)}`;

  if (resendKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Pontarea Admin <noreply@pontarea.de>',
        to: ['zambrovskij@gmail.com'],
        subject: '🔐 Pontarea Admin – Einmal-Zugangslink',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#f0f7ff;">
            <div style="background:white;border-radius:20px;padding:48px 40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);">
              <div style="text-align:center;margin-bottom:36px;">
                <div style="font-size:52px;margin-bottom:16px;">⛵</div>
                <h1 style="color:#1a2e4a;font-size:26px;font-weight:700;margin:0 0 8px;">Pontarea Admin</h1>
                <p style="color:#64748b;margin:0;font-size:16px;">Dein Einmal-Zugangslink</p>
              </div>
              <p style="color:#374151;font-size:16px;line-height:1.7;margin-bottom:8px;">
                Klicke auf den Button — du wirst sofort eingeloggt.
              </p>
              <p style="color:#94a3b8;font-size:14px;margin-bottom:32px;">
                Der Link ist <strong>15 Minuten</strong> gültig und kann nur einmal verwendet werden.
              </p>
              <div style="text-align:center;">
                <a href="${loginUrl}"
                   style="display:inline-block;background:linear-gradient(135deg,#d4a853,#e8c476);
                          color:#000;text-decoration:none;padding:16px 40px;
                          border-radius:14px;font-weight:700;font-size:17px;
                          box-shadow:0 4px 20px rgba(212,168,83,0.35);">
                  Admin öffnen →
                </a>
              </div>
              <p style="color:#cbd5e1;font-size:12px;text-align:center;margin-top:36px;margin-bottom:0;">
                Falls du diese E-Mail nicht angefordert hast, ignoriere sie einfach.
              </p>
            </div>
          </div>`,
      }),
    });
    return res.status(200).json({ success: true });
  }

  // Dev-режим: нет Resend → вернуть ссылку напрямую
  return res.status(200).json({ success: true, devLoginUrl: loginUrl });
}
