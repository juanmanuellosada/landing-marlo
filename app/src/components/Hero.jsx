import content from '../content.json';
import Badge from './ui/Badge';

const Hero = () => {
  const { headline, subtitle, tagline, products } = content.hero;

  return (
    <section className="bg-brand-orange py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Headline + Subtitle — scroll-spy anchor for INICIO */}
        <div id="top">
          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl font-black text-center leading-tight mb-4 text-charcoal">
            {headline.map((segment, i) =>
              segment.emphasis ? (
                <span key={i} className="text-white font-black">
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-center text-charcoal text-base md:text-lg max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
        </div>

        {/* Tagline + Product grid — scroll-spy anchor for KITS Y RECURSOS */}
        <div id="kits-recursos" className="scroll-mt-20">
          {/* Tagline */}
          <div className="flex justify-center mb-12">
            <span className="font-garet font-bold text-white text-base md:text-lg">
              {tagline}
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <a
              key={product.href}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Card */}
              <div className="relative w-full">
                {/* Badge — overlapping top of image */}
                {product.badge && (
                  <div className="absolute -top-3 left-3 z-10">
                    <Badge variant="cream" className="shadow-md text-xs">
                      {product.badge}
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <img
                  src={product.image}
                  srcSet={`${product.image.replace('.webp', '-480.webp')} 480w, ${product.image} 900w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-auto rounded-2xl shadow-md object-cover"
                />
              </div>

              {/* Title */}
              <p className="mt-3 text-center font-bold text-charcoal text-sm md:text-base group-hover:text-brand-orange transition-colors">
                {product.title}
              </p>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
