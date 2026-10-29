## Current scope update — 29 October 2026

The user replaced the architecture-studio direction with their supplied artist homepage content for this temporary local build. Preserve its copy, image sequence, editorial collage and credits; retain centralized editable content and use licensed local Caveat Brush for provisional brand lettering only. The earlier neutral architecture examples below are superseded. Stop after Stage 06; supporting routes await later work. No publication or push. See docs/IMPLEMENTATION_PLAN.md.

# Product requirements — Landing Page Build

Status: implementation brief, not a completion report.

## Purpose

Create a professional, image-led creative portfolio website that runs locally, looks polished on desktop and mobile, and is straightforward for another person to edit. Build new source with Astro, semantic HTML, authored CSS, and vanilla JavaScript. Tailwind is optional for motion/transition utilities.

Project root: `D:\projects\landing-page-build`. All paths below are relative to it.

## Primary users

| User | Need |
|---|---|
| Visitor | Understand the creative work, explore images, learn about the creator, find contact information |
| Content editor | Change text, images, crops, captions, and links without editing component markup |
| Contributor | Find the relevant component/function and understand each commit's changes |

## Product principles

- Image-led editorial presentation, readable typography, intentional spacing, and restrained motion.
- Neutral project branding and original wording; verified open-license images/fonts downloaded locally.
- A consistent font/design system that survives routine content edits.
- Small shared components and centralized content rather than duplicated pages or a copied hosted-site export.
- Truthful implementation status, validation results, licensing, and Git history.

## Scope

### Required launch experience

1. **Home `/`**: shared header/navigation, hero, introductory statement, selected work/features, editorial image composition, contact call to action, and footer. Every section has a stable ID and an entry in the page configuration.
2. **About `/about/`**: original biography/introductory copy with supporting imagery.
3. **Process `/process/`**: process narrative and image sequence.
4. **Work `/work/`**: editable ordered gallery with captions. Add a keyboard-accessible lightbox only if the chosen design requires one.
5. **Contact `/contact/`**: approved contact information or an explicitly local-only contact interaction. Do not invent a real email address or send anything without authorization.

These are neutral project route defaults, not a claim that pages already exist. Supporting editorial/feature/archive routes are optional and must have real approved content. Do not create duplicate pages solely to satisfy a commit count. Document route changes before implementation.

### Required content system

| Source | Editable information |
|---|---|
| `src/content/text.en.json` | Headings, copy, labels, captions, accessibility and local validation messages |
| `src/content/images.json` | Source paths, alt text, actual dimensions, crop/focal-point settings, credits |
| `src/content/navigation.json` | Destinations and label-key references |
| `src/content/pages.json` | Page/section IDs, ordering, component/content references |
| `src/content/artworks.json` | Gallery records referencing shared text/image keys, if needed |
| `src/styles/tokens.css` | Shared typography, colors, spacing, widths, motion |
| `src/styles/fonts.css` | Locally served licensed font families and variants |

Do not duplicate editable strings or image choices inside `.astro` or behavior scripts. Plain JSON must remain valid and readable. Use structured emphasis segments instead of arbitrary HTML strings. Clearly distinguish an image's source dimensions from its presentation aspect ratio.

### Required interactions

- Local page navigation and direct URL access in production preview.
- Desktop dropdowns only where needed, plus a responsive mobile menu.
- Keyboard activation, visible focus, Escape-to-close, focus restoration, and sensible scroll locking.
- Optional gallery interactions with equivalent keyboard controls and understandable labels.
- Restrained CSS/JavaScript motion with reduced-motion support.
- No active external-site analytics, tracking, hosted form submission, or checkout code.

## Out of scope

CMS/admin interface, authentication, database, payments, real order processing, working email delivery, deployment, remote Git push, and claims of a pixel-identical external website. Do not use copied proprietary artwork, logos, fonts, code, or text.

## Non-functional requirements

- Astro static output; no client framework is required for ordinary content.
- Core images/fonts/styles/scripts are local. External social links may remain external; deliberately online embeds must be documented.
- Use appropriately sized image derivatives, intrinsic dimensions, and lazy loading below the fold. Avoid loading the entire media library for one page.
- Use semantic landmarks, meaningful headings, accurate alt text, accessible controls, and sufficient text/control contrast.
- No unintended horizontal scrolling, clipped text, overlap, stretched artwork, or missing media at tested widths.
- Missing content keys, invalid JSON, missing local assets, bad metadata, and invalid internal destinations produce useful validation errors.

## Editing and contributor documentation

Deliver `docs/EDITING_GUIDE.md`, `docs/ARCHITECTURE.md`, `docs/FUNCTION_INDEX.md`, and per-commit `docs/changes/NNN-description.md` notes. Include task → file → key examples for changing text/images/fonts, editing navigation, adding a gallery item, and locating a behavior.

Every commit records actual function/component additions, modifications, renames, removals, content/token changes, verification performed, and remaining work. Empty categories say “None.” Proof comes from real Git data.

## Acceptance criteria

| ID | Required outcome |
|---|---|
| A1 | `npm run dev`, `npm run build`, and `npm run preview` work after documented installation |
| A2 | Every implemented route loads directly and through internal links in production preview |
| A3 | All text/image choices use the documented content sources; global font/style settings are centralized |
| A4 | Text/image edits update the intended locations without losing chosen fonts or breaking layout |
| A5 | Layout is checked at 1440×1000, 1280×800, 768×1024, 390×844, plus overflow at 360px and 430px |
| A6 | Menus and any gallery work with keyboard and pointer; reduced motion is respected |
| A7 | Core assets work with external network requests blocked; no unexplained console or local request failures |
| A8 | Every shipped third-party asset/font has a verified license and any required notice |
| A9 | Function index, editing guide, actual staged commits, and truthful checks/change notes are complete |
| A10 | Private instructions/references/evidence are excluded from Git and production output; asset licenses and contributor records remain tracked |

Temporary editability checks must be restored before final baseline captures. A build pass alone is not a visual or accessibility pass. Record partial results and limitations honestly.

## Decisions still needed during implementation

Choose neutral display branding, approved original wording/contact details, licensed media/font selections, and any optional secondary pages. Use documented reversible defaults where reasonable; do not fabricate real contact details or license approval. `landing-page-build` is the package/project identity, not a mandatory visible brand.
