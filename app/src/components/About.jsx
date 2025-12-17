const About = () => {
  return (
    <section id="about" className="py-20 px-8 md:px-20 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto font-sans">
      <div className="flex-1 space-y-6 text-lg md:text-xl leading-relaxed">
        <h2 className="text-3xl mb-6">Mariana Losada, 29 años</h2>
        <p>
          Especialista en marketing digital, slow marketing, community management y trabajo estratégico en redes sociales.
        </p>
        <p className="font-bold italic text-2xl">
          Combino experiencia en gestión de redes, creación de contenido y campañas publicitarias (Ads) para potenciar marcas de manera auténtica y sostenible.
        </p>
        <p>
          Trabajo de forma 100% personalizada en cada negocio, entendiendo sus objetivos para diseñar estrategias a medida, con una mirada fresca, visual y orientada a resultados.
        </p>
      </div>
      <div className="flex-1">
        <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500">
          <img src="./images/foto-camara.jpg" alt="Workspace" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </div>
    </section>
  );
};

export default About;
