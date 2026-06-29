// strategies.items shape: { icon, title, description } — objects, not strings.

const StrategiesSection = ({ content, onChange, onArrayChange }) => {
  const { strategies } = content;

  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Estrategias</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Título</label>
          <input
            type="text"
            value={strategies.title}
            onChange={(e) => onChange('strategies.title', e.target.value)}
            className="w-full px-4 py-2 border rounded text-black"
          />
        </div>
        {strategies.items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded">
            <h3 className="font-bold text-gray-600 mb-3">Estrategia {index + 1}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 mb-1">Icono</label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => onArrayChange('strategies.items', index, 'icon', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onArrayChange('strategies.items', index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    onArrayChange('strategies.items', index, 'description', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded text-black"
                  rows="3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StrategiesSection;
