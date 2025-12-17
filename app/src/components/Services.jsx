const Services = () => {
  return (
    <section className="py-20 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-neulis font-bold text-center min-h-[64px] flex items-center justify-center">BRANDING & IDENTIDAD VISUAL</h3>
          <p className="text-sm leading-relaxed font-garet">
            El branding es la experiencia que queres hacer vivir a todo aquel que llega hasta tu proyecto. Es el responsable de conseguir la conexión emocional entre el cliente y la marca.
            Nos encargamos de construir tu marca desde cero, definir el cliente ideal, su personalidad, y lo que busca transmitir.
            Es la esencia de tu marca, lo no tangible.
            <br/><br/>
            Trabajamos la identidad visual sobre eso, que será la forma en lo que todo eso se refleje.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-neulis font-bold text-center min-h-[64px] flex items-center justify-center">DISEÑO GRÁFICO & PIEZAS DIGITALES</h3>
          <p className="text-sm leading-relaxed font-garet">
            Nos encargamos de diseñar piezas para tu marca, desde el logo o identidad visual, hasta la papelería o flyers para redes sociales.
          </p>
          
          <div className="pt-8">
            <h3 className="text-2xl font-neulis font-bold text-center mb-4">ADS MANAGER | PUBLICIDAD EN INSTAGRAM & FACEBOOK ADS</h3>
            <p className="text-sm leading-relaxed font-garet">
              Si buscas una forma de aumentar la visibilidad y atraer nuevos clientes en tu negocio, el servicio de gestión en MetaAds busca alcanzar tus objetivos.
              Creamos campañas publicitarias en redes sociales con el fin de promocionar tus productos o servicios.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-neulis font-bold text-center min-h-[64px] flex items-center justify-center">GESTIÓN DE REDES | COMMUNITY SOCIAL MEDIA MANAGEMENT</h3>
          <p className="text-sm leading-relaxed font-garet">
            Si te cuesta mantener una presencia constante en redes sociales, este servicio es para vos.
            Nos basamos en la gestión estrategica de tu cuenta, desde lo interno hasta el diseño y publicación de las piezas.
            El objetivo es aumentar la visibilidad, la interaccion y fidelidad de tus seguidores y clientes.
            Nuestro servicio integral incluye análisis de tu marca, cliente ideal, redacción, diseño y publicación del contenido. Nos especializamos en Instagram, Facebook, y Tiktok, para conectar organicamente con tu público.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
