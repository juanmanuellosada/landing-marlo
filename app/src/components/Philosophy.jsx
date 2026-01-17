import content from '../content.json';

const Philosophy = () => {
  const { mainTitle, intro, description, highlights } = content.philosophy;

  return (
    <section className="py-20 px-8 md:px-20 bg-white/5">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-brand-orange border-2 border-white p-4 text-center rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold font-neulis">{mainTitle}</h3>
        </div>
        
        <div className="space-y-8 text-lg font-garet">
          <p>{intro}</p>
          <p>{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-xl text-center font-garet">
          {highlights.map((highlight, index) => (
            <div key={index} className="p-4 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
