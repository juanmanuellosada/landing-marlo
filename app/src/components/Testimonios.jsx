import { useRef, useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import content from '../content.json';

const Testimonios = () => {
  const { title, subtitle, images } = content.testimonios;
  const count = images.length;

  const trackRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // ── Scroll helpers ──
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.testimonios-card');
    const cardWidth = card ? card.offsetWidth + 16 : track.clientWidth;
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  // ── Lightbox ──
  const openLightbox = useCallback((i) => {
    setLightboxIndex(i);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    // Focus close button for accessibility
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  return (
    <>
      <section
        id="testimonios"
        aria-label="Testimonios de clientes"
        className="py-20 px-0 bg-black/10"
      >
        <div className="px-8 md:px-20 max-w-7xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-garet mb-3">{title}</h2>
          <p className="text-base md:text-lg text-white/80 font-garet">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior testimonio"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="testimonios-track flex overflow-x-auto scrollbar-hide gap-4 px-8 md:px-16"
          >
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver testimonio ${i + 1} ampliado`}
                onClick={() => openLightbox(i)}
                className="testimonios-card flex-none rounded-2xl border border-white/10 shadow-lg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white"
              >
                <img
                  src={src}
                  alt={`Testimonio de cliente ${i + 1}`}
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Siguiente testimonio"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonio ${lightboxIndex + 1} — vista ampliada`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar lightbox"
            onClick={closeLightbox}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
            tabIndex={-1}
          />

          {/* Image container */}
          <div className="relative flex items-center justify-center w-full max-w-sm">
            {/* Prev */}
            <button
              type="button"
              aria-label="Testimonio anterior"
              onClick={prevLightbox}
              className="absolute -left-4 sm:-left-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiChevronLeft size={22} />
            </button>

            {/* Screenshot */}
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20 w-full">
              <img
                src={images[lightboxIndex]}
                alt={`Testimonio de cliente ${lightboxIndex + 1}`}
                width={390}
                height={844}
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Next */}
            <button
              type="button"
              aria-label="Testimonio siguiente"
              onClick={nextLightbox}
              className="absolute -right-4 sm:-right-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiChevronRight size={22} />
            </button>

            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Cerrar"
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-20 w-10 h-10 rounded-full bg-white text-brand-orange shadow-xl flex items-center justify-center hover:scale-110 hover:rotate-90 transition-transform duration-300 ring-2 ring-brand-orange"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonios;
