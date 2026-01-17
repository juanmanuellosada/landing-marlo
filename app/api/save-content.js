// Vercel Serverless Function para guardar contenido usando GitHub API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const newContent = req.body;

    // Variables de entorno requeridas
    const {
      GITHUB_TOKEN,
      GITHUB_OWNER,
      GITHUB_REPO,
      GITHUB_BRANCH = 'main',
      CONTENT_FILE_PATH = 'app/src/content.json'
    } = process.env;

    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      return res.status(500).json({
        success: false,
        error: 'Configuración de GitHub incompleta. Verifica las variables de entorno.'
      });
    }

    // 1. Obtener el SHA actual del archivo (requerido por GitHub API)
    const getFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}?ref=${GITHUB_BRANCH}`;
    
    const getFileResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Editor'
      }
    });

    if (!getFileResponse.ok) {
      throw new Error(`Error obteniendo archivo: ${getFileResponse.statusText}`);
    }

    const fileData = await getFileResponse.json();
    const currentSha = fileData.sha;

    // 2. Preparar el nuevo contenido en base64
    const contentString = JSON.stringify(newContent, null, 2);
    const contentBase64 = Buffer.from(contentString).toString('base64');

    // 3. Hacer commit del nuevo contenido
    const updateFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}`;
    
    const updateResponse = await fetch(updateFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Editor'
      },
      body: JSON.stringify({
        message: 'Actualización de contenidos desde editor',
        content: contentBase64,
        sha: currentSha,
        branch: GITHUB_BRANCH
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Error actualizando archivo: ${JSON.stringify(errorData)}`);
    }

    const updateData = await updateResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Contenido guardado y deploy iniciado',
      commit: updateData.commit
    });

  } catch (error) {
    console.error('Error al guardar contenido:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al guardar el archivo: ' + error.message
    });
  }
}
