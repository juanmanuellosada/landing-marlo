import content from '../content.json';

const Services = () => {
  return (
    <section className="py-20 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {content.services.slice(0, 1).map((service, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-neulis font-bold text-center min-h-[64px] flex items-center justify-center">{service.title}</h3>
            <p className="text-sm leading-relaxed font-garet whitespace-pre-line">{service.description}</p>
          </div>
        ))}

        <div className="space-y-4">
          {content.services.slice(1, 3).map((service, index) => (
            <div key={index} className={index > 0 ? 'pt-8' : ''}>
              <h3 className="text-2xl font-neulis font-bold text-center mb-4">{service.title}</h3>
              <p className="text-sm leading-relaxed font-garet">{service.description}</p>
            </div>
          ))}
        </div>

        {content.services.slice(3, 4).map((service, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-neulis font-bold text-center min-h-[64px] flex items-center justify-center">{service.title}</h3>
            <p className="text-sm leading-relaxed font-garet">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
