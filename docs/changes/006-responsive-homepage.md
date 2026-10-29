# Stage 06 — Responsive homepage and motion

## 1. What changed and why
Added mobile/tablet composition, mobile focal points, appropriately sized local image variants and restrained hover motion while preserving the supplied homepage content. Essential content remains visible with no reveal script.

## 2. Functions added
- generateResponsiveImages(): Promise<void>, scripts/generate-responsive-images.mjs; CLI entry reads selected source images/metadata, writes WebP width derivatives and metadata. No source images deleted.
- launchBrowser(): Promise<Browser>, tests/test-helper.mjs; responsive test launches installed headless Edge; consumer closes browser.
- decodeImages(page: Page): Promise<void>, tests/test-helper.mjs; responsive test scrolls through images, decodes them and resets scroll/focus before captures.
- verifyResponsiveHome(): Promise<void>, tests/responsive.test.mjs; node:test entry, browser lifecycle in finally, six viewport checks, external network blocked and ignored screenshot output.
Inline browser assertion/mapping callbacks are documented under their test/component owners.

## 3. Functions changed
verifyNavigation in tests/navigation.test.mjs: counts internal footer links separately from social links, preserving the existing navigation checks. Signature and side effects unchanged.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
ResponsiveImage adds optional sizes (default 100vw), reads metadata sources for srcset. StatementSection, SelectedWorkSection and ContactCtaSection supply context-specific sizes. Index imports the responsive stylesheet. No additional routes; only / implemented.

## 6. Strings/images/design changed
No visible copy changed. images.json adds source-width variants; hero mobile crop 50% 45%, collaboration mobile crop 42% 50%. Local quality-82 WebP derivatives use 480/960/1600 widths where the source permits; provenance lists derivative files. home-responsive.css uses content-fit boundaries at 64rem/48rem/30rem, stacked mobile intro, responsive collage/footer and three-column mobile social strip. Motion is limited to optional pointer-hover transforms and follows existing reduced-motion tokens. Brush name style remains centralized in --font-brand/--text-brand and fonts.css, independent of serif/body fonts.

## 7. Checks actually run
- node scripts/generate-responsive-images.mjs passed after correcting Windows URL-to-path handling.
- npm run build passed (prebuild content validator included).
- npm test passed: navigation and responsive homepage suites (2 tests).
- Responsive captures/checks: 1440×1000, 1280×800, 768×1024, 390×844, 360×844 and 430×844. All 15 homepage images decode, no measured horizontal element overflow, no browser JS errors or HTTP failures; no external requests attempted with external network blocked.
- Brush font loads locally and applies to brand but not body; structured page order and single h1 checked. Longer replacement text/name wraps in DOM; source dictionaries were not changed during this test. Full source content-swap regression remains later work.
- Navigation suite covers focus wrapping/restoration, Escape, close control, resize cleanup, scroll locking, reduced motion and no-JS navigation.
- Desktop/tablet/mobile screenshots reviewed in ignored evidence/local/stage06-*.png. No pixel-identical or full-site certification claim.
- Staged whitespace diff check passed before commit.

## 8. Remaining work/risks
Stopped after Stage 06 at user request. Supporting destinations return 404 until their later route stages. No backend, gallery modal, commerce, publish or push. Supplied artist identity/copy is temporary; source asset rights are not represented as open-license. Existing unused architecture media remain on disk and future asset/build cleanup audit is pending. Earlier stages remain in truthful historical docs/commits. Complete image/font licensing audit, source content-swap tests and full accessibility audit remain later milestones.
