# Vela · Insure On The Spot

A complete Vite multi-page recreation of the original Blog, Locations and Contact pages, using semantic HTML, CSS tokens and vanilla ES modules. The original brand/content was inspected before implementation. This is a labeled trial preview, not the official business website.

## Run

Requires Node 22+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

Local tests use installed Microsoft Edge. CI installs Playwright Chromium. The test runner starts a production preview at port 4173; alternatively set `TEST_BASE_URL` to an existing root-path preview. Screenshot capture uses `SCREENSHOT_URL` (default `http://127.0.0.1:4173/`) and `npm run test:screenshots`.

## Routes and architecture

- `/` — clickable preview index
- `/blog/` — four original articles, topics and original pagination destination
- `/locations/` — four verified offices, hours, local search, phone and directions
- `/contact/` — published service/sales hours, phone, quote, payment, claims and careers links
- `src/components/` — shared header, responsive navigation, footer, banners and URL helpers
- `src/data/` — verified articles and office details
- `src/pages/` — focused page rendering and location filtering
- `src/styles/` — shared design tokens and responsive CSS
- `tests/site.spec.js` — responsive, accessibility and interaction regression suite

There is no authorized contact backend and the original has no message form. This preview collects no messages, displays no delivery claims, and directs quote/payment actions to original services. No original tracking code is included.

## Deliverables

See `docs/website-analysis.md`, `docs/improvements.md`, `docs/testing-report.md`, `docs/submission-note.md` and `docs/asset-provenance.md`. Genuine full-page browser captures are in `screenshots/desktop/` and `screenshots/mobile/`, with original-site captures in `screenshots/originals/`. Capture metadata is in `screenshots/manifest.json`.

## Deployment

`.github/workflows/deploy.yml` installs from the lockfile, builds and runs browser tests, rebuilds with `VITE_BASE_PATH=/<repository-name>/`, then publishes `dist/` to GitHub Pages. Configure Pages to use GitHub Actions. For an account-level Pages repository, use `/` instead. All local route and asset helpers respect Vite's base path.

Deployment verification and the final URL are recorded in `docs/submission-note.md`.
