const ServicesSection = ({ content, onArrayChange }) => {
  return (
    <section className="mb-8 border-b pb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Servicios</h2>
      {content.services.map((service, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-bold text-gray-600 mb-3">Servicio {index + 1}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Categoría (emoji + nombre)</label>
              <input
                type="text"
                value={service.category}
                onChange={(e) => onArrayChange('services', index, 'category', e.target.value)}
                className="w-full px-4 py-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Título</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => onArrayChange('services', index, 'title', e.target.value)}
                className="w-full px-4 py-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Descripción</label>
              <textarea
                value={service.description}
                onChange={(e) => onArrayChange('services', index, 'description', e.target.value)}
                className="w-full px-4 py-2 border rounded text-black"
                rows="5"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServicesSection;
