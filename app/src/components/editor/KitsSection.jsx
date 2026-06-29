// kitsEditables.kits items shape: { heading, image, alt, buttonLabel, href }

const KitsSection = ({ content, onChange, onArrayChange }) => {
  const { kitsEditables } = content;

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Kits Editables</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={kitsEditables.title}
            onChange={(e) => onChange('kitsEditables.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
          <input
            type="text"
            value={kitsEditables.subtitle}
            onChange={(e) => onChange('kitsEditables.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        {kitsEditables.kits.map((kit, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded">
            <h3 className="font-bold text-gray-600 mb-3">Kit {index + 1}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 mb-1">Encabezado</label>
                <input
                  type="text"
                  value={kit.heading}
                  onChange={(e) =>
                    onArrayChange('kitsEditables.kits', index, 'heading', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Imagen (ruta)</label>
                <input
                  type="text"
                  value={kit.image}
                  onChange={(e) =>
                    onArrayChange('kitsEditables.kits', index, 'image', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Texto alternativo (alt)</label>
                <input
                  type="text"
                  value={kit.alt}
                  onChange={(e) =>
                    onArrayChange('kitsEditables.kits', index, 'alt', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Texto del botón</label>
                <input
                  type="text"
                  value={kit.buttonLabel}
                  onChange={(e) =>
                    onArrayChange('kitsEditables.kits', index, 'buttonLabel', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">URL</label>
                <input
                  type="text"
                  value={kit.href}
                  onChange={(e) =>
                    onArrayChange('kitsEditables.kits', index, 'href', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KitsSection;
