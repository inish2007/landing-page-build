# typed-site-configuration

## 1. What changed and why
SiteTheme.astro added for later layout integration; current rendering unchanged.

## 2. Functions added
createThemeCss(config) in src/config/theme.ts: pure CSS token/local-font serialization; rejects unsafe token delimiters. Typed SiteTheme/ImageAsset/MediaAsset/NavigationLink/PageConfiguration/Artwork contracts added in types.ts.

## 3. Functions changed
getCopy/getImage/getNavigation/getPageConfig/getArtworks retain signatures and outputs; their canonical data now comes through site.ts rather than separate JSON imports.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
SiteTheme.astro added for later layout integration; current rendering unchanged.

## 6. Strings/images/design changed
site.ts exports one typed entry for existing canonical content plus branding/icons/links/theme. Exact existing theme defaults retained; no duplicate JSON content introduced. Local TypeScript/Astro checking dependencies installed.

## 7. Checks actually run
TypeScript noEmit passed; baseline metrics/captures recorded before theme integration. Main site module loads under Node 24.

## 8. Remaining work/risks
Theme/component/tooling integration and customization regression/docs follow. No push.
