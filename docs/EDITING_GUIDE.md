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

Motion timing and switches are now in `site.theme.motion`: reveal360ms, stagger40ms/cap120ms, concurrent budget6, dialogs220/160ms, page160ms and hover160ms. See CUSTOMIZATION.md for exact properties, GIF pause/visibility behavior and progressive page-transition fallback. Layout, fonts, copy and current dark/GIF asset selections are preserved.
