# Design specification — Landing Page Build

Status: authored implementation direction. Numerical values below are starting tokens, not measured proof of a finished design.

Read `prd.md` for scope and `agent.md` for execution/commit requirements. Project root: `D:\projects\landing-page-build`.

## Visual direction

An editorial creative portfolio: generous image areas, expressive serif headings, restrained sans-serif navigation/body copy, offset compositions, and clear quiet space. Establish rhythm through scale and alignment rather than extra cards, shadows, or decoration.

Use neutral branding and original wording. Choose new, locally downloaded open-license imagery/fonts. Do not import another site's logo, stylesheet, tracking, private font files, or exported markup.

## Typography system

- Select one open-license display serif and one open-license supporting sans-serif, with the actual required normal/bold/italic files.
- Load local files through `src/styles/fonts.css`; keep family aliases consistent across the project.
- Use the display family for editorial headlines/quotations and the supporting family for navigation, labels, controls, and body copy unless a documented design choice says otherwise.
- Define every shared size, weight, and line-height in `tokens.css`. Do not scatter fallback overrides through components.
- Use fluid sizes and available width for wrapping. Avoid fixed text-box heights and manual line breaks used only to force one screenshot.
- A content edit must not select a different font. Test longer text and italic/highlight segments.

Suggested starting ranges:

| Role | Desktop | Mobile | Line height |
|---|---|---|---|
| Hero/display | 56–88px | 36–48px | 1.0–1.1 |
| Editorial statement | 40–64px | 28–36px | 1.1–1.2 |
| Section heading | 32–48px | 26–32px | 1.15–1.25 |
| Body | 16–18px | 16–18px | 1.45–1.65 |
| Navigation/labels | 12–14px | 14–16px | 1.2–1.4 |

Tune these ranges after checking actual font metrics and real project wording. Store the resolved choices as tokens.

## Color and spacing tokens

Start with a warm white canvas, near-black text, subtle muted backgrounds, and one restrained bright accent for selected calls to action/highlights. Ensure actual foreground/background combinations meet readable contrast.

Suggested editable tokens:

```css
:root {
  --color-canvas: #faf9f6;
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-muted: #545454;
  --color-accent: #dded39;
  --color-accent-text: #171717;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;
  --content-max: 90rem;
  --page-gutter: clamp(1.25rem, 3vw, 3rem);
  --motion-fast: 160ms;
  --motion-standard: 320ms;
}
```

These are initial project choices, not a requirement to override an approved design. Add typography, layering, and radius tokens only when used. Document token changes in commit notes.

## Composition and responsive behavior

### Header/navigation

Use a shared header with a consistent brand mark/title, clear links, and a mobile menu at the width where the desktop navigation no longer fits. A sticky/scrolled variant is optional; if used, prevent content jumps and preserve visible contrast. Dropdowns must open with keyboard as well as pointer.

### Hero

Use an image-led composition with an original headline or introductory message as appropriate. Reserve intrinsic image space to avoid layout shifts. Mobile uses its own documented focal point; never squeeze or distort the desktop crop.

### Introductory and feature sections

Balance image and text across a measured grid. Desktop may use intentional asymmetry; mobile should have an explicit reading order and comfortable spacing. Avoid absolute positioning for ordinary flowing paragraphs. Reordering via content configuration must map to real section components, not require manual CSS coordinates for each sentence.

### Gallery

Use a consistent column/gap system and intentional aspect ratios. Preserve item order from gallery data. Captions remain readable. Do not add a lightbox unless required; if added, provide close/previous/next controls, labels, keyboard support, focus handling, and a safe reduced-motion path.

### Footer/contact

Use the shared footer with original branding, navigation, copyright wording, and configured social/contact links. Do not invent real contact details. Distinguish external links from local routes in configuration.

### Breakpoints

Derive final breakpoints from actual content fit, with a typical mobile/tablet boundary around 48rem and a wider desktop adjustment if needed. Centralize/document resolved values. Do not confuse screenshot test sizes with mandatory CSS breakpoints.

At 360px and 430px, long headings, menus, buttons, captions, and footer links must not overflow. At tablet widths, verify both text rhythm and image placement rather than scaling desktop uniformly.

## Shared components

Prefer `SiteLayout`, `Header`, `Footer`, `ResponsiveImage`, `EditorialHeading`, `Section`, `Gallery`, and narrowly scoped navigation components. Add a component only when it has a clear responsibility. Components consume centralized content keys; pages arrange components instead of duplicating global markup.

`ResponsiveImage` should accept an image key and presentation variant, resolve path/dimensions/alt/crop from `images.json`, and emit ordinary semantic HTML. Preserve source dimensions separately from layout aspect ratio. Keep meaningful captions outside alt text.

## Motion and accessibility

- Settled content must be fully visible if JavaScript is unavailable or an observer fails.
- Prefer transform/opacity transitions; avoid motion that changes document geometry or hides essential content.
- Support `prefers-reduced-motion` by removing nonessential motion and smooth scrolling.
- Tailwind is optional; do not let preflight/reset change selected fonts, margins, or controls unexpectedly.
- Provide visible focus states, semantic buttons/links, meaningful headings/landmarks, and controls with accessible names from the string file.
- Menus/lightboxes must restore focus; do not trap keyboard focus in a hidden panel.
- Highlights and emphasis use a small structured set of options. Do not render arbitrary editable HTML.

## Asset requirements

Download licensed images/fonts locally with readable filenames. Use appropriately sized derivatives, responsive sources, intrinsic dimensions, and below-the-fold lazy loading. Record real source/license/creator/modifications and required credits. Do not hotlink or omit required license notices.

## Design validation

Check the viewports listed in `prd.md`, menu/gallery states, reduced motion, offline local assets, and longer replacement text/different image ratios. Review full pages and section crops. Keep visual captures/diffs private and ignored; record neutral functional/design outcomes in contributor documentation. Check production output separately for accidental private artifacts.

Do not call this specification implemented until actual pages, assets, interactions, and tests exist.
