import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import content from '../content.json';
import { makeSectionClickHandler } from '../lib/sectionScroll';

// IDs in DOM order — used to resolve which section is active on the home page
const SECTION_IDS = ['top', 'kits-recursos', 'proyectos', 'testimonios'];

const Navbar = () => {
  const { nav } = content.hero;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#top');
  const intersecting = useRef(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  // Scroll-spy via IntersectionObserver — only runs on the home page
  useEffect(() => {
    if (!isHome) return;

    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.current.add(entry.target.id);
          } else {
            intersecting.current.delete(entry.target.id);
          }
        });
        // Prefer the lowest visible section (furthest down)
        const active = SECTION_IDS.findLast((id) => intersecting.current.has(id));
        if (active) setActiveSection('#' + active);
      },
      // Zone: just below the fixed navbar (56 px) to 20% of viewport height
      { rootMargin: '-56px 0px -80% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = () => setMenuOpen(false);

  const handleSectionClick = (e, href) => {
    makeSectionClickHandler(navigate, isHome)(e, href);
    closeMenu();
  };

  const getLinkIsActive = (link) => {
    if (link.href.startsWith('http')) return false;
    // On /about: highlight the ACERCA DE route link
    if (isAbout) return link.href === '/about';
    // On /: highlight the active section anchor
    return isHome && link.href.startsWith('#') && activeSection === link.href;
  };

  const renderLinkInner = (link, className) => {
    const isExternal = link.href.startsWith('http');
    const isSection = link.href.startsWith('#');

    if (isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {link.name}
        </a>
      );
    }
    if (isSection) {
      return (
        <a
          href={link.href}
          onClick={(e) => handleSectionClick(e, link.href)}
          className={className}
        >
          {link.name}
        </a>
      );
    }
    // Route link (e.g. /about)
    return (
      <Link to={link.href} onClick={closeMenu} className={className}>
        {link.name}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-brand-orange shadow-md">
      <nav className="relative max-w-7xl mx-auto px-6 py-2 flex items-center">
        {/* Logo — left */}
        <a
          href="#top"
          className="flex items-center hover:opacity-90 transition-opacity"
          onClick={(e) => handleSectionClick(e, '#top')}
        >
          <img src="/images/logo-marlo.webp" alt="marlo comunica" className="h-10 w-auto" />
        </a>

        {/* Desktop links — absolutely centered in the bar */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0 absolute left-1/2 -translate-x-1/2">
          {nav.map((link) => {
            const isActive = getLinkIsActive(link);
            const className = [
              'text-white text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80',
              isActive ? 'border-b-2 border-nav-active pb-0.5' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return <li key={link.name}>{renderLinkInner(link, className)}</li>;
          })}
        </ul>

        {/* Mobile hamburger — pushed to the right via ml-auto */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="ml-auto md:hidden flex flex-col gap-1.5 p-2 text-white"
        >
          <span
            className={[
              'block w-6 h-0.5 bg-white transition-transform duration-200',
              menuOpen ? 'translate-y-2 rotate-45' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-white transition-opacity duration-200',
              menuOpen ? 'opacity-0' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-white transition-transform duration-200',
              menuOpen ? '-translate-y-2 -rotate-45' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden bg-brand-orange border-t border-white/20 list-none m-0 p-0 pb-4"
        >
          {nav.map((link) => {
            const isActive = getLinkIsActive(link);
            const className = [
              'block px-6 py-3 text-white text-sm font-bold uppercase tracking-wide hover:bg-white/10 transition-colors',
              isActive ? 'border-l-4 border-nav-active' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return <li key={link.name}>{renderLinkInner(link, className)}</li>;
          })}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
