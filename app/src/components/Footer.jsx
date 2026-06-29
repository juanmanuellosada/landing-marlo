import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok, FaPinterestP } from 'react-icons/fa';
import content from '../content.json';
import { makeSectionClickHandler } from '../lib/sectionScroll';

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  pinterest: FaPinterestP,
};

// Partition products by column
const RECURSOS_TITLES = new Set([
  'Tu estrategia digital en 5 pasos',
  'Kit de plantillas para freelancers',
  'Ebook: Canva para emprendedores',
  'Ebook consejos y tecnicas de marketing',
]);

const ESTRATEGIA_TITLES = new Set([
  'Calendario de contenidos',
  'Analisis de perfil en redes sociales',
]);

const COL_HEADING = 'text-xs font-extrabold uppercase tracking-widest text-white/60 mb-4';
const LINK_CLASS = 'text-sm text-white/90 hover:text-white hover:underline transition-colors leading-snug';
const NAV_LINK_CLASS = 'text-sm font-extrabold uppercase tracking-wide text-white/90 hover:text-white hover:underline transition-colors';

const Footer = () => {
  const { links } = content.footer;
  const { socialMedia, products, nav } = content.hero;

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const handleSectionClick = makeSectionClickHandler(navigate, isHome);

  const recursos = products.filter((p) => RECURSOS_TITLES.has(p.title));
  const estrategia = products.filter((p) => ESTRATEGIA_TITLES.has(p.title));

  return (
    <footer id="contact" className="bg-brand-orange text-white font-sans">
      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* LEFT BLOCK: Logo + social */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <a
              href="#top"
              onClick={(e) => handleSectionClick(e, '#top')}
              className="inline-block hover:opacity-90 transition-opacity w-fit"
            >
              <img src="/images/logo-marlo.webp" alt="marlo comunica" className="h-12 w-auto" />
            </a>
            <div>
              <p className={COL_HEADING}>Seguinos</p>
              <div className="flex gap-4 text-xl">
                {Object.entries(socialMedia).map(([network, url]) => {
                  const Icon = SOCIAL_ICONS[network];
                  return Icon ? (
                    <a
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={network}
                      className="hover:text-white/70 transition-colors"
                    >
                      <Icon />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* RECURSOS */}
          <div>
            <h3 className={COL_HEADING}>Recursos</h3>
            <ul className="space-y-3">
              {recursos.map((p) => (
                <li key={p.title}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ESTRATEGIA */}
          <div>
            <h3 className={COL_HEADING}>Estrategia</h3>
            <ul className="space-y-3">
              {estrategia.map((p) => (
                <li key={p.title}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVEGACIÓN */}
          <div>
            <h3 className={COL_HEADING}>Navegación</h3>
            <ul className="space-y-3">
              {nav.map((link) => {
                const isSection = link.href.startsWith('#');
                const isExternal = link.href.startsWith('http');

                if (isExternal) {
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={NAV_LINK_CLASS}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                }
                if (isSection) {
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href)}
                        className={NAV_LINK_CLASS}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                }
                // Route link (e.g. /about)
                return (
                  <li key={link.name}>
                    <Link to={link.href} className={NAV_LINK_CLASS}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h3 className={COL_HEADING}>Contacto</h3>
            <ul className="space-y-5">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group hover:opacity-80 transition-opacity"
                  >
                    <div className="flex-shrink-0 w-8 h-6 flex items-center justify-center mt-0.5">
                      {link.icon === 'whatsapp' ? (
                        <FaWhatsapp className="text-xl" />
                      ) : (
                        <img
                          src={link.image}
                          alt=""
                          className="w-full h-full object-contain brightness-0 invert"
                        />
                      )}
                    </div>
                    <span className="text-sm text-white/90 group-hover:text-white transition-colors leading-snug">
                      {link.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <p className="max-w-7xl mx-auto px-6 md:px-10 py-5 text-center text-xs text-white/60">
          © 2026 Marlo comunica · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
