import content from '../content.json';

const Strategies = () => {
  const { title, items } = content.strategies;

  return (
    <section className="py-20 px-8 md:px-20 bg-brand-orange">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <h2 className="bg-white text-brand-orange py-2 px-12 rounded-full text-3xl font-garet font-bold shadow-md">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white text-charcoal p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 font-garet"
            >
              <p className="text-lg leading-relaxed">
                <strong>{item.icon} {item.title}:</strong>{' '}{item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strategies;
