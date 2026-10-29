# Smooth motion verification and measured opening refinement

## 1. What changed and why
Completed the approved four-part motion delivery with measured investigation, preserved settled visuals and current client/maintenance documentation. The optional selected GIF and ordinary dark assets are unchanged.

## 2. Functions added
verifyMotionSwitches() in tests/motion.test.mjs: pure cloned-config assertions for independent master/page opt-in controls. Other private profiling scripts remain ignored local evidence, not shipped application/tooling APIs.

## 3. Functions changed
lockScroll(dialog), open(trigger), cancelEffect() and transition(opening) in src/scripts/dialog.js were refined after the 4× CPU benchmark initially exceeded the 10% investigation threshold. Scroll compensation is acquired/measured before native showModal, failed native opening releases the lock, padding is read only if compensation is needed, and unnecessary inherited custom-property writes/pseudo-style reads were removed. Native isolation, state cancellation, focus/styles/scroll restoration and timings are unchanged. verifyRevealLifecycle and verifyDialogLifecycle add inactive-page and interrupted-close cases.

## 4. Functions removed/renamed
None in this commit. Earlier private dialog/media ownership migrations are recorded in Stage 019. Current registry removes stale historical symbols while preserving their change records.

## 5. Components/routes changed
No layout/component rendering or routes changed. Fourteen content pages and two redirects retained. Native CSS page transitions are optional; no SPA router/library.

## 6. Strings/images/design changed
No site wording/fonts/media selections or settled styling changed. CUSTOMIZATION, editing/architecture docs, both implementation-plan files, current registry, verification and PROJECT_HANDOFF are updated. Source/asset provenance and existing security report preserved.

## 7. Checks actually run
Final full suite passed: 13 tests. Astro check: 0 errors, 0 warnings, 0 hints. Production build/audit passed: 16 HTML documents, 30 files. Three-run before/final samples at normal/4× CPU covered gallery and GIF pages. Frame p95 medians stayed about17ms; no sampled long tasks. Initial 4× gallery interaction regression30.5→41ms was traced/investigated; final median33ms (+8.2%), and GIF15→16.4ms (+9.3%), both below the stated10% investigation threshold. Normal gallery unchanged; normal GIF slightly faster. All six settled desktop/mobile screenshot comparisons had zero differing pixels. Pre-existing cold-run MAIN shifts occur in both builds; median post-change shift0, no site-wide zero-CLS or universal60fps claim. Exact evidence, measurement windows and limitations: docs/motion-verification.md. Staged whitespace check passed; real proof exported after final commit.

## 8. Remaining work/risks
No approved motion work remains. Measurements are headless lab samples, not physical-device power/FPS or field INP certification; hidden-tab behavior is tested via deterministic visibility state/events. Existing cold-start layout movement is documented. Other security report findings remain outside scope. Pre-existing untracked SECURITY_REPORT.md remains unmodified. No push/deployment/media conversion; owned preview stopped at completion.
