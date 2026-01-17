# 🚀 Landing + Editor - Versión Vercel

Sistema completo de landing page con editor de contenidos, listo para deploy gratuito en Vercel.

---

## ⚡ Quick Start

### Opción 1: Deploy Directo a Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click en el botón de arriba
2. Importa este repositorio
3. **Root Directory:** `app`
4. Configura las variables de entorno (ver [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md))
5. ¡Deploy!

### Opción 2: Desarrollo Local

```bash
npm install
npm run dev

# Acceder a:
# Landing: http://localhost:5173
# Editor: http://localhost:5173/editor
```

---

## 📂 Estructura del Proyecto

```
app/
├── api/                      # 🔧 Serverless Functions (Vercel)
│   ├── login.js             # Autenticación
│   └── save-content.js      # Guardar cambios vía GitHub API
├── src/
│   ├── content.json         # 📝 Todos los textos editables
│   ├── components/
│   │   ├── LandingPage.jsx  # Landing pública
│   │   ├── EditorPage.jsx   # Editor privado
│   │   ├── Editor.jsx       # Formulario de edición
│   │   ├── Login.jsx        # Autenticación
│   │   └── [secciones...]   # Componentes de la landing
│   └── App.jsx              # Router
├── vercel.json              # Configuración de Vercel
├── .env.example             # Plantilla de variables de entorno
└── vite.config.js           # Configuración de Vite
```

---

## 🌟 Características

### ✨ Landing Page
- Diseño moderno y responsive
- Optimizada para SEO
- Tailwind CSS
- React 19 + Vite

### 📝 Editor de Contenidos
- Interfaz web intuitiva en `/editor`
- Autenticación con usuarios configurables
- Edición de todos los textos
- **Deploy automático** al guardar

### 🚀 Deploy en Vercel
- **100% gratuito**
- Deploy automático desde Git
- Serverless functions para el backend
- SSL/HTTPS automático
- CDN global

---

## 🔧 Variables de Entorno

Crea estas variables en Vercel:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EDITOR_USERS` | Usuarios del editor | `admin:password123` |
| `GITHUB_TOKEN` | Token de GitHub | `ghp_xxx...` |
| `GITHUB_OWNER` | Tu usuario de GitHub | `juanm` |
| `GITHUB_REPO` | Nombre del repo | `landing-marlo` |
| `GITHUB_BRANCH` | Rama a usar | `main` |
| `CONTENT_FILE_PATH` | Ruta del content.json | `app/src/content.json` |

**Ver guía completa:** [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

---

## 📖 Documentación

| Documento | Descripción |
|-----------|-------------|
| [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md) | ⭐ **Guía completa de deploy** |
| [GUIA-RAPIDA.md](GUIA-RAPIDA.md) | Guía rápida de uso |
| [README-EDITOR.md](README-EDITOR.md) | Documentación del editor |

---

## 🎯 Flujo de Trabajo

### En Producción (Vercel)

```
1. Vas a tu-sitio.vercel.app/editor
2. Login con tus credenciales
3. Editas los contenidos
4. Guardas cambios
5. ¡Vercel redespliega automáticamente en 1-2 min!
```

### En Desarrollo Local

```
1. npm run dev
2. Vas a localhost:5173/editor
3. Editas y ves cambios en tiempo real
4. Cuando estés listo, commit y push
5. Vercel despliega automáticamente
```

---

## 🔐 Seguridad

- ✅ Autenticación protege el editor
- ✅ Variables de entorno para credenciales
- ✅ GitHub token con permisos limitados
- ✅ HTTPS automático en Vercel
- ✅ .gitignore protege archivos sensibles

**Importante:** Usa contraseñas fuertes en `EDITOR_USERS`

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia Vite dev server

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Otros
npm run lint         # Linter
```

---

## 🎨 Personalización

### Cambiar Textos

**Opción 1:** Usa el editor en `/editor` ✅ Recomendado

**Opción 2:** Edita directamente `src/content.json`

### Agregar Nueva Sección Editable

1. Agrega al `content.json`
2. Crea/actualiza el componente React
3. Agrega campos al formulario en `Editor.jsx`

Ver guía completa en [README-EDITOR.md](README-EDITOR.md#-agregar-nuevos-textos-editables)

---

## 🆘 Soporte

### Problemas Comunes

| Problema | Solución |
|----------|----------|
| Error en deploy | Verifica variables de entorno |
| Login falla | Revisa formato de `EDITOR_USERS` |
| Cambios no se guardan | Verifica `GITHUB_TOKEN` |
| 404 en rutas | Ya está configurado en `vercel.json` |

**Troubleshooting completo:** [DEPLOY-VERCEL.md#-troubleshooting](DEPLOY-VERCEL.md#-troubleshooting)

---

## 📊 Diferencias con Versión Anterior

### ❌ Versión Local (Anterior)
- ❌ Requiere servidor Node.js corriendo
- ❌ Solo funciona en tu computadora
- ❌ Necesita configurar Git manualmente
- ✅ Más simple para desarrollo

### ✅ Versión Vercel (Actual)
- ✅ Deploy gratuito y automático
- ✅ Accesible desde cualquier lugar
- ✅ Serverless (no necesitas servidor)
- ✅ SSL/HTTPS incluido
- ✅ CDN global
- ✅ Deploy automático al hacer push

---

## 🚀 Deploy Rápido

### 1. Crear GitHub Token

https://github.com/settings/tokens → Permisos: **repo**

### 2. Subir a GitHub

```bash
git add .
git commit -m "Ready for Vercel"
git push
```

### 3. Deploy en Vercel

1. https://vercel.com/new
2. Importar repo
3. **Root Directory:** `app`
4. Configurar variables de entorno
5. Deploy!

**Guía detallada:** [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

---

## 🔄 Migración desde Versión Anterior

Si ya tenías la versión con `server.js`:

### Archivos Obsoletos (puedes borrarlos)
- ❌ `server.js`
- ❌ `users.json`
- ❌ `users.json.example`
- ❌ `setup.bat`

### Archivos Nuevos
- ✅ `api/login.js`
- ✅ `api/save-content.js`
- ✅ `vercel.json`
- ✅ `.env.example`
- ✅ `DEPLOY-VERCEL.md`

### Configuración
En lugar de `users.json`, ahora usas variables de entorno en Vercel.

---

## 📱 URLs en Producción

Una vez deployado en Vercel:

| URL | Uso |
|-----|-----|
| `tu-proyecto.vercel.app` | Landing pública |
| `tu-proyecto.vercel.app/editor` | Editor (privado) |

---

## 💡 Tips

- 🎨 Puedes agregar un dominio personalizado gratis
- 📊 Vercel ofrece analytics integrado
- 🔔 Configura notificaciones de deploy
- 🌍 Deploy preview automático para cada branch
- 💾 Los cambios desde el editor se ven en 1-2 minutos

---

## 🎉 Todo Listo!

Tu landing con editor está lista para Vercel. **Deploy gratuito, automático y sin servidor**.

**Siguiente paso:** Lee [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md) para hacer tu primer deploy.

---

## 📄 Licencia

© 2026 Marlocomunica - Uso interno
