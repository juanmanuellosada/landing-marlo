# Editor de Contenidos - Landing Marlo

## 📋 Descripción

Sistema de edición de contenidos para la landing page de Marlocomunica. Permite modificar todos los textos de la página desde una interfaz web privada (`/editor`), guardando los cambios directamente en el código fuente y desplegando automáticamente.

## 🏗️ Arquitectura

### Estructura de Archivos

```
app/
├── src/
│   ├── content.json          # ✨ Archivo centralizado con todos los textos
│   ├── components/
│   │   ├── LandingPage.jsx   # Página pública principal
│   │   ├── EditorPage.jsx    # Wrapper del editor con auth
│   │   ├── Login.jsx         # Componente de autenticación
│   │   ├── Editor.jsx        # Formulario de edición
│   │   ├── Hero.jsx          # Componentes refactorizados
│   │   ├── About.jsx         # que usan content.json
│   │   ├── Philosophy.jsx
│   │   ├── Services.jsx
│   │   ├── WhyUs.jsx
│   │   ├── Strategies.jsx
│   │   └── Footer.jsx
│   ├── App.jsx               # Router principal
│   └── main.jsx
├── server.js                 # Servidor Express para APIs
├── users.json                # Whitelist de usuarios
└── package.json
```

## 🚀 Cómo Usar

### 1. Iniciar el proyecto

```bash
# Instalar dependencias (si no están instaladas)
npm install

# Opción A: Iniciar todo junto (frontend + backend)
npm run dev:full

# Opción B: Iniciar por separado
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

### 2. Acceder al Editor

1. Navegar a `http://localhost:5173/editor`
2. Iniciar sesión con las credenciales del archivo `users.json`
   - **Usuario por defecto:** `admin`
   - **Contraseña por defecto:** `admin123`
3. Editar los contenidos en el formulario
4. Hacer clic en "Guardar Cambios y Desplegar"

### 3. Ver los Cambios

- Los cambios se guardan en `src/content.json`
- Se hace commit y push automático al repositorio
- El pipeline de CI/CD detecta el cambio y redespliega la landing

## 🔐 Gestión de Usuarios

### Agregar un nuevo usuario

Edita el archivo `users.json`:

```json
{
  "users": [
    {
      "username": "admin",
      "password": "admin123"
    },
    {
      "username": "editor",
      "password": "mipassword"
    }
  ]
}
```

**⚠️ Importante:** Las contraseñas están en texto plano. Esta es una implementación simple. Para producción, considera implementar hashing de contraseñas.

### Cambiar contraseña

1. Edita `users.json`
2. Cambia el campo `password` del usuario correspondiente
3. Reinicia el servidor (`npm run server`)

## 📝 Agregar Nuevos Textos Editables

### 1. Agregar al archivo `content.json`

```json
{
  "nuevaSeccion": {
    "titulo": "Mi nuevo título",
    "descripcion": "Mi nueva descripción"
  }
}
```

### 2. Crear/Modificar el componente React

```jsx
import content from '../content.json';

const NuevaSeccion = () => {
  const { titulo, descripcion } = content.nuevaSeccion;
  
  return (
    <section>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </section>
  );
};
```

### 3. Agregar campos al Editor

En `src/components/Editor.jsx`, agrega una nueva sección:

```jsx
<section className="mb-8 border-b pb-8">
  <h2 className="text-2xl font-bold text-gray-700 mb-4">Nueva Sección</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700 font-bold mb-2">Título</label>
      <input
        type="text"
        value={content.nuevaSeccion.titulo}
        onChange={(e) => handleChange('nuevaSeccion.titulo', e.target.value)}
        className="w-full px-4 py-2 border rounded text-black"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-bold mb-2">Descripción</label>
      <textarea
        value={content.nuevaSeccion.descripcion}
        onChange={(e) => handleChange('nuevaSeccion.descripcion', e.target.value)}
        className="w-full px-4 py-2 border rounded text-black"
        rows="3"
      />
    </div>
  </div>
</section>
```

## 🔧 Tecnologías Utilizadas

- **Frontend:** React 19, Vite, Tailwind CSS, React Router
- **Backend:** Express.js, Node.js
- **Persistencia:** Sistema de archivos + Git
- **Deploy:** Automático via Git hooks/CI-CD

## 🔄 Flujo de Trabajo

```
Usuario accede a /editor
        ↓
    Autenticación
        ↓
   Edita contenidos
        ↓
Guarda cambios (POST /api/save-content)
        ↓
Backend guarda content.json
        ↓
Git commit + push automático
        ↓
Pipeline CI/CD detecta cambio
        ↓
Redeploy automático
        ↓
Landing actualizada
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Inicia Vite (solo frontend)
npm run server       # Inicia servidor Express (solo backend)
npm run dev:full     # Inicia frontend + backend simultáneamente
npm run build        # Build de producción
npm run preview      # Preview del build
```

## 🐛 Troubleshooting

### Error: "Cannot connect to server"
- Verifica que el servidor esté corriendo en el puerto 3001
- Ejecuta `npm run server` en una terminal separada

### Error: "Invalid credentials"
- Verifica el archivo `users.json`
- Asegúrate de que el formato sea correcto (JSON válido)

### Los cambios no se despliegan automáticamente
- Verifica que Git esté configurado correctamente
- Revisa que el repositorio tenga un pipeline de CI/CD activo
- Verifica los logs del servidor para errores en el commit/push

### El editor no muestra los textos actuales
- Verifica que `content.json` exista y tenga formato válido
- Limpia la caché del navegador
- Recarga la página con Ctrl+F5

## 🔒 Seguridad

**Nota:** Esta es una implementación básica para uso interno. Para producción:

1. Implementa hashing de contraseñas (bcrypt)
2. Usa JWT o sesiones seguras
3. Agrega HTTPS
4. Implementa rate limiting
5. Valida y sanitiza todos los inputs
6. Considera agregar roles y permisos

## 📄 Licencia

Este proyecto es privado y de uso interno para Marlocomunica.
