# verification

## 1. What changed and why
Shared mobile footer corrected on every page; source assets preserved but inactive image copies excluded from output.

## 2. Functions added
pruneUnusedAssets(), visitImages(directory) in prune-unused-assets.mjs: remove only inactive dist/images copies, preserve source. auditBuild(), walk(dir) in audit-build.mjs: static route/link/private/tracking/media audit. validateRoutesAndMedia(schemas,rootDir) in validate-content.mjs: six-schema route/media/font/title checks. verifyAllRoutes(), verifyInteractions(), verifyMotionFallbacks() in tests/site.test.mjs: isolated browser matrices and interactions.

## 3. Functions changed
validateContent loads media.json and invokes route/media validation. buildFixture runs output pruning. Existing browser tests accept SITE_TEST_URL. npm tests run sequentially to isolate source edits.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Shared mobile footer corrected on every page; source assets preserved but inactive image copies excluded from output.

## 6. Strings/images/design changed
No source wording/media override changes. postbuild packaging and audit scripts added.

## 7. Checks actually run
Production build/audit passed: 16 HTML documents and 25 output files. All six tests passed against isolated production preview on port 4322: 14 routes × six viewports, internal links, labels/IDs, gallery, contact, GIF, fade timing, reduced motion, no-JS/API fallbacks, real source edits restored. Initial development-toolbar false failure isolated and corrected by configurable production URL. Screenshot captures reviewed.

## 8. Remaining work/risks
Stage 13 docs/handoff/proof remains. Checks are automated semantic coverage, not full WCAG certification or ownership verification.
