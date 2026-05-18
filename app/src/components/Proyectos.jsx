import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiX } from 'react-icons/fi';
import content from '../content.json';

const SPEED = 0.4; // px per frame — tune for calm drift
const RESUME_DELAY = 1200; // ms before autoplay resumes after interaction

const Proyectos = () => {
  const { title, subtitle, ctaText, ctaHref, logos } = content.proyectos;
  const logoCount = logos.length;

  // Doubled list for seamless looping
  const doubledLogos = [...logos, ...logos];

  const trackRef = useRef(null);

  // ── Pagination state (based on original logos, not doubled) ──
  const [activeDot, setActiveDot] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── Drag state ──
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const dragMoved = useRef(0); // total px moved — for click-vs-drag detection

  // ── Autoplay pause signals ──
  const isHovered = useRef(false);
  const isDraggingRef = useRef(false);
  const isFocused = useRef(false);
  const isLightboxOpen = useRef(false);
  const resumeTimer = useRef(null);

  // ── Lightbox state ──
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  // ── prefers-reduced-motion ──
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ────────────────────────────────────────────────────────────
  // Autoplay engine — defined entirely inside useEffect so no
  // ref is mutated during render; reads pause state via refs.
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReduced) return;

    let id;
    const tick = () => {
      const track = trackRef.current;
      if (track) {
        const paused =
          isHovered.current ||
          isDraggingRef.current ||
          isFocused.current ||
          isLightboxOpen.current;

        if (!paused) {
          track.scrollLeft += SPEED;
          const halfWidth = track.scrollWidth / 2;
          if (track.scrollLeft >= halfWidth) {
            track.scrollLeft -= halfWidth;
          }
        }
      }
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [prefersReduced]);

  // ────────────────────────────────────────────────────────────
  // Pagination — computed from the original (non-doubled) portion
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updatePages = () => {
      // scrollWidth is doubled; we only care about the first half
      const singleWidth = track.scrollWidth / 2;
      setTotalPages(Math.max(1, Math.ceil(singleWidth / track.clientWidth)));
    };

    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const singleWidth = track.scrollWidth / 2;
      // Normalise scrollLeft to within the first copy
      const pos = track.scrollLeft % singleWidth;
      setActiveDot(Math.round(pos / track.clientWidth) % Math.max(1, Math.ceil(singleWidth / track.clientWidth)));
    };

    const raf = requestAnimationFrame(updatePages);
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(updatePages);
    ro.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  // ────────────────────────────────────────────────────────────
  // Manual scroll helpers
  // ────────────────────────────────────────────────────────────
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, RESUME_DELAY);
  };

  const scrollByPage = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
    scheduleResume();
  };

  const scrollToPage = (index) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    // stay within first copy
    const singleWidth = track.scrollWidth / 2;
    const pageWidth = track.clientWidth;
    const target = Math.min(index * pageWidth, singleWidth - pageWidth);
    track.scrollTo({ left: target, behavior: 'smooth' });
    scheduleResume();
  };

  // ────────────────────────────────────────────────────────────
  // Pointer drag-to-scroll (also tracks movement for click detection)
  // ────────────────────────────────────────────────────────────
  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(false);
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = track.scrollLeft;
    dragMoved.current = 0;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const onPointerMove = (e) => {
    const track = trackRef.current;
    if (!track || !e.buttons) return;
    const delta = e.clientX - dragStartX.current;
    dragMoved.current = Math.abs(delta);
    if (dragMoved.current > 4) setIsDragging(true);
    track.scrollLeft = dragScrollLeft.current - delta;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    scheduleResume();
  };

  // ────────────────────────────────────────────────────────────
  // Hover / focus pause
  // ────────────────────────────────────────────────────────────
  const onMouseEnter = () => { isHovered.current = true; };
  const onMouseLeave = () => { isHovered.current = false; };
  const onFocus = () => { isFocused.current = true; };
  const onBlur = (e) => {
    // only clear if focus leaves the carousel entirely
    const track = trackRef.current;
    if (track && track.contains(e.relatedTarget)) return;
    isFocused.current = false;
  };

  // ────────────────────────────────────────────────────────────
  // Click → open lightbox (only if not a drag)
  // ────────────────────────────────────────────────────────────
  const onCardClick = (e, realIndex) => {
    // dragMoved threshold: 5px
    if (dragMoved.current > 5) return;
    e.stopPropagation();
    openLightbox(realIndex);
  };

  // ────────────────────────────────────────────────────────────
  // Lightbox controls
  // ────────────────────────────────────────────────────────────
  const openLightbox = (index) => {
    setLightboxIndex(index);
    isLightboxOpen.current = true;
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    isLightboxOpen.current = false;
  };

  const prevLightbox = () => {
    setLightboxIndex((i) => (i - 1 + logoCount) % logoCount);
  };

  const nextLightbox = () => {
    setLightboxIndex((i) => (i + 1) % logoCount);
  };

  // Lightbox keyboard + body-scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        isLightboxOpen.current = false;
      }
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + logoCount) % logoCount);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % logoCount);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, logoCount]);

  // ────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────
  return (
    <>
      <section
        id="proyectos"
        aria-label="Nuestros proyectos de diseño de logos"
        className="py-20 px-0"
      >
        {/* Heading */}
        <div className="px-8 md:px-20 max-w-7xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-garet mb-3">{title}</h2>
          <p className="text-base md:text-lg text-white/80 font-garet">{subtitle}</p>
        </div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Prev arrow */}
          <button
            onClick={() => scrollByPage(-1)}
            aria-label="Anterior"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-8 md:px-16"
            style={{
              scrollSnapType: 'none', // snap conflicts with smooth autoplay
              WebkitOverflowScrolling: 'touch',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {doubledLogos.map((src, i) => {
              const realIndex = i % logoCount;
              const n = realIndex + 1;
              return (
                <div
                  key={`${realIndex}-${i}`}
                  className="flex-none rounded-2xl border border-white/10 shadow-lg overflow-hidden"
                  style={{
                    width: 'clamp(240px, calc(87vw - 2rem), 320px)',
                    aspectRatio: '1 / 1',
                    cursor: 'zoom-in',
                  }}
                  onClick={(e) => onCardClick(e, realIndex)}
                >
                  <img
                    src={src}
                    alt={`Logo diseñado por Marlo — proyecto ${n}`}
                    width={1000}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => scrollByPage(1)}
            aria-label="Siguiente"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Páginas del carrusel">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeDot === i}
              aria-label={`Página ${i + 1}`}
              onClick={() => scrollToPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                activeDot === i ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="px-8 md:px-20 max-w-7xl mx-auto mt-10 text-center">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white rounded-lg py-3 px-6 font-bold tracking-wider font-agrandir hover:bg-white hover:text-brand-orange transition-all duration-300"
          >
            {ctaText}
            <FiArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Logo proyecto ${lightboxIndex + 1} — vista ampliada`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-lightbox-overlay-in"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar lightbox"
            onClick={closeLightbox}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
          />

          {/* Image container */}
          <div className="relative flex items-center justify-center w-full max-w-2xl animate-lightbox-in">
            {/* Prev */}
            <button
              type="button"
              aria-label="Logo anterior"
              onClick={prevLightbox}
              className="absolute -left-4 sm:-left-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiChevronLeft size={22} />
            </button>

            {/* Logo */}
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20 w-full">
              <img
                src={logos[lightboxIndex]}
                alt={`Logo diseñado por Marlo — proyecto ${lightboxIndex + 1}`}
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Next */}
            <button
              type="button"
              aria-label="Logo siguiente"
              onClick={nextLightbox}
              className="absolute -right-4 sm:-right-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiChevronRight size={22} />
            </button>

            {/* Close */}
            <button
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

export default Proyectos;
