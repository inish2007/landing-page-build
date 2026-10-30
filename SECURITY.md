# Security deployment notes

This project builds a static portfolio. It currently has no authentication, database, upload API, payment backend or real contact-message delivery. These notes are deployment requirements, not a claim that a live host was tested.

## URL and content boundaries

The shared URL policy in `src/utils/urls.ts` runs in the content validator and in the shared document layout, so direct Astro builds cannot bypass it. Links may use site-relative paths, fragments, HTTP(S), or a plain `mailto:person@example.com` address. Executable schemes, protocol-relative destinations, URL credentials, control characters and mail-header query parameters are rejected. Images, responsive sources, fonts, icons and media must use local `/...` paths inside `public`, with no traversal, query or fragment. Keep contact.email as a plain email address. Diagnostics identify the setting to correct.

Artwork data islands use HTML-safe JSON serialization. Visible text continues to use Astro escaping or `textContent`; do not replace those with raw HTML insertion. Test configuration changes using the isolated fixture helper; never put malicious test content in the real dictionaries or shared preview output.

## Public hosting

Deploy only the generated `dist` directory to a static host over HTTPS. Do not publicly expose Astro development/preview servers or the repository root. Development/preview commands intentionally bind to 127.0.0.1. Malformed encoded paths in the current Astro preview can return a stack trace; this is a local tool behavior, not evidence of a deployed host exploit. The public host must reject malformed requests with generic 400/404 responses and no local paths or error stacks.

Configure and verify these HTTP response headers on the selected host:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`, unless embedding is deliberately required.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- A tested Content Security Policy including `base-uri 'none'`, `object-src 'none'`, `form-action 'none'`, `connect-src 'self'`, and local image/font/media sources.

For `script-src`, allow local bundles and SHA-256 hashes of the exact inline module scripts emitted in the final build. Astro currently inlines the small contact controller, so `script-src 'self'` alone would break it. Recompute hashes after every build; do not solve this with `unsafe-eval` or unrestricted inline script. This policy must be tested with the actual output before enforcement.

Current styling includes generated inline style elements and style attributes, plus JavaScript style changes for dialogs and media. A strict style policy must accommodate those without breaking the layout, scroll locks or animations. Evaluate the complete policy in report-only mode on the selected HTTPS host before enforcement; a report-only policy alone does not block attacks.

Enable HSTS only after HTTPS is working and the domain owner has confirmed the intended domain/subdomain coverage. HTTP localhost cannot establish the correctness of an HTTPS/HSTS deployment.

`frame-ancestors` must be an HTTP header; putting it in a meta tag does not provide this protection. Meta tags also cannot substitute for nosniff or X-Frame-Options.

## Verification before release

Run content validation, type checks, build, output audit, dependency audit, gallery/URL security regressions and normal route/navigation tests. On the actual host, verify headers, framing protection, generic malformed-path responses and absence of repository, environment, agent and source-map files. Confirm the contact form still sends no network submission. Reassess these assumptions if a CMS, uploads, real form backend, authentication or third-party embeds are added.

Sources: [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [MDN frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).
