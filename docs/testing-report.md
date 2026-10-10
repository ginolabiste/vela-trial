# Testing report

Executed October 10, 2026 on the production Vite build using Playwright and installed Microsoft Edge.

- `npm run build`: passed. Four HTML entry points emitted. Shared CSS ~3.08 KB gzip; shared JS ~2.46 KB gzip; page JS ~1.1–1.9 KB gzip. Local image files total approximately 62 KB. No runtime framework, remote font or tracking request.
- `npm test`: **27/27 passed** (9.7 seconds on final local run).
- All three pages at 320, 375, 390, 768, 1024 and 1440px: no horizontal overflow; images loaded; no console/page errors or failed local asset responses.
- axe checks on each page: no violations for WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags. This is automated coverage, not full WCAG certification.
- Mobile menu: hidden initially, keyboard Enter opens, correct `aria-expanded`, Tab enters navigation, Escape closes and returns focus, resize resets disclosure. Active page marked correctly.
- Search: case/whitespace normalization, city and ZIP match, no-result state, literal script-like input, clear/reset, focus and announced counts passed.
- All internal link destinations returned 200; homepage-to-blog navigation passed. Telephone syntax and each map destination matched the displayed address.
- Skip link focuses main. Four article cards and original older-articles destination verified. No fake submission form exists. Contact-form validation is not applicable; the original only has a quote ZIP funnel, replaced by the real quote link.
- Six genuine full-page screenshots captured at 1440px and 390px; compared with original screenshots for brand/content fidelity. This is a designed improvement, not a pixel-diff clone.

Defects fixed: missing favicon caused a console 404 on cold browser contexts; explicit local icon now loads. Initial sandbox browser/preview connectivity failures were infrastructure failures and excluded from passing results; final tests ran with browser and server in the same host context.

Unverified: physical iOS/Safari and Firefox; screen-reader user testing; calls actually connecting; quote/payment completion and backend delivery; holiday availability. These actions were not submitted. Sunday hours remain explicitly unspecified.

External-link checks and deployed subpath verification are recorded alongside this report in `docs/reference/` and the submission note.

External destinations: 40 unique HTTPS links checked with successful responses; evidence: docs/reference/link-check.json. Map URL content and tel syntax were validated locally without placing calls or submitting transactions.

GitHub Pages base-path build: passed with VITE_BASE_PATH=/vela-iots-trial/. Edge verified all four built routes, loaded images, internal link prefixes, office search and mobile navigation with zero failures (docs/reference/subpath-check.json).

