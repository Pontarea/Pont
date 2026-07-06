import type { VercelRequest, VercelResponse } from '@vercel/node';

async function verifyHmac(payload: string, sig: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const sigBytes = Buffer.from(sig, 'base64url');
  return crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS-Header für gleiche Domain setzen
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'POST') return res.status(405).json({ valid: false, reason: 'method' });

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    console.error('[verify] ADMIN_JWT_SECRET is not set!');
    return res.status(500).json({ valid: false, reason: 'config_error' });
  }

  const body = req.body as { token?: string };
  const token = body?.token;
  
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ valid: false, reason: 'missing_token' });
  }

  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1 || dot === 0 || dot === token.length - 1) {
      return res.status(401).json({ valid: false, reason: 'bad_format' });
    }

    const encodedPayload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    
    let payload: string;
    try {
      payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    } catch {
      return res.status(401).json({ valid: false, reason: 'bad_encoding' });
    }

    const ok = await verifyHmac(payload, sig, secret);
    if (!ok) return res.status(401).json({ valid: false, reason: 'bad_sig' });

    const parts = payload.split(':');
    if (parts.length < 3) {
      return res.status(401).json({ valid: false, reason: 'bad_format' });
    }
    
    if (parts[0] !== 'magic' && parts[0] !== 'session') {
      return res.status(401).json({ valid: false, reason: 'wrong_type' });
    }

    const expiry = parseInt(parts[1]);
    if (isNaN(expiry) || Date.now() > expiry) {
      return res.status(401).json({ valid: false, reason: 'expired' });
    }

    return res.status(200).json({ valid: true });
  } catch (err) {
    console.error('[verify] Unexpected error:', err);
    return res.status(500).json({ valid: false, reason: 'server_error' });
  }
}
