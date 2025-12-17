const WhyUs = () => {
  const reasons = [
    { icon: "✅", title: "Autenticidad", text: "Contamos tu historia de manera natural, sin caer en tácticas invasivas." },
    { icon: "🔒", title: "Compromiso real", text: "Priorizamos la comunidad sobre los números, fomentando interacciones valiosas." },
    { icon: "😎", title: "Estrategia a largo plazo", text: "No buscamos viralidad momentánea, sino un crecimiento sólido y duradero." },
    { icon: "✅", title: "Menos estrés, más resultados", text: "Te sacamos del estres y ansiedad de las redes, nosotros nos encargamos de gestionar tu presencia digital con coherencia y tranquilidad." },
  ];

  return (
    <section className="py-20 px-8 md:px-20 bg-black/10">
      <div className="max-w-5xl mx-auto font-garet">
        <h2 className="text-2xl md:text-3xl font-bold italic mb-12">¿Por qué elegir Slow Marketing para tu marca?</h2>
        
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
          <p>Si queres que tu marca <span className="font-bold italic">crezca de forma auténtica y sostenible</span>, hablemos. <span className="font-bold italic">Contanos sobre tu marca o negocio.</span></p>
          <p>Podemos personalizar la propuesta para que tu estrategia y contenidos sean únicos.</p>
          <p>Te ayudamos a crear una estrategia de redes alineada con tu esencia y objetivos.</p>
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="inline-block bg-brand-orange border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-white hover:text-brand-orange transition-colors shadow-lg font-agrandir">
            Si estas listo para despegar en redes de forma diferente, contactanos!
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
