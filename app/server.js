import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta de autenticación
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersPath = path.join(__dirname, 'users.json');
    const usersData = await fs.readJson(usersPath);

    const user = usersData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
});

// Ruta para guardar contenido
app.post('/api/save-content', async (req, res) => {
  try {
    const newContent = req.body;
    const contentPath = path.join(__dirname, 'src', 'content.json');

    // Guardar el archivo content.json
    await fs.writeJson(contentPath, newContent, { spaces: 2 });

    console.log('Contenido guardado exitosamente');

    // Intentar hacer commit y push automático
    try {
      const { stdout: statusOutput } = await execPromise('git status --porcelain', {
        cwd: __dirname,
      });

      if (statusOutput.trim()) {
        console.log('Detectados cambios, haciendo commit...');
        
        await execPromise('git add src/content.json', { cwd: __dirname });
        await execPromise('git commit -m "Actualización de contenidos desde editor"', {
          cwd: __dirname,
        });
        
        console.log('Commit realizado, haciendo push...');
        await execPromise('git push', { cwd: __dirname });
        
        console.log('Push completado, deploy iniciado automáticamente');
        
        res.json({
          success: true,
          message: 'Contenido guardado y deploy iniciado',
        });
      } else {
        res.json({
          success: true,
          message: 'Contenido guardado (sin cambios para commitear)',
        });
      }
    } catch (gitError) {
      console.error('Error en operación git:', gitError);
      res.json({
        success: true,
        message: 'Contenido guardado, pero hubo un problema con git/deploy',
        gitError: gitError.message,
      });
    }
  } catch (error) {
    console.error('Error al guardar contenido:', error);
    res.status(500).json({
      success: false,
      error: 'Error al guardar el archivo: ' + error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 API de login: http://localhost:${PORT}/api/login`);
  console.log(`💾 API de guardado: http://localhost:${PORT}/api/save-content`);
});
