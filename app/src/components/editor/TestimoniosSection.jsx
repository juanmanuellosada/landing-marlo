// Editor for testimonios.items[] — text-based testimonial cards.
// Shape: { title, subtitle, items: [{ quote, highlight, badge, name, handle, stars }] }

const DEFAULT_ITEM = {
  quote: '',
  highlight: '',
  badge: '',
  name: '',
  handle: '',
  stars: 5,
};

const TestimoniosSection = ({ content, onChange }) => {
  const { testimonios } = content;
  const items = testimonios.items || [];

  const updateItem = (index, field, value) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange('testimonios.items', next);
  };

  const addItem = () => {
    onChange('testimonios.items', [...items, { ...DEFAULT_ITEM }]);
  };

  const removeItem = (index) => {
    onChange('testimonios.items', items.filter((_, i) => i !== index));
  };

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Testimonios</h2>

      <div className="space-y-4">
        {/* Section-level fields */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={testimonios.title}
            onChange={(e) => onChange('testimonios.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
          <input
            type="text"
            value={testimonios.subtitle}
            onChange={(e) => onChange('testimonios.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>

        {/* Items list */}
        <div>
          <h3 className="font-bold text-gray-700 mb-3">
            Testimonios ({items.length})
          </h3>

          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 space-y-3"
              >
                {/* Item header */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600 text-sm">
                    #{index + 1} — {item.name || 'Sin nombre'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm shrink-0"
                  >
                    ✕ Eliminar
                  </button>
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Cita (quote)
                  </label>
                  <textarea
                    value={item.quote}
                    onChange={(e) => updateItem(index, 'quote', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded text-black text-sm"
                  />
                </div>

                {/* Highlight */}
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Frase destacada (highlight) — debe ser una subcadena exacta de la cita
                  </label>
                  <input
                    type="text"
                    value={item.highlight}
                    onChange={(e) => updateItem(index, 'highlight', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-black text-sm"
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Badge (emoji + texto)
                  </label>
                  <input
                    type="text"
                    value={item.badge}
                    onChange={(e) => updateItem(index, 'badge', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-black text-sm"
                  />
                </div>

                {/* Name + Handle in a row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-black text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-1">
                      Handle (@usuario) — dejar vacío si no aplica
                    </label>
                    <input
                      type="text"
                      value={item.handle}
                      onChange={(e) => updateItem(index, 'handle', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-black text-sm"
                    />
                  </div>
                </div>

                {/* Stars */}
                <div className="w-32">
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Estrellas
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={item.stars ?? 5}
                    onChange={(e) =>
                      updateItem(index, 'stars', Math.min(5, Math.max(1, Number(e.target.value))))
                    }
                    className="w-full px-3 py-2 border rounded text-black text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            + Agregar testimonio
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
