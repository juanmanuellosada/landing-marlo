# 🔄 Migración a Vercel - Checklist

## ✅ Archivos Creados (Nuevos)

Estos archivos son necesarios para Vercel:

- [x] `api/login.js` - Serverless function para login
- [x] `api/save-content.js` - Serverless function para guardar
- [x] `vercel.json` - Configuración de Vercel
- [x] `.env.example` - Plantilla de variables de entorno
- [x] `.env.local` - Variables para desarrollo local
- [x] `DEPLOY-VERCEL.md` - Guía de deploy
- [x] `README-VERCEL.md` - README actualizado
- [x] Actualizado `vite.config.js` - Proxy para desarrollo
- [x] Actualizado `.gitignore` - Ignorar archivos de Vercel

## ❌ Archivos Obsoletos (Opcionales de borrar)

Estos archivos ya no se usan en la versión Vercel:

- [ ] `server.js` - Ya no se usa (reemplazado por serverless functions)
- [ ] `users.json` - Ya no se usa (ahora variables de entorno)
- [ ] `users.json.example` - Ya no se usa
- [ ] `setup.bat` - Ya no se necesita

**Puedes borrarlos si quieres**, pero también puedes dejarlos para referencia.

## 🔧 Cambios en Configuración

### ✅ Variables de Entorno

**Antes (Local):**
- Archivo `users.json` con usuarios

**Ahora (Vercel):**
- Variable de entorno `EDITOR_USERS` en Vercel
- Formato: `usuario:password,usuario2:password2`

### ✅ Guardado de Contenidos

**Antes (Local):**
- `server.js` guardaba directamente en el archivo
- Git commit/push manual desde el servidor

**Ahora (Vercel):**
- `api/save-content.js` usa GitHub API
- Commit automático usando `GITHUB_TOKEN`
- No necesita acceso directo al filesystem

### ✅ Autenticación

**Antes (Local):**
- Leía `users.json` del filesystem

**Ahora (Vercel):**
- Lee `EDITOR_USERS` de variables de entorno
- Más seguro (no expones archivo de usuarios)

## 📋 Pasos para Migrar

### 1. Preparar Repositorio

```bash
# Asegúrate de tener todos los cambios commiteados
git add .
git commit -m "Migración a Vercel"
git push
```

### 2. Crear GitHub Token

1. Ve a: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Permisos: ✅ **repo**
4. Copia el token (lo usarás en Vercel)

### 3. Deploy en Vercel

Sigue la guía completa: [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md)

### 4. Configurar Variables de Entorno

En Vercel, agrega:

```
EDITOR_USERS=admin:tu_password_aqui
GITHUB_TOKEN=ghp_tu_token_aqui
GITHUB_OWNER=tu_usuario_github
GITHUB_REPO=nombre_repo
GITHUB_BRANCH=main
CONTENT_FILE_PATH=app/src/content.json
```

### 5. Deploy y Probar

1. Deploy desde Vercel
2. Accede a `tu-proyecto.vercel.app/editor`
3. Prueba el login
4. Prueba editar y guardar
5. Verifica que se hace commit en GitHub
6. Verifica que Vercel redespliega automáticamente

## 🔍 Verificación

### ✅ Checklist de Testing

- [ ] Landing se ve correctamente en `tu-proyecto.vercel.app`
- [ ] Puedes acceder a `/editor`
- [ ] El login funciona con las credenciales de `EDITOR_USERS`
- [ ] Puedes editar los textos en el formulario
- [ ] Al guardar, aparece mensaje de éxito
- [ ] Se crea un commit en GitHub (verifica en GitHub)
- [ ] Vercel inicia un redeploy automático
- [ ] Los cambios se reflejan en la landing (1-2 min)

## 🐛 Si Algo Falla

### Login no funciona
- Verifica `EDITOR_USERS` en Vercel → Settings → Environment Variables
- Formato correcto: `usuario:password` (sin espacios)
- Redeploy después de cambiar variables

### No se guardan cambios
- Verifica `GITHUB_TOKEN` tenga permisos de **repo**
- Verifica `GITHUB_OWNER` y `GITHUB_REPO` sean correctos
- Ve a Functions logs en Vercel para ver errores

### No se ve la landing
- Verifica que **Root Directory** sea `app` en Vercel
- Verifica que el build se completó exitosamente

## 💾 Backup

Antes de borrar archivos obsoletos, haz un backup:

```bash
# Crear una rama con la versión anterior
git checkout -b backup-version-local
git push -u origin backup-version-local

# Volver a main
git checkout main
```

Así siempre puedes volver a la versión anterior si lo necesitas.

## 🎉 ¡Migración Completa!

Una vez que todo funcione en Vercel:

1. ✅ Landing accesible públicamente
2. ✅ Editor accesible desde cualquier lugar
3. ✅ Deploy automático al guardar
4. ✅ 100% gratis en Vercel
5. ✅ SSL/HTTPS incluido
6. ✅ CDN global

**Opcional:** Puedes borrar los archivos obsoletos listados arriba.

---

**¿Problemas?** Consulta [DEPLOY-VERCEL.md#-troubleshooting](DEPLOY-VERCEL.md#-troubleshooting)
