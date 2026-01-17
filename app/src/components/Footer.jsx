import { FaWhatsapp } from 'react-icons/fa';
import content from '../content.json';

const Footer = () => {
  const { links } = content.footer;

  return (
    <footer id="contact" className="py-20 px-8 md:px-20 font-garet text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        {links.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-6 group hover:bg-white/10 p-4 rounded-xl transition-colors"
          >
            <div className="w-24 h-12 flex items-center justify-center">
              {link.icon === 'whatsapp' ? (
                <div className="text-4xl">
                  <FaWhatsapp />
                </div>
              ) : (
                <img 
                  src={link.image} 
                  alt="" 
                  className="w-full h-full object-contain brightness-0 invert" 
                />
              )}
            </div>
            <span className="font-bold text-sm md:text-base tracking-wider">{link.text}</span>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
