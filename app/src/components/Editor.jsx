import { useState, useEffect } from 'react';
import contentData from '../content.json';
import HeroSection from './editor/HeroSection';
import AboutSection from './editor/AboutSection';
import PhilosophySection from './editor/PhilosophySection';
import ServicesSection from './editor/ServicesSection';
import StrategiesSection from './editor/StrategiesSection';
import CuponSection from './editor/CuponSection';
import ProyectosSection from './editor/ProyectosSection';
import TestimoniosSection from './editor/TestimoniosSection';
import KitsSection from './editor/KitsSection';
import FooterSection from './editor/FooterSection';

// Pre-save validation: ensures required keys and shapes are intact
// so a save can never silently corrupt content.json.
function validateContent(c) {
  const requiredPaths = [
    'hero.headline', 'hero.subtitle', 'hero.tagline', 'hero.nav', 'hero.products', 'hero.socialMedia',
    'about.title', 'philosophy.mainTitle',
    'whyUs.title', 'strategies.title',
    'cupon.enabled', 'proyectos.title', 'testimonios.title',
  ];
  for (const path of requiredPaths) {
    const keys = path.split('.');
    let node = c;
    for (const k of keys) {
      if (node == null || !(k in node)) {
        return `Campo requerido faltante: ${path}`;
      }
      node = node[k];
    }
  }
  if (!Array.isArray(c.strategies?.items)) {
    return 'strategies.items debe ser un array';
  }
  for (const [i, item] of c.strategies.items.entries()) {
    if (
      typeof item !== 'object' ||
      !('icon' in item) ||
      !('title' in item) ||
      !('description' in item)
    ) {
      return `Estrategia ${i + 1} debe tener icon, title y description`;
    }
  }
  if (!Array.isArray(c.proyectos?.logos)) {
    return 'proyectos.logos debe ser un array';
  }
  if (!Array.isArray(c.testimonios?.items)) {
    return 'testimonios.items debe ser un array';
  }
  return null; // valid
}

const Editor = () => {
  const [content, setContent] = useState(contentData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');

  // Session countdown display
  useEffect(() => {
    const updateTimeRemaining = () => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
      const sessionStart = parseInt(localStorage.getItem('sessionStart') || '0');
      const now = Date.now();
      const INACTIVITY_TIMEOUT = 30 * 60 * 1000;
      const ABSOLUTE_TIMEOUT = 2 * 60 * 60 * 1000;
      const remaining = Math.min(
        INACTIVITY_TIMEOUT - (now - lastActivity),
        ABSOLUTE_TIMEOUT - (now - sessionStart),
      );
      if (remaining > 0) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeRemaining('Expirada');
      }
    };
    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set a value at a dot-path, e.g. 'cupon.popup.enabled'
  const handleChange = (path, value) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(content));
    let cur = next;
    for (let i = 0; i < keys.length - 1; i++) {
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    setContent(next);
  };

  // Update a specific field inside an object-array item.
  // path points to the array (e.g. 'strategies.items'), index selects the item.
  const handleArrayChange = (path, index, field, value) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(content));
    let cur = next;
    for (const k of keys) {
      cur = cur[k];
    }
    cur[index][field] = value;
    setContent(next);
  };

  const handleSave = async () => {
    const validationError = validateContent(content);
    if (validationError) {
      setMessage(`❌ Error de validación: ${validationError}`);
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      if (response.status === 401) {
        setMessage('❌ Sesión expirada. Por favor, iniciá sesión nuevamente.');
        return;
      }
      if (response.ok && data.success) {
        setMessage('✅ Contenido guardado y deploy iniciado exitosamente');
      } else {
        setMessage('❌ Error al guardar: ' + (data.error || 'Error desconocido'));
      }
    } catch {
      setMessage('❌ Error al conectar con el servidor');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    } catch { /* noop — navegamos de todas formas */ }
    localStorage.removeItem('sessionStart');
    localStorage.removeItem('lastActivity');
    window.location.href = '/';
  };

  const sectionProps = {
    content,
    onChange: handleChange,
    onArrayChange: handleArrayChange,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Editor de Contenidos</h1>
              <p className="text-sm text-gray-500 mt-1">
                Sesión expira en:{' '}
                <span className="font-mono font-semibold">{timeRemaining}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cerrar Sesión
            </button>
          </div>

          <HeroSection {...sectionProps} />
          <AboutSection {...sectionProps} />
          <PhilosophySection {...sectionProps} />
          <ServicesSection {...sectionProps} />
          <StrategiesSection {...sectionProps} />
          <CuponSection {...sectionProps} />
          <ProyectosSection {...sectionProps} />
          <TestimoniosSection {...sectionProps} />
          <KitsSection {...sectionProps} />
          <FooterSection {...sectionProps} />

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
              <div
                className={`mt-4 p-4 rounded ${
                  message.includes('✅')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
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
