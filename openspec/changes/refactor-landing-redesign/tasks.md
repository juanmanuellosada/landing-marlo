## 1. P0 Security

- [x] 1.1 Remove the `child_process` dependency from `app/package.json` and confirm install/build/run are unaffected
- [x] 1.2 Add bcrypt (or equivalent) and a small script/Make target to generate `user:bcryptHash` entries; document the new `EDITOR_USERS` hash format
- [x] 1.3 Update `api/login.js` to verify the submitted password against the stored hash and issue a signed httpOnly session token (or short-lived signed JWT) on success
- [x] 1.4 Enforce token verification in `api/save-content.js`; reject requests without a valid token with HTTP 401 (no reliance on client `localStorage`)
- [x] 1.5 Add rate limiting to login and save-content (per-IP counter + window; return 429 when exceeded)
- [x] 1.6 Update `Login.jsx`/`EditorPage.jsx` to use the server token instead of the `localStorage` auth boolean for gating writes
- [ ] 1.7 Re-provision a real credential hash and verify end-to-end: login succeeds, unauthenticated/forged write returns 401, authenticated write persists
  <!-- Requires live env var configuration: run `node scripts/hash-password.js <pass>`, set EDITOR_USERS + EDITOR_SESSION_SECRET in Vercel, then test in a preview deploy -->

## 2. Backend unification

- [x] 2.1 Extract the content-persistence + auth logic into a single shared module used by the production serverless functions
- [x] 2.2 Make local dev use the same logic (via `vercel dev` or by importing the shared module); align or retire `server.js` and remove its `exec`/`git push` path
- [x] 2.3 Update `package.json` scripts and the dev workflow docs to match the unified backend
- [ ] 2.4 Verify content save works identically in local dev and a Vercel preview deploy
  <!-- Requires a live deploy: run `vercel dev` with env vars set, test save; then push to a preview branch and verify the same flow -->

## 3. Design system foundation

- [x] 3.1 Acquire or choose brand fonts; self-host via `@font-face` with `font-display: swap` (record any substitution mapping)
- [x] 3.2 Define semantic color/spacing tokens in the Tailwind v4 `@theme` (orange surface, cream surface, charcoal text, accents); remove hardcoded hex like `#371a09`
- [x] 3.3 Add shared `Button` and `Badge` (pill) components; replace the copy-pasted button class string across Hero/Proyectos/WhyUs/etc.
- [x] 3.4 Add a shared `SectionTitle` component
- [x] 3.5 Extract a shared `Carousel` and `Lightbox`; refactor `Proyectos.jsx` and `Testimonios.jsx` to use them (remove the duplicate implementation)

## 4. Visual redesign (re-theme to reference)

- [x] 4.1 Establish the alternating section convention (orange ↔ cream/beige) and apply it section by section
- [x] 4.2 Re-theme Hero, Cupon, Kits, About, Philosophy to the reference look (rounded cards, pill badges, emoji accents)
- [x] 4.3 Re-theme Services, Proyectos, Testimonios, WhyUs, Strategies, Footer to match
- [x] 4.4 Verify contrast (WCAG AA) on cream sections with charcoal text and on orange sections
- [x] 4.5 Responsive QA across mobile/tablet/desktop for every re-themed section (code-level; final browser QA separate)

## 5. Structured content

- [x] 5.1 Define structured shapes for the fields currently using pseudo-markup (WhyUs, Strategies) and migrate `content.json` data accordingly (keep a backup of the old JSON)
- [x] 5.2 Update `WhyUs.jsx` and `Strategies.jsx` to render from the structured fields; remove all render-time `**bold**` / `<span>` string parsing
- [x] 5.3 Confirm `content.json` contains no embedded JSX or markup strings

## 6. Editor: fix and complete

- [x] 6.1 Remove out-of-sync fields from the editor (e.g. `reason.title`) so it only writes schema fields
- [x] 6.2 Refactor the monolithic `Editor.jsx` into smaller per-section field groups (data-driven from the schema where practical)
- [x] 6.3 Add editing for `hero.headline`, `hero.subtitle`, `hero.socialMedia`
- [x] 6.4 Add editing for Proyectos and Testimonios (items: image, label/alt, ordering)
- [x] 6.5 Add editing for Cupon/CuponPopup and `whyUs.description`
- [x] 6.6 Validate saved JSON against the schema before persisting; verify each newly editable field round-trips and appears on the page
  <!-- Round-trip save (edit → POST /api/save-content → renderer reads updated content.json) requires a live Vercel deploy with EDITOR_USERS + EDITOR_SESSION_SECRET set -->

## 7. Media optimization

- [x] 7.1 Convert the 584 KB testimonios PNG and other heavy raster assets to optimized webp/avif (spot-check quality; keep originals until verified)
- [x] 7.2 Generate responsive width variants for proyectos/testimonios/hero images and emit `srcset`/`sizes`
- [x] 7.3 Ensure offscreen gallery images lazy-load; measure and record the payload reduction vs the current ≈ 3.8 MB / ≈ 1.1 MB
- [x] 7.4 Normalize image path usage (the `./images` vs `/images` inconsistency)

## 8. Motion accessibility

- [x] 8.1 Honor `prefers-reduced-motion: reduce` for marquees, coupon pulse/wiggle/shine, popup/lightbox entrances, and carousel autoplay

## 9. Cleanup

- [x] 9.1 Remove dead code: `app/src/App.css` and unused starter assets (`react.svg`, `vite.svg`, unused `nuvemshop.svg`)
- [x] 9.2 Consolidate the 8 overlapping markdown docs into a smaller set of canonical guides
- [x] 9.3 Fix weak/placeholder alt text (e.g. `About.jsx` "Workspace")

## 11. Hero redesign (reference-match)

- [x] 11.1 Optimize 6 product PNGs (1.1–2.7 MB each) → WebP at max 900px + 480px variants into `app/public/images/productos/` (97% size reduction: ~11 MB → 264 KB total)
- [x] 11.2 Restructure `content.json hero` to new shape: `headline` (segments array), `subtitle`, `tagline`, `nav` (6 links), `products` (6 items with title/badge/image/href), `socialMedia` preserved
- [x] 11.3 Create `Navbar.jsx`: sticky orange header, "marlo comunica" Fredoka wordmark, 6 desktop nav links with INICIO underline accent, hamburger menu on mobile (aria-expanded, closes on link click)
- [x] 11.4 Rewrite `Hero.jsx`: cream section (`bg-surface-cream`), Fredoka headline with orange-bg emphasis spans for "necesitas"/"crecer", subtitle, tagline pill, 6-card product grid with floating Badge + srcset images + title; grid has `id="kits-recursos"`
- [x] 11.5 `LandingPage.jsx`: render `<Navbar />` above Hero; stop rendering `<KitsEditables />` (import removed, component file untouched); `id="top"` now lives on the Hero section
- [x] 11.6 `editor/HeroSection.jsx`: updated for new schema — headline segments (text + emphasis checkbox), subtitle, tagline, 6 nav links, 6 products (title/badge/image/href), socialMedia; old name/role/links fields removed
- [x] 11.7 `Footer.jsx`: added "Seguinos" social icons row (Instagram/Facebook/TikTok/Pinterest) sourced from `hero.socialMedia`
- [x] 11.8 Verified `prefers-reduced-motion` not broken (no new animations added; existing CSS rule in `index.css` covers new components)

## 10. Verification

- [ ] 10.1 Run lint and build clean from `app/`
- [ ] 10.2 Verify all spec scenarios (editor-security, landing-design-system, content-editor, media-optimization) pass
- [ ] 10.3 Final pass on a Vercel preview deploy: security, visuals, editor coverage, and image weight
