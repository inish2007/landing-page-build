# Editing the temporary homepage

| Task | File | Key or setting |
|---|---|---|
| Brand name | src/content/text.en.json | common.siteName |
| Brand font | src/styles/tokens.css | --font-brand and --text-brand |
| Font file | src/styles/fonts.css | Caveat Brush @font-face; update license/provenance when replacing |
| Intro and quote | src/content/text.en.json | home.statement.statementSegments, home.features.quoteSegments |
| Images/crops | src/content/images.json | src, alt, width, height, position.desktop/mobile |
| Section order | src/content/pages.json | home.sections |
| Destinations | src/content/navigation.json | header, footer, collaborations, social |

Save and refresh during npm run dev. For production run npm run build. Images preserve their component aspect ratio regardless of source dimensions. New media must use correct source dimensions and accurate alt text. Keep structured text segments; do not enter HTML.

The temporary artist content is supplied reference material, not the finished client identity. Caveat Brush is hosted locally under SIL OFL 1.1; its license is in public/fonts/caveat-brush-OFL.txt. Use the brush family only for the name or short accents, never body paragraphs. Serif/body styles remain independent. Supporting destinations are not implemented yet.

## Responsive images and motion

Set position.mobile separately from position.desktop in images.json. ResponsiveImage preserves its component aspect ratio; dimensions describe the source only. After replacing a source image and its width/height, run node scripts/generate-responsive-images.mjs to regenerate local width variants, then npm run build. Keep the source file and update asset provenance/licenses. At widths below 48rem the hero uses a 4:5 frame and the collage adapts to six columns. Breakpoints are documented in home-responsive.css; shared colors/fonts/sizes/motion remain in tokens.css.

Run npm run preview on port 4321, then npm test in a second terminal. Tests use installed Edge. Captures are ignored in evidence/local/.

## Completed site editing tasks

| Task | File/key |
|---|---|
| Biography/process/press/collaboration copy | text.en.json → editorial → route slug → blocks (plain text and H/P tag) |
| Add or reorder an artwork | artworks.json → collection/order/titleKey/captionKey/imageKey; matching text.artworks entry |
| Gallery item title/caption | text.en.json → artworks → available-N or archived-N |
| GIF video-slot source/poster | media.json → processVideo → src/poster/width/height; keep files local |
| Pause/play labels | text.en.json → media.play/media.pause |
| Contact preview labels/messages | text.en.json → contact; no message sending service is configured |
| Add an editorial route | pages.json → path/kind/editorial namespace/imageCount/sections, plus text copy |
| Shared entry fade | tokens.css → --motion-entry-duration / --motion-entry-stagger (milliseconds), motion.js for behavior |

The source dimensions must match replacement files. Ordinary image layout ratios are set by components; replacing a 474×266 source with a portrait does not change its frame. Optional `sources` entries select responsive width variants; remove stale entries when swapping files. Image originals stay in source; production `postbuild` prunes unused output copies. All current ordinary image keys share the same dark source intentionally.

The GIF is independent of ordinary images. Its first-frame poster is served when JavaScript is unavailable or reduced motion is enabled. Changing the GIF requires regenerating its poster and updating provenance. Do not describe supplied artist text or the selected GIF as open-license without evidence. Reference photographs are not restored automatically.

For verification on this machine, start `npm run preview -- --port 4322`, then set `$env:SITE_TEST_URL='http://127.0.0.1:4322'` and run `npm test`. This avoids the already-running development session on port 4321. `npm run audit` checks built output. `node scripts/export-commit-proof.mjs` regenerates ignored real Git evidence after a commit.
