# Current function and component index

Updated at final handoff. Each function below includes source JSDoc; historical per-commit details remain in docs/changes. Inline mapping/assertion callbacks are owned by the named component/test.

| Symbol | File | Responsibility | Inputs / returns | Consumers | Side effects | Checks |
|---|---|---|---|---|---|---|
| getCopy | src/utils/content.js | Pure centralized copy/image/navigation/page/gallery lookups | (keyPath, fallback = ''); see JSDoc return | Astro components | No writes; invalid image keys throw | build / audit / relevant browser suite |
| getImage | src/utils/content.js | Pure centralized copy/image/navigation/page/gallery lookups | (imageKey); see JSDoc return | Astro components | No writes; invalid image keys throw | build / audit / relevant browser suite |
| getNavigation | src/utils/content.js | Pure centralized copy/image/navigation/page/gallery lookups | (area); see JSDoc return | Astro components | No writes; invalid image keys throw | build / audit / relevant browser suite |
| getPageConfig | src/utils/content.js | Pure centralized copy/image/navigation/page/gallery lookups | (pageId); see JSDoc return | Astro components | No writes; invalid image keys throw | build / audit / relevant browser suite |
| getArtworks | src/utils/content.js | Pure centralized copy/image/navigation/page/gallery lookups | (artworkId); see JSDoc return | Astro components | No writes; invalid image keys throw | build / audit / relevant browser suite |
| initNavigation | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| openMenu | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| closeMenu | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| restoreMenuState | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| handleMenuKeydown | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (event); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| handleMenuCancel | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (event); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| handleDrawerClick | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (event); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| handleViewportChange | src/scripts/site.js | Accessible responsive drawer lifecycle and keyboard handling | (); see JSDoc return | SiteLayout DOM handlers | Dialog/focus/body overflow | build / audit / relevant browser suite |
| initMotion | src/scripts/motion.js | Shared once-only entry fades and preference fallback | (); see JSDoc return | SiteLayout, IntersectionObserver | Temporary Web Animations; no persistent hiding | build / audit / relevant browser suite |
| fadeElement | src/scripts/motion.js | Shared once-only entry fades and preference fallback | (element, delay = 0); see JSDoc return | SiteLayout, IntersectionObserver | Temporary Web Animations; no persistent hiding | build / audit / relevant browser suite |
| handleEntries | src/scripts/motion.js | Shared once-only entry fades and preference fallback | (entries); see JSDoc return | SiteLayout, IntersectionObserver | Temporary Web Animations; no persistent hiding | build / audit / relevant browser suite |
| handleMotionPreference | src/scripts/motion.js | Shared once-only entry fades and preference fallback | (); see JSDoc return | SiteLayout, IntersectionObserver | Temporary Web Animations; no persistent hiding | build / audit / relevant browser suite |
| initGallery | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| renderArtwork | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| openArtwork | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (event); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| closeArtwork | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| restoreGallery | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| previousArtwork | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| nextArtwork | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| handleGalleryKeydown | src/scripts/gallery.js | Artwork modal, arrows, rendering and state restoration | (event); see JSDoc return | Gallery DOM handlers | Dialog/text/image/focus/body overflow | build / audit / relevant browser suite |
| initContactForm | src/scripts/contact.js | Local inquiry validation/status | (); see JSDoc return | ContactForm DOM handlers | Local DOM only; no network/storage | build / audit / relevant browser suite |
| handleInquirySubmit | src/scripts/contact.js | Local inquiry validation/status | (event); see JSDoc return | ContactForm DOM handlers | Local DOM only; no network/storage | build / audit / relevant browser suite |
| clearInquiryStatus | src/scripts/contact.js | Local inquiry validation/status | (); see JSDoc return | ContactForm DOM handlers | Local DOM only; no network/storage | build / audit / relevant browser suite |
| initAnimatedMedia | src/scripts/media.js | Local GIF/poster control and preference response | (); see JSDoc return | AnimatedMedia DOM handlers | Image source, label and aria-pressed | build / audit / relevant browser suite |
| setPlayback | src/scripts/media.js | Local GIF/poster control and preference response | (value); see JSDoc return | AnimatedMedia DOM handlers | Image source, label and aria-pressed | build / audit / relevant browser suite |
| togglePlayback | src/scripts/media.js | Local GIF/poster control and preference response | (); see JSDoc return | AnimatedMedia DOM handlers | Image source, label and aria-pressed | build / audit / relevant browser suite |
| handleMediaPreference | src/scripts/media.js | Local GIF/poster control and preference response | (); see JSDoc return | AnimatedMedia DOM handlers | Image source, label and aria-pressed | build / audit / relevant browser suite |
| resolvePath | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (obj, keyPath); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateChromeKeys | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (textData); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateComponentWhitelist | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (pagesData); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateImageMetadata | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (imageData, rootDir = PROJECT_ROOT); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateCrossReferences | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | ({ textData, imageData, navigationData, pagesData, artworksData }); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateRoutesAndMedia | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (schemas, rootDir = PROJECT_ROOT); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| validateContent | scripts/validate-content.mjs | Six-schema validation, route/media/font/copy references | (rootDir = PROJECT_ROOT); see JSDoc return | npm prebuild/pretest and CLI | Reads local files; logs/errors | build / audit / relevant browser suite |
| generateResponsiveImages | scripts/generate-responsive-images.mjs | Generate configured local image width variants | (); see JSDoc return | Manual CLI | Writes variants and image metadata | build / audit / relevant browser suite |
| pruneUnusedAssets | scripts/prune-unused-assets.mjs | Prune inactive production image copies with path containment | (); see JSDoc return | npm postbuild; source-swap test | Deletes only dist/images files; source preserved | build / audit / relevant browser suite |
| visitImages | scripts/prune-unused-assets.mjs | Prune inactive production image copies with path containment | (directory); see JSDoc return | npm postbuild; source-swap test | Deletes only dist/images files; source preserved | build / audit / relevant browser suite |
| auditBuild | scripts/audit-build.mjs | Production local-link/media/private/runtime audit | (); see JSDoc return | npm audit | Reads dist; throws on diagnostics | build / audit / relevant browser suite |
| walk | scripts/audit-build.mjs | Production local-link/media/private/runtime audit | (dir); see JSDoc return | npm audit | Reads dist; throws on diagnostics | build / audit / relevant browser suite |
| exportCommitProof | scripts/export-commit-proof.mjs | Read genuine ordered Git history/files/timestamps | (); see JSDoc return | Manual final CLI | Writes ignored proof files | build / audit / relevant browser suite |
| getStaticPaths | src/pages/[...slug].astro | Static supporting route enumeration | (); see JSDoc return | Astro build | No writes beyond Astro generation | build / audit / relevant browser suite |
| buildFixture | tests/content-swap.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyContentSwap | tests/content-swap.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| restoreContent | tests/content-swap.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyNavigation | tests/navigation.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyResponsiveHome | tests/responsive.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyAllRoutes | tests/site.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyInteractions | tests/site.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| verifyMotionFallbacks | tests/site.test.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| launchBrowser | tests/test-helper.mjs | Browser/source-edit regression owned by test entry | (); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |
| decodeImages | tests/test-helper.mjs | Browser/source-edit regression owned by test entry | (page); see JSDoc return | node:test / test consumers | Browser lifecycle, captures; source-swap restores files/build | build / audit / relevant browser suite |

## Components and routes

| Component | File | Props / content | Responsibility / consumers | Checks |
|---|---|---|---|---|
| SiteLayout | src/layouts/SiteLayout.astro | Document shell with shared chrome, local fonts/styles, skip link and menu behavior. Props: title?: string; main slot. Copy: common.*. | Shared page/component composition; see source imports | build and browser suite |
| index | src/pages/index.astro | Home route: ordered page configuration maps to shared section components. No props. | Shared page/component composition; see source imports | build and browser suite |
| AnimatedMedia | src/components/AnimatedMedia.astro | GIF video-slot replacement. Props: mediaKey. Static poster is default/no-JS/reduced-motion fallback; controls use centralized copy. | Shared page/component composition; see source imports | build and browser suite |
| ContactCtaSection | src/components/ContactCtaSection.astro | Full-width studio image and static social strip. Props: id, textNamespace, imageKey. No online embeds or submission. | Shared page/component composition; see source imports | build and browser suite |
| ContactForm | src/components/ContactForm.astro | Local-only inquiry preview. No props. Labels/messages from contact.*; no network or storage. | Shared page/component composition; see source imports | build and browser suite |
| EditorialPage | src/components/EditorialPage.astro | Supporting editorial page. Props: page configuration; copy blocks from centralized textNamespace. | Shared page/component composition; see source imports | build and browser suite |
| Footer | src/components/Footer.astro | Footer using temporary reference copy and configured navigation/social labels. No props. | Shared page/component composition; see source imports | build and browser suite |
| FormattedText | src/components/FormattedText.astro | Safe structured inline text. Prop: segments; italic and circle/accent options only. | Shared page/component composition; see source imports | build and browser suite |
| Gallery | src/components/Gallery.astro | Ordered gallery and native modal. Props: page with collection/titleKey. Canonical copy via artworks title/caption keys. | Shared page/component composition; see source imports | build and browser suite |
| Header | src/components/Header.astro | Shared brand and responsive navigation. No props; consumes common.*, nav.*, images.siteLogo and navigation.header. | Shared page/component composition; see source imports | build and browser suite |
| HeroSection | src/components/HeroSection.astro | Opening portrait composition. Props: id, textNamespace, imageKey from pages.home. | Shared page/component composition; see source imports | build and browser suite |
| MobileDrawer | src/components/MobileDrawer.astro | Native modal navigation drawer; no props. Uses common menu labels and navigation.header. | Shared page/component composition; see source imports | build and browser suite |
| ResponsiveImage | src/components/ResponsiveImage.astro | Local image and editable crop. Props: imageKey, aspectRatio='3 / 2', eager=false, sizes='100vw', class. Responsive sources come from images.json. Asset dimensions never dictate presentation ratio. | Shared page/component composition; see source imports | build and browser suite |
| SelectedWorkSection | src/components/SelectedWorkSection.astro | Collaboration banner or editorial collage, chosen by textNamespace. Props: id, textNamespace, imageKey?. Centralized text and image keys. | Shared page/component composition; see source imports | build and browser suite |
| StatementSection | src/components/StatementSection.astro | Artist introduction. Props: id, textNamespace, imageKey. Copy from home.statement. | Shared page/component composition; see source imports | build and browser suite |

## Stage 014 — typed-site-configuration

Added: createThemeCss(config) in src/config/theme.ts: pure CSS token/local-font serialization; rejects unsafe token delimiters. Typed SiteTheme/ImageAsset/MediaAsset/NavigationLink/PageConfiguration/Artwork contracts added in types.ts.

Changed: getCopy/getImage/getNavigation/getPageConfig/getArtworks retain signatures and outputs; their canonical data now comes through site.ts rather than separate JSON imports.

Components: SiteTheme.astro added for later layout integration; current rendering unchanged.

Checks: TypeScript noEmit passed; baseline metrics/captures recorded before theme integration. Main site module loads under Node 24.
