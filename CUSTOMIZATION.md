# Customize your website

Start with **`src/config/site.ts`**. This is the website’s main configuration entry point. You do not need to edit individual Astro components.

The file groups `text`, `images`, `media`, `navigation`, `pages`, `artworks`, `branding`, `icons`, `links`, and `theme`. Large content dictionaries are imported from `src/content/` so each value has one canonical home rather than a duplicate in every component. Clicking an import in your editor opens the relevant content file.

## 1. Open the project and preview changes

1. Open `D:/projects/landing-page-build` in your editor.
2. Open `src/config/site.ts`.
3. Run `npm run dev` from the project folder.
4. Open the local address printed in the terminal (normally `http://127.0.0.1:4321/`).
5. Save a configuration/content edit and check the preview. For a production preview, run `npm run build` again after editing.

Keep quotes, commas and brackets intact. In JSON use double quotes and no trailing commas. Use `npm run check` to find TypeScript mistakes and `npm run build` to validate content and media paths.

## 2. Change words, headings and copyright

In `site.ts`, `text` points to **`src/content/text.en.json`**. All visible copy and accessible control labels live there.

| What to change | Key inside the text file |
|---|---|
| Brand name | `common.siteName` |
| Navigation label | `nav.about`, `nav.work`, etc. |
| Introduction | `home.statement.statementSegments` |
| Collaboration heading | `home.collaborations.heading` |
| Biography/process/press/detail page copy | `editorial` → route name → `title` / `blocks` |
| Artwork title/caption | `artworks` → item ID → `title` / `caption` |
| Contact labels and preview message | `contact` |
| Play/pause labels | `media.play` / `media.pause` |
| Footer text, credits and copyright | `footer` |

Example: change `"siteName": "Lana Gomez"` to `"siteName": "Your Studio"`.

Copyright is an independent editable sentence: update `footer.copyright` as well, keeping exactly one `{year}` placeholder. Artist biography and footer credit do not silently change with the brand name. Update supplied reference wording intentionally and preserve credits you are required to retain.

For formatted text, edit the existing segments rather than inserting HTML:

```json
[
  { "text": "A space for " },
  { "text": "ideas", "emphasis": "italic", "highlight": "circle" }
]
```

Supported options are italic emphasis and circle/accent highlights. Plain editorial blocks use `"tag": "P"` or a heading tag plus `"text"`. They are rendered as text, not executable HTML.

## 3. Replace an image

1. Put the new file in `public/images/` with a descriptive name, for example `studio-portrait.webp`.
2. Follow `images` in `site.ts` to **`src/content/images.json`**.
3. Find the relevant slot (`homeHero`, `homeIntroSide`, `aboutPreview`, etc.).
4. Update `src`, `alt`, `width`, and `height` with the actual source file details.
5. Adjust `position.desktop` and `position.mobile` if the focal point needs to move.

Example record:

```json
{
  "src": "/images/studio-portrait.webp",
  "alt": "Artist standing beside a canvas in the studio.",
  "width": 1600,
  "height": 2000,
  "fit": "cover",
  "position": { "desktop": "50% 40%", "mobile": "50% 30%" },
  "credit": "Your actual asset credit"
}
```

The URL starts at `/images/`, not `/public/images/`. Source dimensions describe the file; the component keeps its existing layout ratio and responsive frame. All current slots deliberately use the same dark PNG, but each slot can be replaced independently.

If a record has `sources`, remove obsolete entries when replacing its file. Optionally run `node scripts/generate-responsive-images.mjs` to generate matching local width variants, then rebuild. Do not keep old responsive paths pointing to unrelated photographs.

Original image files remain in the source folder. The production build keeps only configured image/logo/icon/favicon files in `dist/images`; it does not delete your source originals.

## 4. Set a logo, favicon or icon

These settings live directly in **`site.ts`**.

`branding.logo` is currently `null` (a text wordmark). Replace the `null` value with metadata, keeping the existing type annotation if shown:

```ts
logo: {
  src: '/images/client-logo.svg',
  alt: 'Your Studio',
  width: 240,
  height: 100,
},
```

The header and footer use the same configured logo. The header retains the editable brand name beside it; the footer uses the image in place of its text wordmark. Set the logo back to `null` to restore the default text-only branding.

For a favicon, set `branding.favicon` to a local path such as `/icons/favicon.svg`; `null` means no favicon link is added.

`icons` contains the menu, close, next, previous and external-link symbols. Each has `text` and optional `src`. For a custom icon, put a file in `public/icons/`, then replace that icon’s `src: null` with `src: '/icons/menu.svg'`. Leave it `null` to use the text symbol. Accessible button labels remain in the text dictionary.

## 5. Replace the GIF/video-slot media

Follow `media` in `site.ts` to **`src/content/media.json`**. The current `processVideo` entry is used by `/the-process/` and `/home-1/`.

1. Put an animated GIF in `public/media/`.
2. Put a static first-frame image alongside it.
3. Update `src`, `poster`, `width`, `height`, `altKey`, and source/license notes.
4. Edit the accessible description under `media.alt` in the text dictionary.
5. Check pause/play and reduced-motion behavior.

```json
{
  "src": "/media/studio-animation.gif",
  "poster": "/media/studio-animation-poster.png",
  "width": 1160,
  "height": 653,
  "altKey": "media.alt"
}
```

The existing video-slot component supports **animated image/GIF playback**, not MP4/WebM. A GIF replacement needs no component edit. Adding a different video format is a separate feature, not a matter of renaming the extension. Without JavaScript or with reduced motion enabled, the static poster is displayed. The pause/play control remains functional.

## 6. Change fonts and typography

In **`site.ts`**, open `theme.typography`:

- `fonts.primary`: editorial headings and serif text.
- `fonts.secondary`: body text, navigation and controls.
- `fonts.brand`: brand lettering only.
- `sizes`: fluid heading/body/caption/brand sizes.
- `weights`, `lineHeights`, `tracking`: shared typography settings.

Each font definition contains its family, fallback stack and locally hosted normal/italic faces. To replace a font, add properly licensed files to `public/fonts/` and update the full definition, for example:

```ts
primary: {
  family: 'My Display Font',
  fallback: 'Georgia, serif',
  faces: [
    { src: '/fonts/my-display-regular.woff2', format: 'woff2', weight: '400', style: 'normal' },
    { src: '/fonts/my-display-italic.woff2', format: 'woff2', weight: '400', style: 'italic' },
  ],
},
```

Use weights the actual font file supports. A static file normally has one weight; a variable font can have a range such as `'300 700'`. Changing the family name alone does not replace the underlying font file—update `faces` too.

To enlarge body text, change `sizes.body`, for example to `'1.125rem'`. Keep existing `clamp(...)` values when you want fluid mobile-to-desktop sizing. A different font can naturally change text wrapping; verify the same six viewport widths after a client font change.

Font CSS is generated automatically. Do **not** edit `fonts.css` or duplicate `@font-face` declarations in components. Retain the actual font license in the project and update `THIRD_PARTY_NOTICES.md` / `docs/asset-manifest.json`. The current brush font is Caveat Brush under SIL OFL 1.1.

## 7. Change colors and design tokens

Edit **`site.ts` → `theme.colors`**:

| Setting | Used for |
|---|---|
| `primary` | Bright accent/buttons/highlights |
| `secondary` | Muted supporting text |
| `background` / `surface` | Main canvas / surface backgrounds |
| `text` | Primary text |
| `border` | Dividers and image placeholders |
| `accentText` | Text on accent buttons |
| `focus` | Keyboard focus outlines |
| `subtleBackground` | Intro/footer background |
| `onMedia`, `shadow`, `overlay`, `modalOverlay` | Text over imagery and dialog backdrops |

Example: change `primary: '#ffe600'` to `primary: '#d9e8ff'`. Check `accentText` contrast against your new accent. No component edit is needed.

Shared `spacing`, `layout`, and `motion` settings are also in `theme`. Existing breakpoints and component geometry remain in authored CSS to preserve the approved layout. Motion’s `entryDuration` and `entryStagger` are numbers in milliseconds; fast/standard transition values include `ms`.

The configuration generates the existing CSS variables. Tailwind uses aliases of those same variables (`bg-primary`, `text-foreground`, `font-primary`, `font-secondary`, `font-wordmark`, `text-hero`); there is no second color/font palette to synchronize. No Tailwind reset or default-font theme is added.

## 8. Navigation, routes and artwork order

- Follow `navigation` to `src/content/navigation.json`: destinations reference text keys rather than duplicating labels.
- `links` in `site.ts`: shared home, colophon and privacy destinations.
- Follow `pages` to `src/content/pages.json`: route/section configuration. Do not remove a destination without updating links that point to it.
- Follow `artworks` to `src/content/artworks.json`: choose `collection`, `order`, and referenced copy/image keys. Change artwork wording in the text dictionary.

The contact form is a local preview. Updating the email changes the mail link; update any address mentioned in `contact.body` as well. No configuration setting enables actual message delivery or checkout.

## 9. Check and save your changes

```powershell
npm run check
npm run build
npm run audit
```

For the browser regression suite, start a production preview on an unused port:

```powershell
npm run preview -- --port 4330
```

In a second terminal:

```powershell
$env:SITE_TEST_URL='http://127.0.0.1:4330'
npm test
```

Tests use installed Microsoft Edge and temporarily change configuration/content to prove editability, then restore it and rebuild the baseline. Do not edit the same files while these tests run.

Save logical changes as separate local commits. Do not push or publish without the project owner’s permission. Supplied reference copy/GIF rights are not asserted as open-license; preserve required notices.

## Smooth motion controls

`site.theme.motion` now includes these typed, shared settings:

| Setting | Default | Effect |
|---|---:|---|
| `enabled` | `true` | Master switch for automatic UI effects and GIF autoplay |
| `pageTransitions` | `true` | Native same-origin page crossfades where supported |
| `entryDuration` | `500` | Text-only reveal duration, milliseconds; images use imageRevealDuration |
| `entryStagger` | `70` | Delay between units in a revealed group, milliseconds |
| `maxStagger` | `210` | Maximum reveal-group delay, milliseconds |
| `maxConcurrent` | `6` | Concurrent reveal budget; excess content appears immediately |
| `dialogOpen` / `dialogClose` | `300` / `160` | Drawer/lightbox transition durations, milliseconds |
| `pageDuration` | `240` | Native page crossfade duration, milliseconds |
| `fast` / `standard` | `'160ms'` | Hover transitions; include the `ms` unit |

Set `enabled: false` for immediate UI changes, no reveal/page effects and no automatic GIF playback. Explicit GIF play remains available because it is a deliberate user request. Set only `pageTransitions: false` to disable page crossfades while keeping other motion. Unsupported browsers retain normal page navigation; no SPA router is used.

Initial viewport content appears immediately. Below-fold units reveal only once. Keyboard focus, anchor destinations, reduced motion and hidden pages cancel temporary effects rather than leaving content transparent. Circles draw on first visible entry and replay on precise-pointer hover or keyboard focus when playful motion is enabled. Menu/lightbox closure preserves native modal isolation until the closing effect ends, then restores focus and original scrolling/styles.

The GIF uses its poster when offscreen, in a hidden tab, with reduced motion enabled, or after a load error. Manual pause survives scrolling and tab visibility changes. Explicit play can override the reduced-motion default; a later change to reduced motion stops it again. A failed GIF is retried only by a user play action. The selected GIF and poster are unchanged; no format conversion is required.

## Playful artwork and 2D accents

Open `src/config/site.ts` and find `theme.motion.playful`. The main motion switch still disables all motion; setting only `playful.enabled: false` restores the earlier restrained treatment. Layout, fonts, copy and media stay the same.

| Setting | Default | What it changes |
|---|---:|---|
| enabled | true | Artwork/brand/arrow/underline and circle enhancements |
| hoverDuration | 220 | Button/link/arrow transition duration, milliseconds |
| imageRevealDuration | 1400 | Image/card reveal duration, milliseconds |
| imageHoverDuration | 700 | Image hover and return duration, milliseconds |
| imageEasing | cubic-bezier(0.45, 0, 0.55, 1) | Gradual image ease-in/ease-out |
| cardLift | 0 | Artwork lift, pixels; keep small |
| cardTilt | 0 | Pointer-only artwork tilt, degrees |
| cardScale | 1.015 | Artwork hover/focus image scale |
| pressScale | 0.98 | Legacy compatibility value; standard buttons do not scale |
| arrowTravel | 4 | Legacy/gallery-control arrow travel; ordinary links use `theme.textLinks.arrowDistance` |
| revealTravel | 18 | Upward entry distance for eligible image-only units, pixels |
| accentDuration | 420 | One-shot brand wobble duration, milliseconds |
| circleDrawDuration | 900 | Circle stroke draw/replay duration, milliseconds |

For a smaller zoom, set `cardScale: 1.01` while leaving lift/tilt at0. For stationary artwork use `cardScale: 1`; branding is already stationary with `brandWobbleEnabled: false`. The `playful.enabled` master also controls signature effects, so leave it enabled to retain circles and the six-image sequence. Save, run `npm run check` and `npm run build`, then preview desktop and mobile.

Filled buttons lift2px on hover and press to1px below neutral; artwork uses gentle zoom without tilt/lift. Hover movement requires a precise pointer. Circle strokes retain their first-view/hover/focus drawing; brand wobble and gold glow are disabled in the creative defaults. There are no continuous decorative loops. Reduced motion and backgrounding stop the effects. Existing GIF controls and dialog timing are unchanged.

These are reusable Tailwind utilities backed by generated CSS variables. You do not need to edit component classes, keyframes or JavaScript to change the settings above.

The homepage “THE PROCESS” link uses the locally hosted secondary sans-serif font, typography.sizes.processLink (18–24px fluid size) and typography.weights.regular in site.ts. These settings do not change the surrounding serif statement.

## Hand-drawn circle and Process accents

Change theme.colors.circle in src/config/site.ts to recolor only the word circles (default #ffe600). theme.colors.primary also defaults to #ffe600 for collaboration buttons and other primary accents; the two settings remain independently editable. Change theme.motion.playful.circleDrawDuration (default 900ms) to adjust stroke drawing. For example, set it to 1100 for a slower pen stroke. The circles replay on hover/focus, finish completely when interrupted, and remain fully visible with reduced motion, disabled switches or no JavaScript. Highlighted words are keyboard-focusable text with visible focus outlines.

THE PROCESS retains its local regular sans-serif font and permanent dark hand-drawn SVG underline. Its link destination and typography controls are unchanged. The decorative circles/underline contain no downloadable media and require no new font or library.

## Automatic copyright year

Edit the owner and wording in `src/content/text.en.json`, exposed through `site.text.footer.copyright` in `src/config/site.ts`. Keep exactly one `{year}` marker:

```json
"copyright": "© {year} Your Studio. All Rights Reserved."
```

Do not type a fixed year. Astro inserts the build machine's local year into every shared footer. On page load and browser-history restoration, the small `updateCopyrightYear()` helper replaces only the year with the visitor's current local year. The owner's name, rights wording and separate design credit remain unchanged.

Without JavaScript, visitors see the year from the last build. A page left open across New Year updates on its next load or history restoration; there is no background timer, external request or need to rebuild for JavaScript-enabled visitors. The visitor's device clock determines the browser year.

Validation rejects missing or duplicate `{year}` markers. After editing, run `npm run check` and `npm run build`; preview with and without JavaScript to check the footer. Existing motion settings are unrelated to copyright and remain unchanged.

Images now use separate slow settings in theme.motion.playful. imageRevealDuration controls image frames and image-bearing cards/links (including their captions); standalone text keeps entryDuration500ms. imageHoverDuration applies both entering and leaving hover, with imageEasing for a gentle start/stop. For even slower images, try imageRevealDuration:1200 and imageHoverDuration:900. Movement distances, layout and control timing stay unchanged. Reduced-motion and other fallbacks still settle immediately.

## Alternating homepage image strip

The six pictures above the homepage footer use `site.theme.motion.playful.socialDrop` in `src/config/site.ts`. Change `enabled` to false for a static strip. Defaults are `duration:1100` milliseconds per picture, `stagger:120` milliseconds between pictures, `distance:48` pixels downward from above, and `alternateOnLoad:true`. The six-picture sequence lasts1700ms and uses the shared balanced image easing. Positions, links and the mobile two-row layout stay unchanged.

With alternation enabled, eligible homepage loads alternate1→6 then6→1 in the current browser and origin. The last direction is saved under `site:home:social-drop-direction` in localStorage, including after closing the browser. Clearing that website's storage resets to forward. Blocked storage safely plays forward; setting alternateOnLoad:false always plays forward without writing. History restoration reads the saved direction without advancing it; scrolling never repeats a completed sequence. Different origins, including different preview ports, have separate storage.

Eligible strip cards are prepared invisible before observation starts, with their square layout space reserved. The sequence starts once when75% of the strip is visible, after the images load and decode. A decode failure or the shared imageDecodeTimeout(default4000ms) shows the complete static strip. It animates outer cards while inner pictures keep their smooth hover. Short screens that cannot fit the full strip, a reveal budget below six, focused/anchor-targeted content and missing animation/observer APIs keep complete static pictures. Reduced motion, disabled master/playful/drop switches and missing APIs do not consume a direction. Hiding the tab, navigating or enabling reduced motion immediately settles running cards. There is no animation loop or added library/media; the decoding deadline is a single cancellable timeout.

## Brand name and footer type

Change `common.siteName` in `src/content/text.en.json` once. Shared `getBrandName()` in `src/utils/content.ts` supplies header/footer wordmarks, their accessible names, and the mobile drawer title. Logo images still use the single `site.branding.logo` setting. Copyright wording remains its separate editable template.

Footer group headings and links use `theme.typography.fonts.footer` (Arial, with Helvetica/sans-serif fallback), `sizes.footer` (responsive14–18px) and `lineHeights.footer` (1.25). Headings stay bold; labels use regular uppercase text. These system fonts require no download; their exact rendering depends on the installed font. Body, brand, copyright typography and existing link underline behavior stay unchanged.

Footer social links use local icons from site.icons.instagram and site.icons.facebook in src/config/site.ts. Replace their src paths to customize the symbols. Destinations remain in navigation.social, and accessible link names/tooltips remain in the content dictionary. Icon artwork lives in public/icons/; the shared SiteIcon component also supports a configured text fallback.

## Individually replaceable demo pictures

The110 image slots now have separate local WebP files under public/images/demo/, organized by homepage, editorial page, available and archived. See IMAGE_REPLACEMENT_GUIDE.md for every filename, image key and displayed ratio. Replace a file using the same path, then update its actual dimensions, alt text, crop position and credit in src/content/images.json. Editorial pages select their imageKeys array in src/content/pages.json; artworks select their imageKey in src/content/artworks.json. Work reuses the Available collection. All settings remain exposed through site.ts; component edits are unnecessary.

The museum pictures are temporary CC0 demos, not the client’s own artwork. Their license/source records live in docs/demo-image-sources.json. Replacing a picture with a different third-party image requires recording that image’s actual rights/source. The existing logo/icons and GIF/poster remain separate.

## Readable labels and restrained buttons

About is a normal-flow caption beneath its unchanged picture, using the same dark fill and subtle gold glow as Press, Archived and Contact. Its image remains unobstructed. Edit theme.colors.text/goldDark/goldMid/goldLight and theme.typography.sizes.labelStroke in src/config/site.ts. The older About-specific settings remain available for compatible custom components. Footer underlines fit their text; active navbar links use one steady underline. Yellow collaboration buttons never underline.

Moving light sweeps are disabled in the client baseline: `theme.motion.playful.shineEnabled: false`. Existing glow is separate and remains enabled. Setting `shineEnabled` to `true` explicitly restores the retained non-button shine capability; `shineDuration` remains 1000ms for compatibility. Image logos do not shine. This optional setting is not enabled in this candidate.

Collaboration pills and normal buttons use a soft press: `theme.motion.playful.buttonPressDistance: 1` (px) and `buttonDuration: 160` (ms). Only their visual face moves down while pressed, returning smoothly on release. The interactive target stays stationary; there is no fade, scaling, jelly or bounce; filled controls have the restrained hover lift described below. Reduced/disabled/inactive motion keeps the face static. Image-card buttons retain their separate artwork hover. In the creative version, yellow filled buttons lift their visual face2px over220ms with a soft shadow, while the target remains fixed; press moves the face to1px below neutral. The shared passive touch/pen handler now covers filled buttons too, giving immediate feedback and clearing on movement/cancellation/release. Menu/lightbox text controls retain their original soft press. `buttonOpacity` remains at 1 and old jelly/menu-jiggle settings retain their names for compatibility; they no longer animate buttons.

## Entry shine and About caption

Navigation labels use theme.typography.weights.navigation(default600); wordmark/heading font weights are unchanged. Navbar lettering is clean without gold glow or text outlines; optional masked fill sweeps remain disabled by default. About sits beneath the image with the same clean dark text as the other captions. There is no box, padding, overlay or image dimming. A decorative aria-hidden copy supplies a moving gold fill through a narrow mask; it is not a duplicate accessible heading. Unsupported masks keep the ordinary base text.

Optional shine lifecycle (only when `shineEnabled: true`): non-button wordmarks/headings/labels use the existing 1000ms `shineDuration`, once on visible entry and on precise-pointer hover or keyboard focus. Completed entry effects do not replay on ordinary scrolling/history restoration. Reduced/disabled motion, inactive tabs and navigation cancel effects. Buttons retain soft-press feedback even when optional shine is enabled.

About now shares playful.labelGlowDuration(default1800ms), labelGlowLow and labelGlowHigh with the other dark captions. The optional 1000ms masked fill sweep is disabled by default. Reduced motion, disabled settings and inactive tabs stop decorative motion. The older aboutGlowDuration remains available to the optional About-specific component variant.

## Shared homepage gold labels

GoldenOutlineText.astro renders About, Press, Archived, Contact and THE PROCESS with one accessible text layer and an aria-hidden, absolutely positioned sweep layer. Press/Archived/Contact include their configured arrow; Process keeps its original separate black hand-drawn underline. No new backgrounds or padding.

New dark labels use theme.typography.sizes.labelStroke(default0px), the existing theme.colors.goldDark/goldMid/goldLight palette, and playful.labelGlowDuration(default1800ms), labelGlowLow(3px) and labelGlowHigh(6px). Their dark fill, font, size and weight stayunchanged. About uses the same dark caption treatment below its picture; the older About-specific tokens remain available for custom styling. The existing playful.shineDuration1000ms controls masked fill sweeps for allfive.

Allfiveglows now run only onscreen using the shared observer. Hover/focus replay remains independent and once-only entry/history tracking is preserved. Leaving a label or scrolling it offscreen cancels its sweep immediately. Reduced motion, inactive tabs, disabled switches, noJavaScript or missing APIs retain static readable text without outlines. Decorative copies must remain hidden between sweeps and hidden from assistive technology.

## Gold navigation, footer headings and page titles

The same GoldenOutlineText component now covers desktop/mobile navigation, footer category headings, gallery titles, Contact and editorial portfolio titles (including collaboration detail pages). Legal and home-1 utility titles, body copy, artwork captions, form labels, and ordinary footer links remain excluded. No new typography or animation settings: zero-width text strokes,1800ms subtle glow and optional 1000ms masked fill sweep apply (shine disabled by default). Navbar weight600 is preserved. Native link underlines follow their inline text layers; decorative sweep copies remain hidden by the default shine switch.

Navigation links replay on hover or keyboard focus. Structural headings remain plain headings without added tab stops; they receive entry/hover effects. Existing visibility/once-only/history/cancellation logic is reused. Accessible names use only the base text; the extra sweep layer is aria-hidden and invisible between sweeps. Central content changes update both visual layers automatically.

## Horizontal press highlighter

Only the five Press paragraphs with `highlight: "press-marker"` in `src/content/text.en.json` receive horizontal marker bands. Headings and the separate publication links are unchanged. Keep those five paragraphs contiguous to share one decorative composition.

Edit `theme.pressMarker` in `src/config/site.ts`: color(default#fff230), opacity(0.55), thickness(24px), duration(900ms per stroke), stagger(1000ms between starts). Each paragraph receives a horizontal marker swipe. Inline box-decoration-break:clone repeats the background behind every wrapped line, without highlighting blank column space. Black text stays fully opaque. No SVG/diagonal strokes remain; fonts, spacing and wrapping are unchanged. The five paragraph swipes last900ms each and start1000ms apart, finishing after4900ms. thickness controls the horizontal band height.

One shared observer starts the sequence once on first view. No hover/scroll/history replay. Disabled master/playful motion, reduced motion, noJavaScript/missing APIs, backgrounding or interrupted navigation leave full static marks. No media download or library is involved.

## Soft hand-marker and Press underline trial

Marker thickness now defaults28px with2px vertical overhang and2unit mildedgecurves. theme.pressMarker.overhang/edgeCurve control originalgeneratedSVGbackgroundedges; its softgradient retains the centralcolor/opacity. Inlinefragmentcloning and900ms/1000ms paragraph timing remain. No spacing/wrapping changes.

Press article links now use the professional text-link settings described below. Their native 1px lines stay visible on every wrapped text fragment; hovering never thickens them. The older `theme.pressLinks` names remain for compatibility and the separate Process SVG. Brand font remains Caveat Brush.

## Prepared photo reveals, shared underlines and enlarged branding

Ordinary below-fold photographs now have one dedicated photo-frame entry owner. Existing captions/text and gold effects do not fade the same picture again or cancel its entry. In theme.motion.playful, imageRevealDuration is1400ms, imageNearDistance is100px, and imageDecodeTimeout is4000ms; imageEasing, revealTravel18px and imageHoverDuration700ms retain their existing roles. Standalone frames retain upward movement; card photographs retain their previous opacity-only entry. The six-image social strip keeps its separate alternating drop.

Initial viewport photographs are immediately visible. Supported JavaScript prepares only below-fold frames as pending/transparent, then starts decoding when they approach the viewport. A decoded picture fades in once; six concurrent photo entries are allowed, with excess pictures shown immediately rather than queued. Decode errors/timeouts restore visible base frames. During entry, inner-image hover movement is suppressed; after settlement normal smooth hover is rearmed. Focus/anchors, history restoration, reduced motion, disabled motion, inactive tabs, navigation, missing APIs and initialization failures leave no hidden photos. Logos/icons and animated-media GIF/poster are excluded. WithoutJavaScript allpictures remainvisible.

Ordinary native underlines are controlled by `theme.textLinks`: 1px throughout, with a 180ms color fade on precise-pointer hover. Permanent editorial and active-page lines stay visible. Process retains its original separate 2px SVG line and existing 3px hover/focus response through the legacy `theme.pressLinks` settings. Brand names, social icons, yellow buttons and homepage captions stay undecorated. Reduced/disabled motion makes feedback immediate.

Change branding.wordmarkScale.width(default1.3) and height(default1.55) toresize textbrands. BrandWordmark reserves widthandmultilineheight while anindependentinnertextlayer keepsgoldshine andCaveatBrush. The header/footer/drawer sharegetBrandName andthe samecomponent. Usepositive scales; largerorlongernames canincreaseheader/footerheight. Image-logo proportions arenotchanged.


## Stable font loading and text jelly

In `src/config/site.ts`, `theme.typography.loading.preload` defaults to `true`. The document preloads one normal face from each configured primary, secondary and brand family, automatically deduplicating repeated files. Changing the font definitions also updates the preloads; no component edits are needed. Italic faces load when used. System footer fonts have no downloaded face.

`theme.typography.loading.display` defaults to `block`: the browser briefly waits for the chosen font before using readable fallback text. The browser controls this bounded block period (commonly up to about three seconds); images and the page are never hidden. Slow or failed fonts can still require fallback metrics. Other supported values are `swap`, `fallback` and `optional`. There is no font-ready JavaScript overlay or timer.

Homepage captions, Process and desktop/mobile navigation now use the professional link response instead of text squash. Existing `jellyDuration`, `jellyWide`, `jellyNarrow` settings and class names remain compatible for custom components. These standard links never run the old jelly animation. Filled buttons retain their independent 1px soft press.

Customization tests now build temporary private copies and use separate local servers. They never change the working source or visible preview output. This prevents temporary test fonts, names and colors appearing when you reload the preview during tests.

Keyboard focus can replay a text accent during the browser's normal focus scrolling. Continuous decorative glows stop offscreen; reduced-motion, background and navigation cancellation still settle effects immediately.

## Mobile Open/Close controls

The full navigation appears at 1024px and wider. Below that breakpoint, Open Menu and Close Menu use the existing Plus Jakarta Sans font at 16px (`theme.typography.sizes.menuControl: '1rem'`). Their normal weight is `theme.typography.weights.menuControl: '600'`; precise-pointer hover, keyboard focus and touch press use `menuControlActive: '700'`. Only the text gets heavier; hidden decorative sizing text reserves the heavier width, while the icon and 44px minimum touch target stay fixed. These controls have no underline.

Both menu labels retain dark readable text, with gold glow, outlines, light sweeps and jiggle disabled in the creative version. They use the visual-only 1px soft press. The old compatible jiggle settings remain: `theme.motion.playful.menuJiggleDuration: 500`, `menuJiggleTravel: 1.5` pixels, `menuJiggleTilt: 2` degrees. Other non-button text jelly keeps its existing settings. Touch scrolling does not trigger hover feedback.

The brand inside the open drawer glows until native closing completes. `theme.motion.playful.drawerBrandGlowDuration: 1800` sets its pulse period; it reuses the existing gold colors and glow strengths. Header/footer brands keep their current effects. Background tabs, reduced/disabled motion and missing animation/observer APIs use readable static gold styling. Closing, Escape, navigation and resizing to desktop release the glow, focus and scroll state through the existing dialog lifecycle.

Primary yellow and highlighted-word circles now default to `#ffe600` across desktop and mobile. Phone display profiles or night-color settings can still affect perceived color. Gold and Press-marker colors are separate settings.

## Safe links and media paths

Configured links accept `/site-path/`, `#fragment`, full `https://` or `http://` URLs, and plain `mailto:studio@example.com` addresses. Keep `contact.email` as a plain address. Executable schemes (`javascript:`, `data:`), `//host` links, embedded credentials, control characters and mail-header query parameters are rejected with a setting-specific error. Use local `/images/...`, `/fonts/...`, `/icons/...` and `/media/...` asset paths without traversal, query or fragment. These checks run during validation and direct Astro builds; they do not rewrite your content or change existing destinations. See [Security deployment notes](SECURITY.md) before public hosting.

## Gold text outlines removed

All website text now has zero-width gold strokes, including navigation, titles, homepage captions, footer headings, Open/Close labels and the drawer brand. `theme.typography.sizes.labelStroke` and `aboutStroke` retain their existing names and default to `'0px'` for compatibility. There are no separate per-label sweep stroke overrides.

Gold glow and brand wobble are disabled by default in the creative version; shine also remains disabled: decorative `.outline-sweep` copies use gold-light **fill** under the existing moving mask, with zero stroke. They remain absolutely positioned, hidden between sweeps and hidden from assistive technology. Their 1000ms duration, triggers, cancellation and static fallbacks are unchanged. Legacy optional shine/glow/wobble configuration names remain compatible; ordinary links do not squash. Menu/button jiggle is replaced by a visual-only soft press. Normal fills, fonts, weights, geometry, underlines, yellow circles/buttons and image motion are unchanged. The Figma export was not modified.

## Protected baseline and separate creative version

The approved baseline is protected by tag `freeze/client-baseline-2026-10-31`. Creative refinement happens on `creative/redesign` in a separate working folder. This branch does not change the frozen tag, original main folder or verified backup. No creative push, merge, deployment or new freeze is implied.

Mobile refinements load after the shared base styles through the common layout. This preserves the existing intended narrow-screen single-column sections and three-column/two-row social strip consistently in development and production.


## Professional ordinary text links

Edit `theme.textLinks` in `src/config/site.ts`. These settings apply to desktop/mobile navigation, footer text links, editorial links and the contact email. Existing arrows in homepage captions use the same travel settings without adding underlines to captions.

| Setting | Default | Purpose |
| --- | --- | --- |
| `underlineThickness` | `1` | Native line thickness in pixels; never grows on hover |
| `underlineDuration` | `180` | Hover underline fade, milliseconds |
| `arrowDistance` | `3` | Existing link arrows move right, pixels |
| `arrowDuration` | `220` | Arrow movement/return, milliseconds |
| `pressOpacity` | `0.82` | Pressed lettering opacity; images stay unchanged |
| `pressDuration` | `90` | Press feedback, milliseconds |
| `releaseDuration` | `160` | Return to normal opacity, milliseconds |

For example, change `arrowDistance: 3` to `arrowDistance: 2` for a smaller response. No component editing is necessary. Wrapping, fonts, weights, destinations and clickable dimensions stay unchanged. Keyboard focus shows its underline and existing focus outline immediately. Permanent editorial/current-page lines stay visible. Hover-only lines fade back to transparent on exit.

Transitions use CSS. A small delegated touch/pen handler marks a press immediately and clears it on release, movement, cancellation, backgrounding or history restoration. It never captures input, prevents defaults or delays navigation. Without JavaScript, links retain native press behavior and usable CSS hover/focus styling. Reduced motion or disabled master/playful motion removes movement and transitions while keeping immediate feedback. Gallery controls keep their separate arrow movement. Filled buttons, brand names, menu controls, social icons, image cards, Process's hand-drawn line, glow and image motion retain their existing behavior.

This creative update is local only. The existing frozen tag/backup remain protected; publication, merge and any later freeze require separate authorization.


## Creative premium gallery settings

The creative version preserves the same content, fonts, image ratios/crops, grid columns, color palette and branding sizes. No new visual library or external media was added.

`theme.refinement` centralizes layout refinements:

| Setting | Default |
| --- | --- |
| `proseMaxWidth` / `proseLineHeight` | `60ch` / `1.6` |
| `headingGapDesktop` / `headingGapMobile` | `56px` / `40px` |
| `captionGap` | `16px` |
| `galleryCaptionGap` / `galleryMetadataGap` | `12px` / `4px` |
| `fieldGap` / `fieldGroupGap` | `8px` / `24px` |

Under `theme.motion.playful`, `glowEnabled: false` removes repeating gold halos, including the drawer brand; `brandWobbleEnabled: false` keeps wordmarks still. `shineEnabled` remains false and both text-stroke sizes remain0px. The collaboration heading retains its ordinary dark readability shadow over the image. Legacy durations remain available for custom opt-in components.

Artwork uses `cardLift: 0`, `cardTilt: 0`, `cardScale: 1.015` and the existing700ms image timing. Yellow filled controls use `buttonHoverLift: 2`, `buttonHoverDuration: 220` and `buttonHoverShadow: '0 5px 14px rgb(0 0 0 / .12)'`. Existing `buttonPressDistance: 1` and `buttonDuration: 160` control press feedback. Only the visual surface/letters move; click targets and dimensions stay fixed. Touch does not trigger hover. Reduced/disabled/inactive motion cancels movement and shadow. GIF labels update inside their text span so the button surface remains intact.

The two circle draws and six-image alternating48px drop retain their existing settings and persistence. All14pages still share the original reveal, dialog, media, copyright and ordinary text-link behavior.
