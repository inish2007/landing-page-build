# transitions-and-media

## 1. What changed and why
SiteLayout adds generated master-motion state and shared motion CSS; native page links/history retained. No SPA router or new library.

## 2. Functions added
dialog.js: lockScroll(dialog), unlockScroll(dialog), createDialogController(dialog,options), cancelEffect(), finishClose(), transition(opening), complete(), open(trigger), close(), handleCancel(event), handleNativeClose(), handleStateChange(), destroy(); shared owner handles native modal/focus/style priorities/scroll and temporary panel/backdrop effects. Navigation/gallery add dispose() owners. media.js adds updatePlayback(), handleMediaEntries(entries), handleMediaError(), suspendMedia(), resumeMedia(). Tests add verifyDialogLifecycle(), verifyMediaLifecycle(), verifyPageTransitions().

## 3. Functions changed
initNavigation/openMenu/closeMenu/keyboard/click/viewport handlers and initGallery/render/open/close/arrow handlers delegate to shared cancellable controller. initAnimatedMedia/togglePlayback/handleMediaPreference use viewport/tab/manual/error intent. createThemeCss conditionally opts into native same-origin crossfades. Navigation/site/configuration tests follow asynchronous lifecycle and switches.

## 4. Functions removed/renamed
Private restoreMenuState()/handleMenuCancel() in site.js and restoreGallery() in gallery.js are replaced by shared finishClose()/handleCancel() ownership in dialog.js; callers migrated, no public API removal. Private setPlayback(value) in media.js becomes updatePlayback() with derived intent/visibility state rather than a directly assigned playing flag.

## 5. Components/routes changed
SiteLayout adds generated master-motion state and shared motion CSS; native page links/history retained. No SPA router or new library.

## 6. Strings/images/design changed
Drawer16px horizontal and dialog8px vertical movement,220ms open/160ms close; page160ms crossfade; backdrop/hover respect master/reduced flags. GIF/poster and settled layout unchanged; offscreen/hidden uses poster, manual pause sticky, explicit play/retry works.

## 7. Checks actually run
Full suite passed sequentially:12 tests including malicious-content gallery, central config/master switches, fourteen-route viewport matrix, rapid reversal, exact important inline-style/scroll restoration, focus containment, GIF/error/background-state logic, native crossfade/history and missing APIs. Build/typecheck passed. Initial test fixture concurrency/preference-event assumptions corrected; explicit GIF clicks now read current visibility before observer callback.

## 8. Remaining work/risks
Final before/after performance/visual comparison and documentation remain. Hidden-state logic is deterministically simulated in headless tests; no universal FPS claim.
