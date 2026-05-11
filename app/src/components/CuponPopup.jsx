import { useEffect, useState, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import content from '../content.json';
import { CuponCard } from './Cupon';

const STORAGE_KEY = 'cupon-popup-dismissed';

const CuponPopup = () => {
  const cupon = content.cupon;
  const popupCfg = cupon?.popup;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!cupon || cupon.enabled === false) return;
    if (!popupCfg || popupCfg.enabled === false) return;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    const delay = typeof popupCfg.delayMs === 'number' ? popupCfg.delayMs : 800;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, [cupon, popupCfg]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  if (!cupon || cupon.enabled === false) return null;
  if (!popupCfg || popupCfg.enabled === false) return null;
  if (!open) return null;

  const href = cupon.href || 'https://marlocomunica.mitiendanube.com/';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${cupon.title || 'Hot Sale'} - ${cupon.couponLine || ''}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-cupon-overlay-in"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      {/* Card */}
      <div className="relative w-full max-w-xl animate-cupon-popup-in">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="block relative overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300"
        >
          <CuponCard cupon={cupon} size="popup" />
        </a>

        {/* Close button */}
        <button
          type="button"
          aria-label="Cerrar"
          onClick={close}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-brand-orange shadow-xl flex items-center justify-center hover:scale-110 hover:rotate-90 transition-transform duration-300 ring-2 ring-brand-orange"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CuponPopup;
