const Philosophy = () => {
  return (
    <section className="py-20 px-8 md:px-20 bg-white/5">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="bg-brand-orange border-2 border-white p-4 text-center rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold font-neulis">En nuestro estudio, tenemos un enfoque diferente</h3>
        </div>
        
        <div className="space-y-8 text-lg font-garet">
          <p>
            En un mundo donde todo parece ir demasiado rápido, trabajamos con <span className="font-bold italic">Slow Marketing Method</span>, invitandote a hacer las cosas de manera diferente.
          </p>
          <p>
            En lugar de perseguir métricas vacías y resultados efímeros, creamos estrategias de redes sociales que generan conexiones genuinas, engagement real y crecimiento sostenible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-xl text-center font-garet">
          <div className="p-4 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">+Calma</div>
          <div className="p-4 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">-Estrés</div>
          <div className="p-4 border border-white/30 rounded-lg hover:bg-white/10 transition-colors">+Resultados</div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
