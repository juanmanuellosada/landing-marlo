import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="py-20 px-8 md:px-20 font-garet text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <a href="#" className="flex items-center gap-6 group hover:bg-white/10 p-4 rounded-xl transition-colors">
          <div className="w-24 h-12 flex items-center justify-center">
            <img src="/images/tiendanube.png" alt="Tiendanube" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="font-bold text-sm md:text-base tracking-wider">USÁ MI LINK DE AFILIADO PARA UN 25%OFF EN TU PRIMER MES</span>
        </a>

        <a href="#" className="flex items-center gap-6 group hover:bg-white/10 p-4 rounded-xl transition-colors">
          <div className="w-24 h-12 flex items-center justify-center">
             <img src="/images/canva-logo.avif" alt="Canva" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="font-bold text-sm md:text-base tracking-wider">APRENDE A DISENAR CON CANVA HACIENDO CLICK ACA</span>
        </a>

        <a href="https://wa.me/5491136178552" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:bg-white/10 p-4 rounded-xl transition-colors">
          <div className="w-12 h-12 flex items-center justify-center text-4xl">
            <FaWhatsapp />
          </div>
          <span className="font-bold text-sm md:text-base tracking-wider">RECIBI ASESORAMIENTO PERSONALIZADO</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
