# Editing guide

Start at **src/config/site.ts**. The full step-by-step guide is [CUSTOMIZATION.md](../CUSTOMIZATION.md).

| Task | Canonical location |
|---|---|
| Words, labels, copyright, biography and artwork descriptions | `site.text` → `src/content/text.en.json` |
| Ordinary image metadata and crops | `site.images` → `src/content/images.json` |
| GIF source and static poster | `site.media` → `src/content/media.json` |
| Logo, favicon and UI icon text/local paths | `site.branding` / `site.icons` in `site.ts` |
| Font families/files/sizes/weights/line heights | `site.theme.typography` in `site.ts` |
| Colors, spacing, layout widths and motion | `site.theme` in `site.ts` |
| Link groups | `site.navigation` → `src/content/navigation.json` |
| Shared home/legal links | `site.links` in `site.ts` |
| Page composition and artwork ordering | `site.pages` / `site.artworks` → their canonical JSON files |

Do not duplicate content, CSS variable values or font-face declarations in components. SiteTheme generates tokens/fonts; existing authored CSS and Tailwind aliases consume the same variables. All defaults preserve the existing design. The old content.js helper is now typed content.ts; all component imports have been migrated.

Run `npm run check`, `npm run build`, and `npm run audit` after changes. Build regenerates production output and retains newly configured image/logo/icon assets. Source originals remain untouched. Existing GIF playback, pause/reduced-motion controls, gallery/modal behavior and local-only form are preserved. No configuration toggle enables real message delivery or commerce.

Motion timing and switches are now in `site.theme.motion`: reveal500ms, stagger70ms/cap210ms, concurrent budget6, dialogs300/160ms, page240ms and base hover160ms (playful hover220ms). See CUSTOMIZATION.md for exact properties, GIF pause/visibility behavior and progressive page-transition fallback. Layout, fonts, copy and current dark/GIF asset selections are preserved.

Playful artwork/brand accents: site.theme.motion.playful in src/config/site.ts. See CUSTOMIZATION.md for defaults and examples; disable this group to restore restrained effects.

Circle-only yellow: theme.colors.circle. Draw/replay timing: theme.motion.playful.circleDrawDuration. Process underline is decorative SVG; link font/destination controls are unchanged.

Copyright owner/wording: footer.copyright in text.en.json (through site.text). Keep exactly one {year} marker. Build-local year is static fallback; browser uses visitor-local year on load/pageshow. Leave the separate designCredit field intact unless intentionally editing required attribution.

Visible playful motion: image entry18px, image hover6px/1.5deg/scale1.03 and circles900ms. Edit the existing centralized motion/playful settings; no component edits needed.

Slow smooth image settings are separate: playful.imageRevealDuration1000ms, imageHoverDuration700ms and imageEasing. Standalone text retains500ms; controls220ms. Client guide explains the image/caption grouping.

Homepage footer-strip entry is configured only through site.theme.motion.playful.socialDrop: enabled, duration1100, stagger120, distance48, alternateOnLoad. See CUSTOMIZATION.md for storage/history/fallback details; do not add generic image reveals inside that marked strip or alter DOM order to reverse animation. Brand links intentionally suppress text-decoration in every state while retaining focus outlines.
