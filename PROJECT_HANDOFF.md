# Configuration follow-up — current state

Updated 29 October 2026. The existing site is preserved; this follow-up centralizes client customization without redesign. Main entry: src/config/site.ts. Client instructions: CUSTOMIZATION.md.

- Foundation commit: f2bb971. Integration commit: 9b1a274. Documentation follows as a separate commit; exact final hash is in exported commit-proof files.
- The main entry composes six canonical content dictionaries with typed branding/icons/links/theme; content is not duplicated in components.
- Fonts, sizes, weights, line heights, colors, spacing, widths and motion settings are in site.theme. SiteTheme generates CSS/font faces; Tailwind aliases share variables without resetting the design.
- Header/footer logo, favicon and UI icons support local paths from config; default text branding/symbols are unchanged. Ordinary dark images and user-selected GIF remain the defaults.
- All seven tests passed against isolated production preview on port 4330. Actual site.ts-only text/color/font/logo/icon/image/GIF edits passed and were restored byte-for-byte. All prior route/layout/motion/gallery/form/media checks passed.
- Astro check: zero errors, warnings or hints. Build/audit passed. Ten desktop/mobile baseline cases showed identical typography/colors/dimensions/content and zero differing screenshot pixels.
- Typed content.ts replaces content.js. Validation and asset packaging read the same site configuration, so legitimate media changes are no longer blocked by a hardcoded dark-image assertion.
- No source asset, layout, animation or feature was removed. No push or publication. All prior handoff limits below remain applicable.

---

# Project handoff — completed

Updated: 29 October 2026, Asia/Calcutta.
Workspace: D:/projects/landing-page-build
Status: All stages 01–13 delivered. This file replaces the removed AGENT_HANDOFF.md.

## Delivered
- 14 content pages plus two static redirect documents.
- Editable centralized content, responsive desktop/tablet/mobile layouts and shared header/footer/navigation.
- About and Process; 62 available/archived gallery records with native modal keyboard controls; Press and both collaboration details; Contact, privacy/colophon; source aliases.
- Shared 1500ms eased once-only entry fades with reduced-motion and no-JS/API fallback; static circle highlights.
- Every ordinary image key uses public/images/client-placeholder.png (474×266).
- User-selected GIF hosted at public/media/video-placeholder.gif (1160×653, 23 frames) in /the-process/ and /home-1/. Pause/play, static poster, no-JS and reduced-motion behavior implemented.
- Local Caveat Brush brand font; centralized --font-brand/--text-brand. Serif/body families remain separate.

## Verification
Production build and audit passed. Six tests passed against isolated production preview on port 4322, including 14 routes × six viewports, internal links/labels/IDs/overflow, source-edit byte restoration, dialogs, local form, GIF controls, shared motion and fallbacks. See docs/verification.md for exact scope/limits. Audit counted 16 HTML documents and 25 production files. Inactive image copies are pruned from dist only; source originals are preserved.

## Start and test
From the workspace:

    npm run dev
    npm run build
    npm run audit
    npm run preview -- --port 4322

In a second PowerShell terminal:

    $env:SITE_TEST_URL='http://127.0.0.1:4322'
    npm test

A pre-existing development session uses port 4321 and was left untouched. The production preview created for verification is stopped at final teardown. No delegated agents are running.

## Editing and maintenance
- docs/EDITING_GUIDE.md: concrete task/file/key table.
- docs/ARCHITECTURE.md: route/component/data/behavior structure.
- docs/FUNCTION_INDEX.md: actual functions/components, side effects and checks.
- docs/implementation-plan.md: long master plan, now headed by completed status; old revisions explicitly historical.
- docs/IMPLEMENTATION_PLAN.md: separate short completed summary.
- src/content/: six dictionaries; ordinary media metadata and GIF configuration separate.
- docs/changes/: truthful per-commit records.
- README.md: quick start/testing.

## Git evidence
Legitimate existing history was preserved. Final verification commit: c79ad3c. Final documentation/handoff is delivered in its own Stage 13 commit; run node scripts/export-commit-proof.mjs after it to export full actual hashes, subjects, authored timestamps, files and change-note links. Outputs commit-proof.json/.txt remain ignored so no commit attempts to embed its own hash. The final response supplies the final documentation hash.

## Limits and deliberate choices
- Artist copy is temporary source content supplied by the user; original credit remains. Source copy and selected GIF reuse rights are not asserted as open-license. GIF source: https://www.gifcen.com/wp-content/uploads/2022/04/wallpaper-gif-4.gif . Font notices are retained.
- The contact form validates locally; it sends/stores nothing. Mail/social/press/shop links lead to independent external services if followed. No checkout/cart backend or purchases.
- Automated semantic checks are not full WCAG certification. No exact source-runtime/pixel identity claim.
- No publication or remote push occurred. User files/source assets were retained; only old handoff was removed as explicitly requested.
