# about-process-motion

## 1. What changed and why
EditorialPage(page) and static dynamic route added; about and the-process content added; SiteLayout imports shared pages styles and motion.

## 2. Functions added
initMotion(), fadeElement(element,delay), handleEntries(entries), handleMotionPreference() in src/scripts/motion.js: shared opacity entry, observer and preference cleanup; SiteLayout consumer. getStaticPaths() in src/pages/[...slug].astro: pure route enumeration.

## 3. Functions changed
None

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
EditorialPage(page) and static dynamic route added; about and the-process content added; SiteLayout imports shared pages styles and motion.

## 6. Strings/images/design changed
Centralized editorial copy from supplied snapshot; all image slots remain dark. Entry duration 1500ms ease and bounded stagger; static circles.

## 7. Checks actually run
npm run build passed: 3 routes. Browser checks follow in Stage 12.

## 8. Remaining work/risks
Stages 08–13 remain; no publication.
