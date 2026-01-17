// Vercel Serverless Function para autenticación
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Usuarios desde variables de entorno
    // Formato: "user1:pass1,user2:pass2"
    const usersEnv = process.env.EDITOR_USERS || '';
    const users = usersEnv.split(',').map(pair => {
      const [user, pass] = pair.split(':');
      return { username: user?.trim(), password: pass?.trim() };
    });

    // Validar credenciales
    const validUser = users.find(
      u => u.username === username && u.password === password
    );

    if (validUser) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ success: false, error: 'Error del servidor' });
  }
}
