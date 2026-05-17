import content from '../content.json';

const KitsEditables = () => {
  const { title, subtitle, kits } = content.kitsEditables;

  return (
    <section className="py-16 px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-neulis text-4xl md:text-5xl font-black uppercase tracking-wide text-white mb-4">
            {title}
          </h2>
          <p className="text-white text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {kits.map((kit, index) => (
            <div key={index} className="group flex flex-col items-center">
              {/* Título del kit */}
              <h3 className="font-neulis text-xl md:text-2xl font-black tracking-wide text-white text-center mb-5">
                {kit.heading}
              </h3>

              {/* Tarjeta oscura con glow y animación al hover */}
              <div
                className="relative w-full rounded-2xl p-6 overflow-hidden transition-all duration-400 ease-out
                  group-hover:-translate-y-3 group-hover:scale-[1.025] group-hover:shadow-2xl"
                style={{ backgroundColor: '#371a09' }}
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
              <a
                href={kit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-6 py-3 text-sm font-bold uppercase tracking-wider rounded shadow-md hover:brightness-110 transition-all duration-200"
                style={{ backgroundColor: '#371a09', color: '#ffffff' }}
              >
                {kit.buttonLabel} ›
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsEditables;
