import { FaInstagram, FaFacebookF, FaTiktok, FaPinterestP } from 'react-icons/fa';
import content from '../content.json';

const Hero = () => {
  const { name, role, links, socialMedia } = content.hero;

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-20 gap-10 md:gap-20 relative overflow-hidden font-garet">
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-xl relative">
          <img src="./images/foto-perfil.jpg" alt="Mariana Losada" className="w-full h-full object-cover object-center scale-110" />
        </div>
        <div className="flex gap-6 text-2xl">
          <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors"><FaInstagram /></a>
          <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors"><FaFacebookF /></a>
          <a href={socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors"><FaTiktok /></a>
          <a href={socialMedia.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors"><FaPinterestP /></a>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start gap-8 z-10 w-full max-w-md">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl mb-2">{name}</h1>
          <p className="text-sm tracking-widest uppercase">{role}</p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className="border-2 border-white rounded-lg py-3 px-6 text-center font-bold tracking-wider hover:bg-white hover:text-brand-orange transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
