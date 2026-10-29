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

`motion.js` uses temporary Web Animations on once-only viewport entry. Base content is visible; missing APIs, no JavaScript and reduced motion leave content visible. Text-only entry timing is500ms; image-bearing units use1000ms gradual easing, with bounded staggering. The two highlighted words use 900ms SVG stroke draws on first entry and repeat on precise-pointer hover or keyboard focus, with complete static fallbacks.

Native dialogs provide background isolation for navigation and artwork views. Gallery data is serialized into an escaped JSON data island; visible fields use textContent, not injected HTML. Arrow keys change artwork and closing restores original focus/scroll. ContactForm validates locally without network/storage; without JavaScript its submit control is unavailable and method=dialog prevents default external submission. AnimatedMedia switches between a local GIF and static first-frame poster, exposes pause/play, and stops on reduced-motion preference changes.

The validator checks six schemas, copy/image/gallery references, local routes, fonts and GIF/poster paths. Production audit checks local links, private artifacts, active image override and known hosted tracking/runtime markers. Browser checks cover route/viewport matrices, semantic labels, dialogs, motion/media preferences, no-JS/API-failure paths and actual source edits with restoration. These checks do not constitute full WCAG conformance certification.

## Motion architecture update

Explicit `data-motion="reveal"` units replace broad selector matching. The single reveal observer excludes nested units and already-visible/past content, bounds active work, and releases entered targets. Animations are temporary opacity effects; no persistent hidden classes or `will-change` layers are installed. Focus/hash/preference/visibility/history handlers cancel or resume observation safely, with abortable ownership for reinitialization.

A shared dialog controller owns cancellation generations, native-modal state, focus restoration and reference-counted body scroll locking. It restores inline priorities and compensates for scrollbar width. Drawer and gallery retain their existing semantic controls. Native cross-document CSS transitions are generated only when both switches permit them, inside a no-reduced-motion query; ordinary links/history remain browser-native.

Media lifecycle separates user intent from effective playback. Viewport/tab/preference/error state determines whether GIF or poster is shown without forgetting a manual pause. No third-party animation library or client router was introduced. Gallery data now uses a tested JSON-for-HTML serializer; the earlier audit's gallery breakout is fixed, while other audit findings remain outside this task.

## Playful Tailwind layer
SiteTheme.motion.playful emits CSS tokens and the shell data-playful-enabled flag. Reusable Tailwind @utility definitions in tokens.css gate effects on both motion switches, pointer capabilities, inactive state and motion preference. The existing observer owns SVG circle drawing and image-only transforms with the same concurrency/stagger/once-only bounds. It keeps lifecycle handlers active when reveal APIs are absent so CSS interactions also stop on backgrounding. Image transforms stay within existing frames, and text/prose reveal units remain opacity-only. Native dialog/GIF state machines are unchanged.

## Hand-drawn annotations
FormattedText now renders keyboard-focusable highlighted text with aria-hidden original SVG paths; the previous circle ::after border and settling animation are removed. Circle-only color and 900ms duration are configured centrally. Shared motion observer draws on first entry; delegated pointer/focus handlers replay with stale-safe Map ownership. Reduced/hidden/leave/pagehide cancel to complete base paths. Only two small stroke-dashoffset effects are painted; other reveal animations remain opacity/transform. Process underline is static SVG and the link no longer uses generic hover underline.

## Automatic footer year
Canonical footer.copyright is an escaped text template with exactly one {year}; the owner and rights wording stay in centralized content. Content validation and Footer direct-build checks enforce the marker. Footer renders inline span[data-copyright-year] with the builder-local year. Shared deferred module calls exported updateCopyrightYear() and registers pageshow for history restoration; it uses visitor-local Date and idempotent textContent writes only. No timers, network clock or hydration. Without JavaScript the build year remains; a page left open over New Year refreshes on next load/history restoration. Design credit remains separate.

## More visible motion defaults
Central settings now use 18px/1000ms image-only entry (text-only500ms), 70ms stagger capped at210ms, 6px/1.5deg/1.03 pointer image hover, 900ms circle strokes, 300ms modal/drawer opening and 240ms optional native crossfade. Existing initial visibility, six-effect budget, once-only/replay rules and all lifecycle cancellation/fallbacks stay intact. Closing remains160ms; hover220ms; arrows4px; button/press behavior unchanged.

## Smooth image startup and reversal
Separate typed playful imageRevealDuration1000ms, imageHoverDuration700ms and imageEasing cubic-bezier(0.45,0,0.55,1) control images without slowing text-only or control effects. On first artwork interaction, the handler adds transition styles, reads that one image neutral transform to commit it, then enables data-image-ready. Transform selectors require readiness, preventing the initial hover/focus snap. Preparation persists for continuous hover-out/re-entry, with no repeated flush, timer, extra observer or permanent promotion. No-JS images stay stationary. Existing reduced/inactive cancellation and six-effect budget remain.
