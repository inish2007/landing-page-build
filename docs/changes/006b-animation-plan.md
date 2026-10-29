# Shared animation planning clarification

## 1. What changed and why
Recorded the user’s explicit documentation-only scope: no new routes or animation implementation. Updated the current implementation plan and private local agent instructions so future authorized page work reuses a shared motion policy.

## 2. Functions added
None.

## 3. Functions changed
None.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
None. SiteLayout integration is planned only.

## 6. Strings/images/design changed
No application copy, image selections, styles or design tokens changed. Planned behavior: 1.5s eased opacity fades, small header/content staggering; circles remain static because the inspected animation setting is disabled. All image slots retain the supplied dark PNG. Private agent/reference evidence stays ignored.

## 7. Checks actually run
Read-only inspection of the supplied local snapshot’s HTML configuration, animation CSS and local.js. Verified source fade settings and disabled circle drawing. No build or browser tests run: this commit changes documentation only. Staged whitespace check passed.

## 8. Remaining work/risks
Animation implementation and additional routes are not authorized by this clarification. Stage 06 stop remains. Saved runtime scripts are disabled, so source settings are evidence of configuration rather than proof of live execution. Future implementation must verify visibility fallbacks, reduced motion, keyboard behavior and each actually implemented route.
