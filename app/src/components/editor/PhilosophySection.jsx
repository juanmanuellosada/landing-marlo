const PhilosophySection = ({ content, onChange }) => {
  const { philosophy } = content;

  const updateHighlight = (index, value) => {
    const next = [...philosophy.highlights];
    next[index] = value;
    onChange('philosophy.highlights', next);
  };

  const addHighlight = () =>
    onChange('philosophy.highlights', [...philosophy.highlights, '']);

  const removeHighlight = (index) =>
    onChange('philosophy.highlights', philosophy.highlights.filter((_, i) => i !== index));

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Filosofía</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título Principal</label>
          <input
            type="text"
            value={philosophy.mainTitle}
            onChange={(e) => onChange('philosophy.mainTitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Introducción</label>
          <textarea
            value={philosophy.intro}
            onChange={(e) => onChange('philosophy.intro', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            value={philosophy.description}
            onChange={(e) => onChange('philosophy.description', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="3"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Puntos destacados</h3>
          {philosophy.highlights.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateHighlight(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded text-black"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            + Agregar punto
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
