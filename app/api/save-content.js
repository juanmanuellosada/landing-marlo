// Vercel Serverless Function — guarda contenido en GitHub (requiere sesión válida)
import { checkAuth, checkRateLimit } from './_lib/auth.js';
import { saveContentToGithub } from './_lib/github.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Enforce authentication: reject any request without a valid server-issued cookie.
  // Authorization is NEVER inferred from client-side state (e.g. localStorage).
  const secret = process.env.EDITOR_SESSION_SECRET;
  if (!secret || !checkAuth(req, secret)) {
    return res.status(401).json({ success: false, error: 'No autenticado.' });
  }

  // Rate limiting: máximo 30 guardados por IP en una ventana de 15 minutos
  if (checkRateLimit(req, { maxRequests: 30, windowMs: 15 * 60 * 1000 })) {
    return res.status(429).json({ error: 'Demasiados intentos. Intenta de nuevo más tarde.' });
  }

  try {
    const commit = await saveContentToGithub(req.body);
    return res.status(200).json({
      success: true,
      message: 'Contenido guardado y deploy iniciado',
      commit,
    });
  } catch (error) {
    console.error('Error al guardar contenido:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al guardar el archivo: ' + error.message,
    });
  }
}
