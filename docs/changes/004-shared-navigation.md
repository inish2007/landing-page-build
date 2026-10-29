# Stage 04 — Shared header, footer and navigation

## 1. What changed and why
Shared editorial chrome now surrounds the scaffold homepage. Responsive navigation uses a native modal drawer below 64rem; all local fonts, styles and labels are shared. No-JS users retain ordinary wrapping navigation links. Work stops before homepage sections and supporting routes.

## 2. Functions added
In src/scripts/site.js:
- initNavigation(): void — SiteLayout script entry; queries the single drawer, registers handlers and reveals the enhanced menu control.
- openMenu(): void — opener click handler; opens dialog, saves focus and previous inline overflow, locks body scrolling and sets expanded state.
- closeMenu(): void — closes an open dialog; called by close button, cancel, navigation/backdrop and resize handlers.
- restoreMenuState(): void — close-event handler; restores saved overflow and focus, resets expanded state; focuses brand if trigger became hidden.
- handleMenuKeydown(event: KeyboardEvent): void — drawer keydown handler; wraps Tab/Shift+Tab at first/last controls.
- handleMenuCancel(event: Event): void — native Escape cancel handler; prevents default and calls closeMenu.
- handleDrawerClick(event: MouseEvent): void — closes on selected links or clicks outside panel bounds.
- handleViewportChange(): void — matchMedia handler; closes dialog at desktop breakpoint.
In tests/navigation.test.mjs:
- verifyNavigation(): Promise<void> — node:test consumer; launches installed Edge, exercises production preview and closes browser in finally; writes ignored screenshots.
Short mapping/assertion callbacks belong to their documented components/test owner. No other named tooling functions were added.

## 3. Functions changed
None.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
- Header.astro added: no props; common.siteName/menuOpenLabel/primaryNavigation, navigation.header and optional images.siteLogo. Uses current route for aria-current.
- MobileDrawer.astro added: no props; common.siteName/menuCloseLabel/primaryNavigation/statusIndicator, navigation.header. Native dialog supplies modal background isolation.
- Footer.astro added: no props; common.siteName/backToTop/footerNavigation, footer.tagline/copyright and footer navigation label keys.
- SiteLayout.astro changed: preserves optional title prop/main slot; centralizes default title and skip copy, imports global styles and shared chrome/script. Main is focusable for skip link.
- Index scaffold changed: removes scattered literal strings/style overrides in favor of common.siteName/home.hero.eyebrow and shared tokens. No new routes or Stage 05 sections.

## 6. Strings/images/design changed
Added common.primaryNavigation and common.footerNavigation. Existing values preserved. Header/footer/drawer use existing copy and configured destinations. No media or licenses changed. Optional siteLogo is absent and text branding is the default; adding a valid image record enables it. Added src/styles/components/navigation.css using existing tokens. Content-fit breakpoint is 64rem, paired with matchMedia in site.js. No new shared tokens.

## 7. Checks actually run
- Stage 03 content validator and production build passed before its commit.
- Stage 04 npm run build passed after fixing optional-logo handling.
- npm test passed against production preview at 127.0.0.1:4321 (installed headless Edge).
- Viewports: 1440×1000, 1280×800, 768×1024, 390×844 and overflow at 360/430px. Checks include modal focus/wrapping/restoration, Escape, close button, body overflow restoration, desktop resize closure, reduced motion, longer branding and no-JS fallback. No page JavaScript errors.
- Desktop and mobile-open screenshot visual review completed; captures are ignored in evidence/local/navigation-*.png. No exact reference comparison claimed.
- Staged whitespace check completed before commit. Git history/status verified after commit.

## 8. Remaining work/risks
Only root scaffold route exists. Other configured destinations await later stages and can currently return 404; full route crawling belongs to later stages. Social fragment placeholders are not rendered. No homepage sections, galleries, real contact submission, publication or push. Full offline/a11y/asset-license audits remain later-stage work. Preview must be running on port 4321 for npm test. User requested stop after Stage 04.
