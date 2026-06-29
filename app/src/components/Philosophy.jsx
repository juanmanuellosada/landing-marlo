import content from '../content.json';
import Badge from './ui/Badge';

const Philosophy = () => {
  const { mainTitle, intro, description, highlights } = content.philosophy;

  return (
    <section className="py-20 px-8 md:px-20 bg-brand-orange text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title card: dark box on orange for strong contrast */}
        <div className="bg-brand-dark p-6 text-center rounded-2xl shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold font-garet">{mainTitle}</h3>
        </div>

        <div className="space-y-4 text-lg font-garet text-white/90">
          <p>{intro}</p>
          <p>{description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {highlights.map((highlight, index) => (
            <Badge key={index} variant="outline" className="text-base px-5 py-2">
              {highlight}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
