import Hero from './Hero';
import About from './About';
import Philosophy from './Philosophy';
import Services from './Services';
import WhyUs from './WhyUs';
import Strategies from './Strategies';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-brand-orange text-white font-helvetica selection:bg-white selection:text-brand-orange overflow-x-hidden relative'>
      {/* Background Logo */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img 
          src="./images/logo-m.png" 
          alt="" 
          className="w-[85%] h-[85%] object-contain opacity-10 drop-shadow-2xl mix-blend-overlay contrast-125 brightness-110" 
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Philosophy />
        <Services />
        <WhyUs />
        <Strategies />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
