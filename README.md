# Local editable artist portfolio

The site is built with Astro, authored CSS and vanilla JavaScript. Content is temporary supplied artist copy. Every ordinary image uses the selected dark placeholder; video slots use the locally stored GIF with pause and reduced-motion support.

Run from `D:/projects/landing-page-build`:

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:4321/ (or the local URL printed if occupied).

```powershell
npm run build
npm run audit
npm run preview -- --port 4322
```

In a second terminal:

```powershell
$env:SITE_TEST_URL='http://127.0.0.1:4322'
npm test
```

The tests use installed Microsoft Edge. Keep the production preview running during tests. The source-edit test temporarily changes content, then restores it and rebuilds baseline output; tests run sequentially for this reason.

See [editing guide](docs/EDITING_GUIDE.md), [architecture](docs/ARCHITECTURE.md), [verification](docs/verification.md), and [handoff](PROJECT_HANDOFF.md).

No analytics, email delivery, shopping cart or checkout backend is implemented. The form clearly identifies itself as a local preview. External source links remain external. Source copy/GIF rights are not represented as open-license; font notices are retained. Nothing is published or pushed.
