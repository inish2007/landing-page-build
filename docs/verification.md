# Current smooth-motion verification

All 13 tests, typecheck, production build and audit passed. See [motion-verification.md](motion-verification.md) for before/after metrics, visual preservation, investigated regression and scope limits. Earlier seven-test/configuration delivery below is historical.

---

# Configuration refactor verification — 29 October 2026

- Astro check returned 0 errors, 0 warnings and 0 hints.
- Full seven-test suite passed against production preview at port 4330, including the existing fourteen-route/six-viewport checks and a new real central configuration edit test.
- Central edits changed primary color, primary/secondary font, body size, navigation/footer text, logo, favicon, menu icon, hero image and GIF/poster across pages. Configured assets survived production pruning; exact source bytes were restored and baseline output rebuilt.
- Before/after baseline: five representative pages at 1440px and 390px; computed dimensions/content/typography/colors identical and screenshot differences 0 pixels across all ten cases. Captures and metrics remain ignored in evidence/config-baseline and evidence/config-after.
- Existing build/audit passed; fourteen content pages and two redirect documents remain. No deployment/push.

---

# Verification record

Verified 29 October 2026, Asia/Calcutta, on Windows with installed headless Microsoft Edge.

## Results
- Production build passed; 14 content pages and two static redirect documents.
- Production audit passed: 16 HTML documents and 25 files, all local destinations/media present, no detected private artifacts or known tracking/hosted runtime markers.
- All six tests passed against isolated production preview at http://127.0.0.1:4322/ (SITE_TEST_URL override). A development session was already using port 4321; its toolbar caused an initial selector false failure. Tests were rerun against production and passed.
- Route matrix: 14 routes × six viewport sizes (1440×1000, 1280×800, 768×1024, 390×844, 360×844, 430×844); checked internal destinations, overflow on meaningful content/control elements, single h1, image alt attributes, field/button labels and duplicate IDs.
- Homepage: all 15 ordinary images decoded; local brush font loaded and limited to branding; no external runtime requests attempted while external requests were blocked.
- Gallery: 62 ordered source records, available/archived collections; tested open, next via keyboard, Escape, focus/scroll restoration. Native dialogs contain focus/background.
- Contact: invalid fields blocked; valid local preview status displayed with no non-GET network request. No email delivery/backend/storage claimed.
- Motion: actual 1500ms opacity entry observed, reduced-motion cancellation, missing-IntersectionObserver visible fallback and no-JS navigation/content.
- GIF: original has 23 frames at 1160×653; local poster used by default for reduced motion/no-JS. Play/pause toggles and preference-change stop passed. Video slots: The Process and home-1.
- Source-edit test: six content files backed up byte-for-byte, long brand/statement plus different-ratio image tested through a rebuilt output, all original source bytes restored and baseline rebuilt in finally. Tests run sequentially.
- Mobile/tablet/desktop captures reviewed. Private captures are in evidence/local; no pixel-identical source-site claim.

## Implemented routes
- /
- /about/
- /the-process/
- /available-art/
- /archived/
- /work/
- /press/
- /collaborations/
- /pagerie-lana-gomez-luxury-bags/
- /shay-lanagomez-luxury-jewelry-collection/
- /contact/
- /colophon/
- /privacy/
- /home-1/

Redirect documents: /home/ → / and /process/ → /the-process/.

## Limits
Automated semantic checks are not a full WCAG conformance certification or assistive-technology audit. Source artist copy and user-selected GIF ownership/reuse licenses are not asserted as open-license. Brush font has verified SIL OFL notice; existing font notices remain retained. No shopping cart, checkout, email delivery or hosted deployment. External social/press/shop/mail links are not exercised as purchases or submissions. Production pruning removes inactive image copies only; all source originals remain on disk and in history.

## Reproduce
Start npm run preview -- --port 4322. In another PowerShell terminal set $env:SITE_TEST_URL='http://127.0.0.1:4322', then npm test. Run npm run build and npm run audit for production validation. node scripts/export-commit-proof.mjs writes ignored real Git evidence.
