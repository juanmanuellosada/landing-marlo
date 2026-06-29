// Persists content.json via the GitHub Contents API.
// Used by api/save-content.js so the logic lives in one place.
export async function saveContentToGithub(content) {
  const {
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = 'main',
    CONTENT_FILE_PATH = 'app/src/content.json',
  } = process.env;

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error('Configuración de GitHub incompleta. Verifica las variables de entorno.');
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Vercel-Editor',
  };

  // 1. Get current file SHA (required by GitHub API for updates)
  const getRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}?ref=${GITHUB_BRANCH}`,
    { headers }
  );
  if (!getRes.ok) throw new Error(`Error obteniendo archivo: ${getRes.statusText}`);
  const { sha } = await getRes.json();

  // 2. Commit the new content
  const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
  const putRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_FILE_PATH}`,
    {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Actualización de contenidos desde editor',
        content: contentBase64,
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );
  if (!putRes.ok) {
    const err = await putRes.json();
    throw new Error(`Error actualizando archivo: ${JSON.stringify(err)}`);
  }
  return (await putRes.json()).commit;
}
