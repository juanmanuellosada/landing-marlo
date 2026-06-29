import content from '../content.json';
import Badge from './ui/Badge';

const About = () => {
  const { title, description, subtitle, content: aboutContent } = content.about;

  return (
    <section id="about" className="py-20 px-8 md:px-20 bg-surface-cream text-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 font-sans">
        <div className="flex-1 space-y-6 text-lg md:text-xl leading-relaxed">
          <Badge className="mb-2">✨ Sobre Mí</Badge>
          <h2 className="text-3xl font-garet font-bold text-charcoal">{title}</h2>
          <p className="text-charcoal/90">{description}</p>
          <p className="font-bold italic text-2xl text-charcoal">{subtitle}</p>
          <p className="text-charcoal/90">{aboutContent}</p>
        </div>
        <div className="flex-1">
          <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500">
            <img
              src="/images/foto-camara.webp"
              srcSet="/images/foto-camara-480.webp 480w, /images/foto-camara-960.webp 960w, /images/foto-camara.webp 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Mariana Losada trabajando"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
