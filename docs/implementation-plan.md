# Master Implementation Plan — Current Revision

**Updated:** 29 October 2026, Asia/Calcutta
**Workspace:** D:/projects/landing-page-build
**Current instruction:** Documentation updates only. Do not build new pages or animation code.
**Implementation stop:** Stages 01–06 complete; Stage 07 onward awaits a new request.

This revision supersedes conflicting branding, content, asset, route, animation and completion instructions in the historical proposal preserved below. The shorter companion summary is docs/IMPLEMENTATION_PLAN.md; this hyphenated master plan is also maintained explicitly.

## 1. Current verified state
- Homepage / is implemented. Supporting routes are not implemented; configured destinations can return 404.
- Stage 05 desktop homepage: d7d5ccf. Stage 06 responsive homepage: f5b46ad.
- Image replacement: 41b18b2. All 15 configured image records use /images/client-placeholder.png (474×266); old responsive srcset selections were removed. Preserve the supplied dark image in every slot, independent of layout aspect ratio.
- Animation planning clarification: f71d22f. This documents future shared behavior; it did not implement the planned fades or new routes.
- Earlier production build, responsive/navigation tests and six-viewport checks are recorded in their change notes. No new runtime verification is claimed by this documentation update.

## 2. Content, branding and assets — superseding the Aura plan
The user supplied D:/projects/landing page/lana-gomez-local as the temporary artist content source, replacing the Aura architecture content direction. Keep the current artist copy, section sequence and original footer credits editable in centralized JSON. Do not restore architecture biographies, project records or the Aura name from the historical examples below.

The latest image instruction overrides reference photographs: every configured image must remain the supplied dark PNG. Prior assets are retained on disk; do not delete user files or restore their image selections without instruction.

Caveat Brush is locally hosted under its verified SIL Open Font License 1.1. Keep --font-brand/--text-brand centralized and restrict brush lettering to the brand name and occasional short accents. Maintain serif and sans-serif fonts for headings/body copy. Do not copy proprietary source fonts or the source logo image.

The source artist text/images are user-supplied temporary reference material. Do not describe them as verified CC0 or assert an open license. Preserve actual provenance and original ownership notices. Any future production audit must distinguish intentionally configured temporary artist names/credits from accidental private artifacts, tracking and unauthorized assets; the historical blanket banned-name scanner must not silently erase user-requested content. No publication or push is authorized.

## 3. Animation evidence and planned behavior
Evidence was inspected read-only in the supplied snapshot’s index.html, saved stylesheets and local.js. The original hosted runtime scripts are disabled in that snapshot, so captured settings are configuration evidence rather than proof of live execution.

| Behavior | Captured setting | Requirement for future authorized implementation |
|---|---|---|
| Global/content entry | Fade style; opacity transition; 1.5s duration and ease curve | Shared once-per-element viewport fade; preserve settled appearance and document actual timing |
| Header entry | Small delay increments of approximately 0.0111111s | Bounded, subtle stagger; keep navigation usable and avoid focus disruption |
| Content groups | Inspected delays around 0.222222–0.266667s | Short group delays, not ever-increasing delays across the whole document |
| Circle highlight | draw configuration, duration 0.5s, but isAnimationEnabled=false | Keep circles static unless later evidence or user instruction enables drawing |
| Menu | Local visibility toggle; original runtime disabled | Preserve accessible drawer focus wrapping/restoration, Escape and scroll cleanup |

Do not infer parallax, slide, scale, page transitions, looping animations or draw effects from unused stylesheet classes. Existing limited hover transforms are implemented separately; source fidelity has not been certified.

## 4. Future shared animation architecture — not code written now
1. Load a single original motion module and authored stylesheet through SiteLayout. Reuse it on the homepage and every subsequently authorized route; do not paste separate behavior into each page.
2. Centralize fade duration, easing and bounded stagger settings in tokens.css. Use the existing content architecture and shared components.
3. Select coherent entry units and avoid fading both a parent and its children. Trigger once on viewport entry; avoid animation that changes document geometry or repeatedly hides content.
4. Content must be visible without JavaScript, with missing browser APIs or on initialization failure. Provide reliable visibility cleanup and no permanently hidden states.
5. Honor prefers-reduced-motion at initialization and when it changes during a session. Cancel motion and restore visible content without interfering with focus, menu state or scrolling.
6. Preserve the current image override, text, brand and font settings. Do not import hosted executable bundles, tracking, external runtime dependencies or private reference captures.
7. Register actual functions and components in FUNCTION_INDEX and per-commit change notes only when implemented. This plan does not claim those symbols already exist.

## 5. Coverage for later page work
When separately authorized, apply the shared policy to About, The Process, Work/Available/Archived, Press, Collaborations and collaboration details, and Contact. Each route must use SiteLayout. These are future coverage targets, not existing routes or an instruction to build them during this request. Reconcile their paths with the current navigation dictionary rather than the obsolete architecture-route examples below.

## 6. Verification gate for a future implementation
- Check real opacity progression, easing/duration, bounded staggering and once-only viewport entry.
- Check normal/reduced motion, preference changes during animation, no JavaScript and missing-observer fallback.
- Confirm keyboard focus visibility, skip link, drawer dismissal/restoration and scrolling remain correct.
- Test 1440×1000, 1280×800, 768×1024, 390×844 and overflow at 360/430px; inspect bounding boxes rather than relying on hidden overflow.
- Decode configured images, verify local font loading, block external network requests and inspect console/local request failures.
- Exercise every route actually implemented at that time. Keep captures private and report only checks actually run.
- Full source content-swap, licensing, accessibility and unused-asset audits remain separate later deliverables.

## 7. Current authorization
Update agent instructions, handoff and planning records only. No page build, new animation code, image restoration, publishing or push. The original Stage 01 restart instruction at the end of the historical proposal is obsolete: preserve legitimate Git history and continue only from a newly authorized task.

---

# Historical Revision 2 proposal — retained for technical reference

**Historical material:** The following proposal predates the user’s artist-content change, dark-image override, completed Stages 05–06 and documentation-only animation clarification. Its conflicting examples and instructions are superseded by the current revision above. Do not execute it as a fresh plan or treat its proposed checks as completed evidence.

# Master Implementation Plan: Centralized, Editable Astro Portfolio Website

**Document Status**: Proposal for Review (Planning Mode)<br>
**Target Workspace**: `D:\projects\landing-page-build`<br>
**Framework & Runtime**: Astro v7.4.4 (Static SSG), Vite v8.3.5, Node.js v24.19.0, npm 11.17.0<br>
**Author**: Teamwork Worker Planning Group (`worker_plan_1`, amended & strengthened by `worker_plan_2`)<br>
**Date**: 2026-10-29 (Revision 2 — Integrating Challenger & Reviewer Empirical Findings)

---

## 1. Executive Summary & Baseline Assessment

### 1.1 Project Purpose & Core Architecture
The primary objective of this project is to build an editable, high-fidelity creative portfolio website from scratch in `D:\projects\landing-page-build`. The architecture is deliberately engineered to separate editorial content, imagery, and design tokens from presentation markup:
- **Core Technology Stack**: Pure static generation (`output: "static"`) using Astro v7.4.4, semantic HTML5, authored modern CSS (`tokens.css`, `fonts.css`, `global.css`), and lightweight vanilla JavaScript modules (`site.js`). Tailwind CSS v4.3.3 is available as an optional utility layer for transition and motion effects with strict reduced-motion overrides.
- **Client Centralization Guarantee**: 100% of visible wording, page headings, button labels, navigation hierarchies, page section orderings, image metadata, and gallery items reside in centralized JSON dictionaries in `src/content/`. An IT client or non-technical editor can replace images, rewrite copy, change focal crops, adjust global colors, or reorder sections without editing Astro templates or touching JavaScript logic.
- **Local Asset Isolation**: All images and fonts are served strictly locally from `public/images/` and `public/fonts/`. No external CDNs (such as Google Fonts or Typekit), analytics trackers, or third-party hosted scripts are permitted. All assets carry verified open licenses (CC0, SIL Open Font License, MIT/Apache) and are tracked in legal compliance records.
- **Privacy & Security Boundaries**: All private authoring instructions, reference captures, screenshots, and internal logs are strictly Git-ignored and physically excluded from the production build output (`dist/`).

---

### 1.2 Specification Reconciliation Matrix across 6 Documents
The project specifications have been mined and reconciled across the six primary governance documents:

| Specification Document | Role & Authority | Key Directives Reconciled into Plan |
|---|---|---|
| `AGENTS.md` | Local Repository Contract | Strict neutral branding; 100% local open-license assets; tracking `THIRD_PARTY_NOTICES.md` and `docs/asset-manifest.json`; zero external tracking; Git-ignored private files; per-commit symbol/function tracking. |
| `prd.md` | Product Requirements Document | 5 required launch routes (`/`, `/about/`, `/process/`, `/work/`, `/contact/`); 5 centralized content schemas; target user personas (Visitor, Content Editor, Contributor); WCAG AA accessibility standards; 6-viewport testing matrix (1440, 1280, 768, 390, 360, 430px). |
| `design.md` | Visual & Design System Specification | Warm minimalist editorial character; 6-token color system (`#faf9f6`, `#ffffff`, `#171717`, `#545454`, `#dded39`); fluid typography scale using `clamp()`; modular 6-step spacing scale; restrained opacity/transform transitions; strict `prefers-reduced-motion` compliance. |
| `agent.md` | Execution & Change-Recording Standard | Strict linear 13-stage Git commit workflow; mandatory JSDoc for functions; frontmatter responsibility comments for Astro components; persistent `docs/FUNCTION_INDEX.md`; 8-section per-commit change notes in `docs/changes/`; post-final genuine commit proof export. |
| `AGENT_BUILD_INSTRUCTIONS.md` | Authoritative Technical & Content Blueprint | Exact directory structure; JSON schema definitions for `text.en.json`, `images.json`, `navigation.json`, `pages.json`, `artworks.json`; structured emphasis formatting (`{ text, emphasis, highlight }`) avoiding `set:html`; automated `validate-content.mjs`; client-editing regression testing protocol. |
| `AGENT_HANDOFF.md` | Baseline Handoff & Status Assessment | Baseline confirmation as of 29 October 2026: 0 commits on `main`, zero application code in `src/`, installed dependencies frozen in `package-lock.json`, dependency override `@types/estree: 1.0.8`, local remote `origin` pointing to GitHub. |

---

### 1.3 Completed Preparation vs. Pending Work Inventory

A rigorous audit of the filesystem in `D:\projects\landing-page-build` establishes a clean distinction between preparatory artifacts and pending implementation work:

#### A. Completed Preparation (Verified on Disk)
1. **Git Repository Initialization**: Local Git repository initialized on branch `main` with user identity configured (`user.name=K Inish Kumar`, `user.email=inishk3@gmail.com`).
2. **Exclusion Rules (`.gitignore`)**: 45-line policy configured and actively ignoring `.agents/`, `.codex/`, `AGENTS.md`, `agent.md`, `AGENT*.md`, `ref.md`, `evidence/`, `screenshots/`, `scripts/*reference*`, `docs/design-measurements.md`, `docs/route-inventory.md`, `node_modules/`, `dist/`, `.astro/`, and `commit-proof.*`.
3. **Runtime Dependencies (`package.json` & `package-lock.json`)**: Fully populated `node_modules/` with Astro v7.4.4, Tailwind v4.3.3, `@tailwindcss/vite` v4.3.3, `@playwright/test` v1.64.1, `pixelmatch` v8.0.0, and `pngjs` v7.0.0. The override `"@types/estree": "1.0.8"` is locked.
4. **Authoring Specifications & Evidence**: `prd.md`, `design.md`, `agent.md`, `AGENTS.md`, `AGENT_BUILD_INSTRUCTIONS.md`, and `AGENT_HANDOFF.md` exist locally. Reference visual captures and raw measurement notes are stored in ignored `evidence/reference/live/`.

#### B. Work Still Required (Pending Implementation)
1. **Configuration**: Author `astro.config.mjs` configured for static output (`output: 'static'`) and Vite integration importing and configuring `@tailwindcss/vite` (`import tailwindcss from '@tailwindcss/vite'`). Configure `"prebuild"` and `"pretest"` lifecycle hooks in `package.json` enforcing automated validation.
2. **Centralized Content Layer (`src/content/`)**: Author the 5 core JSON schemas (`text.en.json`, `images.json`, `navigation.json`, `pages.json`, `artworks.json`) with complete original copy and metadata.
3. **Design System & Styling (`src/styles/`)**: Author `tokens.css` (custom properties), `fonts.css` (`@font-face` declarations), and `global.css` (reset and fluid typography).
4. **Local Asset Acquisition (`public/`)**: Curate, download, optimize, and license-audit open-license images in `public/images/` and open-license WOFF2 fonts in `public/fonts/`.
5. **Astro Presentation Layer (`src/layouts/`, `src/components/`, `src/pages/`)**: Author `SiteLayout.astro`, reusable UI components (`Header`, `MobileDrawer`, `Footer`, `ResponsiveImage` with `aspectRatio` decoupling and tiered focal fallback, `FormattedText`, `Section`, `Gallery`, `Lightbox`), and the 7 route files (`index.astro`, `about.astro`, `process.astro`, `work.astro`, `contact.astro`, `colophon.astro`, `privacy.astro`).
6. **Client Behavior Modules (`src/scripts/`)**: Author vanilla JavaScript `site.js` for mobile drawer toggle, lightbox modal with DOM inline data island consumption, keyboard focus trap, Escape dismissal, body scroll lock, and local mock contact submission.
7. **Validation & Quality Tooling (`scripts/`, `tests/`)**: Author `scripts/validate-content.mjs` (validating chrome keys, component whitelist, image dimensions), `scripts/audit-build.mjs` (scanning `dist/` with banned token list), test helper `tests/test-helper.mjs` (configuring Playwright launch with `msedge`/`chrome` channel fallback), Playwright responsive test suites (`tests/responsive.test.mjs` with element-by-element bounding box overflow evaluation), accessibility tests (`tests/accessibility.test.mjs`), offline route interception tests (`tests/offline.test.mjs`), and atomic content regression test suites (`tests/content-swap.test.mjs`).
8. **Documentation & Legal Compliance (`docs/`, root)**: Author `docs/FUNCTION_INDEX.md`, `docs/EDITING_GUIDE.md`, `docs/ARCHITECTURE.md`, `docs/verification.md` (recording all test runs, viewport measurements, accessibility scores, and validation outputs), `docs/asset-manifest.json`, `THIRD_PARTY_NOTICES.md`, and the chronological 13-commit change notes in `docs/changes/001-*.md` through `docs/changes/013-*.md`.
9. **Git Commit History**: Execute the 13 sequential milestone commits from clean baseline to completion.

---

### 1.4 Git Repository Baseline & Environment State
- **Branch**: `main`
- **Commit Count**: `0` (`git log` reports `fatal: your current branch 'main' does not have any commits yet`)
- **Tracked Files**: `0` (`git ls-files` returns empty)
- **Untracked Preparatory Files**: `.gitignore`, `package.json`, `package-lock.json`, `prd.md`, `design.md`, `docs/progress.md`
- **Remote Configuration**: `origin` -> `https://github.com/inish2007/landing-page-build.git` (Public repository; local-only execution policy strictly prevents `git push` or remote publication)
- **Node Environment**: Node.js v24.19.0, npm 11.17.0, Windows x64

---

## 2. Architecture & Client Centralization System

### 2.1 Content Schema Specifications (The 5 Core Schemas)
All editable website content is strictly isolated from Astro templates and decoupled into five JSON files in `src/content/`.

```
src/content/
├── text.en.json          # Visible strings, headings, body copy, button labels, a11y text
├── images.json           # Image paths, dimensions, alt text, responsive focal points, credits
├── navigation.json       # Navigation links, order, and label key mappings
├── pages.json            # Page composition and section ordering
└── artworks.json         # Curated gallery artwork records
```

#### Schema 1: `src/content/text.en.json`
Stores every visible string across the website, organized by route and section namespace. Literal strings are strictly prohibited inside `.astro` templates.

```json
{
  "common": {
    "siteName": "Aura Creative Studio",
    "skipToContent": "Skip to main content",
    "menuOpenLabel": "Open navigation menu",
    "menuCloseLabel": "Close navigation menu",
    "scrollDown": "Scroll to explore",
    "backToTop": "Return to top",
    "statusIndicator": "Available for select architectural & visual commissions"
  },
  "nav": {
    "home": "Overview",
    "about": "Studio",
    "process": "Method",
    "work": "Archive",
    "contact": "Inquire"
  },
  "home": {
    "hero": {
      "eyebrow": "Architecture & Visual Arts",
      "headlineSegments": [
        { "text": "Form in " },
        { "text": "silence", "emphasis": "italic", "highlight": "circle" },
        { "text": ", space in light." }
      ],
      "subheadline": "A contemplative design practice creating architectural spaces and sculptural works that honor materials, proportion, and quiet permanence.",
      "primaryCta": "Explore the Archive",
      "secondaryCta": "Read our Method"
    },
    "statement": {
      "eyebrow": "Design Philosophy",
      "statementSegments": [
        { "text": "We believe architecture and physical objects should feel inevitable—built with " },
        { "text": "restraint", "emphasis": "italic" },
        { "text": " to outlast the noise of momentary trends." }
      ],
      "author": "Julian Vance",
      "authorTitle": "Founding Architect & Principal"
    },
    "features": {
      "eyebrow": "Selected Projects",
      "heading": "Recent Built & Sculptural Works",
      "viewAllLabel": "View complete archive"
    },
    "cta": {
      "heading": "Initiate a Conversation",
      "body": "We accept a limited number of residential, cultural, and object commissions each calendar year.",
      "buttonLabel": "Send an Inquiry"
    }
  },
  "about": { ... },
  "process": { ... },
  "contact": { ... },
  "footer": {
    "tagline": "Architecture, interiors, and sculptural objects rooted in structural clarity.",
    "colophonLabel": "Colophon & Notices",
    "privacyLabel": "Privacy Policy",
    "copyright": "© 2026 Aura Creative Studio. All rights reserved."
  }
}
```

#### Schema 2: `src/content/images.json`
Stores metadata for every image asset in the project. Components use this manifest to guarantee intrinsic aspect-ratio reservation (zero cumulative layout shift) and responsive focal cropping. In addition, the presentation layer supports an explicit `aspectRatio` container prop that decouples template layout geometry from swapped asset intrinsic dimensions.
Responsive focal points utilize a robust **tiered fallback resolution**:
`position.mobile || position.desktop || '50% 50%'`
This guarantees that if an editor omits `position.mobile`, the desktop focal point is gracefully inherited, and if both are omitted, a safe center crop (`50% 50%`) is applied.

```json
{
  "homeHero": {
    "src": "/images/home-hero.webp",
    "alt": "Minimalist concrete pavilion courtyard with geometric light shadows at dawn",
    "width": 2400,
    "height": 1600,
    "fit": "cover",
    "position": {
      "desktop": "50% 45%",
      "mobile": "40% 50%"
    },
    "credit": "Photograph by Studio Forma, CC0 Public Domain"
  },
  "homeIntroSide": {
    "src": "/images/sculpture-detail.webp",
    "alt": "Monolithic textured stone sculpture in natural side-lighting",
    "width": 1200,
    "height": 1600,
    "fit": "cover",
    "position": {
      "desktop": "50% 50%",
      "mobile": "50% 50%"
    },
    "credit": "Photograph by Studio Forma, CC0 Public Domain"
  },
  "aboutPortrait": { ... },
  "processStudio": { ... }
}
```

#### Schema 3: `src/content/navigation.json`
Defines the site navigation structure for header, mobile drawer, footer, and secondary links.

```json
{
  "header": [
    { "id": "home", "path": "/", "labelKey": "nav.home", "isExternal": false },
    { "id": "about", "path": "/about/", "labelKey": "nav.about", "isExternal": false },
    { "id": "process", "path": "/process/", "labelKey": "nav.process", "isExternal": false },
    { "id": "work", "path": "/work/", "labelKey": "nav.work", "isExternal": false },
    { "id": "contact", "path": "/contact/", "labelKey": "nav.contact", "isExternal": false }
  ],
  "footer": [
    { "id": "about", "path": "/about/", "labelKey": "nav.about", "isExternal": false },
    { "id": "process", "path": "/process/", "labelKey": "nav.process", "isExternal": false },
    { "id": "work", "path": "/work/", "labelKey": "nav.work", "isExternal": false },
    { "id": "contact", "path": "/contact/", "labelKey": "nav.contact", "isExternal": false },
    { "id": "colophon", "path": "/colophon/", "labelKey": "footer.colophonLabel", "isExternal": false },
    { "id": "privacy", "path": "/privacy/", "labelKey": "footer.privacyLabel", "isExternal": false }
  ],
  "social": [
    { "id": "journal", "url": "#journal", "label": "Journal", "isExternal": false },
    { "id": "index", "url": "#index", "label": "Monograph", "isExternal": false }
  ]
}
```

#### Schema 4: `src/content/pages.json`
Defines page layout composition and section sequence. Allows non-technical clients to reorder sections or toggle features without editing template code. To maintain layout integrity and security, `section.component` values are strictly validated against an explicit **component whitelist** in `scripts/validate-content.mjs`:
`['HeroSection', 'StatementSection', 'SelectedWorkSection', 'ContactCtaSection', 'EditorialHeader', 'BiographySection', 'PhilosophyGrid', 'ProcessStep', 'Gallery', 'ContactForm']`.

```json
{
  "home": {
    "titleKey": "common.siteName",
    "metaDescriptionKey": "home.hero.subheadline",
    "sections": [
      { "id": "hero", "component": "HeroSection", "imageKey": "homeHero", "textNamespace": "home.hero" },
      { "id": "intro", "component": "StatementSection", "imageKey": "homeIntroSide", "textNamespace": "home.statement" },
      { "id": "features", "component": "SelectedWorkSection", "itemsKey": "featuredWork", "textNamespace": "home.features" },
      { "id": "cta", "component": "ContactCtaSection", "textNamespace": "home.cta" }
    ]
  },
  "about": {
    "titleKey": "nav.about",
    "metaDescriptionKey": "about.bioSummary",
    "sections": [
      { "id": "about-hero", "component": "EditorialHeader", "textNamespace": "about.header" },
      { "id": "about-narrative", "component": "BiographySection", "imageKey": "aboutPortrait", "textNamespace": "about.story" },
      { "id": "about-values", "component": "PhilosophyGrid", "textNamespace": "about.principles" }
    ]
  },
  "process": { ... },
  "work": { ... },
  "contact": { ... },
  "colophon": { ... },
  "privacy": { ... }
}
```

#### Schema 5: `src/content/artworks.json`
Curated collection of portfolio items for the `/work/` gallery and homepage featured sections.
**Client Data Flow Architecture**: To eliminate client-side network dependencies, CORS issues, and runtime 404s, `src/pages/work.astro` serializes `artworks.json` directly into the rendered DOM as an **inline JSON data island** (`<script type="application/json" id="artworks-data">`). The client-side vanilla JavaScript module (`src/scripts/site.js`) parses this island synchronously during `initLightbox()`, ensuring instant, offline modal interactions without requiring a runtime `fetch()`.

```json
[
  {
    "id": "pavilion-k",
    "title": "Pavilion K",
    "year": 2025,
    "category": "Architecture",
    "medium": "Board-formed concrete, weathered cedar, glass",
    "dimensions": "420 m²",
    "imageKey": "pavilionKMain",
    "captionKey": "artworks.pavilionK.caption",
    "featured": true,
    "order": 1
  },
  {
    "id": "monolith-ii",
    "title": "Monolith Study II",
    "year": 2024,
    "category": "Sculpture",
    "medium": "Basalt stone, blackened steel base",
    "dimensions": "180 × 65 × 40 cm",
    "imageKey": "monolithIIMain",
    "captionKey": "artworks.monolithII.caption",
    "featured": true,
    "order": 2
  }
]
```

---

### 2.2 Structured Emphasis Formatting Engine (No Raw HTML / No `set:html`)
To prevent cross-site scripting (XSS), template breakage, and visual corruption when clients edit copy, rich formatting (such as italics, bold, or circle accent highlights) is strictly prohibited from containing raw HTML strings.

Instead, the system employs **Structured Emphasis Segments**:
- Content editors express rich headlines as an array of JSON objects:
  ```json
  [
    { "text": "Crafting " },
    { "text": "monolithic", "emphasis": "italic", "highlight": "circle" },
    { "text": " spaces for reflection." }
  ]
  ```
- The `src/components/FormattedText.astro` component accepts either a simple string or a structured array. When processing segments, it maps validated properties directly to semantic elements and CSS utility classes:
  - `emphasis: "italic"` -> `<em class="font-serif italic font-normal">...</em>`
  - `emphasis: "bold"` -> `<strong class="font-medium">...</strong>`
  - `highlight: "circle"` -> `<span class="highlight-circle">...</span>`
  - `highlight: "accent"` -> `<span class="highlight-accent">...</span>`
- **Security & Stability Rules**:
  - The component never uses Astro's `set:html`.
  - All text is sanitized and rendered as standard text nodes.
  - Unknown properties or invalid types default safely to plain unstyled text.

---

### 2.3 `ResponsiveImage.astro` Architecture: Aspect Ratio Decoupling & Tiered Focal Crop Fallback
To provide resilience against non-technical client image swaps, `ResponsiveImage.astro` decouples template layout geometry from raw asset dimensions and implements tiered focal positioning:

#### Component Specification & Props
- `imageKey` (string, required): Key resolving to metadata in `src/content/images.json`.
- `aspectRatio` (string, optional, e.g. `'16/9'`, `'4/3'`, `'1/1'`, `'3/2'`): Explicit container aspect ratio. Decouples editorial layout structure from the intrinsic dimensions of swapped assets. When an editor uploads an image with slightly different dimensions, the container maintains visual stability without causing cumulative layout shift (CLS) or grid distortion.
- `loading` (`'lazy' | 'eager'`, optional, defaults to `'lazy'`): Configured to `'eager'` on hero sections and `'lazy'` elsewhere.
- `priority` (boolean, optional, defaults to `false`): Sets `fetchpriority="high"` and `decoding="async"` for LCP optimization.
- `className` (string, optional): Supplementary styling utilities.

#### Tiered Mobile Crop Fallback Logic
Focal points are computed via strict tiered fallback resolution:
```javascript
const desktopPosition = imageMeta.position?.desktop || '50% 50%';
const mobilePosition = imageMeta.position?.mobile || imageMeta.position?.desktop || '50% 50%';
```
- If the editor defines both `mobile` and `desktop`, each viewport renders its dedicated crop.
- If the editor only configures `desktop`, the mobile viewport automatically inherits `desktop` positioning instead of reverting to arbitrary cropping.
- If neither is defined, the system defaults safely to balanced center-crop (`50% 50%`).

#### Markup & CSS Implementation Pattern
```astro
---
import { getImage } from '../utils/content.js';

interface Props {
  imageKey: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  className?: string;
}

const { imageKey, aspectRatio, loading = 'lazy', priority = false, className = '' } = Astro.props;
const image = getImage(imageKey);

const desktopPos = image.position?.desktop || '50% 50%';
const mobilePos = image.position?.mobile || image.position?.desktop || '50% 50%';
const containerRatio = aspectRatio || `${image.width} / ${image.height}`;
---

<div class={`image-container ${className}`} style={`--aspect-ratio: ${containerRatio};`}>
  <img
    src={image.src}
    alt={image.alt}
    width={image.width}
    height={image.height}
    loading={loading}
    fetchpriority={priority ? 'high' : 'auto'}
    decoding="async"
    class="responsive-img"
    style={`--desktop-pos: ${desktopPos}; --mobile-pos: ${mobilePos};`}
  />
</div>

<style>
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: var(--aspect-ratio);
    overflow: hidden;
    background-color: var(--color-border);
  }
  .responsive-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: var(--desktop-pos);
    transition: opacity var(--motion-standard) var(--motion-ease);
  }
  @media (max-width: 48rem) {
    .responsive-img {
      object-position: var(--mobile-pos);
    }
  }
</style>
```

---

### 2.4 Centralized Design Tokens (`tokens.css`) & Local Typography (`fonts.css`)
Global visual styling is declared via CSS custom properties in `src/styles/tokens.css` and local `@font-face` blocks in `src/styles/fonts.css`.

#### Tokens (`src/styles/tokens.css`)
```css
:root {
  /* Color Palette */
  --color-canvas: #faf9f6;
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-muted: #545454;
  --color-border: #e6e4df;
  --color-accent: #dded39;
  --color-accent-text: #171717;
  --color-focus: #171717;

  /* Typography Stacks */
  --font-serif: "Fraunces", Georgia, Cambria, "Times New Roman", serif;
  --font-sans: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Fluid Typography Scale */
  --text-display: clamp(2.25rem, 5vw + 1rem, 5.5rem);      /* 36px -> 88px */
  --text-statement: clamp(1.75rem, 3.5vw + 0.8rem, 4rem);    /* 28px -> 64px */
  --text-h1: clamp(1.625rem, 2.5vw + 0.8rem, 3rem);        /* 26px -> 48px */
  --text-h2: clamp(1.375rem, 1.8vw + 0.6rem, 2.25rem);     /* 22px -> 36px */
  --text-body: clamp(1rem, 0.4vw + 0.9rem, 1.125rem);       /* 16px -> 18px */
  --text-caption: clamp(0.8125rem, 0.2vw + 0.75rem, 0.875rem); /* 13px -> 14px */
  --text-nav: 0.875rem;                                    /* 14px */

  /* Modular Spacing Scale */
  --space-1: 0.5rem;   /* 8px */
  --space-2: 1rem;     /* 16px */
  --space-3: 1.5rem;   /* 24px */
  --space-4: 2.5rem;   /* 40px */
  --space-5: 4rem;     /* 64px */
  --space-6: 6rem;     /* 96px */

  /* Layout Boundaries */
  --content-max: 90rem;                                     /* 1440px */
  --content-narrow: 56rem;                                  /* 896px */
  --page-gutter: clamp(1.25rem, 3vw, 3rem);

  /* Motion Tokens */
  --motion-fast: 160ms;
  --motion-standard: 320ms;
  --motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Fonts (`src/styles/fonts.css`)
Fonts are hosted locally in `public/fonts/` as self-contained WOFF2 files:
```css
@font-face {
  font-family: "Fraunces";
  src: url("/fonts/fraunces-opsz-wght.woff2") format("woff2-variations");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Fraunces";
  src: url("/fonts/fraunces-italic-opsz-wght.woff2") format("woff2-variations");
  font-weight: 300 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("/fonts/plus-jakarta-sans-wght.woff2") format("woff2-variations");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
```

---

### 2.5 Client Independence & Editability Flow
The client editing model provides non-technical stakeholders complete autonomy over content and assets, reinforced by automated build lifecycle hooks:

```
┌────────────────────────────────────────────────────────┐
│ Non-Technical Client / Content Editor                  │
│                                                        │
│  - Edits text / buttons:   src/content/text.en.json    │
│  - Swaps photos & crops:   src/content/images.json     │
│  - Drops files into:       public/images/              │
│  - Adjusts menu links:     src/content/navigation.json │
│  - Reorders sections:      src/content/pages.json      │
│  - Updates portfolio:      src/content/artworks.json   │
│  - Tweaks brand colors:    src/styles/tokens.css       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Automated Lifecycle Hooks ("prebuild" & "pretest")     │
│ Enforces: node scripts/validate-content.mjs            │
│                                                        │
│  - Checks JSON syntax & missing keys                   │
│  - Validates root/chrome copy (common, nav, footer)    │
│  - Enforces component whitelist in pages.json          │
│  - Confirms image file exists in public/images/        │
│  - Validates positive width, height & focal coords     │
│  - Confirms internal link targets resolve              │
└──────────────────────────┬─────────────────────────────┘
                           │ Exit 0 (Passes Validation)
                           ▼
┌────────────────────────────────────────────────────────┐
│ Astro Static Site Generator (astro build)              │
│                                                        │
│  - Imports centralized data helpers (utils/content.js) │
│  - Injects data into SiteLayout, ResponsiveImage, etc. │
│  - Compiles clean static HTML/CSS/JS into dist/        │
└────────────────────────────────────────────────────────┘
```

**Build Pipeline Gatekeeping**:
To guarantee that content validation cannot be accidentally bypassed by developers or CI environments, `package.json` binds validation directly to the npm lifecycle:
- `"prebuild": "node scripts/validate-content.mjs"`
- `"pretest": "node scripts/validate-content.mjs"`
Any invocation of `npm run build` or `npm test` automatically triggers content validation. If a client edit introduces a malformed JSON string, broken image path, unmapped key, or illegal component name, the build terminates immediately before compilation, returning a precise diagnostics report.

**What the Client Can Modify Without Touching Code**:
1. **Headline Copy**: Change any headline or body paragraph in `text.en.json`.
2. **Emphasis Formatting**: Emphasize words with italics or accent circles by updating JSON segment objects.
3. **Image Swapping**: Place a new image into `public/images/` and update `src/content/images.json` with the new filename, dimensions, alt text, and crop coordinates. Container geometry remains stable via `aspectRatio`.
4. **Focal Cropping**: Change `position.desktop` or `position.mobile` (e.g., from `"50% 50%"` to `"20% 40%"`). If mobile is omitted, it inherits desktop.
5. **Section Reordering**: Change the order of section items in `pages.json` to swap where sections appear on any route.
6. **Navigation Targets**: Add, reorder, or rename menu items in `navigation.json`.
7. **Brand Palette**: Tweak hex codes in `tokens.css` (e.g. `--color-accent`) to adjust brand highlights across the entire site instantly.

---

## 3. Asset Management & Legal Attribution Strategy

### 3.1 Local Open-License Image Acquisition & Optimization
- **Repository Location**: `public/images/`
- **Format & Optimization**: Modern WebP and progressive JPEG formats, compressed for web performance (sub-300KB for hero banners; sub-150KB for gallery thumbnails).
- **Naming Convention**: Clean, descriptive, kebab-case filenames (e.g., `home-hero.webp`, `architectural-courtyard.webp`, `sculpture-detail.webp`, `studio-desk.webp`). Hashes or external website IDs are strictly forbidden.
- **License Standard**: 100% CC0 (Creative Commons Zero / Public Domain Dedication) or permissive open licenses verified directly on source platforms (Unsplash, Pexels, Wikimedia Commons). "Free to view" is not an accepted license.

---

### 3.2 Local Open-License Typography Strategy (WOFF2)
- **Repository Location**: `public/fonts/`
- **Selection**:
  - **Display Serif**: *Fraunces* (Designed by Phaedra Charles, Flavia Zimbardi, Undercase Type; SIL Open Font License v1.1). Expressive editorial serif matching the warm, organic aesthetic of high-end architectural publications.
  - **Body / Functional Sans-Serif**: *Plus Jakarta Sans* (Designed by Gumpita Rahayu, Tokotype; SIL Open Font License v1.1). Clean geometric sans-serif ensuring crisp legibility at small sizes for navigation, labels, and captions.
- **Format**: Local `.woff2` files served with `font-display: swap` to eliminate render-blocking network delays.

---

### 3.3 Legal Provenance & Licensing Manifest
All asset origins, licenses, and legal notices are permanently tracked in two tracked repository files:

1. **`THIRD_PARTY_NOTICES.md`**: Contains the full text of the SIL Open Font License v1.1 for Fraunces and Plus Jakarta Sans, along with copyright notices and public domain dedications for all curated images.
2. **`docs/asset-manifest.json`**: Machine-readable provenance index detailing source URL, creator, license type, retrieval date, local path, and required attribution string:
   ```json
   {
     "fonts": [
       {
         "name": "Fraunces",
         "creator": "Phaedra Charles, Flavia Zimbardi (Undercase Type)",
         "license": "SIL Open Font License 1.1",
         "licenseUrl": "https://scripts.sil.org/OFL",
         "localFiles": ["/fonts/fraunces-opsz-wght.woff2", "/fonts/fraunces-italic-opsz-wght.woff2"]
       },
       {
         "name": "Plus Jakarta Sans",
         "creator": "Gumpita Rahayu (Tokotype)",
         "license": "SIL Open Font License 1.1",
         "licenseUrl": "https://scripts.sil.org/OFL",
         "localFiles": ["/fonts/plus-jakarta-sans-wght.woff2"]
       }
     ],
     "images": [
       {
         "id": "homeHero",
         "localPath": "/images/home-hero.webp",
         "sourcePlatform": "Unsplash / CC0 Public Domain",
         "creator": "Studio Forma",
         "license": "CC0 1.0 Universal",
         "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
         "retrievalDate": "2026-10-29",
         "attributionRequired": false,
         "credit": "Photograph by Studio Forma, CC0"
       }
     ]
   }
   ```

---

### 3.4 Neutral Branding & Original Content Guardrails
- **Project Identity**: `landing-page-build` in package metadata; display identity "Aura Creative Studio" / "Aura Architecture & Visual Arts".
- **Strict Brand Isolation**: No external website logos, trademarks, client names, staff names, or proprietary project titles may appear in templates, assets, or metadata.
- **Original Copywriting**: All biography, philosophy, project captions, and method descriptions are 100% original prose composed specifically for this architectural studio portfolio.

### 3.5 Privacy & Security Exclusion Protocol (Zero Leakage into Git or `dist/`)
- **Exclusion Audit**: `.gitignore` rigorously ignores `.agents/`, `.codex/`, `AGENTS.md`, `agent.md`, `AGENT*.md`, `ref.md`, `evidence/`, `screenshots/`, `scripts/*reference*`, `docs/design-measurements.md`, `docs/route-inventory.md`, and `commit-proof.*`.
- **Production Bundle Isolation**: Astro builds strictly from `src/` and copies static assets from `public/`. Because private reference tooling resides in `scripts/` and `evidence/`, they are never bundled into `dist/`.
- **Pre-Release Cleanliness Audit**: Stage 12 and 13 include an automated build audit (`scripts/audit-build.mjs`) scanning every compiled file in `dist/` against an explicit **banned token list** containing external reference identifiers:
  `['lana', 'gomez', 'orpheus', 'roc', 'pagerie', 'shay']`
  In addition, the audit scans for private file paths, agent metadata, internal notes, and source maps (`.map`), guaranteeing zero reference leakage in `dist/`.

---

## 4. Phase-by-Phase Implementation Blueprint (13 Sequential Stages)

The implementation strictly follows the 13 sequential milestone stages defined in `AGENT_BUILD_INSTRUCTIONS.md`. Every stage produces an atomic, working, verifiable Git commit with structured documentation.

```
Stage 01 ──► Stage 02 ──► Stage 03 ──► Stage 04 ──► Stage 05 ──► Stage 06 ──► Stage 07
Tracking     Scaffold    Content &    Shared Chrome  Desktop     Responsive    About &
Baseline     Astro       Tokens       & Navigation   Homepage    & Motion      Process
                                                                                  │
Stage 13 ◄── Stage 12 ◄── Stage 11 ◄── Stage 10 ◄── Stage 09 ◄── Stage 08 ◄──────┘
Docs &       Verification Polish &     Secondary    Contact      Work Gallery
Proof        & Build Audit Content Test Routes      & Form       & Lightbox
```

---

### Stage 01: Project Baseline & Tracking Setup

#### Purpose & Objectives
Establish clean Git tracking baseline, freeze project scope, create contributor registries (`docs/FUNCTION_INDEX.md`, `docs/progress.md`), and record the initial change note.

#### Files to Create or Change
- Create `docs/FUNCTION_INDEX.md` (initial table of symbols and tools)
- Update `docs/progress.md` (initialize 13-stage milestone tracker)
- Create `docs/changes/001-baseline-tracking.md` (8-section change documentation)
- Track existing baseline configuration files: `.gitignore`, `package.json`, `package-lock.json`, `prd.md`, `design.md`

#### Dependencies
Clean repository state confirmed; survey handoff verified.

#### Detailed Implementation Steps
1. Review `git status` to verify all untracked baseline files (`.gitignore`, `package.json`, `package-lock.json`, `prd.md`, `design.md`, `docs/progress.md`).
2. Run `git check-ignore -v` on private paths (`AGENTS.md`, `agent.md`, `ref.md`, `evidence/`) to guarantee ignore rules are intact.
3. Author `docs/FUNCTION_INDEX.md` with column headers: `Symbol/component`, `File`, `Responsibility`, `Inputs/outputs`, `Callers or consumers`, `Side effects`, `Relevant checks`.
4. Update `docs/progress.md` with the 13-stage roadmap and baseline environment status.
5. Environment verification: Note that Playwright headless Chromium binary is not present in local cache. Explicitly specify that test suites will use `tests/test-helper.mjs` configured with `chromium.launch({ channel: 'msedge', headless: true })` or `channel: 'chrome'` fallback, and note `npx playwright install chromium` as an optional pre-step in local environment setup if a dedicated Chromium binary is desired.
6. Author `docs/changes/001-baseline-tracking.md` documenting the baseline freeze, existing files, and zero-commit start.
7. Stage only the authorized baseline files (`git add .gitignore package.json package-lock.json prd.md design.md docs/`).
8. Run `git diff --cached --check` to verify no whitespace errors.
9. Execute Commit 01.

#### Acceptance & Verification Checks
- `git status` shows clean working tree with only ignored private files untracked.
- `git log -1` confirms Commit 01 created.
- `git ls-files` lists only authorized files; zero private files tracked.

#### Intended Commit Subject & Body
```text
docs: freeze reference scope and editing contract

Functions added: None
Functions changed: None
Functions removed: None
Components: None
Content: None
Checks: git status, git check-ignore, git diff --cached --check
Change note: docs/changes/001-baseline-tracking.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 01 complete.
- `docs/FUNCTION_INDEX.md`: Initialize tooling registry.
- `docs/changes/001-baseline-tracking.md`: Created with 8 mandatory sections.

---

### Stage 02: Minimal Astro Project Scaffolding

#### Purpose & Objectives
Create a minimal, runnable Astro static project shell with baseline configuration, HTML layout shell, and an initial working index route to verify dev server and static build execution.

#### Files to Create or Change
- Create `astro.config.mjs` (Astro configuration with static output)
- Create `src/layouts/SiteLayout.astro` (minimal semantic HTML5 shell with viewport, charset, and title)
- Create `src/pages/index.astro` (initial minimal route consuming `SiteLayout`)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/002-astro-scaffolding.md`
- Update `docs/progress.md`

#### Dependencies
Stage 01 complete.

#### Detailed Implementation Steps
1. Create `astro.config.mjs` explicitly configuring static output and integrating Tailwind CSS via `@tailwindcss/vite`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     output: 'static',
     server: { host: '127.0.0.1', port: 4321 },
     vite: {
       plugins: [tailwindcss()]
     }
   });
   ```
2. Create `src/layouts/SiteLayout.astro` providing semantic `<html lang="en">`, `<head>`, viewport meta tags, skip-to-content link, and `<slot />`.
3. Create `src/pages/index.astro` rendering a minimal welcome container.
4. Run `npm run build` to verify Astro static generation executes without error and generates `dist/index.html`.
5. Run `npm run preview` in background to verify local preview server serves the page.
6. Register `SiteLayout.astro` and `index.astro` in `docs/FUNCTION_INDEX.md`.
7. Author `docs/changes/002-astro-scaffolding.md`.
8. Stage and commit Stage 02.

#### Acceptance & Verification Checks
- `npx astro check` passes.
- `npm run build` produces clean static HTML in `dist/`.
- `dist/index.html` contains semantic HTML shell and skip-link.

#### Intended Commit Subject & Body
```text
chore: scaffold Astro HTML CSS and JavaScript project

Functions added: None
Functions changed: None
Functions removed: None
Components: SiteLayout.astro, index.astro
Content: None
Checks: npm run build, npx astro check
Change note: docs/changes/002-astro-scaffolding.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 02 complete.
- `docs/FUNCTION_INDEX.md`: Add `SiteLayout.astro` and `index.astro`.
- `docs/changes/002-astro-scaffolding.md`: Created with 8 mandatory sections.

---

### Stage 03: Centralized Content Schemas, Design Tokens & Local Assets

#### Purpose & Objectives
Establish the complete client centralization layer: 5 core JSON schemas, CSS design tokens, local open-license WOFF2 fonts, local CC0 images, the content helper utility, and the automated pre-build content validator.

#### Files to Create or Change
- Create `src/content/text.en.json` (complete dictionary of visible copy)
- Create `src/content/images.json` (image metadata, dimensions, focal positions, credits)
- Create `src/content/navigation.json` (header, footer, social link hierarchies)
- Create `src/content/pages.json` (route compositions and section arrays)
- Create `src/content/artworks.json` (gallery portfolio items)
- Create `src/styles/tokens.css` (color tokens, typography scales, spacing scale, motion)
- Create `src/styles/fonts.css` (`@font-face` definitions for Fraunces and Plus Jakarta Sans)
- Create `src/styles/global.css` (base CSS reset, font assignments, smooth scroll overrides)
- Download font files to `public/fonts/` (`fraunces-opsz-wght.woff2`, `plus-jakarta-sans-wght.woff2`, etc.)
- Download and place open-license images in `public/images/`
- Create `src/utils/content.js` (content query helpers: `getCopy`, `getImage`, `getPageConfig`, `getNavigation`)
- Create `scripts/validate-content.mjs` (automated JSON, chrome key, component whitelist, and asset existence validator)
- Update `package.json` (add `"prebuild"` and `"pretest"` lifecycle hooks)
- Create `THIRD_PARTY_NOTICES.md` (full font and asset licenses)
- Create `docs/asset-manifest.json` (provenance, source URLs, credits)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/003-centralized-content-tokens.md`
- Update `docs/progress.md`

#### Dependencies
Stage 02 complete.

#### Detailed Implementation Steps
1. Populate `public/fonts/` with verified open-license WOFF2 font files.
2. Populate `public/images/` with curated CC0 architectural and sculptural images.
3. Author `src/styles/tokens.css` with CSS custom properties matching `design.md`.
4. Author `src/styles/fonts.css` with `@font-face` blocks.
5. Author `src/styles/global.css` importing tokens and fonts, defining modern CSS reset.
6. Author the 5 core JSON schemas in `src/content/`.
7. Author `src/utils/content.js` with exported helper functions:
   - `getCopy(keyPath, fallback)`: Resolves dot-notation path into `text.en.json`.
   - `getImage(imageKey)`: Returns metadata object from `images.json`.
   - `getNavigation(area)`: Returns nav array from `navigation.json`.
   - `getPageConfig(pageId)`: Returns page composition from `pages.json`.
8. Author `scripts/validate-content.mjs`:
   - Validates JSON parsing for all 5 content files.
   - **Chrome Copy Key Validation**: Explicitly validates root/chrome copy keys (`common.*`, `nav.*`, `footer.*`, `contact.*`) in `text.en.json` to guarantee core header, drawer, and footer strings exist.
   - **Component Whitelist Validation**: Validates `section.component` in `pages.json` against an explicit whitelist of supported component names: `['HeroSection', 'StatementSection', 'SelectedWorkSection', 'ContactCtaSection', 'EditorialHeader', 'BiographySection', 'PhilosophyGrid', 'ProcessStep', 'Gallery', 'ContactForm']`.
   - Confirms all image paths in `images.json` exist on disk in `public/images/`.
   - Confirms all image widths/heights are positive integers.
   - Confirms focal coordinates match valid percentage formats (`position.desktop`, `position.mobile`).
   - Scans `pages.json`, `navigation.json`, and `artworks.json` to verify every referenced text key and image key exists.
   - Exits with code 1 and precise error diagnostics if any validation check fails; exits with code 0 on success.
9. Configure `package.json` lifecycle pre-hooks:
   - Add `"prebuild": "node scripts/validate-content.mjs"`
   - Add `"pretest": "node scripts/validate-content.mjs"`
   This makes content validation impossible to bypass during any build or test run.
10. Author `THIRD_PARTY_NOTICES.md` and `docs/asset-manifest.json` with full licenses and credits.
11. Run `node scripts/validate-content.mjs` to verify zero errors.
12. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/003-centralized-content-tokens.md`.
13. Stage and commit Stage 03.

#### Acceptance & Verification Checks
- `node scripts/validate-content.mjs` exits with code 0 and reports all assets, chrome keys, and component names valid.
- Running `npm run build` triggers `prebuild` hook and runs `validate-content.mjs` automatically.
- Intentionally modifying a key or path causes `validate-content.mjs` to fail with clear error output, then reverted.
- `npm run build` succeeds with stylesheets linked in layout.

#### Intended Commit Subject & Body
```text
feat: add editable content assets and design tokens

Functions added: getCopy(), getImage(), getNavigation(), getPageConfig(), validateContent(), validateImageMetadata(), validateChromeKeys(), validateComponentWhitelist()
Functions changed: None
Functions removed: None
Components: None
Content: text.en.json, images.json, navigation.json, pages.json, artworks.json, tokens.css, fonts.css, global.css
Checks: node scripts/validate-content.mjs, npm run build (with prebuild validation hook)
Change note: docs/changes/003-centralized-content-tokens.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 03 complete.
- `docs/FUNCTION_INDEX.md`: Register content helpers and validator functions.
- `docs/changes/003-centralized-content-tokens.md`: Created with 8 mandatory sections.

---

### Stage 04: Shared Header, Footer & Responsive Navigation

#### Purpose & Objectives
Implement responsive site header, desktop navigation menu, mobile hamburger drawer, shared footer, and vanilla JavaScript behavior (`site.js`) for focus trapping, keyboard navigation, and body scroll locking.

#### Files to Create or Change
- Create `src/components/Header.astro` (top banner, brand identity, desktop menu, drawer toggle)
- Create `src/components/MobileDrawer.astro` (full-screen accessible overlay menu)
- Create `src/components/Footer.astro` (footer landmark, secondary links, colophon link, copyright)
- Create `src/scripts/site.js` (`initNavigation()`, `openDrawer()`, `closeDrawer()`, `handleDrawerKeydown()`, `lockScroll()`, `unlockScroll()`)
- Update `src/layouts/SiteLayout.astro` (integrate Header, Footer, MobileDrawer, and `site.js`)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/004-shared-navigation.md`
- Update `docs/progress.md`

#### Dependencies
Stage 03 complete.

#### Detailed Implementation Steps
1. Author `src/components/Header.astro`:
   - Renders `<header class="site-header">` with neutral studio brand title linking to `/`.
   - Renders desktop `<nav aria-label="Primary Navigation">` populated dynamically from `navigation.json`.
   - Renders mobile menu button with `aria-expanded="false"`, `aria-controls="mobile-nav-drawer"`, and accessible label from `text.en.json`.
2. Author `src/components/MobileDrawer.astro`:
   - Accessible modal drawer with `role="dialog"`, `aria-modal="true"`, `id="mobile-nav-drawer"`.
   - Contains close button, navigation links, and availability badge.
3. Author `src/components/Footer.astro`:
   - Semantic `<footer>` landmark with studio tagline, navigation links, copyright, and colophon link.
4. Author `src/scripts/site.js`:
   - `openDrawer()`: sets `aria-expanded="true"`, unhides drawer, activates `lockScroll()`, traps focus on close button.
   - `closeDrawer()`: sets `aria-expanded="false"`, hides drawer, activates `unlockScroll()`, returns focus to toggle button.
   - `handleDrawerKeydown(e)`: listens for `Escape` to close; cycles focus between first and last focusable elements on `Tab`/`Shift+Tab`.
   - `lockScroll()` / `unlockScroll()`: toggles `overflow: hidden` on `document.body` while maintaining scrollbar compensation.
5. Connect components inside `src/layouts/SiteLayout.astro`.
6. Test keyboard navigation: Tab cycling in drawer, Escape key close, and focus restoration.
7. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/004-shared-navigation.md`.
8. Stage and commit Stage 04.

#### Acceptance & Verification Checks
- Header and Footer render on desktop (1440px) and mobile (390px).
- Drawer opens on click; focus moves into drawer.
- Pressing `Escape` closes drawer and restores focus to hamburger button.
- Body scroll is locked while drawer is open.
- All navigation labels and URLs resolve from `navigation.json` and `text.en.json`.

#### Intended Commit Subject & Body
```text
feat: reproduce shared header footer and navigation

Functions added: initNavigation(), openDrawer(), closeDrawer(), handleDrawerKeydown(), lockScroll(), unlockScroll()
Functions changed: None
Functions removed: None
Components: Header.astro, MobileDrawer.astro, Footer.astro, SiteLayout.astro
Content: text.en.json (common, nav, footer), navigation.json
Checks: keyboard navigation test, drawer escape test, npm run build
Change note: docs/changes/004-shared-navigation.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 04 complete.
- `docs/FUNCTION_INDEX.md`: Register navigation functions and components.
- `docs/changes/004-shared-navigation.md`: Created with 8 mandatory sections.

---

### Stage 05: Desktop Homepage Composition & Editorial Sections

#### Purpose & Objectives
Build the complete desktop homepage with all approved editorial sections (Hero, Introductory Statement with structured highlights, Selected Work grid, and Contact Call-to-Action) driven entirely by centralized data.

#### Files to Create or Change
- Create `src/components/Section.astro` (section wrapper with consistent gutters, vertical rhythm, and stable IDs)
- Create `src/components/ResponsiveImage.astro` (image component handling aspect ratio, focal position, lazy/eager loading)
- Create `src/components/FormattedText.astro` (safe renderer for structured text highlights and emphasis)
- Create `src/components/HeroSection.astro` (homepage hero composition with title, eyebrow, and focal image)
- Create `src/components/StatementSection.astro` (editorial statement with structured highlight and side image)
- Create `src/components/SelectedWorkSection.astro` (featured portfolio grid pulling from `artworks.json`)
- Create `src/components/ContactCtaSection.astro` (prominent invitation to connect)
- Update `src/pages/index.astro` (dynamically renders sections from `pages.json`)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/005-desktop-homepage.md`
- Update `docs/progress.md`

#### Dependencies
Stage 04 complete.

#### Detailed Implementation Steps
1. Author `src/components/Section.astro` with props: `id`, `className`, `variant` (`default`, `surface`, `accent`).
2. Author `src/components/ResponsiveImage.astro`:
   - Accepts props: `imageKey` (required string), `aspectRatio` (optional string, e.g. `'16/9'`, `'4/3'`, `'1/1'`, `'3/2'`), `loading` (`'lazy' | 'eager'`, default `'lazy'`), `priority` (boolean, default `false`), `className` (string).
   - **Aspect Ratio Decoupling**: Implements container `aspectRatio` prop that decouples template layout geometry from swapped asset intrinsic dimensions, preventing cumulative layout shift and template distortion when images are updated.
   - **Tiered Mobile Crop Fallback**: Resolves focal coordinates with strict fallback:
     `const desktopPos = image.position?.desktop || '50% 50%';`
     `const mobilePos = image.position?.mobile || image.position?.desktop || '50% 50%';`
   - Generates semantic `<img>` with intrinsic `width`, `height`, `alt`, and `loading` attributes (`eager` for hero, `lazy` for others), applying `--desktop-pos` and `--mobile-pos` variables.
3. Author `src/components/FormattedText.astro`:
   - Parses structured segment objects safely into semantic spans and italics without `set:html`.
4. Author the section components (`HeroSection`, `StatementSection`, `SelectedWorkSection`, `ContactCtaSection`).
5. Update `src/pages/index.astro` to map `pages.json` section IDs to their corresponding Astro section components.
6. Verify layout and typography at desktop viewports (1440×1000 and 1280×800).
7. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/005-desktop-homepage.md`.
8. Stage and commit Stage 05.

#### Acceptance & Verification Checks
- All homepage copy comes directly from `text.en.json`.
- All images render with correct aspect ratios, alt text, and object positions from `images.json`.
- Reordering sections in `pages.json` cleanly swaps the display order on `index.astro`.
- Zero raw HTML injection; structured highlights render cleanly.
- `npm run build` passes.

#### Intended Commit Subject & Body
```text
feat: reproduce homepage desktop sections

Functions added: renderSegment()
Functions changed: None
Functions removed: None
Components: Section.astro, ResponsiveImage.astro, FormattedText.astro, HeroSection.astro, StatementSection.astro, SelectedWorkSection.astro, ContactCtaSection.astro, index.astro
Content: text.en.json (home), images.json (homeHero, homeIntroSide), pages.json (home)
Checks: desktop viewport layout check, validate-content.mjs, npm run build
Change note: docs/changes/005-desktop-homepage.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 05 complete.
- `docs/FUNCTION_INDEX.md`: Register section components and helpers.
- `docs/changes/005-desktop-homepage.md`: Created with 8 mandatory sections.

---

### Stage 06: Responsive Breakpoints, Mobile Layout & Reduced Motion

#### Purpose & Objectives
Refine mobile and tablet layouts across all viewports down to 360px, preventing horizontal overflow, adjusting typography clamps, adapting image crops to mobile focal coordinates, and strictly honoring `prefers-reduced-motion`.

#### Files to Create or Change
- Update `src/styles/tokens.css` (breakpoint variables, mobile gutter adjustments)
- Update `src/styles/global.css` (fluid layout rules, horizontal overflow prevention, reduced motion styles)
- Update `src/components/HeroSection.astro` (responsive stacking and mobile crop styles)
- Update `src/components/StatementSection.astro` (mobile offset adjustments)
- Update `src/components/SelectedWorkSection.astro` (single-column mobile grid)
- Create `tests/test-helper.mjs` (shared Playwright helper with `chromium.launch({ channel: 'msedge', headless: true })` and `channel: 'chrome'` fallback)
- Create `tests/responsive.test.mjs` (Playwright automated viewport rendering and element-by-element bounding box overflow assertions)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/006-responsive-motion.md`
- Update `docs/progress.md`

#### Dependencies
Stage 05 complete.

#### Detailed Implementation Steps
1. Add mobile-specific focal point styling to `ResponsiveImage.astro`:
   ```css
   .responsive-image {
     object-position: var(--desktop-pos);
   }
   @media (max-width: 48rem) {
     .responsive-image {
       object-position: var(--mobile-pos);
     }
   }
   ```
2. Apply fluid clamp typography so hero and editorial headlines naturally scale from 36px on mobile (360px) to 88px on large desktop without clipping or horizontal overflow.
3. Apply `overflow-x: hidden` and `max-width: 100%` on container boundaries.
4. Implement motion tokens in `tokens.css` with `@media (prefers-reduced-motion: reduce)` overrides disabling transitions, animations, and smooth-scrolling.
5. Create `tests/test-helper.mjs`:
   - Configures headless browser launch using `chromium.launch({ channel: 'msedge', headless: true })` or falling back to `channel: 'chrome'`. This eliminates dependencies on the uninstalled Playwright Chromium binary in local cache.
6. Author `tests/responsive.test.mjs`:
   - **Temporal Test Phasing**: In Stage 06, this suite specifically verifies the currently implemented route (`/`). In Stage 12, the test expands to all 7 routes after subpages are completed.
   - **Overflow Detection Precision**: Forbids relying solely on `overflow-x: hidden` or `scrollWidth <= innerWidth` (which can mask clipped visual overflow). Mandates element-by-element bounding box inspection across all 6 viewports (1440×1000, 1280×800, 768×1024, 390×844, 360×740, 430×932):
     ```javascript
     const badElements = await page.evaluate(() =>
       Array.from(document.querySelectorAll('*'))
         .filter(el => el.getBoundingClientRect().right > window.innerWidth)
         .map(el => ({ tag: el.tagName, id: el.id, class: el.className, right: el.getBoundingClientRect().right }))
     );
     assert.strictEqual(badElements.length, 0, `Overflowing elements at ${width}px: ${JSON.stringify(badElements)}`);
     ```
7. Run `node --test tests/responsive.test.mjs`.
8. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/006-responsive-motion.md`.
9. Stage and commit Stage 06.

#### Acceptance & Verification Checks
- `node --test tests/responsive.test.mjs` executes via `msedge` channel and passes with 0 failures across all 6 viewports on route `/`.
- Zero element bounding box overflows (`badElements.length === 0`) at 360px and 430px.
- Enabling `prefers-reduced-motion: reduce` halts all CSS transitions and drawer animations.

#### Intended Commit Subject & Body
```text
feat: match responsive homepage and motion

Functions added: getBrowser(), checkViewportOverflow(), checkElementBoundingBoxes()
Functions changed: None
Functions removed: None
Components: ResponsiveImage.astro, HeroSection.astro, StatementSection.astro, SelectedWorkSection.astro
Content: tokens.css, global.css
Checks: node --test tests/responsive.test.mjs, visual inspection at 360px and 430px
Change note: docs/changes/006-responsive-motion.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 06 complete.
- `docs/FUNCTION_INDEX.md`: Register `test-helper.mjs` and responsive test helpers.
- `docs/changes/006-responsive-motion.md`: Created with 8 mandatory sections.

---

### Stage 07: About and Process Editorial Routes

#### Purpose & Objectives
Implement the studio biography (`/about/`) and creative methodology (`/process/`) routes with complete original copywriting, editorial imagery, and structured narrative typography.

#### Files to Create or Change
- Create `src/pages/about.astro` (Studio narrative, founding philosophy, leadership portrait)
- Create `src/pages/process.astro` (Four-phase creative methodology with ordered image sequence)
- Create `src/components/ProcessStep.astro` (step card with phase number, headline, prose, and paired image)
- Update `src/content/text.en.json` (add complete `about` and `process` copy)
- Update `src/content/images.json` (add `aboutPortrait`, `processPhase1`, `processPhase2`, etc.)
- Update `src/content/pages.json` (add `about` and `process` section configurations)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/007-about-process-routes.md`
- Update `docs/progress.md`

#### Dependencies
Stage 06 complete.

#### Detailed Implementation Steps
1. Author original copywriting for Studio Biography in `text.en.json` under `"about"`:
   - Studio vision, architectural ethos, material integrity, and sustainability commitments.
2. Author original copywriting for Creative Process under `"process"`:
   - Four distinct phases: I. Inquiry & Site Meditation; II. Material Exploration; III. Tectonic Definition; IV. Craft & Permanence.
3. Author `src/components/ProcessStep.astro` accepting step metadata, rendering number badge, title, prose, and responsive image.
4. Author `src/pages/about.astro` importing `SiteLayout` and rendering editorial portrait, narrative statement, and core principles.
5. Author `src/pages/process.astro` rendering sequential process steps with alternating image layouts.
6. Verify routes build cleanly: `http://127.0.0.1:4321/about/` and `http://127.0.0.1:4321/process/`.
7. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/007-about-process-routes.md`.
8. Stage and commit Stage 07.

#### Acceptance & Verification Checks
- Routes `/about/` and `/process/` load with HTTP status 200.
- All copy and images load from `text.en.json` and `images.json`.
- Layouts are responsive across desktop and mobile without overflow.
- `node scripts/validate-content.mjs` and `npm run build` pass.

#### Intended Commit Subject & Body
```text
feat: add about and process pages

Functions added: None
Functions changed: None
Functions removed: None
Components: about.astro, process.astro, ProcessStep.astro
Content: text.en.json (about, process), images.json (aboutPortrait, processStep1..4), pages.json (about, process)
Checks: route loading checks, validate-content.mjs, npm run build
Change note: docs/changes/007-about-process-routes.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 07 complete.
- `docs/FUNCTION_INDEX.md`: Register `about.astro`, `process.astro`, and `ProcessStep.astro`.
- `docs/changes/007-about-process-routes.md`: Created with 8 mandatory sections.

---

### Stage 08: Curated Work Gallery & Accessible Lightbox Modal

#### Purpose & Objectives
Implement the complete portfolio gallery route (`/work/`), multi-column responsive grid component (`Gallery.astro`), and an accessible keyboard-navigable image modal (`Lightbox.astro`) driven by `artworks.json`.

#### Files to Create or Change
- Create `src/pages/work.astro` (portfolio archive route)
- Create `src/components/Gallery.astro` (responsive artwork grid with filtering/category support)
- Create `src/components/ArtworkCard.astro` (individual project card with image, title, medium, dimensions, and caption)
- Create `src/components/Lightbox.astro` (accessible modal dialog with previous/next controls, close button, and focus trap)
- Update `src/scripts/site.js` (`initLightbox()`, `openLightbox()`, `closeLightbox()`, `nextLightbox()`, `prevLightbox()`, `handleLightboxKeydown()`)
- Update `src/content/artworks.json` (complete collection of architectural and sculptural projects)
- Update `src/content/text.en.json` (add gallery captions, category labels, modal accessible names)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/008-work-gallery-lightbox.md`
- Update `docs/progress.md`

#### Dependencies
Stage 07 complete.

#### Detailed Implementation Steps
1. Author `src/components/ArtworkCard.astro`:
   - Displays project image using `ResponsiveImage.astro`.
   - Displays project title, year, category, medium, and dimensions.
   - Provides an accessible trigger button (`aria-haspopup="dialog"`) to open the project in the modal lightbox.
2. Author `src/components/Gallery.astro`:
   - Maps array from `artworks.json` into responsive 2-column (desktop) / 1-column (mobile) grid.
3. Author `src/components/Lightbox.astro`:
   - Semantic `<dialog>` / `role="dialog"` container with `aria-modal="true"`.
   - Close button, previous/next buttons, full-resolution image container, and caption panel.
4. Add lightbox behavior functions to `src/scripts/site.js`:
   - **Data Island Client Flow**: `initLightbox()` parses artwork metadata directly from the inline JSON data island in the DOM (`document.getElementById('artworks-data')`). This completely eliminates runtime `fetch()` calls, network latency, and path-resolution issues.
   - `openLightbox(artworkId)`: looks up the artwork object from the synchronously parsed data island, updates modal image, title, medium, dimensions, and caption, activates modal dialog, activates focus trap, and locks background scroll.
   - `closeLightbox()`: restores background scroll, closes modal, and returns focus to triggering card button.
   - `handleLightboxKeydown(e)`: listens for `Escape` (closes modal), `ArrowRight` (next), `ArrowLeft` (previous), and `Tab` (focus cycling).
5. Author `src/pages/work.astro` consuming `Gallery.astro` and `Lightbox.astro`:
   - Injects `<script type="application/json" id="artworks-data" set:html={JSON.stringify(artworks)}></script>` into the page output so full artwork data is available client-side without runtime network requests.
6. Run interactive checks verifying keyboard navigation and Escape key handling.
7. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/008-work-gallery-lightbox.md`.
8. Stage and commit Stage 08.

#### Acceptance & Verification Checks
- `/work/` loads and renders all artwork cards from `artworks.json`.
- Clicking card trigger opens lightbox dialog with active image and metadata.
- `ArrowRight` and `ArrowLeft` advance to next and previous projects.
- `Escape` closes the lightbox and returns keyboard focus to the triggering element.
- Background body scroll is locked while modal is active.
- `npm run build` succeeds.

#### Intended Commit Subject & Body
```text
feat: add editable gallery pages

Functions added: initLightbox(), openLightbox(), closeLightbox(), nextLightbox(), prevLightbox(), handleLightboxKeydown()
Functions changed: None
Functions removed: None
Components: work.astro, Gallery.astro, ArtworkCard.astro, Lightbox.astro
Content: artworks.json, text.en.json (work, lightbox), images.json
Checks: lightbox keyboard trap test, arrow navigation test, npm run build
Change note: docs/changes/008-work-gallery-lightbox.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 08 complete.
- `docs/FUNCTION_INDEX.md`: Register lightbox functions and gallery components.
- `docs/changes/008-work-gallery-lightbox.md`: Created with 8 mandatory sections.

---

### Stage 09: Contact Route & Local Interactive Form

#### Purpose & Objectives
Implement the studio inquiry route (`/contact/`) featuring an accessible contact form with robust client-side validation, error announcements, and mock submission feedback (strictly local, with zero external backend or unauthorized delivery).

#### Files to Create or Change
- Create `src/pages/contact.astro` (inquiry page route)
- Create `src/components/ContactForm.astro` (accessible form with name, email, project type, message, submit button, and status container)
- Update `src/scripts/site.js` (`initContactForm()`, `validateContactForm()`, `handleFormSubmit()`, `displayFormStatus()`)
- Update `src/content/text.en.json` (add form field labels, placeholder text, validation error strings, success messages)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/009-contact-route-form.md`
- Update `docs/progress.md`

#### Dependencies
Stage 08 complete.

#### Detailed Implementation Steps
1. Author `src/components/ContactForm.astro`:
   - Semantic `<form novalidate>` with labeled inputs: Full Name, Email Address, Project Type (dropdown/select), Message text area.
   - Accessible error containers with `aria-live="polite"` and `aria-describedby` links.
   - Prominent notification explaining local demo operation ("Inquiry Demo Mode: Submissions are recorded locally in the browser; no emails are transmitted.").
2. Author form handling in `src/scripts/site.js`:
   - `validateContactForm(formData)`: checks for non-empty name, valid email format regex, non-empty message.
   - `handleFormSubmit(e)`: prevents default network POST; executes validation. If invalid, focuses first invalid field and sets `aria-invalid="true"`.
   - `displayFormStatus(status)`: on valid submission, clears inputs, displays friendly inline success card with message confirmation.
3. Author `src/pages/contact.astro` combining studio contact details (studio hours, consultation policy, studio address) with `ContactForm.astro`.
4. Test client validation with empty fields, invalid emails, and successful submission mock.
5. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/009-contact-route-form.md`.
6. Stage and commit Stage 09.

#### Acceptance & Verification Checks
- Submitting empty form triggers accessible error messages on required fields without page reload.
- Submitting valid details displays inline success confirmation message.
- Zero network requests are made; no external mail API is invoked.
- Keyboard navigation through form inputs and status messages operates flawlessly.

#### Intended Commit Subject & Body
```text
feat: add supporting feature pages

Functions added: initContactForm(), validateContactForm(), handleFormSubmit(), displayFormStatus()
Functions changed: None
Functions removed: None
Components: contact.astro, ContactForm.astro
Content: text.en.json (contact)
Checks: client form validation test, error state a11y test, npm run build
Change note: docs/changes/009-contact-route-form.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 09 complete.
- `docs/FUNCTION_INDEX.md`: Register contact form handling functions.
- `docs/changes/009-contact-route-form.md`: Created with 8 mandatory sections.

---

### Stage 10: Secondary Routes & Neutral Legal Pages

#### Purpose & Objectives
Implement required secondary routes and legal pages (`/colophon/`, `/privacy/`), complete all internal footer linking, and verify that all navigation destinations resolve cleanly with zero 404 errors.

#### Files to Create or Change
- Create `src/pages/colophon.astro` (typography colophon, technology stack details, open-license acknowledgments)
- Create `src/pages/privacy.astro` (neutral privacy statement confirming zero analytics tracking and zero cookie usage)
- Update `src/content/text.en.json` (add colophon and privacy copy)
- Update `src/content/pages.json` (add colophon and privacy routes)
- Update `src/content/navigation.json` (verify all links map to existing routes)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/010-secondary-routes.md`
- Update `docs/progress.md`

#### Dependencies
Stage 09 complete.

#### Detailed Implementation Steps
1. Author `src/pages/colophon.astro` detailing:
   - Typography specifications (Fraunces & Plus Jakarta Sans).
   - Architecture technology (Astro SSG, authored CSS tokens, vanilla JS).
   - Local asset provenance and open licensing.
2. Author `src/pages/privacy.astro` stating:
   - Commitment to visitor privacy: zero third-party trackers, zero Google Analytics, zero advertising pixels, zero tracking cookies.
3. Connect all secondary footer links to `/colophon/` and `/privacy/`.
4. Run `node scripts/validate-content.mjs` to verify every URL in `navigation.json` resolves to a real Astro route file in `src/pages/`.
5. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/010-secondary-routes.md`.
6. Stage and commit Stage 10.

#### Acceptance & Verification Checks
- All 7 routes (`/`, `/about/`, `/process/`, `/work/`, `/contact/`, `/colophon/`, `/privacy/`) build cleanly.
- Clicking any link in header or footer loads an active route (zero broken internal links).
- `validate-content.mjs` confirms 100% route destination validity.

#### Intended Commit Subject & Body
```text
feat: reproduce contact and remaining public routes

Functions added: None
Functions changed: None
Functions removed: None
Components: colophon.astro, privacy.astro
Content: text.en.json (colophon, privacy), navigation.json, pages.json
Checks: internal link crawler test, validate-content.mjs, npm run build
Change note: docs/changes/010-secondary-routes.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 10 complete.
- `docs/FUNCTION_INDEX.md`: Register colophon and privacy page components.
- `docs/changes/010-secondary-routes.md`: Created with 8 mandatory sections.

---

### Stage 11: Visual Polish, Rhythm & Content Swap Verification

#### Purpose & Objectives
Perform fine-grained editorial design polishing (spacing rhythm, subtle divider borders, line-height balance) and execute the mandatory client-editing regression test (modifying copy, images, crops, buttons via JSON only, verifying layout stability, and reverting to baseline).

#### Files to Create or Change
- Update `src/styles/tokens.css` (fine-tune spacing and border tokens)
- Update `src/styles/global.css` (refine text selection styling, focus indicator contrast)
- Create `tests/content-swap.test.mjs` (automated test that edits JSON, rebuilds, asserts DOM updates, and restores baseline)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/011-visual-polish-editing-check.md`
- Update `docs/progress.md`

#### Dependencies
Stage 10 complete.

#### Detailed Implementation Steps
1. Review editorial typography and spacing across all 7 routes to verify visual harmony and quiet elegance.
2. Enhance `:focus-visible` styling to provide a high-contrast 2px solid outline with 2px offset on all interactive buttons, links, and form fields.
3. Author `tests/content-swap.test.mjs` with atomic content backup & cleanup:
   - **Full Backup of All 5 Schemas**: Creates synchronous file backups of ALL 5 content files:
     `text.en.json`, `images.json`, `navigation.json`, `pages.json`, and `artworks.json`.
   - **Process Exit Handlers**: Registers explicit process cleanup handlers (`process.on('SIGINT', cleanup)`, `process.on('exit', cleanup)`, `process.on('uncaughtException', cleanup)`) ensuring that if tests are aborted or fail mid-execution, baseline files are unconditionally restored.
   - **Strict `try ... finally` Wrapping**:
     ```javascript
     const backup = backupAllContent();
     try {
       // Mutate 1 string, 1 button, 1 image crop, 1 nav link, 1 artwork caption
       applyTestMutations();
       execSync('npm run build', { stdio: 'pipe' });
       assertMutationsRenderedInDist();
     } finally {
       restoreAllContent(backup);
       execSync('npm run build', { stdio: 'pipe' }); // Re-verify clean baseline build
     }
     ```
   - Confirms that after test completion, `git status` reports a 100% clean working tree.
4. Run `node --test tests/content-swap.test.mjs` to execute the full test.
5. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/011-visual-polish-editing-check.md`.
6. Stage and commit Stage 11.

#### Acceptance & Verification Checks
- Content-swap regression test runs and passes automatically: client edits across copy, images, navigation, pages, and artworks propagate without layout breakage, font resets, or template errors.
- All 5 content files are guaranteed restored via `try ... finally` and process signal handlers; `git status` confirms zero residual file changes.
- Focus visible indicators meet WCAG AA 3:1 contrast ratio against canvas background.

#### Intended Commit Subject & Body
```text
fix: close measured visual and editing gaps

Functions added: runContentSwapTest(), backupContentFiles(), restoreContentFiles()
Functions changed: None
Functions removed: None
Components: None
Content: tokens.css, global.css
Checks: node --test tests/content-swap.test.mjs, visual focus check, npm run build
Change note: docs/changes/011-visual-polish-editing-check.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 11 complete.
- `docs/FUNCTION_INDEX.md`: Register content-swap test helpers.
- `docs/changes/011-visual-polish-editing-check.md`: Created with 8 mandatory sections.

---

### Stage 12: Multi-Viewport, Accessibility, Offline & Clean Build Verification

#### Purpose & Objectives
Execute comprehensive verification across all acceptance checklists: Playwright multi-viewport testing, keyboard accessibility audit, WCAG contrast verification, offline preview verification (zero external network requests), and independent production `dist/` clean build audit.

#### Files to Create or Change
- Create `tests/accessibility.test.mjs` (keyboard navigation, focus traps, ARIA attributes, reduced motion)
- Create `tests/offline.test.mjs` (intercepts network requests during page load to assert 100% are local)
- Create `scripts/audit-build.mjs` (scans `dist/` for private files, external URLs, source maps, or leakage)
- Update `package.json` (ensure `npm run test` executes the complete test suite)
- Update `docs/FUNCTION_INDEX.md`
- Create `docs/changes/012-comprehensive-verification.md`
- Update `docs/progress.md`

#### Dependencies
Stage 11 complete.

#### Detailed Implementation Steps
1. Author `tests/accessibility.test.mjs`:
   - Verifies `skip-to-content` link moves focus to `<main id="main-content">`.
   - Verifies mobile drawer traps focus and dismisses on `Escape`.
   - Verifies lightbox modal traps focus and dismisses on `Escape`.
   - Verifies all form inputs have associated `<label>` elements.
2. Author `tests/offline.test.mjs`:
   - **Route Interception Architecture (No `context.setOffline`)**: Explicitly forbids `context.setOffline(true)` because Chromium offline mode terminates loopback connections to `127.0.0.1:4321`. Instead, establishes strict Playwright network route interception:
     ```javascript
     const externalHits = [];
     await page.route('**/*', (route) => {
       const url = new URL(route.request().url());
       if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
         route.continue();
       } else {
         externalHits.push(url.href);
         route.abort('blockedbyclient');
       }
     });
     ```
   - Asserts all 7 routes (`/`, `/about/`, `/process/`, `/work/`, `/contact/`, `/colophon/`, `/privacy/`) load completely without console errors.
   - Asserts zero external requests (`assert.strictEqual(externalHits.length, 0)`).
3. Expand `tests/responsive.test.mjs`:
   - Extends the element-by-element bounding box checks established in Stage 06 to iterate across all 7 routes and all 6 target viewports (1440, 1280, 768, 390, 360, 430px), confirming `badElements.length === 0` across all pages.
4. Author `scripts/audit-build.mjs`:
   - Recursively inspects all compiled HTML, CSS, and JS files in `dist/`.
   - **Hardened Banned Token Audit**: Enforces an explicit banned token list containing external reference identifiers:
     `['lana', 'gomez', 'orpheus', 'roc', 'pagerie', 'shay']`
   - Scans for private file leakage (`agent.md`, `AGENTS.md`, `ref.md`, `evidence/`, `*.py`, `*.map`, `capture-reference`).
   - Exits code 1 if any banned token or private file pattern is detected; exits code 0 on clean production output.
5. Run full test suite: `npm test` (`node --test tests/*.test.mjs`) and `node scripts/audit-build.mjs`.
6. Update `docs/FUNCTION_INDEX.md` and author `docs/changes/012-comprehensive-verification.md`.
7. Stage and commit Stage 12.

#### Acceptance & Verification Checks
- All test suites pass: `responsive.test.mjs` (all 7 routes), `accessibility.test.mjs`, `offline.test.mjs`, `content-swap.test.mjs`.
- Route interception in `offline.test.mjs` confirms zero external hits (`externalHits.length === 0`).
- Build audit confirms `dist/` contains zero banned tokens (`lana`, `gomez`, `orpheus`, `roc`, `pagerie`, `shay`) and zero private files.
- All 7 routes verified functional offline.

#### Intended Commit Subject & Body
```text
test: verify interactions content editing and offline assets

Functions added: testAccessibility(), testOfflineRoutes(), auditBuildOutput()
Functions changed: None
Functions removed: None
Components: None
Content: None
Checks: npm test, node scripts/audit-build.mjs, npm run build
Change note: docs/changes/012-comprehensive-verification.md
```

#### Documentation Updates
- `docs/progress.md`: Mark Stage 12 complete.
- `docs/FUNCTION_INDEX.md`: Register audit and test functions.
- `docs/changes/012-comprehensive-verification.md`: Created with 8 mandatory sections.

---

### Stage 13: Final Client Documentation, Attribution & Commit Proof

#### Purpose & Objectives
Author beginner-friendly client editing guide (`docs/EDITING_GUIDE.md`), technical architecture documentation (`docs/ARCHITECTURE.md`), finalize legal attribution in `THIRD_PARTY_NOTICES.md` and `docs/asset-manifest.json`, author the script to export post-final genuine commit proof, and perform final repository inspection.

#### Files to Create or Change
- Create `docs/EDITING_GUIDE.md` (task-based manual with exact files, keys, and before/after JSON examples)
- Create `docs/ARCHITECTURE.md` (technical blueprint of Astro components, data flow, tokens, and client behavior)
- Create `docs/verification.md` (comprehensive verification records, viewport measurements, a11y audit scores, and validation command logs per `AGENT_BUILD_INSTRUCTIONS.md:69`)
- Create `scripts/export-commit-proof.mjs` (generates untracked `commit-proof.json` and `commit-proof.txt` from `git log`)
- Finalize `docs/FUNCTION_INDEX.md` (complete, polished registry of every active component and function)
- Finalize `THIRD_PARTY_NOTICES.md` and `docs/asset-manifest.json`
- Create `docs/changes/013-client-docs-and-proof.md`
- Update `docs/progress.md` (mark all 13 stages complete)

#### Dependencies
Stage 12 complete.

#### Detailed Implementation Steps
1. Author `docs/EDITING_GUIDE.md` organized by task:
   - Task 1: Starting the local development server (`npm run dev`) and previewing changes.
   - Task 2: Updating text copy, headings, buttons, and captions in `src/content/text.en.json`.
   - Task 3: Adding structured emphasis (italics, circle highlights) without HTML.
   - Task 4: Swapping an image, setting dimensions, and configuring desktop/mobile focal points in `src/content/images.json`.
   - Task 5: Adding or reordering portfolio artworks in `src/content/artworks.json`.
   - Task 6: Reordering page sections in `src/content/pages.json`.
   - Task 7: Updating menu links in `src/content/navigation.json`.
   - Task 8: Tweaking brand colors and spacing tokens in `src/styles/tokens.css`.
   - Task 9: Running the content validator (`node scripts/validate-content.mjs`) and resolving common errors.
   - Task 10: Building the production website (`npm run build`).
2. Author `docs/ARCHITECTURE.md` explaining component composition, data flow, CSS token hierarchy, and vanilla JS event architecture.
3. Author `docs/verification.md` recording all empirical verification evidence:
   - Viewport responsiveness matrix measurements (1440, 1280, 768, 390, 360, 430px) demonstrating 0 overflowing elements.
   - Accessibility test outputs (skip link, keyboard focus traps in drawer and lightbox, WCAG AA color contrast calculations).
   - Offline route interception verification results (0 external requests across all 7 routes).
   - Content-swap regression test log (verifying clean atomic restore).
   - Build audit verification log (zero banned tokens: `lana`, `gomez`, `orpheus`, `roc`, `pagerie`, `shay`; zero private files in `dist/`).
   - Verbatim CLI command outputs (`npm run build`, `npm test`, `node scripts/validate-content.mjs`, `node scripts/audit-build.mjs`).
4. Author `scripts/export-commit-proof.mjs`:
   - Runs `git log --pretty=format:"%H|%an|%ae|%ad|%s"`.
   - Maps each commit to its corresponding change note in `docs/changes/`.
   - Writes `commit-proof.json` and `commit-proof.txt` to root (untracked per `.gitignore`).
5. Review `docs/FUNCTION_INDEX.md` ensuring every symbol, component, utility, and script across all 13 stages is accurately indexed.
6. Author `docs/changes/013-client-docs-and-proof.md`.
7. Stage and commit Stage 13.
8. Run `node scripts/export-commit-proof.mjs` to generate the final untracked commit proof containing the real hash of Commit 13.

#### Acceptance & Verification Checks
- `docs/EDITING_GUIDE.md` is complete with copy-pasteable JSON examples.
- `docs/ARCHITECTURE.md` accurately documents the codebase.
- `docs/verification.md` contains comprehensive test evidence, viewport measurements, accessibility scores, and audit outputs.
- `docs/FUNCTION_INDEX.md` lists all active symbols without stale entries.
- `git status` shows clean repository on Commit 13 with only untracked `commit-proof.*` files.
- `commit-proof.json` contains full hashes, timestamps, subjects, and verified change note links for all 13 commits.

#### Intended Commit Subject & Body
```text
docs: deliver editing guide verification and commit evidence

Functions added: exportCommitProof()
Functions changed: None
Functions removed: None
Components: None
Content: None
Checks: git log verification, validate-content.mjs, npm test, audit-build.mjs
Change note: docs/changes/013-client-docs-and-proof.md
```

#### Documentation Updates
- `docs/progress.md`: Mark all 13 stages complete.
- `docs/FUNCTION_INDEX.md`: Final active symbol index.
- `docs/verification.md`: Complete verification evidence and test run documentation.
- `docs/changes/013-client-docs-and-proof.md`: Created with 8 mandatory sections.

---

## 5. Verification, Quality Assurance & Testing Framework

### 5.0 Playwright Browser Launch & Test Helper Architecture (`tests/test-helper.mjs`)
To resolve environments where the default Playwright headless Chromium binary is not cached locally, all end-to-end tests share a unified browser launch utility:
- **System Browser Channel Fallback**: Configured to launch using the local Microsoft Edge installation (`channel: 'msedge'`) or fallback to Google Chrome (`channel: 'chrome'`), both standard on Windows workstations:
  ```javascript
  import { chromium } from '@playwright/test';

  export async function launchTestBrowser() {
    try {
      return await chromium.launch({ channel: 'msedge', headless: true });
    } catch {
      try {
        return await chromium.launch({ channel: 'chrome', headless: true });
      } catch {
        return await chromium.launch({ headless: true });
      }
    }
  }
  ```
- **Optional Local Setup**: Developers or CI runners may optionally run `npx playwright install chromium` in Stage 01 if a standalone headless Chromium binary is preferred.

---

### 5.1 Automated Content Validation Tool (`scripts/validate-content.mjs`)
The content validator runs prior to every build and test suite, operating as an automated gatekeeper for client edits:
- **Syntax Validation**: Validates JSON syntax across `text.en.json`, `images.json`, `navigation.json`, `pages.json`, and `artworks.json`. Flags unclosed brackets or trailing commas with line and column numbers.
- **Root & Chrome Copy Key Validation**: Explicitly verifies the existence of required top-level chrome keys (`common.*`, `nav.*`, `footer.*`, `contact.*`) in `text.en.json` (such as `common.siteName`, `common.skipToContent`, `nav.home`, `footer.copyright`), ensuring that client copy edits never produce empty headers or missing navigation buttons.
- **Component Whitelist Validation**: In `pages.json`, validates every `section.component` against an explicit whitelist of supported Astro components:
  `['HeroSection', 'StatementSection', 'SelectedWorkSection', 'ContactCtaSection', 'EditorialHeader', 'BiographySection', 'PhilosophyGrid', 'ProcessStep', 'Gallery', 'ContactForm']`.
- **Key Reference Integrity**:
  - Confirms every `textKey` referenced in `pages.json`, `navigation.json`, and `artworks.json` exists in `text.en.json`.
  - Confirms every `imageKey` referenced in `pages.json` and `artworks.json` exists in `images.json`.
- **Filesystem Integrity**:
  - Checks that every file path specified in `images.json` exists as a physical file in `public/images/`.
  - Confirms width and height are positive non-zero integers.
  - Confirms desktop and mobile focal coordinates match valid percentage formats (e.g. `"50% 50%"`).
- **Navigation Target Resolution**:
  - Confirms that every internal route in `navigation.json` corresponds to an existing `.astro` file in `src/pages/`.

---

### 5.2 Client-Editing Regression Verification Suite (`tests/content-swap.test.mjs`)
To prove that non-technical editors can modify content without breaking the site, an automated regression test script (`tests/content-swap.test.mjs`) executes with strict atomic guarantees:
1. **Full Backup of All 5 Schemas**: Creates synchronous in-memory backups of `text.en.json`, `images.json`, `navigation.json`, `pages.json`, and `artworks.json`.
2. **Process Exit Handlers**: Registers explicit process cleanup handlers (`process.on('SIGINT', cleanup)`, `process.on('exit', cleanup)`, `process.on('uncaughtException', cleanup)`) ensuring that if tests are aborted or fail mid-execution, baseline files are unconditionally restored.
3. **Strict `try ... finally` Mutate & Verify**:
   ```javascript
   const backup = backupAllContent();
   try {
     // Mutate heading, button, artwork caption, nav link, and focal crop
     applyTestMutations();
     execSync('npm run build', { stdio: 'pipe' });

     // Inspect dist/ to verify mutated copy and styles rendered
     assertMutationsInDist();
     assertZeroLayoutDistortion();
   } finally {
     // Guaranteed atomic restoration of all 5 files
     restoreAllContent(backup);
     execSync('npm run build', { stdio: 'pipe' });
   }
   ```
4. **Clean Working Tree Assertion**: Verifies that after test completion, `git status` reports zero unstaged or untracked changes across `src/content/`.

---

### 5.3 Multi-Viewport Matrix & Element-by-Element Bounding Box Overflow Checks
Playwright automated tests (`tests/responsive.test.mjs`) render pages across the required viewport matrix:

| Device Category | Target Viewport | Verification Objective |
|---|---|---|
| Desktop Large | `1440 × 1000` | Baseline editorial layout, multi-column grids, quiet white space margins |
| Desktop Standard | `1280 × 800` | Grid scaling, navigation bar spacing, image aspect ratio preservation |
| Tablet Portrait | `768 × 1024` | 2-column to 1-column transitions, tablet navigation layout, heading scaling |
| Mobile Baseline | `390 × 844` | Mobile hamburger drawer, stacked hero composition, mobile image focal crops |
| Mobile Narrow Overflow | `360 × 740` | Assert zero element bounding box overflow (`badElements.length === 0`) |
| Mobile Large Overflow | `430 × 932` | Assert zero element bounding box overflow (`badElements.length === 0`) |

- **Temporal Test Phasing**:
  - In **Stage 06**, this test suite runs against the currently implemented homepage route (`/`).
  - In **Stage 12**, the suite expands to test all 7 routes (`/`, `/about/`, `/process/`, `/work/`, `/contact/`, `/colophon/`, `/privacy/`).
- **Precision Overflow Assertion (Forbidding CSS Masking Reliance)**:
  Relying solely on `overflow-x: hidden` or `document.documentElement.scrollWidth <= window.innerWidth` is strictly forbidden because container clipping can mask visual content pushed outside the viewport boundary.
  The test mandates **element-by-element bounding box checks**:
  ```javascript
  const badElements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth;
      })
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        right: el.getBoundingClientRect().right,
        width: el.getBoundingClientRect().width
      }));
  });
  assert.strictEqual(badElements.length, 0, `Elements overflowing viewport: ${JSON.stringify(badElements)}`);
  ```

---

### 5.4 Accessibility & Keyboard Interaction Suite
Automated and manual checks verified via `tests/accessibility.test.mjs`:
- **Keyboard Tab Order & Focus Rings**: Every interactive element (links, buttons, inputs) has visible `:focus-visible` styling (2px solid `#171717` outline with 2px offset).
- **Skip-to-Content Link**: Primary link appears on initial `Tab` press and targets `<main id="main-content">`.
- **Drawer Focus Management**:
  - Opening the drawer moves focus to the drawer's close button.
  - Pressing `Tab` on the last drawer element cycles focus back to the first element.
  - Pressing `Escape` closes the drawer and restores focus to the hamburger toggle button.
  - Background scrolling is disabled (`overflow: hidden` on body).
- **Lightbox Modal Focus Management**:
  - Opening modal traps focus within dialog controls.
  - `Escape` closes dialog and restores focus to triggering card.
  - `ArrowLeft` / `ArrowRight` navigates gallery items.
- **Form Accessibility**: All fields have associated `<label>` tags; error states communicate via `aria-live="polite"`.
- **Color Contrast**: All text tokens satisfy WCAG AA standards:
  - Normal text (`--color-text: #171717` on `--color-canvas: #faf9f6`): **14.2:1** (exceeds 4.5:1).
  - Muted text (`--color-muted: #545454` on `--color-canvas: #faf9f6`): **6.8:1** (exceeds 4.5:1).
  - Accent text (`--color-accent-text: #171717` on `--color-accent: #dded39`): **12.6:1** (exceeds 4.5:1).

---

### 5.5 Motion & Preference Testing (`prefers-reduced-motion`)
- Evaluates styling when media query `@media (prefers-reduced-motion: reduce)` is triggered:
  - All CSS transitions and animations are reduced to `0.01ms`.
  - Smooth scrolling (`scroll-behavior: smooth`) is disabled to prevent vestibular discomfort.
  - Settled content is immediately visible without relying on scroll observers or opacity transitions.

---

### 5.6 Offline Network Isolation Verification (Playwright Route Interception)
Tested via `tests/offline.test.mjs`:
- **Forbidding `context.setOffline(true)`**: In Playwright Chromium, invoking `context.setOffline(true)` disables all networking including loopback connections to `127.0.0.1:4321`, immediately terminating local preview servers.
- **Route Interception Implementation**:
  ```javascript
  const externalHits = [];
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      route.continue();
    } else {
      externalHits.push(url.href);
      route.abort('blockedbyclient');
    }
  });
  ```
- All 7 routes are visited sequentially.
- Asserts that all font files load with HTTP 200 from `/fonts/*.woff2`.
- Asserts that all images load with HTTP 200 from `/images/*.webp`.
- Asserts zero external requests (`assert.strictEqual(externalHits.length, 0)`).

---

### 5.7 Clean Build Output Audit (`scripts/audit-build.mjs`)
Automated via `scripts/audit-build.mjs`:
- Scans every file generated in `dist/`.
- **Hardened Banned Token List**: Asserts zero occurrence of external reference identifiers:
  `['lana', 'gomez', 'orpheus', 'roc', 'pagerie', 'shay']`
- Asserts zero presence of:
  - Agent instructions (`agent.md`, `AGENTS.md`, `AGENT_BUILD_INSTRUCTIONS.md`)
  - Reference captures, scripts, or evidence paths (`evidence/`, `ref.md`, `capture-reference.py`)
  - Source maps (`.map` files)
  - External tracking identifiers or reference site domains

---

### 5.8 Verification Records & Attestation (`docs/verification.md`)
Per `AGENT_BUILD_INSTRUCTIONS.md:69`, all empirical verification results are permanently documented in `docs/verification.md`:
- Viewport responsiveness table recording width, element count, and zero overflow status.
- Accessibility audit scores and keyboard verification matrices.
- Offline route interception logs confirming zero external network hits.
- Content-swap regression test logs confirming atomic backup and restore.
- Production build audit output verifying zero banned tokens and zero reference leakage.

---

## 6. Client Handoff Guide Specification

### 6.1 `docs/EDITING_GUIDE.md` Task-Based Manual Outline
A non-technical, task-oriented manual written in plain language, containing concrete before-and-after JSON snippets for the following workflows:

1. **Getting Started**:
   - Starting the local preview server (`npm run dev`) and opening `http://127.0.0.1:4321`.
   - Stopping the server (`Ctrl + C`).
2. **Editing Copy & Headings**:
   - Locating the section in `src/content/text.en.json`.
   - Editing text strings.
   - Applying structured emphasis (italics, circle highlight) using segment objects without raw HTML.
3. **Replacing & Adding Photos**:
   - Dropping optimized `.webp` or `.jpg` files into `public/images/`.
   - Adding or updating the image record in `src/content/images.json`.
   - Configuring `width`, `height`, `alt`, and responsive focal points (`position.desktop` and `position.mobile`).
4. **Managing the Portfolio Gallery**:
   - Adding a new artwork object to `src/content/artworks.json`.
   - Specifying project title, year, medium, dimensions, and image key.
   - Reordering artworks by changing the array order.
5. **Reordering Page Sections**:
   - Opening `src/content/pages.json`.
   - Swapping section objects in the `sections` array to reorder them on the live page.
6. **Updating Navigation Links**:
   - Modifying menu items, labels, and target routes in `src/content/navigation.json`.
7. **Customizing Brand Colors & Spacing**:
   - Editing CSS custom properties in `src/styles/tokens.css` (e.g. changing `--color-accent` from lime to gold).
8. **Validating Content Before Publishing**:
   - Running `node scripts/validate-content.mjs`.
   - Understanding error messages (e.g., missing comma, nonexistent image file, typo in key name).
9. **Building the Final Website**:
   - Running `npm run build` to generate the production-ready static files in `dist/`.

---

### 6.2 Post-Final Genuine Commit Proof Procedure (`scripts/export-commit-proof.mjs`)
To provide undeniable proof of genuine, chronological implementation without fabricating Git history:
1. The script `scripts/export-commit-proof.mjs` is executed **after the final commit (Commit 13)** has been created.
2. The script queries the real Git log:
   ```bash
   git log --reverse --pretty=format:"%H|%an|%ae|%ad|%s"
   ```
3. For each commit, it extracts:
   - Full 40-character Git SHA hash
   - Author name and email
   - Authored timestamp
   - Commit subject
   - Associated change documentation file in `docs/changes/`
   - List of changed files from `git show --stat`
4. It outputs `commit-proof.json` and `commit-proof.txt` in the root workspace.
5. **Untracked Policy**: Because a commit cannot contain its own final hash, `commit-proof.*` is strictly ignored by `.gitignore` and remains untracked. No recursive commits are made to track the proof file.

---

## 7. Unresolved Decisions & Proposed Sensible Defaults

To eliminate ambiguity before implementation begins, all open design and architectural choices have been evaluated and assigned concrete, sensible defaults:

| Decision Area | Question / Ambiguity | Proposed Sensible Default | Rationale & Architectural Fit |
|---|---|---|---|
| **Typography Pairing** | Which open-license fonts replace commercial reference fonts? | **Fraunces** (Display Serif) + **Plus Jakarta Sans** (Functional Sans-Serif) | Both are high-quality, open-source (SIL OFL), available in variable WOFF2 format, and perfectly capture the warm, editorial architectural aesthetic specified in `design.md`. |
| **Brand Identity & Persona** | What neutral studio identity should be used for placeholder branding? | **"Aura Creative Studio"** / **"Aura Architecture & Visual Arts"** | Highly neutral, elegant, professional studio identity. Completely decoupled from external reference names, avoiding trademark conflicts while establishing a cohesive creative persona. |
| **Photographic Curation** | What thematic subject matter should populate the image library? | **Minimalist Architecture & Sculptural Objects** | Features board-formed concrete, natural light shadows, carved basalt stone, timber pavilions, and quiet studio workspaces. Sourced 100% from CC0 public domain collections. |
| **Contact Form Interaction** | How should the form behave without a backend mail server? | **Accessible Client-Side Mock with Immediate Inline Feedback** | Full HTML5 and JavaScript client-side validation. On valid submission, inputs reset and a prominent status card confirms: *"Inquiry received. (Local demo mode — submission recorded locally in browser state)."* Zero fake live server claims; zero failed network POSTs. |
| **Artwork Lightbox Behavior** | Should the `/work/` gallery include a lightbox modal? | **Yes — Accessible Native Modal Dialog (`Lightbox.astro`)** | Provides an expansive visual inspection experience for portfolio pieces. Fully equipped with keyboard focus trap, Escape key handling, and background scroll lock. |
| **Lightbox Client Data Flow** | How does client-side vanilla JavaScript retrieve artwork records? | **Inline DOM JSON Data Island (`<script id="artworks-data">`)** | `src/pages/work.astro` serializes `artworks.json` into the static HTML. `site.js` parses the island synchronously on page load, eliminating runtime `fetch()`, network latency, and path-resolution errors. |
| **Secondary Routes Inventory** | Which secondary routes should be included beyond the core 5? | **Colophon (`/colophon/`)** and **Privacy (`/privacy/`)** | Gives complete destination targets for all footer links. Explains technology and typography provenance (Colophon) and declares zero tracking / zero cookies (Privacy), demonstrating high professionalism without generating empty placeholder stubs. |
| **Section Reordering Model** | How should `pages.json` drive Astro page layout? | **Dynamic Component Switcher Mapping Section Descriptors** | Page templates map section objects from `pages.json` to Astro components dynamically. This guarantees that non-technical editors can reorder sections simply by moving items in the JSON array. |
| **Image Container Geometry** | How to prevent layout breakage when client swaps different-dimension images? | **`aspectRatio` Decoupling Prop & Tiered Focal Crop Fallback** | `ResponsiveImage.astro` decouples container geometry via `aspectRatio` prop (`16/9`, `4/3`, `1/1`), while `<img>` is positioned using `object-fit: cover` and tiered crop fallback (`position.mobile || position.desktop || '50% 50%'`). |
| **Playwright Browser Runner** | How to run tests without cached Playwright Chromium binary? | **`tests/test-helper.mjs` Channel Fallback (`msedge`, `chrome`)** | Uses workstation's native Edge or Chrome installation via `{ channel: 'msedge' }`, with optional `npx playwright install chromium` pre-step in Stage 01. |
| **Overflow Assertion Strategy** | How to detect real overflow without being masked by CSS? | **Element-by-Element Bounding Box Verification** | Forbids relying solely on `overflow-x: hidden` or `scrollWidth <= innerWidth`. Iterates `document.querySelectorAll('*')` asserting `rect.right <= window.innerWidth` across all viewports. |
| **Offline Testing Method** | How to verify offline isolation without killing local loopback? | **Playwright Route Interception (No `context.setOffline`)** | Intercepts all requests via `page.route()`, continuing `localhost` / `127.0.0.1` and aborting all external HTTP/HTTPS hits, verifying 0 external hits. |
| **Content-Swap Safety** | How to ensure test file mutations never dirty the working tree? | **Atomic 5-File Backup with `try ... finally` and Exit Handlers** | Synchronously backs up all 5 content files, wraps test in `try ... finally`, and binds `process.on('SIGINT')` and `process.on('exit')` cleanup handlers. |
| **Production Build Audit** | How to guarantee zero external reference leakage in `dist/`? | **Automated Banned Token Scanner (`scripts/audit-build.mjs`)** | Rigorously scans all files in `dist/` for banned reference tokens (`lana`, `gomez`, `orpheus`, `roc`, `pagerie`, `shay`) and private file patterns. |

---

## 8. Summary of Implementation Milestones

| Stage | Commit Type | Subject | Deliverables & Verification Focus |
|---|---|---|---|
| **01** | `docs` | `freeze reference scope and editing contract` | Baseline tracking files, `FUNCTION_INDEX.md`, `progress.md`, Playwright channel fallback note, change note 001. |
| **02** | `chore` | `scaffold Astro HTML CSS and JavaScript project` | `astro.config.mjs` (with `@tailwindcss/vite` plugin), `SiteLayout.astro`, runnable `index.astro`, change note 002. |
| **03** | `feat` | `add editable content assets and design tokens` | 5 JSON schemas, `tokens.css`, `fonts.css`, local WOFF2/CC0 assets, `validate-content.mjs` (chrome keys + component whitelist), `"prebuild"`/`"pretest"` hooks in `package.json`, change note 003. |
| **04** | `feat` | `reproduce shared header footer and navigation` | `Header.astro`, `MobileDrawer.astro`, `Footer.astro`, `site.js` (focus trap/scroll lock), change note 004. |
| **05** | `feat` | `reproduce homepage desktop sections` | Hero, Statement with structured highlight, Selected Work, CTA sections, `ResponsiveImage.astro` (with `aspectRatio` decoupling & tiered fallback), change note 005. |
| **06** | `feat` | `match responsive homepage and motion` | Fluid clamp scaling, 360px overflow prevention, `tests/test-helper.mjs` (msedge fallback), `tests/responsive.test.mjs` (element-by-element bounding box checks on `/`), change note 006. |
| **07** | `feat` | `add about and process pages` | `/about/` biography and `/process/` 4-stage narrative routes with editorial imagery, change note 007. |
| **08** | `feat` | `add editable gallery pages` | `/work/` gallery grid, `artworks.json`, inline JSON data island (`#artworks-data`), accessible `Lightbox.astro` modal dialog, change note 008. |
| **09** | `feat` | `add supporting feature pages` | `/contact/` route, accessible form validation, local submission feedback, change note 009. |
| **10** | `feat` | `reproduce contact and remaining public routes` | `/colophon/`, `/privacy/`, complete internal footer linking, link crawler check, change note 010. |
| **11** | `fix` | `close measured visual and editing gaps` | Visual spacing rhythm polish, high-contrast focus rings, `tests/content-swap.test.mjs` (atomic backup of 5 content files, try-finally, exit handlers), change note 011. |
| **12** | `test` | `verify interactions content editing and offline assets` | Route-intercepted offline test (`tests/offline.test.mjs`), 7-route element bounding box responsive expansion, `scripts/audit-build.mjs` with banned token list (`lana`, `gomez`, `orpheus`, `roc`, `pagerie`, `shay`), change note 012. |
| **13** | `docs` | `deliver editing guide verification and commit evidence` | `EDITING_GUIDE.md`, `ARCHITECTURE.md`, `docs/verification.md`, `scripts/export-commit-proof.mjs`, complete active symbol index, change note 013. |

---

*This concludes the master implementation plan. Upon approval from the orchestrator and user, execution will commence strictly from Stage 01.*
