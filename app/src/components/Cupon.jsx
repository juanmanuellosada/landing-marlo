import content from '../content.json';

export const CuponCard = ({ cupon, size = 'banner' }) => {
  const {
    ribbon = '40% OFF',
    couponLine = 'USA EL CUPON #MARLOSALE',
    subtitle = 'ES TU MOMENTO PARA MEJORAR TU MARCA',
    badgeDiscount = '-40%',
    badgeText = 'DE DESCUENTO EN CUALQUIER KIT',
    bgImage = './images/cupon-bg.jpg',
  } = cupon;

  const isPopup = size === 'popup';

  return (
    <>
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Warm overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(60,30,10,0.78) 0%, rgba(120,55,20,0.65) 60%, rgba(180,80,25,0.55) 100%)',
        }}
      />

      {/* Diagonal ribbon - top left with shine */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-[18px] sm:top-[22px] -left-[40px] sm:-left-[44px] w-[180px] sm:w-[210px] bg-brand-orange text-white text-center py-1.5 sm:py-2 -rotate-45 shadow-lg overflow-hidden">
          <span className="relative z-10 font-bold tracking-wider text-sm sm:text-base">{ribbon}</span>
          <span className="absolute inset-0 -translate-x-full animate-cupon-shine bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-4 items-center ${
          isPopup
            ? 'px-6 sm:px-10 py-10 sm:py-12 pb-14'
            : 'px-6 sm:px-10 md:px-16 py-12 md:py-16 pb-16 md:pb-20'
        }`}
      >
        {/* Left text */}
        <div className={`text-white ${isPopup ? 'pl-2 sm:pl-4' : 'pl-2 sm:pl-6 md:pl-12'}`}>
          <h2
            className={`font-sans font-black leading-[0.9] tracking-tight drop-shadow-lg ${
              isPopup
                ? 'text-5xl sm:text-6xl'
                : 'text-6xl sm:text-7xl md:text-8xl'
            }`}
          >
            HOT
            <br />
            SALE
          </h2>
          <p
            className={`font-sans font-bold tracking-wide ${
              isPopup
                ? 'mt-3 text-lg sm:text-xl'
                : 'mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl'
            }`}
          >
            {couponLine}
          </p>
          <p
            className={`mt-2 sm:mt-3 tracking-[0.2em] uppercase text-white/90 ${
              isPopup ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Starburst badge - right */}
        <div className={`flex justify-center md:justify-end ${isPopup ? '' : 'md:pr-4'}`}>
          <div
            className={`relative animate-cupon-wiggle ${
              isPopup
                ? 'w-32 h-32 sm:w-40 sm:h-40'
                : 'w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60'
            }`}
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full drop-shadow-2xl"
              aria-hidden="true"
            >
              <path
                fill="#fa5c04"
                d="M100,4 L114,18 L132,10 L140,28 L160,26 L162,46 L181,52 L176,71 L194,82 L182,98 L196,114 L181,127 L189,146 L171,154 L172,174 L153,174 L146,192 L128,184 L114,196 L100,184 L86,196 L72,184 L54,192 L47,174 L28,174 L29,154 L11,146 L19,127 L4,114 L18,98 L6,82 L24,71 L19,52 L38,46 L40,26 L60,28 L68,10 L86,18 Z"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <span
                className={`font-sans font-black leading-none drop-shadow-md ${
                  isPopup ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'
                }`}
              >
                {badgeDiscount}
              </span>
              <span className="mt-1.5 font-bold text-[9px] sm:text-[10px] tracking-wider leading-tight">
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom orange bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-brand-orange z-10" />
    </>
  );
};

const Cupon = () => {
  const cupon = content.cupon;
  if (!cupon || cupon.enabled === false) return null;

  const href = cupon.href || 'https://marlocomunica.mitiendanube.com/';

  return (
    <section className="px-4 sm:px-8 md:px-20 -mt-16 sm:-mt-24 md:-mt-32 pb-12">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cupon.title || 'Hot Sale'} - ${cupon.couponLine || ''}`}
        className="group block max-w-6xl mx-auto relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 hover:ring-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-cupon-pulse"
      >
        <CuponCard cupon={cupon} size="banner" />
      </a>
    </section>
  );
};

export default Cupon;
