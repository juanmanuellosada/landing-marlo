// Shared authentication helpers for Vercel serverless functions.
// Uses Node's built-in 'crypto' — no external JWT dependency.
import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours, matches the client-side absolute timeout

// --- Token signing / verification ---

export function signToken(secret) {
  const payload = { iat: Date.now(), exp: Date.now() + TOKEN_TTL_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const dot = token.indexOf('.');
  if (dot === -1) return null;
  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac('sha256', secret).update(data).digest('base64url');
  // Constant-time comparison prevents timing-based side-channel attacks.
  // HMAC-SHA256 always produces 32 bytes (43 base64url chars) — both buffers
  // have the same length when the token is untampered.
  const sigBuf = Buffer.from(sig, 'base64url');
  const expBuf = Buffer.from(expected, 'base64url');
  if (sigBuf.length !== expBuf.length) return null;
  if (!timingSafeEqual(sigBuf, expBuf)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(data, 'base64url').toString());
  } catch {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

// --- Cookie helpers ---

export function buildSessionCookie(token) {
  // Omit Secure in non-production so `vercel dev` (HTTP) works locally
  const isProduction = process.env.VERCEL_ENV === 'production';
  const secure = isProduction ? '; Secure' : '';
  return `session=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${TOKEN_TTL_MS / 1000}${secure}`;
}

export function clearSessionCookie() {
  return 'session=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0';
}

export function parseSessionToken(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
  return match ? match[1] : null;
}

export function checkAuth(req, secret) {
  const token = parseSessionToken(req.headers.cookie);
  return token ? verifyToken(token, secret) : null;
}

// --- Rate limiting ---
// NOTE: This uses an ephemeral in-memory counter per function instance.
// On Vercel, each cold start resets the counter and parallel warm instances
// have independent counters — so this does NOT guarantee protection against
// distributed or multi-instance brute-force. It is adequate for a low-traffic
// single-editor CMS. For a production-scale deployment, replace with a
// persistent store (e.g. Vercel KV / Redis) or Vercel WAF rate-limiting rules.

const rateLimitStore = new Map();

export function checkRateLimit(req, { maxRequests = 10, windowMs = 15 * 60 * 1000 } = {}) {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  const record = rateLimitStore.get(ip) || { count: 0, windowStart: now };

  if (now - record.windowStart > windowMs) {
    record.count = 1;
    record.windowStart = now;
  } else {
    record.count += 1;
  }
  rateLimitStore.set(ip, record);
  return record.count > maxRequests;
}
