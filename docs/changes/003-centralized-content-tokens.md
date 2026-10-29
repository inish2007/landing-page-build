# Change Note 003: Centralized Content Schemas, Design Tokens & Local Assets

## 1. What changed and why
Established the complete client centralization layer, design system tokens, local open-license typography, local open-license photographic media, content query helpers, and automated build lifecycle validation:
- Created the 5 core JSON content schemas in `src/content/`:
  - `text.en.json`: Authoritative dictionary of all visible copy, structured formatting segments, and accessibility labels across `common`, `nav`, `home`, `about`, `process`, `work`, `contact`, `colophon`, `privacy`, `artworks`, and `footer` namespaces.
  - `images.json`: Intrinsic dimensions (`width`, `height`), descriptive `alt` text, responsive focal positioning (`position.desktop`, `position.mobile`), object fit, and legal credits.
  - `navigation.json`: Structured navigation link hierarchies for `header`, `footer`, and `social` links with localized label key mappings.
  - `pages.json`: Page route compositions, meta description keys, and ordered section sequences validated against an explicit component whitelist.
  - `artworks.json`: Curated portfolio project records for architecture, sculpture, and object works with dimensions, mediums, years, and captions.
- Created CSS design token foundations in `src/styles/`:
  - `tokens.css`: Color palette, typography font stacks, fluid clamp typography scales, modular spacing scale, layout boundaries, motion timings, and `@media (prefers-reduced-motion: reduce)` overrides.
  - `fonts.css`: Local `@font-face` blocks for *Fraunces* (variable display serif) and *Plus Jakarta Sans* (variable sans-serif) using `font-display: swap` pointing to local `/fonts/` files.
  - `global.css`: CSS reset, document typography, focus outline styles, media defaults, and structured text highlight classes.
- Downloaded and placed 100% local open-license assets:
  - `public/fonts/`: `fraunces-opsz-wght.woff2`, `fraunces-italic-opsz-wght.woff2`, `plus-jakarta-sans-wght.woff2` (SIL Open Font License 1.1).
  - `public/images/`: 13 curated architectural and sculptural WebP images (`home-hero.webp`, `sculpture-detail.webp`, `architectural-courtyard.webp`, `about-portrait.webp`, `process-studio.webp`, `process-site.webp`, `process-materials.webp`, `process-tectonics.webp`, `studio-desk.webp`, `pavilion-k.webp`, `stone-terrace.webp`, `basalt-study.webp`, `timber-pavilion.webp`), all sub-300KB with verified open licenses.
- Created `src/utils/content.js` providing documented content retrieval helper functions: `getCopy()`, `getImage()`, `getNavigation()`, `getPageConfig()`, and `getArtworks()`.
- Created automated content validator `scripts/validate-content.mjs`:
  - Verifies JSON parsing for all 5 content files.
  - Validates required root chrome keys in `text.en.json`.
  - Validates section components against whitelist `['HeroSection', 'StatementSection', 'SelectedWorkSection', 'ContactCtaSection', 'EditorialHeader', 'BiographySection', 'PhilosophyGrid', 'ProcessStep', 'Gallery', 'ContactForm']`.
  - Verifies image asset existence on disk, positive dimensions, and valid focal percentages.
  - Validates cross-referenced keys across all content files.
- Configured automated lifecycle pre-hooks in `package.json`: `"prebuild"` and `"pretest"`.
- Documented full legal provenance in `THIRD_PARTY_NOTICES.md` (OFL 1.1, CC0 1.0, Unsplash License) and machine-readable `docs/asset-manifest.json`.
- Updated `docs/FUNCTION_INDEX.md` and `docs/progress.md`.

## 2. Functions added
- `getCopy(keyPath, fallback)` (`src/utils/content.js`): Resolves dot-notation path into centralized text dictionary.
- `getImage(imageKey)` (`src/utils/content.js`): Retrieves image metadata object from `images.json`.
- `getNavigation(area)` (`src/utils/content.js`): Retrieves navigation link hierarchy array for header, footer, or social.
- `getPageConfig(pageId)` (`src/utils/content.js`): Retrieves page layout composition and section sequence from `pages.json`.
- `getArtworks(artworkId)` (`src/utils/content.js`): Retrieves portfolio artworks array or single artwork record by ID.
- `validateContent(rootDir)` (`scripts/validate-content.mjs`): Main content validation orchestrator verifying schemas, chrome keys, components, and assets.
- `validateImageMetadata(imageData, rootDir)` (`scripts/validate-content.mjs`): Verifies image asset existence on disk, positive dimensions, and valid focal percentages.
- `validateChromeKeys(textData)` (`scripts/validate-content.mjs`): Verifies required root chrome copy keys in text dictionary.
- `validateComponentWhitelist(pagesData)` (`scripts/validate-content.mjs`): Verifies section component names in `pages.json` against authorized whitelist.
- `validateCrossReferences(schemas)` (`scripts/validate-content.mjs`): Verifies cross-referenced text and image keys across schemas.
- `resolvePath(obj, keyPath)` (`scripts/validate-content.mjs`): Resolves dot-notation string key in nested object structure.

## 3. Functions changed
None.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
None. (No new UI components or routes added in Stage 03. Section components and navigation chrome are authored in Stages 04 and 05).

## 6. Strings/images/design changed
- Centralized all visible copy in `src/content/text.en.json`.
- Centralized all image metadata and responsive focal points in `src/content/images.json`.
- Centralized site navigation hierarchies in `src/content/navigation.json`.
- Centralized page layout compositions in `src/content/pages.json`.
- Centralized gallery portfolio records in `src/content/artworks.json`.
- Established CSS custom property design tokens in `src/styles/tokens.css`.
- Established local `@font-face` declarations in `src/styles/fonts.css`.
- Established CSS reset and document defaults in `src/styles/global.css`.
- Stored local WOFF2 font files in `public/fonts/`.
- Stored local WebP images in `public/images/`.

## 7. Checks actually run
- `node scripts/validate-content.mjs`: Verified exit code 0; reported 5 schemas parsed, 19 chrome keys verified, component whitelist validated, 14 image assets verified on disk, and 6 artwork records verified.
- Intentional failure check: Temporarily modified `src/content/pages.json` with an unauthorized component name (`InvalidSectionComponent`). Verified `validate-content.mjs` failed with clear error diagnostics and non-zero exit code. Reverted change and verified validator passes cleanly.
- `npm run build`: Executed full build pipeline. Confirmed `prebuild` lifecycle hook automatically triggers `validate-content.mjs` and static build completes with 0 errors.
- Image integrity check: Verified all 13 images in `public/images/` exist, have valid WebP headers, match specified dimensions, and are sub-300KB.
- Font integrity check: Verified all 3 font files in `public/fonts/` exist and match WOFF2 magic bytes (`wOF2`).
- `git diff --cached --check`: Verified zero whitespace or conflict marker issues.
- `git status`: Verified clean working tree boundaries.

## 8. Remaining work/risks
- Stage 04: Author shared chrome components (`Header.astro`, `MobileDrawer.astro`, `Footer.astro`) and client navigation script `src/scripts/site.js` with keyboard focus trap.
- Stages 05–13: Desktop homepage sections, responsive layout testing, editorial routes, work gallery lightbox, contact route, test suites, and client editing guides.
