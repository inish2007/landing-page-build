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
