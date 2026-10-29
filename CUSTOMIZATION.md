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

Example: change `primary: '#e5ff00'` to `primary: '#d9e8ff'`. Check `accentText` contrast against your new accent. No component edit is needed.

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
| imageRevealDuration | 1000 | Image/card reveal duration, milliseconds |
| imageHoverDuration | 700 | Image hover and return duration, milliseconds |
| imageEasing | cubic-bezier(0.45, 0, 0.55, 1) | Gradual image ease-in/ease-out |
| cardLift | 6 | Artwork lift, pixels; keep small |
| cardTilt | 1.5 | Pointer-only artwork tilt, degrees |
| cardScale | 1.03 | Pointer-only artwork image scale |
| pressScale | 0.98 | Button scale while pressed |
| arrowTravel | 4 | Arrow movement in its direction, pixels |
| revealTravel | 18 | Upward entry distance for eligible image-only units, pixels |
| accentDuration | 420 | One-shot brand wobble duration, milliseconds |
| circleDrawDuration | 900 | Circle stroke draw/replay duration, milliseconds |

For gentler artwork movement, change `cardLift: 2`, `cardTilt: 0.5`, and `cardScale: 1.01`. For stationary branding and artwork, set `enabled: false` inside `playful`. Save, run `npm run check` and `npm run build`, then preview desktop and mobile.

Buttons lift 2px and compress while held; keyboard artwork focus lifts without tilt. Hover movement requires a precise pointer. Circle strokes draw once when first visible and replay on precise-pointer hover or keyboard focus; brand wobble plays once per deliberate hover/focus. There are no continuous decorative loops. Reduced motion and backgrounding stop the effects. Existing GIF controls and dialog timing are unchanged.

These are reusable Tailwind utilities backed by generated CSS variables. You do not need to edit component classes, keyframes or JavaScript to change the settings above.

The homepage “THE PROCESS” link uses the locally hosted secondary sans-serif font, typography.sizes.processLink (18–24px fluid size) and typography.weights.regular in site.ts. These settings do not change the surrounding serif statement.

## Hand-drawn circle and Process accents

Change theme.colors.circle in src/config/site.ts to recolor only the word circles (default #c5d600). theme.colors.primary remains #e5ff00 for the other yellow accents. Change theme.motion.playful.circleDrawDuration (default 900ms) to adjust stroke drawing. For example, set it to 1100 for a slower pen stroke. The circles replay on hover/focus, finish completely when interrupted, and remain fully visible with reduced motion, disabled switches or no JavaScript. Highlighted words are keyboard-focusable text with visible focus outlines.

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

The sequence starts once when75% of the strip is visible. It animates outer cards while inner pictures keep their smooth hover. Short screens that cannot fit the full strip, a reveal budget below six, focused/anchor-targeted content and missing animation/observer APIs keep complete static pictures. Reduced motion, disabled master/playful/drop switches and missing APIs do not consume a direction. Hiding the tab, navigating or enabling reduced motion immediately settles running cards. No new library, timer, media file or layout rule is required.

## Brand name and footer type

Change `common.siteName` in `src/content/text.en.json` once. Shared `getBrandName()` in `src/utils/content.ts` supplies header/footer wordmarks, their accessible names, and the mobile drawer title. Logo images still use the single `site.branding.logo` setting. Copyright wording remains its separate editable template.

Footer group headings and links use `theme.typography.fonts.footer` (Arial, with Helvetica/sans-serif fallback), `sizes.footer` (responsive14–18px) and `lineHeights.footer` (1.25). Headings stay bold; labels use regular uppercase text. These system fonts require no download; their exact rendering depends on the installed font. Body, brand, copyright typography and existing link underline behavior stay unchanged.

Footer social links use local icons from site.icons.instagram and site.icons.facebook in src/config/site.ts. Replace their src paths to customize the symbols. Destinations remain in navigation.social, and accessible link names/tooltips remain in the content dictionary. Icon artwork lives in public/icons/; the shared SiteIcon component also supports a configured text fallback.

## Individually replaceable demo pictures

The110 image slots now have separate local WebP files under public/images/demo/, organized by homepage, editorial page, available and archived. See IMAGE_REPLACEMENT_GUIDE.md for every filename, image key and displayed ratio. Replace a file using the same path, then update its actual dimensions, alt text, crop position and credit in src/content/images.json. Editorial pages select their imageKeys array in src/content/pages.json; artworks select their imageKey in src/content/artworks.json. Work reuses the Available collection. All settings remain exposed through site.ts; component edits are unnecessary.

The museum pictures are temporary CC0 demos, not the client’s own artwork. Their license/source records live in docs/demo-image-sources.json. Replacing a picture with a different third-party image requires recording that image’s actual rights/source. The existing logo/icons and GIF/poster remain separate.
