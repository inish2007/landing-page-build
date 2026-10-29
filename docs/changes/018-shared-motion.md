# shared-motion

## 1. What changed and why
Explicit data-motion/data-motion-group attributes added to image/intro/collage/editorial/gallery/form units; nested units excluded.

## 2. Functions added
readMotionSettings() in motion-settings.js: normalized generated settings. initMotion owns explicit units, observer and abortable events; nested anchorTarget(), protectedTarget(element), cancelReveals(), handleEntries(entries), observeTargets(), handleMotionState(), handleFocusOrHash(), handlePageHide(), handlePageShow(), disposeMotion(). verifyRevealLifecycle() in tests/motion.test.mjs.

## 3. Functions changed
initMotion replaces broad selector/header entry behavior; initial/past viewport units visible immediately; below-fold once-only opacity 360ms, 40ms stagger capped120ms and six concurrent effects; excess shown without queue. createThemeCss adds typed switch/timing/budget variables. verifyMotionFallbacks recognizes revised duration; dedicated lifecycle test measures actual effects.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Explicit data-motion/data-motion-group attributes added to image/intro/collage/editorial/gallery/form units; nested units excluded.

## 6. Strings/images/design changed
Typed master/page switches enabled, reveal360/stagger40/cap120/max6/dialog220/160/page160/hover160 defaults centralized. No layout/content/font/media changes.

## 7. Checks actually run
Astro check/build passed. Reveal lifecycle browser test passed: initial visibility, actual360ms, concurrency/stagger, focused node, reduced-motion cancellation, no replay.

## 8. Remaining work/risks
Dialog/page/GIF integration and final benchmark/regression/docs remain.
