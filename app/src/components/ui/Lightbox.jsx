import { useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

/**
 * Shared Lightbox — backdrop + prev/next/close buttons + keyboard handler +
 * body-scroll lock.  Pass the image (or any content) as children.
 *
 * Props:
 *   isOpen                    — whether the lightbox is visible
 *   onClose / onPrev / onNext — control callbacks
 *   ariaLabel                 — accessible label for the dialog
 *   prevLabel / nextLabel     — aria-labels for nav buttons
 *   innerClassName            — extra classes on the content container
 *                               (e.g. "w-full max-w-2xl" for full-width images)
 *   animate                   — apply animate-lightbox-overlay-in to the wrapper (default true)
 *   children                  — the image slot
 */
export default function Lightbox({
  isOpen,
  onClose,
  onPrev,
  onNext,
  ariaLabel,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  innerClassName = '',
  animate = true,
  children,
}) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const wrapperClass = [
    'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8',
    animate ? 'animate-lightbox-overlay-in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const innerClass = [
    'relative flex items-center justify-center animate-lightbox-in',
    innerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="dialog" aria-modal="true" aria-label={ariaLabel} className={wrapperClass}>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar lightbox"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
      />

      {/* Content container */}
      <div className={innerClass}>
        {/* Prev */}
        <button
          type="button"
          aria-label={prevLabel}
          onClick={onPrev}
          className="absolute -left-4 sm:-left-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FiChevronLeft size={22} />
        </button>

        {children}

        {/* Next */}
        <button
          type="button"
          aria-label={nextLabel}
          onClick={onNext}
          className="absolute -right-4 sm:-right-14 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <FiChevronRight size={22} />
        </button>

        {/* Close */}
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-20 w-10 h-10 rounded-full bg-white text-brand-orange shadow-xl flex items-center justify-center hover:scale-110 hover:rotate-90 transition-transform duration-300 ring-2 ring-brand-orange"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}
