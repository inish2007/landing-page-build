# galleries

## 1. What changed and why
Gallery(page) renders available/archived/work routes, ordered cards and native lightbox.

## 2. Functions added
initGallery(), renderArtwork(), openArtwork(event), closeArtwork(), restoreGallery(), previousArtwork(), nextArtwork(), handleGalleryKeydown(event) in gallery.js; native dialog, local data, keyboard navigation and focus/scroll restoration; Gallery consumer.

## 3. Functions changed
getStaticPaths now enumerates added gallery configurations; unchanged signature.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Gallery(page) renders available/archived/work routes, ordered cards and native lightbox.

## 6. Strings/images/design changed
Artwork titles/captions centralized from supplied snapshot; all image records remain dark.

## 7. Checks actually run
npm run build passed: 6 routes; browser verification scheduled Stage 12.

## 8. Remaining work/risks
Stages 09–13 remain.
