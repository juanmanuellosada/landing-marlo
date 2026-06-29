const AboutSection = ({ content, onChange }) => {
  const { about } = content;

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Sobre Mí</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={about.title}
            onChange={(e) => onChange('about.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            value={about.description}
            onChange={(e) => onChange('about.description', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subtítulo (texto destacado)</label>
          <textarea
            value={about.subtitle}
            onChange={(e) => onChange('about.subtitle', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Contenido</label>
          <textarea
            value={about.content}
            onChange={(e) => onChange('about.content', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
            rows="3"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
