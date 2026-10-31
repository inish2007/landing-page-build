# Local editable artist portfolio

The site is built with Astro, authored CSS and vanilla JavaScript. Content is temporary supplied artist copy. Images and fonts are hosted locally; video slots use the locally stored GIF with pause and reduced-motion support.

Use Node.js 24.19 or later (build tools load the typed configuration directly).

Run from `D:/projects/landing-page-build-creative`:

```powershell
npm ci
npm run dev -- --port 4325 --strictPort
```

Open http://127.0.0.1:4325/ (or the local URL printed if occupied).

```powershell
npm run build
npm run audit
npm run preview -- --port 4335 --strictPort
```

In a second terminal:

```powershell
$env:SITE_TEST_URL='http://127.0.0.1:4335'
npm test
```

The tests use installed Microsoft Edge. Keep the production preview running during tests. Customization tests use isolated temporary copies/builds and private servers. Browser tests honor SITE_TEST_URL, defaulting to the creative preview on4335; no baseline preview is modified. Tests run sequentially.

Customize from `src/config/site.ts`; see [CUSTOMIZATION.md](CUSTOMIZATION.md) for practical text/media/font/color examples. Run `npm run check` for TypeScript/Astro diagnostics.

See the [editing guide](docs/EDITING_GUIDE.md) and [architecture](docs/ARCHITECTURE.md). Internal agent plans, handoffs, verification records and reference captures stay local and Git-ignored.

No analytics, email delivery, shopping cart or checkout backend is implemented. The form clearly identifies itself as a local preview. External source links remain external. Source copy/GIF rights are not represented as open-license; font notices are retained.

The local creative branch preserves the original page formats. The protected baseline remains at tag `freeze/client-baseline-2026-10-31`; this branch is not a deployment or authorization to update main.
