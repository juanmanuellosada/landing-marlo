// Vercel Serverless Function — verifica si la sesión del editor es válida
import { checkAuth } from './_lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.EDITOR_SESSION_SECRET;
  if (!secret || !checkAuth(req, secret)) {
    return res.status(401).json({ authenticated: false });
  }
  return res.status(200).json({ authenticated: true });
}
