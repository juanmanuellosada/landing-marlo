import content from '../content.json';
import Badge from './ui/Badge';
import Marquee from './Marquee';

const Services = () => {
  return (
    <>
      <Marquee text="NUESTROS SERVICIOS ✵" textClassName="text-sm" />
      <section className="py-20 px-8 md:px-20 bg-surface-cream text-charcoal">
        <div className="max-w-7xl mx-auto">
          {/* Section title pill */}
          <div className="flex justify-center mb-12">
            <Badge className="text-base px-5 py-2">🛠️ Nuestros Servicios</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: service[0] */}
            {content.services.slice(0, 1).map((service) => (
              <div key={service.title} className="space-y-3">
                <Badge>{service.category}</Badge>
                <h3 className="text-xl font-garet font-bold text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed font-garet whitespace-pre-line text-charcoal/80">{service.description}</p>
              </div>
            ))}

            {/* Column 2: services[1] and [2] stacked */}
            <div className="space-y-8">
              {content.services.slice(1, 3).map((service, index) => (
                <div key={service.title} className={`space-y-3 ${index > 0 ? 'pt-6 border-t border-charcoal/10' : ''}`}>
                  <Badge>{service.category}</Badge>
                  <h3 className="text-xl font-garet font-bold text-charcoal">{service.title}</h3>
                  <p className="text-sm leading-relaxed font-garet text-charcoal/80">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Column 3: service[3] */}
            {content.services.slice(3, 4).map((service) => (
              <div key={service.title} className="space-y-3">
                <Badge>{service.category}</Badge>
                <h3 className="text-xl font-garet font-bold text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed font-garet text-charcoal/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
