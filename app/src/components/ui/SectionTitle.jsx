/**
 * Shared SectionTitle — heading + optional subtitle with the standard
 * section padding/max-width used by Proyectos, Testimonios, etc.
 *
 * theme "light" (default) — white text, for orange section backgrounds
 * theme "dark"            — charcoal text, for cream section backgrounds
 */
export default function SectionTitle({ title, subtitle, className = '', theme = 'light' }) {
  const titleColor = theme === 'dark' ? 'text-charcoal' : 'text-white';
  const subtitleColor = theme === 'dark' ? 'text-charcoal/70' : 'text-white/80';

  return (
    <div className={['px-8 md:px-20 max-w-7xl mx-auto mb-10', className].filter(Boolean).join(' ')}>
      <h2 className={`text-3xl md:text-4xl font-bold font-garet mb-3 ${titleColor}`}>{title}</h2>
      {subtitle && (
        <p className={`text-base md:text-lg font-garet ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
