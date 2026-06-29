import Navbar from './Navbar';
import Hero from './Hero';
import CuponPopup from './CuponPopup';
// KitsEditables intentionally not rendered — its products are now in the Hero grid
import Philosophy from './Philosophy';
import Services from './Services';
import Proyectos from './Proyectos';
import Testimonios from './Testimonios';
import Strategies from './Strategies';
import Footer from './Footer';
import Marquee from './Marquee';

// Cross-page scroll (navigate '/' → scroll to a section) is driven directly from
// Navbar's click handler (scrollToSectionBounded), not from an effect here — that
// avoids React StrictMode double-invocation and router state-propagation timing bugs.

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-brand-orange font-helvetica selection:bg-white selection:text-brand-orange overflow-x-hidden relative'>
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img
          src="/images/logo-m.png"
          alt=""
          className="w-[85%] h-[85%] object-contain opacity-10 drop-shadow-2xl mix-blend-overlay contrast-125 brightness-110"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-14">
        <Navbar />
        <Hero />
        <Marquee text="KIT EMPRENDEDORES & FREELANCERS ✵" textClassName="text-sm" />
        <Philosophy />
        <Services />
        <Proyectos />
        <Testimonios />
        <Strategies />
        <Footer />
      </div>

      <CuponPopup />
    </div>
  );
};

export default LandingPage;
