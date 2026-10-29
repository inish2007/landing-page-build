# Client customization guide and final regression evidence

## 1. What changed and why
Delivered CUSTOMIZATION.md with step-by-step text, image, GIF, logo/icon, font, color, navigation and verification examples. Updated README, editing/architecture docs, handoff and current function registry so clients are directed to site.ts rather than obsolete scattered style sources.

## 2. Functions added
None in this documentation commit. The prior integration commit added buildConfiguredFixture, verifyCentralCustomization and restoreConfiguration in the new regression test; their inventory is corrected in its change note and the current index here.

## 3. Functions changed
None.

## 4. Functions removed/renamed
None. The previous content.js→content.ts file migration and typed overloads are documented in Stage 015; current imports and registry point to content.ts.

## 5. Components/routes changed
None. Fourteen content pages and two redirects remain; no redesign or feature change.

## 6. Strings/images/design changed
No application copy/media/theme defaults changed. The guide clearly identifies canonical JSON dictionaries composed by the one typed entry; no duplicate content is introduced. It distinguishes GIF support from unimplemented MP4 playback and preserves current local-only form limitations.

## 7. Checks actually run
Astro check passed with zero errors, warnings or hints. Full production suite passed: 7 tests, including actual site.ts-only customization across pages, fonts/colors/text/logo/icons/image/GIF, asset retention and exact restoration, plus all existing route/viewport/dialog/form/motion/fallback tests. Final production audit passed (16 HTML documents, 25 output files). Final restored-state before/after comparison: 10 cases across 5 pages and desktop/mobile, identical measured content/dimensions/typography/colors and zero differing pixels. Evidence is private/ignored under evidence/config-baseline and evidence/config-after. Whitespace review passed; actual proof regenerated after final commit.

## 8. Remaining work/risks
No requested configuration work remains. Large copy/media dictionaries intentionally stay canonical imported files rather than duplicate literals inside site.ts; the entry and client guide make these locations explicit. Clients must keep actual font/media licenses and accurate dimensions when replacing assets. No new publication, backend, commerce or push. Existing UI/runtime behavior and appearance are preserved.
