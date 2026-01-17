import content from '../content.json';

const WhyUs = () => {
  const { title, reasons, description, ctaText } = content.whyUs;

  return (
    <section className="py-20 px-8 md:px-20 bg-black/10">
      <div className="max-w-5xl mx-auto font-garet">
        <h2 className="text-2xl md:text-3xl font-bold italic mb-12">{title}</h2>
        
        <div className="space-y-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="text-2xl">{reason.icon}</span>
              <p className="text-lg">
                <span className="font-bold italic">{reason.title}:</span> {reason.text}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-lg">
          {description.map((text, index) => (
            <p key={index}>
              {text.split(/\*\*(.*?)\*\*/g).map((part, i) => 
                i % 2 === 1 ? <span key={i} className="font-bold italic">{part}</span> : part
              )}
            </p>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="inline-block bg-brand-orange border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-white hover:text-brand-orange transition-colors shadow-lg font-agrandir">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
