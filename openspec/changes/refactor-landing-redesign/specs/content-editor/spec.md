## ADDED Requirements

### Requirement: Complete editable coverage
The editor SHALL allow editing every content-driven section of the live page. At minimum it MUST cover `hero.headline`, `hero.subtitle`, `hero.socialMedia`, Proyectos, Testimonios, Cupon/CuponPopup, and `whyUs.description`, in addition to the sections already covered.

#### Scenario: Previously uneditable sections become editable
- **WHEN** an authenticated editor opens `/editor`
- **THEN** fields for Hero headline/subtitle/social media, Proyectos, Testimonios, Cupon/CuponPopup, and whyUs.description are present and persist on save

#### Scenario: Edited content appears on the live page
- **WHEN** an editor changes a covered field and saves
- **THEN** the published landing reflects the new value after deploy

### Requirement: Editor matches the content schema
The editor SHALL only expose fields that exist in the content schema, and SHALL NOT write fields the renderer ignores.

#### Scenario: No orphan fields
- **WHEN** the editor saves content
- **THEN** the saved JSON contains no fields absent from the schema (e.g. the former `reason.title`)

### Requirement: Single unified backend
Content persistence SHALL be served by a single backend implementation used in both local development and production, rather than two divergent implementations.

#### Scenario: One code path for writes
- **WHEN** content is saved in local dev and in production
- **THEN** both go through the same persistence logic (no separate Express vs serverless implementations that can drift)
