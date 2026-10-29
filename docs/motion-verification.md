# Smooth motion verification

Verified 29 October 2026, Asia/Calcutta. Windows, installed headless Microsoft Edge, isolated production preview on port 4333. No physical-device or universal 60fps certification.

## Functional and safety results
- All 13 tests passed sequentially. Astro check: 0 errors, 0 warnings, 0 hints. Production build and audit passed: 14 content pages, two redirects, 30 output files.
- Real gallery build with malicious titles/captions/image metadata preserved all payloads as data; no script executed and modal content remained usable. This closes the previously reported SEC-01 serialization issue. Other security findings are outside this task; the original untracked SECURITY_REPORT.md remains historical evidence and was not silently rewritten.
- Initial viewport content is immediate. Actual below-fold effects use 360ms, at most six concurrent effects and at most 120ms group delay; focus, reduced motion and simulated hidden-state interruption restore base visibility. Entered units do not replay.
- Dialog rapid reversals, native focus containment, Escape, preference interruption, desktop resize and exact scroll/inline-property-priority restoration passed. No width jump in the tested gallery grid.
- Native cross-document page transition and browser back/forward were tested. Missing animation/observer APIs and no-JS paths retain visible content and working navigation. No client router or new animation dependency.
- GIF is not requested while initially offscreen, uses poster outside viewport/hidden state, preserves manual pause, honors reduced-motion changes and supports explicit play/retry without automatic error loops. Hidden-state transitions were simulated deterministically in headless tests; they are not physical background-tab power measurements.
- Existing central configuration and real source-edit/byte-restoration tests passed. Master/page switches tested independently.

## Measured performance
Three runs per route and CPU condition, before changes and after final optimization. Each run samples requestAnimationFrame intervals during 1.5s of scripted scrolling plus click-to-next-frame interaction response. Long tasks/layout-shift entries were recorded over that window. These are lab samples, not field INP or an FPS guarantee.

| Route | CPU | Median p95 frame interval, ms | Median interaction, ms | Interaction change |
|---|---|---|---|---|
| /available-art/ | 1× | 17.0 → 17.0 | 16.7 → 16.7 | 0.0% |
| /the-process/ | 1× | 17.0 → 17.0 | 16.6 → 16.2 | -2.4% |
| /available-art/ | 4× | 17.1 → 17.0 | 30.5 → 33.0 | 8.2% |
| /the-process/ | 4× | 17.0 → 17.0 | 15.0 → 16.4 | 9.3% |

All final sampled runs recorded zero long tasks. Frame intervals stayed around 17ms, with no repeatable frame-time regression above 10%. The initial new modal implementation regressed 4× gallery interaction from 30.5ms to 41ms (+34.4%). Tracing identified style/layout work around native opening. Acquiring/measuring scroll lock before showModal, reading padding only when compensation is needed and removing unnecessary inherited custom-property invalidation reduced the final median to 33ms (+8.2%). The GIF-page 4× median was 16.4ms versus 15ms (+9.3%); unthrottled gallery was unchanged and unthrottled GIF response improved slightly. Threshold met in these repeated samples; no broader speedup claim.

Median layout-shift totals were zero after changes. An occasional first/cold gallery run recorded approximately 0.032 both before and after. Attribution points to the MAIN region near startup/scrolling. It is pre-existing sampled layout movement, not evidence that the entire site has zero CLS. Reveal effects only change opacity, and dialog width/style restoration is checked separately.

## Visual preservation
Six settled full-page comparisons (Home, Available and Process at 1440px and 390px) had identical dimensions and zero differing pixels at the existing pixelmatch threshold. Fonts, text, layout, dark images, circles, selected GIF and static poster were preserved. Animated intermediate frames intentionally differ.

## Evidence and reproduction
Ignored local evidence: evidence/motion/before.json, after.json, after-optimized.json, final.json, final-summary.json, final-visual-comparison.json, dialog-investigation.json and layout-shift-investigation.json. Intermediate results are retained to show the regression/investigation. Before/final PNGs are in the same folder.

Private measurement helper: node evidence/tooling/measure-motion.mjs <phase>, with SITE_TEST_URL pointing to an isolated production preview. It writes ignored results/captures; avoid running it concurrently with source-mutating tests or other CPU-heavy browser work. Run npm test with SITE_TEST_URL set to the preview URL; the package script enforces sequential tests. npm run check, npm run build and npm run audit cover types/config/output.
