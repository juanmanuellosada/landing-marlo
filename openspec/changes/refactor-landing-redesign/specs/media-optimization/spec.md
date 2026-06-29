## ADDED Requirements

### Requirement: Optimized image formats
Raster images SHALL be served in optimized modern formats (webp or avif) and compressed. No image SHALL be served as an unoptimized PNG when a smaller equivalent is available.

#### Scenario: Heavy PNG replaced
- **WHEN** the testimonios gallery loads
- **THEN** the former 584 KB PNG is served as an optimized webp/avif of substantially smaller size with no visible quality loss

#### Scenario: Galleries are lighter
- **WHEN** the proyectos and testimonios assets are measured
- **THEN** their combined weight is materially reduced versus the current ≈ 3.8 MB (testimonios) and ≈ 1.1 MB (proyectos)

### Requirement: Responsive image delivery
Gallery and hero images SHALL provide responsive sizes so small viewports do not download full-resolution assets.

#### Scenario: Small viewport downloads a smaller image
- **WHEN** the page loads on a mobile-width viewport
- **THEN** the browser selects an appropriately sized image variant (via `srcset`/`sizes` or equivalent) rather than the full-resolution file

#### Scenario: Offscreen gallery images defer loading
- **WHEN** carousel images are below the fold
- **THEN** they are lazy-loaded rather than fetched on initial page load
