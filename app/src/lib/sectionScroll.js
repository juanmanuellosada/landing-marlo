/**
 * Shared section-scroll utilities used by Navbar and Footer.
 *
 * Scroll on this site works via el.scrollIntoView({ behavior: 'instant' }) —
 * 'smooth' and window.scrollTo are no-ops because the scroll container is the
 * LandingPage overflow-x-hidden wrapper div, not window.
 */

// Same-page scroll. 'instant' is the only behavior that works on this page —
// the scroll container is the overflow-x-hidden LandingPage wrapper div (not
// the window), and 'smooth' is silently ignored by that container.
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'instant', block: 'start' });
};

// Cross-page scroll: after navigate('/'), this fire-and-forget loop waits for the
// target section to mount and keeps it positioned for ~1.5 s (absorbing lazy-image
// layout shifts and the CuponPopup scroll reset). Driven directly from the click
// handler — NOT a React effect — so it's immune to StrictMode double-invocation and
// to react-router location.state propagation timing. 'instant' scrollIntoView is the
// only thing that scrolls this page's nested (overflow-x-hidden) container.
export const scrollToSectionBounded = (id) => {
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 56;
      if (Math.abs(el.getBoundingClientRect().top - offset) > 4) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
    if (performance.now() - start < 1500) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

/**
 * Returns an (e, href) click handler for section anchor links (#id).
 * - On home ('/'): scrolls directly via scrollToId.
 * - Elsewhere: navigates to '/' then drives scroll via scrollToSectionBounded.
 *
 * @param {Function} navigate - react-router's navigate function
 * @param {boolean} isHome - whether the current page is '/'
 * @returns {(e: Event, href: string) => void}
 */
export const makeSectionClickHandler = (navigate, isHome) => (e, href) => {
  e.preventDefault();
  const id = href.slice(1); // strip leading '#'
  if (isHome) {
    scrollToId(id);
  } else {
    navigate('/');
    scrollToSectionBounded(id);
  }
};
