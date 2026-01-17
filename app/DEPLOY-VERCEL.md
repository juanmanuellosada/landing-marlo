# 🚀 Deploy a Vercel - Guía Completa

## 📋 Pre-requisitos

1. ✅ Cuenta de GitHub
2. ✅ Cuenta de Vercel (gratis en vercel.com)
3. ✅ Repositorio de GitHub con este proyecto

---

## 🔧 Configuración Inicial

### 1️⃣ Crear un Personal Access Token de GitHub

Necesitas un token para que Vercel pueda hacer commits al repositorio.

1. Ve a: https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Dale un nombre: `vercel-editor-token`
4. Selecciona el scope: ✅ **repo** (Full control of private repositories)
5. Click en **"Generate token"**
6. **⚠️ COPIA EL TOKEN** (no podrás verlo de nuevo)

**Ejemplo del token:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 2️⃣ Subir el Proyecto a GitHub

```bash
# Si aún no tienes un repositorio
git init
git add .
git commit -m "Initial commit con editor Vercel"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

---

## 🌐 Deploy en Vercel

### Paso 1: Importar Proyecto

1. Ve a https://vercel.com/new
2. Click en **"Import Git Repository"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona tu repositorio
5. Click en **"Import"**

### Paso 2: Configurar el Proyecto

En la pantalla de configuración:

**Framework Preset:** Vite ✅ (debería detectarlo automáticamente)

**Root Directory:** `app` ⚠️ (MUY IMPORTANTE si tu código está en la carpeta app)

**Build and Output Settings:**
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅
- Install Command: `npm install` ✅

### Paso 3: Variables de Entorno

⚠️ **ANTES DE HACER DEPLOY**, configura las variables de entorno:

1. En la sección **"Environment Variables"**
2. Agrega las siguientes variables:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `EDITOR_USERS` | `admin:tu_password` | `admin:mipassword123` |
| `GITHUB_TOKEN` | El token que creaste | `ghp_xxxx...` |
| `GITHUB_OWNER` | Tu usuario de GitHub | `juanm` |
| `GITHUB_REPO` | Nombre del repositorio | `landing-marlo` |
| `GITHUB_BRANCH` | Rama a usar | `main` |
| `CONTENT_FILE_PATH` | Ruta del content.json | `app/src/content.json` |

**Captura de cómo se ve:**
```
EDITOR_USERS = admin:mipassword123,editor:otrapass
GITHUB_TOKEN = ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER = juanm
GITHUB_REPO = landing-marlo
GITHUB_BRANCH = main
CONTENT_FILE_PATH = app/src/content.json
```

### Paso 4: Deploy

1. Click en **"Deploy"**
2. Espera unos 2-3 minutos
3. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

## 🎯 Uso del Editor en Producción

### Acceder al Editor

1. Ve a: `https://tu-proyecto.vercel.app/editor`
2. Login con las credenciales que pusiste en `EDITOR_USERS`
3. Edita los contenidos
4. Guarda cambios
5. **Vercel redesplegará automáticamente** (tarda 1-2 minutos)

### Flujo Completo

```
Editas en /editor
       ↓
Guardas cambios
       ↓
Se hace commit a GitHub (vía API)
       ↓
GitHub dispara webhook a Vercel
       ↓
Vercel redespliega automáticamente
       ↓
Landing actualizada (1-2 min)
```

---

## ⚙️ Configuración Avanzada

### Agregar Más Usuarios

En las variables de entorno de Vercel:

**Formato:** `usuario1:password1,usuario2:password2`

**Ejemplo:**
```
EDITOR_USERS=admin:pass123,editor:pass456,maria:pass789
```

### Cambiar Contraseñas

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Edita `EDITOR_USERS`
4. Click en **"Save"**
5. **Redeploy** el proyecto

### Redeploy Manual

Si necesitas forzar un redeploy:

1. Ve a **Deployments**
2. Click en los 3 puntos `...` del último deploy
3. Click en **"Redeploy"**

---

## 🔒 Seguridad

### Buenas Prácticas

✅ **Usa contraseñas fuertes** en `EDITOR_USERS`
✅ **No compartas el token de GitHub** con nadie
✅ **Revoca y regenera el token** si lo expones accidentalmente
✅ **Limita el token solo a este repo** (si usas Fine-grained tokens)

### Revocar un Token Comprometido

1. Ve a https://github.com/settings/tokens
2. Encuentra el token
3. Click en **"Delete"**
4. Genera uno nuevo
5. Actualiza `GITHUB_TOKEN` en Vercel

---

## 🐛 Troubleshooting

### Error: "GITHUB_TOKEN not configured"

**Causa:** No configuraste las variables de entorno

**Solución:**
1. Ve a **Settings** → **Environment Variables** en Vercel
2. Agrega todas las variables requeridas
3. Redeploy

### Error: "Credenciales inválidas"

**Causa:** Las credenciales en `EDITOR_USERS` no coinciden

**Solución:**
1. Verifica el formato: `usuario:password`
2. Sin espacios extra
3. Redeploy después de cambiar

### Error: "Failed to update file"

**Causa:** Token de GitHub sin permisos o expirado

**Solución:**
1. Verifica que el token tenga permisos de **repo**
2. Verifica que no haya expirado
3. Genera un nuevo token si es necesario

### Los cambios no se reflejan

**Causa:** Vercel aún está redeployando

**Solución:**
- Espera 1-2 minutos
- Verifica en **Deployments** que se completó
- Limpia la caché del navegador (Ctrl+F5)

### Error 404 en /editor

**Causa:** React Router no está manejando las rutas correctamente

**Solución:**
- Ya está configurado en `vercel.json`
- Si persiste, verifica que `vercel.json` esté en la raíz correcta

---

## 📊 Monitoreo

### Ver Logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en **"Deployments"**
3. Click en el deployment actual
4. Click en **"Functions"** para ver logs de las API

### Ver Commits en GitHub

1. Ve a tu repo en GitHub
2. Click en **"Commits"**
3. Verás los commits del editor con el mensaje: "Actualización de contenidos desde editor"

---

## 🔄 Actualizar el Código

Si haces cambios al código del editor o componentes:

```bash
# 1. Commit y push como siempre
git add .
git commit -m "Actualización del editor"
git push

# 2. Vercel redesplegará automáticamente
```

---

## 💡 Tips

- ✨ **Dominio personalizado:** Puedes agregar tu dominio en Settings → Domains
- 🚀 **Deploy preview:** Cada branch tiene su propio URL de preview
- 📊 **Analytics:** Vercel ofrece analytics gratis en el plan free
- 🔔 **Notificaciones:** Configura notificaciones de deploy en Settings

---

## 📱 URLs Importantes

| URL | Descripción |
|-----|-------------|
| `tu-proyecto.vercel.app` | Landing pública |
| `tu-proyecto.vercel.app/editor` | Editor privado |
| `vercel.com/dashboard` | Panel de control |
| `github.com/settings/tokens` | Gestión de tokens |

---

## ✅ Checklist de Deploy

Antes de hacer deploy, verifica:

- [ ] Repositorio en GitHub
- [ ] Token de GitHub creado con permisos de **repo**
- [ ] Proyecto importado en Vercel
- [ ] Root Directory configurado a `app`
- [ ] Variables de entorno configuradas:
  - [ ] `EDITOR_USERS`
  - [ ] `GITHUB_TOKEN`
  - [ ] `GITHUB_OWNER`
  - [ ] `GITHUB_REPO`
  - [ ] `GITHUB_BRANCH`
  - [ ] `CONTENT_FILE_PATH`
- [ ] Deploy completado exitosamente
- [ ] Probado el login en `/editor`
- [ ] Probado guardar cambios

---

## 🎉 ¡Listo!

Tu landing con editor está deployada en Vercel, 100% gratis y con deploy automático.

**Cualquier duda:** Consulta la documentación de Vercel en https://vercel.com/docs
