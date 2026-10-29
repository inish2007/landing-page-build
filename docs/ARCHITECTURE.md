# Central configuration update

`src/config/site.ts` is the typed application configuration entry point. It composes six canonical content dictionaries with branding/icons/links and theme settings. Components consume it directly or through typed `src/utils/content.ts`; no component reads a content dictionary directly. `SiteTheme.astro` emits configured CSS variables/font faces and Tailwind aliases reuse those variables without preflight/default-font overrides. `SiteIcon.astro` renders text symbols or configured local assets. Validation/audit/production pruning read the same site configuration, including custom logo/icon selections. See CUSTOMIZATION.md for client editing. Earlier architecture details below remain applicable except where they name former token/font or content.js sources.

# Architecture

Astro produces 14 content pages plus two static redirect documents. `src/pages/index.astro` renders configured homepage sections. `src/pages/[...slug].astro` enumerates the remaining `pages.json` entries through `getStaticPaths`, then selects EditorialPage, Gallery or ContactForm. `/home/` redirects to `/`; `/process/` redirects to `/the-process/`.

`SiteLayout.astro` owns fonts/styles, skip link, header, main landmark, footer, native navigation dialog and shared motion. Source hosted runtime code is not imported.

The content boundary is six dictionaries:

| File | Responsibility |
|---|---|
| text.en.json | Visible copy, accessible names, source editorial blocks, gallery titles/captions and form/media messages |
| images.json | Image selection, actual source dimensions, alt text and desktop/mobile crops |
| navigation.json | Header/footer/social/collaboration destinations and label keys |
| pages.json | Route metadata, content namespace, section composition and optional media |
| artworks.json | 62 ordered available/archived records referencing copy/image keys |
| media.json | GIF/poster selection, dimensions and accessible-copy key |

ResponsiveImage separates source dimensions from presentation ratio. All 15 image records currently point to one dark PNG. Existing image originals remain in public source for future client editing; `postbuild` removes inactive image copies from dist only, never source. Font files remain local and `--font-brand` controls brush lettering independently of serif/sans typography.

`motion.js` uses temporary Web Animations on once-only viewport entry. Base content is visible; missing APIs, no JavaScript and reduced motion leave content visible. Entry timing is 1500ms ease with small bounded staggering; circles stay static. This implements the saved source configuration without claiming identical original runtime behavior.

Native dialogs provide background isolation for navigation and artwork views. Gallery data is serialized into an escaped JSON data island; visible fields use textContent, not injected HTML. Arrow keys change artwork and closing restores original focus/scroll. ContactForm validates locally without network/storage; without JavaScript its submit control is unavailable and method=dialog prevents default external submission. AnimatedMedia switches between a local GIF and static first-frame poster, exposes pause/play, and stops on reduced-motion preference changes.

The validator checks six schemas, copy/image/gallery references, local routes, fonts and GIF/poster paths. Production audit checks local links, private artifacts, active image override and known hosted tracking/runtime markers. Browser checks cover route/viewport matrices, semantic labels, dialogs, motion/media preferences, no-JS/API-failure paths and actual source edits with restoration. These checks do not constitute full WCAG conformance certification.
