import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limit: не более 5 запросов за 10 минут с одного IP
const attempts = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const e = attempts.get(ip);
  if (!e || e.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count++;
  return true;
}

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const FIELDS: Array<{ key: string; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'org', label: 'Organisation' },
  { key: 'email', label: 'E-Mail' },
  { key: 'phone', label: 'Telefon / WhatsApp' },
  { key: 'role', label: 'Rolle' },
  { key: 'formatType', label: 'Format / Thema' },
  { key: 'groupSize', label: 'Gruppengröße' },
  { key: 'period', label: 'Wunschzeitraum' },
  { key: 'boat', label: 'Boot' },
  { key: 'sailing', label: 'Segelerfahrung' },
  { key: 'message', label: 'Nachricht' },
  { key: 'language', label: 'Sprache der Seite' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 'unknown';
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Zu viele Anfragen. Bitte in 10 Minuten erneut versuchen.' });
  }

  let body: Record<string, any> = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch {
    return res.status(400).json({ error: 'Ungültige Anfrage.' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const privacy = body.privacy === true || body.privacy === 'true' || body.privacy === 'on';

  if (!name || name.length < 2) return res.status(400).json({ error: 'Bitte Namen angeben.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ error: 'Bitte gültige E-Mail angeben.' });
  if (!privacy) return res.status(400).json({ error: 'Bitte Datenschutzhinweis bestätigen.' });

  // Полный payload в лог — данные не теряются, даже если Resend недоступен
  console.log('[coaches-inquiry]', JSON.stringify({ ip, at: new Date().toISOString(), ...body }));

  const rows = FIELDS.filter((f) => String(body[f.key] || '').trim())
    .map(
      (f) =>
        `<tr><td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;white-space:nowrap;vertical-align:top;">${esc(
          f.label,
        )}</td><td style="padding:8px 14px;border-bottom:1px solid #e2e8f0;color:#1a2e4a;font-size:15px;">${esc(
          body[f.key],
        ).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // Kein Key -> Anfrage erreicht niemanden. Der Besucher darf KEIN
    // "eingegangen" sehen, sonst ist der Lead lautlos verloren.
    console.error('[coaches-inquiry] RESEND_API_KEY fehlt - Anfrage nur im Log');
    return res.status(502).json({ error: 'mail_not_sent' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Pontarea <noreply@pontarea.de>',
        to: ['info@pontarea.de'],
        reply_to: email,
        subject: `⛵ Coaches-Anfrage: ${name}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:620px;margin:0 auto;padding:32px 16px;background:#f0f7ff;">
            <div style="background:white;border-radius:18px;padding:36px 32px;box-shadow:0 4px 28px rgba(0,0,0,0.07);">
              <h1 style="color:#1a2e4a;font-size:22px;font-weight:700;margin:0 0 6px;">Neue Anfrage über /coaches</h1>
              <p style="color:#64748b;margin:0 0 26px;font-size:14px;">Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
              <table style="width:100%;border-collapse:collapse;">${rows}</table>
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${esc(email)}" style="display:inline-block;background:linear-gradient(135deg,#d4a853,#e8c476);color:#000;text-decoration:none;padding:13px 32px;border-radius:12px;font-weight:700;font-size:15px;">Antworten →</a>
              </div>
            </div>
          </div>`,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('[coaches-inquiry] resend failed', r.status, detail);
      if (r.status === 403 && detail.includes('not verified')) {
        console.error('[coaches-inquiry] Absender-Domain bei Resend nicht verifiziert -> resend.com/domains');
      }
      return res.status(502).json({ error: 'mail_not_sent' });
    }
    return res.status(200).json({ success: true, mailed: true });
  } catch (err) {
    console.error('[coaches-inquiry] resend error', err);
    return res.status(502).json({ error: 'mail_not_sent' });
  }
}
