# gallery-json-security

## 1. What changed and why
Gallery data island uses serializer; safe visible markup/keyboard behavior unchanged.

## 2. Functions added
serializeJsonForHtml(value) in src/utils/serialize.ts: pure escaped JSON for HTML script islands. verifyGallerySerialization(), serveFixture(request,response) in tests/security.test.mjs: isolated built hostile-content regression and bounded loopback fixture server.

## 3. Functions changed
None

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Gallery data island uses serializer; safe visible markup/keyboard behavior unchanged.

## 6. Strings/images/design changed
No normal copy/media/style changes. Closing-script text and special HTML/line-separator characters remain data.

## 7. Checks actually run
Isolated hostile-title/caption/image-metadata browser test passed; Astro check passed. Normal/4x three-run performance and settled visual baselines captured before motion changes.

## 8. Remaining work/risks
Shared motion/dialog/page/GIF implementation follows. Other security findings intentionally separate; no push.
