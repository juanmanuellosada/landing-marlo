# 🚀 Guía Rápida - Editor de Contenidos

## Inicio Rápido (3 pasos)

### 1️⃣ Configuración Inicial (solo primera vez)

```bash
# Ejecutar setup
setup.bat

# O manualmente:
npm install
copy users.json.example users.json
```

Edita `users.json` y cambia la contraseña por defecto.

---

### 2️⃣ Iniciar el Sistema

```bash
npm run dev:full
```

Esto inicia:
- ✅ Frontend en http://localhost:5173
- ✅ Backend en http://localhost:3001

---

### 3️⃣ Editar Contenidos

1. Ve a: http://localhost:5173/editor
2. Login con tus credenciales
3. Edita los textos
4. Clic en "Guardar Cambios y Desplegar"
5. ¡Listo! Los cambios se despliegan automáticamente

---

## 📂 Archivos Importantes

| Archivo | Para qué sirve |
|---------|----------------|
| `src/content.json` | 📝 Todos los textos de la landing |
| `users.json` | 👤 Usuarios autorizados |
| `server.js` | ⚙️ API backend |

---

## 🔧 Comandos Útiles

```bash
# Iniciar todo
npm run dev:full

# Solo frontend
npm run dev

# Solo backend
npm run server

# Build para producción
npm run build
```

---

## 👥 Gestionar Usuarios

Edita `users.json`:

```json
{
  "users": [
    {"username": "admin", "password": "mipassword"},
    {"username": "editor", "password": "otrapass"}
  ]
}
```

Reinicia el servidor después de cambiar usuarios.

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
# Verifica que el servidor esté corriendo
npm run server
```

### Credenciales inválidas
- Verifica que `users.json` existe
- Verifica que el formato JSON sea correcto
- Reinicia el servidor

### Los cambios no se despliegan
- Verifica la consola del servidor
- Asegúrate de que Git esté configurado
- Verifica que el pipeline CI/CD esté activo

---

## 📚 Más Información

- **Documentación completa:** `README-EDITOR.md`
- **Resumen técnico:** `RESUMEN-IMPLEMENTACION.md`

---

## ✅ Checklist de Deployment

Antes de usar en producción:

- [ ] Cambiar contraseñas por defecto en `users.json`
- [ ] Configurar Git en el servidor
- [ ] Verificar que el pipeline CI/CD funcione
- [ ] Probar el flujo completo de edición
- [ ] Hacer backup del `content.json` original
- [ ] Documentar usuarios autorizados

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

**¿Preguntas?** Consulta `README-EDITOR.md` para más detalles.
