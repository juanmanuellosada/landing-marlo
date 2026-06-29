// whyUs.reasons items shape: { icon, text } — no `title` field.
// whyUs.description is an array of paragraph strings.

const WhyUsSection = ({ content, onChange, onArrayChange }) => {
  const { whyUs } = content;

  const updateDescription = (index, value) => {
    const next = [...whyUs.description];
    next[index] = value;
    onChange('whyUs.description', next);
  };

  const addDescription = () =>
    onChange('whyUs.description', [...whyUs.description, '']);

  const removeDescription = (index) =>
    onChange('whyUs.description', whyUs.description.filter((_, i) => i !== index));

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Por Qué Elegirnos</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={whyUs.title}
            onChange={(e) => onChange('whyUs.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-2">Razones</h3>
          {whyUs.reasons.map((reason, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded mb-2">
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <input
                  type="text"
                  value={reason.icon}
                  onChange={(e) => onArrayChange('whyUs.reasons', index, 'icon', e.target.value)}
                  placeholder="Icono"
                  className="px-4 py-2 border rounded text-black"
                />
                <textarea
                  value={reason.text}
                  onChange={(e) => onArrayChange('whyUs.reasons', index, 'text', e.target.value)}
                  placeholder="Texto"
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="2"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-2">Descripción (párrafos)</h3>
          {whyUs.description.map((text, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={text}
                onChange={(e) => updateDescription(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded text-black"
                rows="2"
              />
              <button
                type="button"
                onClick={() => removeDescription(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDescription}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            + Agregar párrafo
          </button>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Texto del botón CTA</label>
          <input
            type="text"
            value={whyUs.ctaText}
            onChange={(e) => onChange('whyUs.ctaText', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
