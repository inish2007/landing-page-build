# editing-gaps

## 1. What changed and why
Footer exposes legal routes; ContactForm uses method=dialog for no-JS safety; long brand wrapping corrected.

## 2. Functions added
buildFixture(), verifyContentSwap(), restoreContent() in tests/content-swap.test.mjs: validates real six-file dictionary backups, altered source text/image build, browser wrapping/ratio/fonts, byte-for-byte restoration and baseline rebuild in finally.

## 3. Functions changed
verifyNavigation expects two new legal links. clearInquiryStatus JSDoc corrected; behavior unchanged.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Footer exposes legal routes; ContactForm uses method=dialog for no-JS safety; long brand wrapping corrected.

## 6. Strings/images/design changed
footer.legalLabel added; dark baseline restored after source-swap test.

## 7. Checks actually run
Build passed; content-swap browser test passed with exact source restoration. Mobile all-route preliminary overflow check returned no issues. Process mobile capture reviewed.

## 8. Remaining work/risks
Stage 12 full verification and Stage 13 final docs remain.
