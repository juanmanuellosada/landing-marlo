## ADDED Requirements

### Requirement: Brand fonts are loaded
The brand fonts referenced by the theme SHALL be actually loaded so headings and body render in the brand typefaces, not silent Google fallbacks.

#### Scenario: Brand typeface renders
- **WHEN** the landing page loads
- **THEN** the computed font-family for branded headings resolves to a loaded brand font face, not only a generic fallback

#### Scenario: No reference to unloaded fonts
- **WHEN** the theme defines a font token
- **THEN** a corresponding font face is loaded (self-hosted or from a font host)

### Requirement: Tokenized color system with alternating sections
Colors SHALL be defined as theme tokens (no hardcoded hex in components), and page sections SHALL alternate between a vibrant orange theme and a cream/beige theme with dark charcoal text, matching the agreed reference.

#### Scenario: No hardcoded hex in components
- **WHEN** component source is inspected
- **THEN** brand colors (e.g. the former `#371a09`) are referenced via theme tokens rather than inline hex literals

#### Scenario: Sections alternate themes
- **WHEN** the landing renders top to bottom
- **THEN** orange and cream/beige sections alternate and cream sections use dark charcoal body text with sufficient contrast (WCAG AA)

### Requirement: Shared UI primitives
Repeated UI patterns SHALL be provided by shared components instead of being copy-pasted. At minimum: `Button`, `Badge`, `SectionTitle`, `Lightbox`, and `Carousel`.

#### Scenario: Button is shared
- **WHEN** a call-to-action button is needed in any section
- **THEN** it is rendered via the shared `Button` component, not an inline copy of the button class string

#### Scenario: Lightbox and carousel are shared
- **WHEN** Proyectos and Testimonios render their galleries
- **THEN** both use the same shared `Carousel` and `Lightbox` components rather than duplicated implementations

### Requirement: Structured content rendering
Content SHALL be rendered from structured data, not by parsing pseudo-markup (`**bold**` or literal `<span className=...>` strings) at render time.

#### Scenario: No pseudo-markup parsing
- **WHEN** WhyUs and Strategies render their text
- **THEN** emphasis and styling come from structured fields/components, and `content.json` contains no embedded JSX or markdown-like markup strings

### Requirement: Motion respects user preference
All non-essential animations SHALL be disabled or reduced when the user has `prefers-reduced-motion: reduce`.

#### Scenario: Reduced motion honored everywhere
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** marquees, pulses, popup/lightbox entrances, and carousel autoplay are disabled or substantially reduced
