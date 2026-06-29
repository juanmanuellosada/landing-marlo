// proyectos.logos is a string[] of image paths.

const ProyectosSection = ({ content, onChange }) => {
  const { proyectos } = content;

  const updateLogo = (index, value) => {
    const next = [...proyectos.logos];
    next[index] = value;
    onChange('proyectos.logos', next);
  };

  const addLogo = () =>
    onChange('proyectos.logos', [...proyectos.logos, '']);

  const removeLogo = (index) =>
    onChange('proyectos.logos', proyectos.logos.filter((_, i) => i !== index));

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Proyectos</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={proyectos.title}
            onChange={(e) => onChange('proyectos.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo</label>
          <input
            type="text"
            value={proyectos.subtitle}
            onChange={(e) => onChange('proyectos.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Texto del botón CTA</label>
            <input
              type="text"
              value={proyectos.ctaText}
              onChange={(e) => onChange('proyectos.ctaText', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">URL del botón CTA</label>
            <input
              type="text"
              value={proyectos.ctaHref}
              onChange={(e) => onChange('proyectos.ctaHref', e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-2">Logos (rutas de imagen)</h3>
          {proyectos.logos.map((logo, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <span className="text-gray-500 text-sm w-7 shrink-0">{index + 1}.</span>
              <input
                type="text"
                value={logo}
                onChange={(e) => updateLogo(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded text-black text-sm"
              />
              <button
                type="button"
                onClick={() => removeLogo(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLogo}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            + Agregar logo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;
