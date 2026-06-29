/**
 * Shared Badge — rounded pill for labels like "🔥 Más vendido".
 *
 * variant "default" — orange bg, white text  (for use on cream sections)
 * variant "dark"    — dark espresso bg, white text  (for use on orange sections)
 * variant "outline" — transparent bg, white border + text  (for use on orange sections)
 */
const VARIANTS = {
  default: 'bg-brand-orange text-white',
  dark: 'bg-brand-dark text-white',
  outline: 'border-2 border-white text-white',
  cream: 'bg-surface-cream text-charcoal',
};

export default function Badge({ children, className = '', variant = 'default' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold',
        VARIANTS[variant] ?? VARIANTS.default,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
