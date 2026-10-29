# integrate-central-customization

## 1. What changed and why
All Astro components consume site.ts directly or typed helpers; Header/Footer optional logo, favicon and SiteIcon support; no component imports a content dictionary directly. SiteLayout includes SiteTheme. Existing CSS selects generated variables; Tailwind aliases share them without preflight/default-font overrides.

## 2. Functions added
- buildConfiguredFixture(), verifyCentralCustomization(), restoreConfiguration() in tests/configuration.test.mjs: build/audit temporary site.ts-only edits, exercise multiple pages and custom assets, then restore exact source bytes and remove only owned fixtures.
SiteIcon.astro renders configurable text symbols or local icon paths; typed Props. SiteTheme now emits configured tokens/font faces in SiteLayout.

## 3. Functions changed
getCopy/getImage/getNavigation/getPageConfig/getArtworks moved from content.js to content.ts with typed outputs/overloads; all imports migrated, no symbol rename. getStaticPaths and Astro component props typed. validateContent/validateRoutesAndMedia, pruneUnusedAssets and auditBuild consume site.ts, check configured fonts/logo/icons and retain selected assets instead of enforcing a hardcoded image. Browser behavior functions unchanged.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
All Astro components consume site.ts directly or typed helpers; Header/Footer optional logo, favicon and SiteIcon support; no component imports a content dictionary directly. SiteLayout includes SiteTheme. Existing CSS selects generated variables; Tailwind aliases share them without preflight/default-font overrides.

## 6. Strings/images/design changed
Existing copy/media/default fonts/colors/sizes/weights/spacing/motion preserved. Theme literals moved from fonts.css/tokens.css and component styles into site.theme; UI symbols and legal/home paths centralized.

## 7. Checks actually run
Astro check: 0 errors/warnings/hints. Build and audit passed. Ten before/after page/viewport cases had identical metrics and zero differing screenshot pixels. Real site.ts-only edits to colors/fonts/body size/text/logo/icons/image/GIF verified across pages and restored exactly.

## 8. Remaining work/risks
Client guide, final regression run and handoff update follow; no push.
