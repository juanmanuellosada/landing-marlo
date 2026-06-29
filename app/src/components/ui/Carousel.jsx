import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Shared Carousel shell — relative container + prev/next arrow buttons.
 * The scroll track (and any autoplay/drag logic) lives in children.
 *
 * Props:
 *   onPrev / onNext        — called when arrow buttons are clicked
 *   prevLabel / nextLabel  — accessible button labels (default: "Anterior" / "Siguiente")
 *   onMouseEnter / onMouseLeave — optional hover handlers (e.g. for autoplay pause)
 *   theme                  — "light" (default, white arrows for orange sections)
 *                            "dark" (charcoal arrows for cream sections)
 */
export default function Carousel({
  onPrev,
  onNext,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  onMouseEnter,
  onMouseLeave,
  theme = 'light',
  children,
}) {
  const btnBase =
    'hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2';
  const btnTheme =
    theme === 'dark'
      ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-surface-cream focus:ring-charcoal'
      : 'border-white text-white hover:bg-white hover:text-brand-orange focus:ring-white';

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={onPrev}
        aria-label={prevLabel}
        className={`${btnBase} ${btnTheme} left-2`}
      >
        <FiChevronLeft size={20} />
      </button>

      {children}

      <button
        onClick={onNext}
        aria-label={nextLabel}
        className={`${btnBase} ${btnTheme} right-2`}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}
