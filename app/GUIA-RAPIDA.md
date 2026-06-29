# 🚀 Guía Rápida - Editor de Contenidos

## Inicio Rápido (3 pasos)

### 1️⃣ Configuración Inicial (solo primera vez)

```bash
npm install

# Generar el hash de tu contraseña (requiere que estés en app/)
node scripts/hash-password.js <tu-contraseña>
```

Copiá el hash generado y configurá estas variables de entorno en Vercel
(Settings → Environment Variables):

| Variable | Valor |
|---|---|
| `EDITOR_USERS` | `marloeditor:$2b$12$<hash-generado>` |
| `EDITOR_SESSION_SECRET` | cadena aleatoria larga (`openssl rand -hex 32`) |
| `GITHUB_TOKEN` | Personal Access Token con scope **repo** (ver nota abajo) |
| `GITHUB_OWNER` | Tu usuario de GitHub |
| `GITHUB_REPO` | Nombre del repositorio (ej: `landing-marlo`) |
| `GITHUB_BRANCH` | Rama a usar (ej: `main`) |
| `CONTENT_FILE_PATH` | `app/src/content.json` |

> **Cómo crear el GITHUB_TOKEN:** Ve a https://github.com/settings/tokens → "Generate new token (classic)" → scope **repo** → copiá el token generado.

> **Root Directory en Vercel:** Al importar el proyecto, configurá Root Directory como `app` (no la raíz del repo).

---

### 2️⃣ Iniciar el Sistema (desarrollo local)

Requiere [Vercel CLI](https://vercel.com/docs/cli) instalado y proyecto vinculado:

```bash
vercel dev
```

Esto inicia el frontend (Vite) y las funciones serverless en el mismo puerto,
idéntico a producción. Accedé al editor en la URL que muestre `vercel dev`.

---

### 3️⃣ Editar Contenidos

1. Ve a: http://localhost:3000/editor  (o la URL que indique `vercel dev`)
2. Login con tus credenciales
3. Edita los textos
4. Clic en "Guardar Cambios y Desplegar"
5. ¡Listo! Los cambios se despliegan automáticamente

---

## 📂 Archivos Importantes

| Archivo | Para qué sirve |
|---------|----------------|
| `src/content.json` | 📝 Todos los textos de la landing |
| `api/login.js` | 🔑 Endpoint de autenticación (serverless) |
| `api/save-content.js` | 💾 Endpoint de guardado (serverless) |
| `scripts/hash-password.js` | 🔒 Generador de hash para EDITOR_USERS |

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local (funciones serverless + frontend juntos)
vercel dev

# Solo frontend (sin funciones serverless)
npm run dev

# Build para producción
npm run build

# Generar hash de contraseña para EDITOR_USERS
node scripts/hash-password.js <contraseña>
```

---

## 👤 Cambiar Contraseña

```bash
# 1. Generá el nuevo hash
node scripts/hash-password.js <nueva-contraseña>

# 2. Copiá el valor de EDITOR_USERS del output y actualizalo en:
#    Vercel → Settings → Environment Variables → EDITOR_USERS
```

Los cambios aplican en el próximo deploy.

---

## ➕ Agregar Contenido Editable

### Paso 1: Agregar al JSON
```json
// En src/content.json
{
  "miSeccion": {
    "titulo": "Mi título",
    "texto": "Mi texto"
  }
}
```

### Paso 2: Usar en componente
```jsx
import content from '../content.json';

const MiComponente = () => {
  const { titulo, texto } = content.miSeccion;
  return <div><h2>{titulo}</h2><p>{texto}</p></div>;
};
```

### Paso 3: Agregar al editor
```jsx
// En src/components/Editor.jsx
<input
  value={content.miSeccion.titulo}
  onChange={(e) => handleChange('miSeccion.titulo', e.target.value)}
/>
```

---

## 🆘 Problemas Comunes

### No puedo conectar al servidor
```bash
# Asegurate de usar vercel dev, no npm run dev:full
vercel dev
```

### Credenciales inválidas
- Verificá que `EDITOR_USERS` en Vercel tenga el formato `username:$2b$12$...`
- El hash debe generarse con `node scripts/hash-password.js`
- Verificá que `EDITOR_SESSION_SECRET` esté configurado

### Los cambios no se despliegan
- Verifica la consola del servidor
- Asegúrate de que Git esté configurado
- Verifica que el pipeline CI/CD esté activo

---

---

## ✅ Checklist de Deployment

Antes de usar en producción:

- [ ] Configurar `EDITOR_USERS` con hash bcrypt (no texto plano)
- [ ] Configurar `EDITOR_SESSION_SECRET` con cadena aleatoria fuerte
- [ ] Configurar `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` en Vercel
- [ ] Verificar que el pipeline CI/CD de Vercel esté activo
- [ ] Probar el flujo completo de edición en un preview deploy
- [ ] Hacer backup del `content.json` original

---

## 💡 Tips

- Los cambios se guardan en Git, puedes revertirlos si algo sale mal
- Usa Ctrl+F5 para refrescar la página y ver cambios
- Haz cambios pequeños y prueba frecuentemente
- Siempre verifica la landing pública después de guardar

---

## 🎯 Flujo de Trabajo Recomendado

1. ✏️ Edita en `/editor`
2. 💾 Guarda cambios
3. 👀 Verifica en la landing pública
4. ✅ Si todo está bien, continúa
5. ❌ Si algo falló, revisa Git para revertir

---

**¿Preguntas?** Revisá el checklist de deployment más arriba o los logs en Vercel → Deployments → Functions.
