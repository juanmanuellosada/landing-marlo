import content from '../content.json';
import Badge from './ui/Badge';
import Button from './ui/Button';

const KIT_BADGES = ['🔥 Más vendido', '⭐️ Más popular'];

const KitsEditables = () => {
  const { title, subtitle, kits } = content.kitsEditables;

  return (
    <section className="py-16 px-8 md:px-20 bg-brand-orange text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-garet text-4xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            {title}
          </h2>
          <p className="text-white/80 text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {kits.map((kit, index) => (
            <div key={index} className="group flex flex-col items-center">
              {/* Badge + kit heading */}
              <Badge variant="dark" className="mb-3">
                {KIT_BADGES[index] ?? '✨ Kit'}
              </Badge>
              <h3 className="font-garet text-xl md:text-2xl font-black tracking-wide text-white text-center mb-5">
                {kit.heading}
              </h3>

              {/* Card with glow */}
              <div
                className="relative w-full rounded-2xl p-6 overflow-hidden transition-all duration-400 ease-out
                  group-hover:-translate-y-3 group-hover:scale-[1.025] group-hover:shadow-2xl bg-brand-dark"
              >
                {/* Glow difuso de fondo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 60%, rgba(250,92,4,0.18) 0%, transparent 70%)',
                    filter: 'blur(18px)',
                  }}
                />
                <img
                  src={kit.image}
                  alt={kit.alt}
                  loading="lazy"
                  className="relative w-full h-auto object-contain"
                />
              </div>

              {/* CTA */}
              <Button
                href={kit.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                className="mt-4 text-sm uppercase"
              >
                {kit.buttonLabel} ›
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsEditables;
