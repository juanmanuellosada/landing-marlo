# Landing Page - Mariana Losada

Landing page profesional con sistema de edición de contenidos integrado.

## 🌟 Características

- ✨ Landing page moderna y responsive
- 📝 **Editor de contenidos integrado** (`/editor`)
- 🔐 Sistema de autenticación
- 🚀 Deploy automático al guardar cambios
- 📱 Diseño mobile-first
- 🎨 Tailwind CSS para estilos

## 🚀 Inicio Rápido

### Primera vez (Setup)

```bash
# Ejecutar script de setup
setup.bat

# O manualmente:
npm install
copy users.json.example users.json
# Editar users.json con tus credenciales
```

### Uso diario

```bash
# Iniciar frontend + backend
npm run dev:full

# Acceder a:
# Landing: http://localhost:5173
# Editor: http://localhost:5173/editor
```

## 📂 Estructura del Proyecto

```
src/
├── content.json          # 📝 Todos los textos editables
├── components/
│   ├── LandingPage.jsx   # Landing pública
│   ├── EditorPage.jsx    # Editor privado
│   ├── Login.jsx         # Autenticación
│   ├── Editor.jsx        # Formulario de edición
│   └── [secciones...]    # Hero, About, Services, etc.
├── App.jsx               # Router principal
└── main.jsx

server.js                 # API backend
users.json                # Usuarios autorizados (gitignored)
```

## 📝 Editor de Contenidos

El sistema incluye un editor web completo para modificar todos los textos de la landing.

### ¿Cómo usar el editor?

1. Ve a `/editor`
2. Inicia sesión (credenciales en `users.json`)
3. Edita los textos
4. Guarda y despliega automáticamente

### Documentación del Editor

- **Guía Rápida:** [GUIA-RAPIDA.md](GUIA-RAPIDA.md)
- **Documentación Completa:** [README-EDITOR.md](README-EDITOR.md)
- **Resumen Técnico:** [RESUMEN-IMPLEMENTACION.md](RESUMEN-IMPLEMENTACION.md)

## 🛠️ Scripts Disponibles

```bash
npm run dev           # Solo frontend (Vite)
npm run server        # Solo backend (Express)
npm run dev:full      # Frontend + Backend
npm run build         # Build de producción
npm run preview       # Preview del build
```

## 🔐 Gestión de Usuarios

Edita `users.json` para agregar o modificar usuarios:

```json
{
  "users": [
    {"username": "admin", "password": "tu_password"}
  ]
}
```

**Importante:** Reinicia el servidor después de cambiar usuarios.

## 🎨 Modificar Contenidos

### Opción 1: Usar el Editor Web (Recomendado)
1. Accede a `/editor`
2. Edita y guarda

### Opción 2: Editar Directamente
1. Edita `src/content.json`
2. Los cambios se reflejan automáticamente en desarrollo

## 📦 Deploy a Producción

### GitHub Pages

1. Actualiza `vite.config.js`:
```javascript
export default defineConfig({
  base: '/repo-name/',
  plugins: [react(), tailwindcss()],
})
```

2. Build y deploy:
```bash
npm run build
# Deploys la carpeta dist/
```

### Deploy Automático con Editor

Cuando usas el editor, los cambios se despliegan automáticamente:
1. Editas en `/editor`
2. Guardas cambios
3. Se hace commit y push automático
4. Tu pipeline CI/CD despliega

## 🔄 Flujo de Trabajo

```
Usuario → /editor → Login → Edita → Guarda
    ↓
content.json actualizado
    ↓
Git commit + push automático
    ↓
Pipeline CI/CD
    ↓
Landing actualizada en producción
```

## 🐛 Troubleshooting

### No se conecta al servidor
```bash
npm run server
```

### Credenciales inválidas
- Verifica `users.json`
- Formato JSON correcto
- Reinicia servidor

### Cambios no se despliegan
- Verifica logs del servidor
- Revisa configuración Git
- Comprueba pipeline CI/CD

## 📚 Documentación Adicional

- [Guía Rápida del Editor](GUIA-RAPIDA.md) - Para usuarios
- [README del Editor](README-EDITOR.md) - Documentación técnica completa
- [Resumen de Implementación](RESUMEN-IMPLEMENTACION.md) - Para desarrolladores

## 🔧 Tecnologías

- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Backend:** Express.js, Node.js
- **Persistencia:** File system + Git
- **Deploy:** Automático via CI/CD

## 📄 Licencia

© 2026 Marlocomunica - Uso interno
