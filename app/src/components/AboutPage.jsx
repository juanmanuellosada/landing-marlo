import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-surface-cream font-helvetica selection:bg-white selection:text-brand-orange overflow-x-hidden">
      <Navbar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-8 md:px-20 pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-charcoal/60 hover:text-charcoal text-sm font-bold uppercase tracking-wide transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
