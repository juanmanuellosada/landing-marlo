const Marquee = ({ text, copies = 8, className = '' }) => {
  return (
    <div aria-hidden="true" className={`overflow-hidden py-8 bg-[#371a09] ${className}`}>
      <div className="flex w-max animate-marquee">
        {[...Array(copies)].map((_, i) => (
          <span
            key={i}
            className="text-2xl font-neulis font-bold uppercase text-white whitespace-nowrap px-3"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
