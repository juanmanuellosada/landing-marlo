import { useState, useEffect } from 'react';
import contentData from '../content.json';

const Editor = () => {
  const [content, setContent] = useState(contentData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (path, value) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setContent(newContent);
  };

  const handleArrayChange = (path, index, field, value) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current = newContent;

    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        current[keys[i]][index][field] = value;
      } else {
        current = current[keys[i]];
      }
    }

    setContent(newContent);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('✅ Contenido guardado y deploy iniciado exitosamente');
      } else {
        setMessage('❌ Error al guardar: ' + (data.error || 'Error desconocido'));
      }
    } catch (err) {
      setMessage('❌ Error al conectar con el servidor');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('editorAuth');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Editor de Contenidos</h1>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Hero Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Hero / Portada</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  value={content.hero.name}
                  onChange={(e) => handleChange('hero.name', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Rol</label>
                <input
                  type="text"
                  value={content.hero.role}
                  onChange={(e) => handleChange('hero.role', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-gray-700 mb-2">Links de Navegación</h3>
                {content.hero.links.map((link, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => handleArrayChange('hero.links', index, 'name', e.target.value)}
                      placeholder="Nombre"
                      className="px-4 py-2 border rounded text-black"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => handleArrayChange('hero.links', index, 'href', e.target.value)}
                      placeholder="URL"
                      className="px-4 py-2 border rounded text-black"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Sobre Mí</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Título</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => handleChange('about.title', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Descripción</label>
                <textarea
                  value={content.about.description}
                  onChange={(e) => handleChange('about.description', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Subtítulo (texto destacado)</label>
                <textarea
                  value={content.about.subtitle}
                  onChange={(e) => handleChange('about.subtitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Contenido</label>
                <textarea
                  value={content.about.content}
                  onChange={(e) => handleChange('about.content', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="3"
                />
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Filosofía</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Título Principal</label>
                <input
                  type="text"
                  value={content.philosophy.mainTitle}
                  onChange={(e) => handleChange('philosophy.mainTitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Introducción</label>
                <textarea
                  value={content.philosophy.intro}
                  onChange={(e) => handleChange('philosophy.intro', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Descripción</label>
                <textarea
                  value={content.philosophy.description}
                  onChange={(e) => handleChange('philosophy.description', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="3"
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Servicios</h2>
            {content.services.map((service, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Título del Servicio {index + 1}</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)}
                      className="w-full px-4 py-2 border rounded text-black"
                      rows="5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Why Us Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Por Qué Elegirnos</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Título</label>
                <input
                  type="text"
                  value={content.whyUs.title}
                  onChange={(e) => handleChange('whyUs.title', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              {content.whyUs.reasons.map((reason, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <input
                      type="text"
                      value={reason.icon}
                      onChange={(e) => handleArrayChange('whyUs.reasons', index, 'icon', e.target.value)}
                      placeholder="Icono"
                      className="px-4 py-2 border rounded text-black"
                    />
                    <input
                      type="text"
                      value={reason.title}
                      onChange={(e) => handleArrayChange('whyUs.reasons', index, 'title', e.target.value)}
                      placeholder="Título"
                      className="col-span-2 px-4 py-2 border rounded text-black"
                    />
                  </div>
                  <textarea
                    value={reason.text}
                    onChange={(e) => handleArrayChange('whyUs.reasons', index, 'text', e.target.value)}
                    placeholder="Descripción"
                    className="w-full px-4 py-2 border rounded text-black"
                    rows="2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Texto del botón CTA</label>
                <input
                  type="text"
                  value={content.whyUs.ctaText}
                  onChange={(e) => handleChange('whyUs.ctaText', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
            </div>
          </section>

          {/* Strategies Section */}
          <section className="mb-8 border-b pb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Estrategias</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Título</label>
                <input
                  type="text"
                  value={content.strategies.title}
                  onChange={(e) => handleChange('strategies.title', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              {content.strategies.items.map((item, index) => (
                <div key={index}>
                  <label className="block text-gray-700 font-bold mb-2">Estrategia {index + 1}</label>
                  <textarea
                    value={item}
                    onChange={(e) => {
                      const newItems = [...content.strategies.items];
                      newItems[index] = e.target.value;
                      handleChange('strategies.items', newItems);
                    }}
                    className="w-full px-4 py-2 border rounded text-black"
                    rows="3"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Footer Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Footer / Contacto</h2>
            {content.footer.links.map((link, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Texto</label>
                    <input
                      type="text"
                      value={link.text}
                      onChange={(e) => handleArrayChange('footer.links', index, 'text', e.target.value)}
                      className="w-full px-4 py-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">URL</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleArrayChange('footer.links', index, 'url', e.target.value)}
                      className="w-full px-4 py-2 border rounded text-black"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Save Button */}
          <div className="mt-8 pt-8 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg ${
                saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-orange hover:bg-orange-600'
              }`}
            >
              {saving ? 'Guardando y Desplegando...' : 'Guardar Cambios y Desplegar'}
            </button>
            {message && (
              <div className={`mt-4 p-4 rounded ${
                message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
