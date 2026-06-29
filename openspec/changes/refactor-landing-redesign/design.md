## Context

The app is a Vite 7 + React 19 SPA under `app/` (no root `package.json`), styled with Tailwind v4 (CSS-first `@theme` in `app/src/index.css`). All copy lives in `app/src/content.json`, imported statically into each component, so content changes require a rebuild/redeploy. A homegrown CMS at `/editor` edits that JSON and commits it to trigger a deploy. There are two backends for the same two endpoints: Express `server.js` (local, shells out to `git push`) and Vercel serverless `api/login.js` + `api/save-content.js` (prod, writes via the GitHub Contents API). Auth is a `localStorage` boolean and `save-content` has no server-side check. Deployment target is Vercel.

Constraints: stay a Vite SPA (no framework swap), keep Spanish (Argentina) copy and the "Slow Marketing" tone, keep the homegrown editor (no headless CMS migration). Production hosting is Vercel serverless; the local Express server is a developer convenience.

## Goals / Non-Goals

**Goals:**
- Close the auth hole: server-enforced authorization on writes, hashed credentials, rate limiting.
- Bring the visual design to the Canva reference: real brand fonts, orange/cream alternation, tokenized colors, shared UI primitives, structured content.
- Make the editor cover the whole page and run on one backend.
- Reduce image payload and respect `prefers-reduced-motion`.
- Remove dead code and the `child_process` squatter; consolidate docs.

**Non-Goals:**
- No migration to a headless/managed CMS.
- No SSR/SSG or framework change.
- No copy rewrite or rebrand — content stays, only its rendering/structure changes.
- No new content model beyond what the editable-coverage and structured-content requirements need.

## Decisions

- **Vercel serverless is the single source of truth; the Express server is aligned or retired.** The two backends drift and double the maintenance. Decision: make the Vercel `api/*` functions the canonical implementation and have local dev hit the same logic (shared module imported by both, or run the functions locally via `vercel dev`). Rationale: prod already runs on Vercel; the GitHub Contents API write works in both environments, unlike `git push` via `exec`. Alternative considered: keep Express as primary — rejected because `exec`-based git is the riskier, non-prod path.
- **Auth via a signed, httpOnly session token (or short-lived signed JWT) verified on every write.** The login endpoint sets a signed token after verifying a hashed password; `save-content` rejects requests lacking a valid token. Rationale: stateless verification fits serverless; no shared session store needed. Alternative: server-side session store — rejected as overkill for a single-editor CMS.
- **Passwords hashed with bcrypt; credentials provisioned as `user:bcryptHash` in `EDITOR_USERS`.** Rationale: bcrypt is standard, salted, and tunable. The env format changes from plaintext to hash (breaking — re-provision once). A small script/Make target generates the hash.
- **Rate limiting in-function with a lightweight strategy** (per-IP counter with a short window, backed by an ephemeral store available on Vercel). Rationale: blocks brute force without external infra. Alternative: Vercel WAF rate rules — viable later, but app-level keeps it portable.
- **Design system in Tailwind v4 `@theme` tokens + small shared components.** Define semantic color tokens (orange surface, cream surface, charcoal text, accents) and a `section`/`surface` convention so alternation is declarative. Add `Button`, `Badge`, `SectionTitle` and extract `Carousel` + `Lightbox` (the near-verbatim duplicate). Rationale: removes copy-paste and hardcoded hex, makes alternation trivial. Alternative: a component library (shadcn) — rejected as too heavy for a marketing SPA.
- **Brand fonts self-hosted via `@font-face` with `font-display: swap`.** If licensed brand files aren't available, substitute the closest licensed/Google equivalents and record the mapping. Rationale: self-hosting avoids layout shift and external dependency; honesty about substitution prevents "referenced but never loaded" recurring.
- **Structured content replaces pseudo-markup.** Convert WhyUs/Strategies fields from strings containing `**...**` and `<span>` into structured shapes (e.g. arrays of `{text, emphasis}` segments, or dedicated fields) rendered by components. Rationale: removes render-time parsing and JSX-in-data; makes these fields safely editable. This is a `content.json` shape change handled with a one-time data migration.
- **Image optimization at build/asset time.** Pre-generate webp/avif + responsive widths for proyectos/testimonios/hero, emit `srcset`/`sizes` (via a small build step or pre-processed assets committed to `public/`). Rationale: a Vite SPA has no `next/image`; pre-processing is the pragmatic path. Alternative: a Vite image plugin — acceptable if it fits the build cleanly.

## Risks / Trade-offs

- **Brand font licensing/availability unknown** → If the real faces can't be obtained, substitute the nearest licensed equivalent and document the mapping rather than referencing unloaded fonts again.
- **`content.json` shape change can break the renderer or editor mid-migration** → Migrate data and update renderer + editor in the same change; keep a backup of the old JSON; validate against the schema before save.
- **Auth refactor could lock out the legitimate editor** → Provide a documented one-step credential (re)provisioning and verify login end-to-end before retiring the old path.
- **Unifying backends may change local dev workflow** → Document the new `vercel dev` (or shared-module) flow; keep `dev`/`dev:full` scripts working or replace them clearly.
- **Image re-encoding risks visible quality regressions** → Spot-check each re-encoded asset; keep originals until verified.
- **Full visual redesign is broad and could regress responsive/layout** → Land tokens + primitives first, then re-theme section by section so changes are reviewable incrementally.

## Migration Plan

1. **P0 security** ships first and independently deployable: hash provisioning, token auth on `save-content`, rate limiting, remove `child_process`.
2. **Backend unification** alongside/after P0 so the secured logic lives in one place.
3. **Design system foundation** (tokens, fonts, shared primitives) before re-theming sections.
4. **Section re-theme + structured content** with the `content.json` migration (data + renderer + editor together).
5. **Editor coverage** for the new/missing fields once the content shape is final.
6. **Media optimization** and **cleanup** last (low risk, independent).

Rollback: each phase is a separate set of commits; revert the phase's commits. Keep the pre-migration `content.json` and original images until the corresponding phase is verified in production.

## Resolved Decisions (user)

- **Single editor account.** Credential provisioning targets one `user:bcryptHash`; no multi-user UX needed.
- **Retire the local Express server.** `server.js` and its `exec`/`git push` path are removed; local dev uses `vercel dev` running the same serverless functions as production — one source of truth.
- **Brand fonts (RESOLVED — option 1):** use open-licensed substitutes. *Neulis Alt*, *Agrandir*, and *Helvetica World* are commercial paid fonts and will NOT be downloaded from free/cracked sources (copyright infringement on a commercial site). Plan: self-host *Garet* (legitimate free version) where it fits, and substitute the closest open-licensed Google Fonts equivalents for the paid families, documenting the mapping in the codebase.

## Open Questions

- None outstanding.
