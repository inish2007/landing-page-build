# Function and Component Index

This document serves as the project's living registry of all active components, utility functions, client scripts, build tools, and test helpers across `D:\projects\landing-page-build`.

## Purpose and Usage
- **For Contributors and Editors**: Locate the exact component or function responsible for a given layout, interaction, or build check.
- **Maintenance Rule**: Whenever a function or component is added, modified, renamed, or deleted, this index must be updated in the same Git commit.
- **Deletions**: Obsolete symbols are removed from this index and preserved in the historical change notes under `docs/changes/`.
- **Tooling Coverage**: In addition to UI components and application helpers, all tracked build, validation, and test scripts must be registered here.

---

## 1. Layouts and Page Routes (`src/layouts/`, `src/pages/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| `SiteLayout` | `src/layouts/SiteLayout.astro` | Semantic HTML5 document shell, viewport metadata, skip link, and default title | Props: `{ title?: string }`, Slot: main content | Page routes (`src/pages/*.astro`) | Renders document shell, sets `<title>`, defines `#main-content` landmark | `npm run build`, `npx astro check` |
| `Index` (Home) | `src/pages/index.astro` | Homepage entry route rendering initial studio welcome container within `SiteLayout` | Props: none (page route), Output: static HTML document | Browser requests to `/` | Serves root HTML document | `npm run build`, `npx astro check` |

---

## 2. Reusable UI & Section Components (`src/components/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| *(None registered in Stage 01 baseline)* | N/A | UI components not yet scaffolded | N/A | N/A | None | Registration starts Stage 04/05 |

---

## 3. Content Query & Utility Helpers (`src/utils/`, `src/config/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| `getCopy` | `src/utils/content.js` | Resolves dot-notation path into centralized text dictionary | Inputs: `(keyPath: string, fallback?: any)`, Output: string, segment array, or object | Astro components, section templates | None (pure lookup) | `node scripts/validate-content.mjs`, `npm run build` |
| `getImage` | `src/utils/content.js` | Retrieves image metadata object from images.json | Inputs: `(imageKey: string)`, Output: object `{ src, alt, width, height, position, credit }` | `ResponsiveImage.astro`, page routes | Throws Error if key missing | `node scripts/validate-content.mjs`, `npm run build` |
| `getNavigation` | `src/utils/content.js` | Retrieves navigation link hierarchy array for header, footer, or social | Inputs: `(area: 'header'\|'footer'\|'social')`, Output: `Array<object>` | `Header.astro`, `Footer.astro`, `MobileDrawer.astro` | None | `node scripts/validate-content.mjs`, `npm run build` |
| `getPageConfig` | `src/utils/content.js` | Retrieves page layout composition and section sequence | Inputs: `(pageId: string)`, Output: `object\|undefined` | Page routes (`src/pages/*.astro`) | None | `node scripts/validate-content.mjs`, `npm run build` |
| `getArtworks` | `src/utils/content.js` | Retrieves portfolio artworks array or single artwork record by ID | Inputs: `(artworkId?: string)`, Output: `Array<object>\|object\|undefined` | `work.astro`, `Gallery.astro`, `SelectedWorkSection.astro` | None | `node scripts/validate-content.mjs`, `npm run build` |

---

## 4. Client-Side Behavior Modules (`src/scripts/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| *(None registered in Stage 01 baseline)* | N/A | Client modules not yet authored | N/A | N/A | None | Registration starts Stage 04 |

---

## 5. Build, Validation & Audit Scripts (`scripts/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| `validateContent` | `scripts/validate-content.mjs` | Main content validation orchestrator verifying schemas, chrome keys, components, and assets | Inputs: `(rootDir?: string)`, Output: `boolean` | CLI execution, npm `prebuild` & `pretest` hooks | Logs diagnostics to stdout/stderr | `node scripts/validate-content.mjs`, `npm run build` |
| `validateImageMetadata` | `scripts/validate-content.mjs` | Verifies image asset existence on disk, positive dimensions, and valid focal percentages | Inputs: `(imageData: object, rootDir?: string)`, Output: `Array<string>` | `validateContent()` | Reads filesystem (`public/images/`) | `node scripts/validate-content.mjs` |
| `validateChromeKeys` | `scripts/validate-content.mjs` | Verifies required root chrome copy keys in text dictionary | Inputs: `(textData: object)`, Output: `Array<string>` | `validateContent()` | None | `node scripts/validate-content.mjs` |
| `validateComponentWhitelist` | `scripts/validate-content.mjs` | Verifies section component names in pages.json against authorized whitelist | Inputs: `(pagesData: object)`, Output: `Array<string>` | `validateContent()` | None | `node scripts/validate-content.mjs` |
| `validateCrossReferences` | `scripts/validate-content.mjs` | Verifies cross-referenced text and image keys across schemas | Inputs: `(schemas: object)`, Output: `Array<string>` | `validateContent()` | None | `node scripts/validate-content.mjs` |
| `resolvePath` | `scripts/validate-content.mjs` | Resolves dot-notation string key in nested object structure | Inputs: `(obj: object, keyPath: string)`, Output: `any` | Validator helper functions | None | `node scripts/validate-content.mjs` |

---

## 6. Test Helpers & Test Suites (`tests/`)

| Symbol/component | File | Responsibility | Inputs/outputs | Callers or consumers | Side effects | Relevant checks |
|---|---|---|---|---|---|---|
| *(None registered in Stage 01 baseline)* | N/A | Test helpers not yet authored | N/A | N/A | None | Registration starts Stage 06 |

---

## Maintenance & Integrity Contract
- Every exported or non-trivial JavaScript function must include concise JSDoc describing purpose, parameters, return value, and side effects.
- Every Astro component must include a frontmatter header comment describing its responsibility, accepted props, and content keys.
- Do not use anonymous callbacks to conceal meaningful business logic; extract to named, documented functions.
- Every commit updating this file must have a corresponding note in `docs/changes/NNN-*.md`.
