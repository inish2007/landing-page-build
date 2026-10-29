# Change Note 002: Minimal Astro Project Scaffolding

## 1. What changed and why
Scaffolded a minimal, runnable Astro static project shell and layout structure to verify local compilation and static HTML generation:
- Created `astro.config.mjs` configuring static output (`output: 'static'`), local host/port (`127.0.0.1:4321`), and Vite integration for Tailwind CSS (`@tailwindcss/vite`).
- Created `src/layouts/SiteLayout.astro` establishing the base semantic HTML5 document shell, viewport metadata, document title support, accessible skip-to-content navigation landmark (`#main-content`), and main slot.
- Created `src/pages/index.astro` providing the root homepage route wrapped in `SiteLayout`, rendering an initial semantic welcome section for "Aura Creative Studio".
- Verified static generation produces clean HTML in `dist/index.html`.
- Updated living registry `docs/FUNCTION_INDEX.md` and roadmap in `docs/progress.md`.

## 2. Functions added
None. (No standalone JavaScript utility, validation, or client script functions added in Stage 02. Component markup and static build scaffolding only).

## 3. Functions changed
None. (Zero pre-existing functions modified).

## 4. Functions removed/renamed
None. (Zero pre-existing functions removed or renamed).

## 5. Components/routes changed
- `SiteLayout.astro` (`src/layouts/SiteLayout.astro`): Added base layout component.
  - Accepted props: `title?: string` (defaults to `'Aura Creative Studio'`).
  - Content keys: None hardcoded; provides default title fallback.
  - Structure: Accessible `<!doctype html>`, `<html lang="en">`, `<head>` (charset, viewport, title), accessible skip link `<a href="#main-content" class="skip-link">`, and `<main id="main-content"><slot /></main>`.
- `index.astro` (`src/pages/index.astro`): Added root homepage route.
  - Accepted props: None (Astro page route).
  - Content keys: Initial semantic welcome placeholder container (`<h1>Aura Creative Studio</h1>`, `<p>Fine Art & Creative Direction</p>`), pending centralized content schemas in Stage 03/05.

## 6. Strings/images/design changed
None. (Centralized content schemas in `src/content/` and authored CSS design tokens in `src/styles/` will be established in Stage 03).
- Uses neutral placeholder branding ("Aura Creative Studio") in `SiteLayout.astro` and `index.astro`.
- No external branding, tracking, or remote fonts introduced.

## 7. Checks actually run
- `npm run build`: Executed `astro build`. Confirmed static compilation completed cleanly in 7.88s generating `dist/index.html` with zero errors.
- `npx astro check`: Evaluated check CLI; interactive prompt to add `@astrojs/check` was declined to preserve package boundaries and avoid modifying dependencies outside scope.
- `dist/index.html` verification: Verified compiled static output contains valid semantic HTML5 structure, `<title>Aura Creative Studio</title>`, `<a href="#main-content" class="skip-link">Skip to main content</a>`, `<main id="main-content">`, and scoped styles.
- `git diff --cached --check`: Ran pre-commit whitespace and conflict marker check.
- `git status`: Verified working directory status and confirmed `dist/` and `.astro/` are correctly ignored.

## 8. Remaining work/risks
- Stage 03: Establish centralized content schemas (`text.en.json`, `images.json`, `navigation.json`, `pages.json`, `artworks.json`), design tokens (`tokens.css`, `fonts.css`, `global.css`), local open-license assets, and `scripts/validate-content.mjs`.
- Stages 04–13: Build shared chrome, responsive layouts, subpages, gallery lightbox, contact route, test suites, and client editing guides.
