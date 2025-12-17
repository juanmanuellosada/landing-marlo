const Strategies = () => {
  const strategies = [
    {
      content: (
        <>
          <span className="font-bold italic">Creación de contenido atractivo y relevante:</span> Se desarrollará un calendario de contenidos editorial de publicaciones semanales en Instagram y facebook o Tiktok. Incluida la redacción y <span className="font-bold">diseño profesional</span>.
        </>
      )
    },
    {
      content: (
        <>
          Gestión activa de las comunidades: Se responderá a comentarios y <span className="font-bold italic">se fomentará la interacción</span> entre los miembros de la comunidad con dinámicas interactivas.
        </>
      )
    },
    {
      content: (
        <>
          Implementación de campañas de <span className="font-bold italic">publicidad</span> en redes sociales o <span className="font-bold italic">colaboraciones</span>: Se crearán y gestionarán campañas publicitarias o colaboraciones para <span className="font-bold italic">atraer nuevos seguidores y aumentar el alcance</span> de las publicaciones.
        </>
      )
    }
  ];

  return (
    <section className="py-20 px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <h2 className="bg-brand-orange text-white border-2 border-white py-2 px-12 rounded-lg text-3xl font-neulis shadow-md">
            Estrategias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white text-black p-8 rounded-lg shadow-xl hover:transform hover:-translate-y-2 transition-transform duration-300 font-garet">
              <p className="text-lg leading-relaxed">
                {strategy.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strategies;
