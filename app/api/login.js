// Vercel Serverless Function — autenticación con bcrypt y cookie de sesión firmada
import bcryptjs from 'bcryptjs';
import { signToken, buildSessionCookie, checkRateLimit } from './_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting: máximo 10 intentos por IP en una ventana de 15 minutos
  if (checkRateLimit(req, { maxRequests: 10, windowMs: 15 * 60 * 1000 })) {
    return res.status(429).json({ error: 'Demasiados intentos. Intenta de nuevo más tarde.' });
  }

  try {
    const { username, password } = req.body;

    const secret = process.env.EDITOR_SESSION_SECRET;
    if (!secret) {
      console.error('EDITOR_SESSION_SECRET no configurado');
      return res.status(500).json({ error: 'Configuración del servidor incompleta.' });
    }

    // EDITOR_USERS format: "username:$2b$12$<bcryptHash>"  (cuenta única)
    // Generate a hash with: node scripts/hash-password.js <password>
    const usersEnv = process.env.EDITOR_USERS || '';
    const colonIdx = usersEnv.indexOf(':');
    if (colonIdx === -1) {
      console.error('EDITOR_USERS mal configurado');
      return res.status(500).json({ error: 'Configuración de usuarios incompleta.' });
    }
    const storedUser = usersEnv.slice(0, colonIdx).trim();
    const storedHash = usersEnv.slice(colonIdx + 1).trim();

    const usernameMatch = storedUser === username;
    // Siempre ejecutar bcrypt.compare para evitar timing side-channels
    const passwordMatch = await bcryptjs.compare(password || '', storedHash);

    if (!usernameMatch || !passwordMatch) {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }

    const token = signToken(secret);
    res.setHeader('Set-Cookie', buildSessionCookie(token));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ success: false, error: 'Error del servidor' });
  }
}
