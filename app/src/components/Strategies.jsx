import content from '../content.json';

const Strategies = () => {
  const { title, items } = content.strategies;

  const renderStrategyText = (text) => {
    // Procesar negritas y cursivas
    const parts = text.split(/(<span className="font-bold italic">.*?<\/span>|<span className="font-bold">.*?<\/span>)/g);
    return parts.map((part, i) => {
      if (part.includes('font-bold italic')) {
        const content = part.replace(/<span className="font-bold italic">(.*?)<\/span>/g, '$1');
        return <span key={i} className="font-bold italic">{content}</span>;
      } else if (part.includes('font-bold')) {
        const content = part.replace(/<span className="font-bold">(.*?)<\/span>/g, '$1');
        return <span key={i} className="font-bold">{content}</span>;
      }
      return part;
    });
  };

  return (
    <section className="py-20 px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <h2 className="bg-brand-orange text-white border-2 border-white py-2 px-12 rounded-lg text-3xl font-neulis shadow-md">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-white text-black p-8 rounded-lg shadow-xl hover:transform hover:-translate-y-2 transition-transform duration-300 font-garet">
              <p className="text-lg leading-relaxed">
                {renderStrategyText(item)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strategies;
