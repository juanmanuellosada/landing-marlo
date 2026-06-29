import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import content from '../content.json';
import SectionTitle from './ui/SectionTitle';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Splits quote around the first occurrence of highlight for bold rendering. */
function QuoteText({ quote, highlight }) {
  if (!highlight || !quote.includes(highlight)) {
    return <span>{quote}</span>;
  }
  const idx = quote.indexOf(highlight);
  const before = quote.slice(0, idx);
  const after = quote.slice(idx + highlight.length);
  return (
    <>
      <span>{before}</span>
      <span className="font-extrabold">{highlight}</span>
      <span>{after}</span>
    </>
  );
}

/** Filled star icon. */
function StarIcon() {
  return (
    <svg
      className="w-4 h-4 fill-[var(--color-brand-orange)]"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  );
}

/** Single testimonial card. */
function TestimonialCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-charcoal)]/10 shadow-md p-6 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${item.stars} estrellas`}>
        {Array.from({ length: item.stars || 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--color-charcoal)] text-sm md:text-base leading-relaxed">
        &ldquo;<QuoteText quote={item.quote} highlight={item.highlight} />&rdquo;
      </p>

      {/* Badge pill */}
      <span className="inline-block self-start bg-[#fdf0e0] text-[var(--color-charcoal)] text-xs px-3 py-1.5 rounded-full">
        {item.badge}
      </span>

      {/* Divider */}
      <hr className="border-[var(--color-charcoal)]/10" />

      {/* Author */}
      <div>
        <p className="font-bold text-[var(--color-charcoal)] text-sm">{item.name}</p>
        {item.handle && (
          <a
            href={`https://instagram.com/${item.handle.replace(/^@/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-brand-orange)] text-sm hover:underline"
          >
            {item.handle}
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const Testimonios = () => {
  const { title, subtitle, items } = content.testimonios;

  // Detect whether we are on mobile (< 768 px) to control items per page.
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e) => {
      setIsMobile(!e.matches);
      setPage(0); // reset to first page whenever the breakpoint crosses
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const perPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(items.length / perPage);

  // Clamp page when perPage changes (e.g. resize from desktop→mobile could
  // leave page beyond the new totalPages).
  const safePage = Math.min(page, totalPages - 1);

  const currentItems = items.slice(safePage * perPage, safePage * perPage + perPage);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const pageLabel = String(safePage + 1).padStart(2, '0');
  const totalLabel = String(totalPages).padStart(2, '0');

  return (
    <section
      id="testimonios"
      aria-label="Testimonios de clientes"
      className="py-20 px-0 bg-surface-cream"
    >
      <SectionTitle title={title} subtitle={subtitle} theme="dark" />

      <div className="px-8 md:px-16 max-w-7xl mx-auto">
        {/* Card grid — always 2 columns on md+, fills left-to-right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((item, i) => (
            <TestimonialCard key={safePage * perPage + i} item={item} />
          ))}
        </div>

        {/* Pagination row */}
        <div className="flex items-center justify-between mt-8">
          <span
            className="text-[var(--color-charcoal)]/60 font-bold text-sm tabular-nums"
            aria-label={`Página ${safePage + 1} de ${totalPages}`}
          >
            {pageLabel}/{totalLabel}
          </span>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={safePage === 0}
              aria-label="Testimonios anteriores"
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-surface-cream)] transition-all duration-300 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={safePage === totalPages - 1}
              aria-label="Siguientes testimonios"
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-surface-cream)] transition-all duration-300 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-[var(--color-charcoal)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
