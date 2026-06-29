/**
 * Shared Button — renders as <a> when href is provided, <button> otherwise.
 *
 * variant "outline" — white border on orange (default CTA style for orange sections)
 * variant "filled"  — solid orange background with white border (for non-orange contexts)
 * variant "dark"    — dark espresso bg, white text (for buttons on orange sections)
 * variant "primary" — solid orange bg, no border (for buttons on cream sections)
 */
const VARIANTS = {
  outline:
    'border-2 border-white rounded-lg py-3 px-6 font-bold tracking-wider hover:bg-white hover:text-brand-orange transition-all duration-300',
  filled:
    'bg-brand-orange border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-colors shadow-lg',
  dark:
    'bg-brand-dark text-white font-bold py-3 px-6 rounded-lg hover:brightness-110 transition-all shadow-md tracking-wider',
  primary:
    'bg-brand-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors shadow-md tracking-wider',
};

export default function Button({ variant = 'outline', href, children, className = '', ...props }) {
  const classes = [VARIANTS[variant], className].filter(Boolean).join(' ');
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
