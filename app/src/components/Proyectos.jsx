import { useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import content from '../content.json';
import Button from './ui/Button';
import Lightbox from './ui/Lightbox';
import SectionTitle from './ui/SectionTitle';

// Derives srcSet/sizes for a proyectos WebP path.
// Assumes variants: /images/proyectos/N-320.webp and N-640.webp exist.
const proyectoSrcSet = (src) => {
  const base = src.replace(/\.webp$/, '');
  return {
    srcSet: `${base}-320.webp 320w, ${base}-640.webp 640w, ${src} 1000w`,
    sizes: '(max-width: 640px) 120px, 150px',
  };
};

// Prefer reduced-motion check (static, evaluated once at module parse time is
// fine for Vite/React CSR — no SSR in this project).
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Proyectos = () => {
  const { title, subtitle, ctaText, ctaHref, logos } = content.proyectos;
  const logoCount = logos.length;

  // ── Pause state ──────────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false);

  // ── Lightbox state ───────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Animation pauses while hovered OR while lightbox is open.
  const isPaused = isHovered || lightboxIndex !== null;

  // ── Click vs. drag detection ─────────────────────────────────
  const dragStartX = useRef(0);
  const dragMoved = useRef(0);

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current = 0;
  };

  const onPointerMove = (e) => {
    if (!e.buttons) return;
    dragMoved.current = Math.abs(e.clientX - dragStartX.current);
  };

  // ── Lightbox helpers ──────────────────────────────────────────
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () =>
    setLightboxIndex((i) => (i - 1 + logoCount) % logoCount);
  const nextLightbox = () =>
    setLightboxIndex((i) => (i + 1) % logoCount);

  const onCardClick = (e, realIndex) => {
    if (dragMoved.current > 5) return;
    e.stopPropagation();
    openLightbox(realIndex);
  };

  // ── Card renderer (shared between both layout modes) ─────────
  const renderCard = (src, i, realIndex) => {
    const n = realIndex + 1;
    return (
      <div
        key={`${realIndex}-${i}`}
        className="flex-none rounded-2xl border border-white/10 shadow-lg overflow-hidden"
        style={{
          width: 'clamp(120px, 20vw, 150px)',
          aspectRatio: '1 / 1',
          cursor: 'zoom-in',
        }}
        onClick={(e) => onCardClick(e, realIndex)}
      >
        <img
          src={src}
          {...proyectoSrcSet(src)}
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
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <section
        id="proyectos"
        aria-label="Nuestros proyectos de diseño de logos"
        className="py-20 px-0 bg-brand-orange"
      >
        <SectionTitle title={title} subtitle={subtitle} theme="light" />

        {prefersReduced ? (
          // Reduced-motion: static scrollable row (no doubled logos, no clip).
          <div
            className="flex overflow-x-auto scrollbar-hide gap-4 px-8 md:px-16"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
          >
            {logos.map((src, i) => renderCard(src, i, i))}
          </div>
        ) : (
          // Continuous CSS marquee — clips horizontally so the infinite track
          // doesn't push page layout. py-3 gives shadow breathing room.
          <div
            className="overflow-x-hidden py-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex w-max animate-marquee gap-4 py-1"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
            >
              {[...logos, ...logos].map((src, i) =>
                renderCard(src, i, i % logoCount)
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-8 md:px-20 max-w-7xl mx-auto mt-10 text-center">
          <Button
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-agrandir"
          >
            {ctaText}
            <FiArrowRight size={18} />
          </Button>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
        ariaLabel={
          lightboxIndex !== null
            ? `Logo proyecto ${lightboxIndex + 1} — vista ampliada`
            : ''
        }
        prevLabel="Logo anterior"
        nextLabel="Logo siguiente"
        innerClassName="w-full max-w-2xl"
        animate
      >
        {lightboxIndex !== null && (
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
        )}
      </Lightbox>
    </>
  );
};

export default Proyectos;
