# ⚡ Deploy Rápido a Vercel (5 minutos)

## 🎯 Pasos Esenciales

### 1️⃣ GitHub Token (2 min)

```
🔗 https://github.com/settings/tokens

1. Click "Generate new token (classic)"
2. Nombre: vercel-editor
3. Permisos: ✅ repo
4. Generate token
5. 📋 COPIA EL TOKEN
```

### 2️⃣ Vercel Import (1 min)

```
🔗 https://vercel.com/new

1. Import Git Repository
2. Conecta GitHub
3. Selecciona: landing-marlo
4. Click "Import"
```

### 3️⃣ Configuración (2 min)

```
Root Directory: app  ⚠️ IMPORTANTE

Environment Variables:
┌─────────────────────────────────────────────┐
│ EDITOR_USERS       = admin:mipassword123   │
│ GITHUB_TOKEN       = ghp_xxx...            │
│ GITHUB_OWNER       = tu_usuario            │
│ GITHUB_REPO        = landing-marlo         │
│ GITHUB_BRANCH      = main                  │
│ CONTENT_FILE_PATH  = app/src/content.json  │
└─────────────────────────────────────────────┘

Click "Deploy"
```

### 4️⃣ ¡Listo! (0 min)

```
🎉 Landing: https://tu-proyecto.vercel.app
📝 Editor: https://tu-proyecto.vercel.app/editor
```

---

## 🔑 Variables de Entorno - Cheatsheet

Copia y pega, cambiando los valores:

```env
EDITOR_USERS=admin:CAMBIA_ESTA_PASSWORD
GITHUB_TOKEN=ghp_PEGA_TU_TOKEN_AQUI
GITHUB_OWNER=TU_USUARIO_GITHUB
GITHUB_REPO=landing-marlo
GITHUB_BRANCH=main
CONTENT_FILE_PATH=app/src/content.json
```

**Dónde conseguir cada valor:**

| Variable | Dónde obtenerla |
|----------|-----------------|
| `EDITOR_USERS` | La eliges tú (usuario:password) |
| `GITHUB_TOKEN` | github.com/settings/tokens |
| `GITHUB_OWNER` | Tu usuario de GitHub |
| `GITHUB_REPO` | Nombre de tu repositorio |
| `GITHUB_BRANCH` | Usualmente `main` |
| `CONTENT_FILE_PATH` | `app/src/content.json` (si usas carpeta app) |

---

## 🚨 Errores Comunes

### ❌ "Cannot find module"
**Causa:** Root Directory incorrecto
**Fix:** Settings → General → Root Directory: `app`

### ❌ "GITHUB_TOKEN not configured"
**Causa:** Falta variable de entorno
**Fix:** Settings → Environment Variables → Agregar

### ❌ "Unauthorized" en login
**Causa:** `EDITOR_USERS` mal configurada
**Fix:** Formato correcto: `usuario:password` (sin espacios)

---

## ✅ Testing Post-Deploy

```bash
# 1. Abre tu landing
https://tu-proyecto.vercel.app
✅ Se ve correctamente

# 2. Abre el editor
https://tu-proyecto.vercel.app/editor
✅ Aparece login

# 3. Login
Usuario: admin (o el que pusiste)
Password: (la que pusiste en EDITOR_USERS)
✅ Entras al editor

# 4. Edita algo
Cambia un texto
Click "Guardar Cambios"
✅ Mensaje de éxito

# 5. Verifica GitHub
https://github.com/TU_USUARIO/TU_REPO/commits
✅ Nuevo commit del editor

# 6. Espera redeploy (1-2 min)
Ve a Vercel → Deployments
✅ Aparece nuevo deployment

# 7. Refresca la landing
Ctrl + F5
✅ Cambios reflejados
```

---

## 🔗 Links Útiles

| Servicio | URL |
|----------|-----|
| Vercel New Project | https://vercel.com/new |
| GitHub Tokens | https://github.com/settings/tokens |
| Vercel Dashboard | https://vercel.com/dashboard |
| Vercel Docs | https://vercel.com/docs |

---

## 💡 Tips

- 💾 **Guarda el token:** Lo necesitarás si redeployas
- 🔒 **Password fuerte:** En `EDITOR_USERS`
- 📱 **Dominio custom:** Settings → Domains (gratis)
- 📊 **Analytics:** Settings → Analytics (gratis)

---

## 📚 Más Info

**Guía completa:** [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

**¿Problemas?** [DEPLOY-VERCEL.md#-troubleshooting](DEPLOY-VERCEL.md#-troubleshooting)

---

🎉 **¡Eso es todo!** En 5 minutos tienes tu landing con editor en Vercel, gratis.
