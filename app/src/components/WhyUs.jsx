import content from '../content.json';
import Button from './ui/Button';

const WhyUs = () => {
  const { title, reasons, description, ctaText } = content.whyUs;

  return (
    <section className="py-20 px-8 md:px-20 bg-brand-orange text-white">
      <div className="max-w-5xl mx-auto font-garet">
        <h2 className="text-2xl md:text-3xl font-bold italic mb-12">{title}</h2>

        <div className="space-y-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="text-2xl">{reason.icon}</span>
              <p className="text-lg">{reason.text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-lg">
          {description.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" href="#contact" className="inline-block text-xl font-agrandir">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
