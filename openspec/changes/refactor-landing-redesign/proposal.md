## Why

The MARLOCOMUNICA landing (Vite 7 + React 19 SPA) has a critical security hole — the `/editor` CMS login is cosmetic (a `localStorage` boolean) and the content-write endpoint has **no authorization at all**, so anyone can POST arbitrary content and trigger a production deploy. On top of that, the visual design diverges from the agreed Canva reference (brand fonts are referenced but never loaded; the palette is a flat single-orange instead of the reference's orange/cream alternation), and the homegrown editor is monolithic, out of sync with the content schema, and can't edit large parts of the page. We are fixing security first, then bringing the design to the reference and completing the editor.

## What Changes

- **Secure the editor (P0).** Add real server-side authentication + authorization to the content-write path so unauthenticated requests are rejected. Hash stored passwords (no plaintext comparison). Add basic rate limiting to login and write endpoints. **BREAKING**: existing plaintext credentials must be re-provisioned as hashes.
- **Remove the bogus `child_process` npm dependency** (squatter package shadowing the Node builtin).
- **Full visual redesign to the Canva reference.** Load the real brand fonts (currently only Google fallbacks render). Replace the monochrome single-orange look with the reference's language: vibrant orange sections **alternating** with cream/beige sections, dark charcoal body text, rounded pill badges, emoji accents, rounded cards.
- **Introduce a design system.** Promote hardcoded hex (e.g. `#371a09`) to theme tokens; add shared `Button`, `Badge`, and `SectionTitle` components to replace the button style copy-pasted across five components; extract a shared `Lightbox` and `Carousel` used by both Proyectos and Testimonios.
- **Render content structurally, not via pseudo-markup.** Stop parsing `**bold**` and literal `<span className=...>` strings from `content.json` at render time (WhyUs, Strategies).
- **Fix and complete the editor.** Refactor the 481-line monolithic `Editor.jsx`; remove out-of-sync fields (e.g. `reason.title`); add coverage for the sections the editor cannot currently edit (`hero.headline/subtitle/socialMedia`, Proyectos, Testimonios, Cupon/CuponPopup, `whyUs.description`); unify the two divergent backends (Express `server.js` for local dev vs Vercel serverless `api/*` for prod) into one implementation.
- **Optimize media and motion.** Convert/compress heavy images (testimonios ≈ 3.8 MB incl. a 584 KB PNG; proyectos ≈ 1.1 MB) to optimized webp/avif with responsive sizes; honor `prefers-reduced-motion` across all animations (only one carousel honors it today).
- **Cleanup.** Remove dead code (`App.css`, unused starter assets) and consolidate the 8 overlapping markdown docs (1634 lines).

## Capabilities

### New Capabilities
- `editor-security`: authentication, authorization, password hashing, and rate limiting for the content editor and its write endpoint.
- `landing-design-system`: brand fonts, color/spacing tokens, alternating section theming, shared UI primitives (Button/Badge/SectionTitle/Lightbox/Carousel), and structured (non-pseudo-markup) content rendering, with motion that respects `prefers-reduced-motion`.
- `content-editor`: a refactored editor that covers all editable sections of the page and persists through a single unified backend.
- `media-optimization`: optimized, responsive image delivery for the proyectos and testimonios carousels and other heavy assets.

### Modified Capabilities
<!-- None — openspec/specs/ is empty; this is the first set of specs. -->

## Impact

- **Code**: `app/api/login.js`, `app/api/save-content.js`, `app/server.js` (auth/backend unification); `app/src/index.css` + `app/index.html` (fonts, tokens, theming); `app/src/components/*` (shared primitives, section theming, structured rendering); `app/src/components/Editor.jsx` + `EditorPage.jsx` + `Login.jsx` (editor refactor); `app/src/content.json` (schema adjustments for structured content + new editable fields); `app/public/images/**` (optimized assets).
- **Dependencies**: remove `child_process`; add password-hashing (e.g. bcrypt) and possibly a lightweight image-optimization step in the build; brand font files added to the repo or loaded from a font host.
- **Config / env**: editor credentials stored as hashes (env var format change); Vercel `api/*` becomes the single backend with `server.js` aligned or retired.
- **Docs**: 8 markdown files consolidated into fewer canonical guides.
- **Out of scope**: no migration to a headless CMS (the homegrown editor is kept and hardened per the chosen direction); no SSR/framework change (stays a Vite SPA).
