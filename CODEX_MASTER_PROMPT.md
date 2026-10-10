# Vela Trial — Codex Master Prompt

You are a senior front-end developer, UI/UX designer, and QA engineer. Complete the Vela trial assignment by recreating and thoughtfully improving these three Insure On The Spot pages:

- Blog: https://www.insureonthespot.com/customer-service/blog/
- Locations: https://www.insureonthespot.com/locations/
- Contact: https://www.insureonthespot.com/contact/

**Deadline: October 11, 2026.** Deliver a working clickable HTML preview, desktop and mobile screenshots, and a brief note listing tests, 2–3 improvements with reasons, and tools used.

## Phase 1: Inspect originals before coding

Visit all three URLs using available browsing tools. Capture layout, content, links, logo, colors, typography, navigation, footer, CTAs, forms, locations, mobile behaviors and images. Identify shared components, CMS hints, accessibility gaps, and usability issues. Record factual observations and decisions in `docs/website-analysis.md`. Do not invent inaccessible content or business details. If browsing fails, report the blocker and obtain verified reference material rather than pretending inspection occurred.

## Phase 2: Build

Use semantic HTML5, modern CSS3, vanilla ES6 modules and Vite multi-page build. Prefer no heavy frameworks. Preserve IOTS branding, content, and overall visual direction; improve hierarchy, spacing, responsive layout, accessibility and performance. Use shared reusable header/footer/navigation modules, design tokens, and separate page scripts. Replace all starter placeholders with verified site content.

Blog: reproduce actual headings, article cards, categories, images, metadata and pagination where present. Every link must have a real target; link to original article URLs when needed.

Locations: reproduce only verified office locations, addresses, hours and phone numbers. Provide usable `tel:` and map directions links. If implementing search, filter verified location data and show an empty state. Do not invent locations.

Contact: reproduce original contact details and form fields if present. Add accessible labels, required-field validation, clear errors and focus styles. Do NOT pretend messages are delivered without a working authorized backend. If backend unavailable, visibly state that submission is disabled/demo-only and document it.

Navigation: responsive mobile menu, `aria-expanded`, Escape-to-close, keyboard support, active-page indication, working footer and CTA links. Never use `href="#"` for fake functionality.

## Phase 3: Responsiveness, accessibility and performance

Test 320, 375, 390, 768, 1024 and 1440px widths. No horizontal overflow, clipping, overlap or tiny tap targets. Use responsive grids and images, readable typography, focus indicators, accessible headings and landmarks, alt text, reduced-motion handling, and WCAG 2.2 AA-oriented contrast. Optimize images and avoid unnecessary JS/dependencies. Add descriptive titles/meta descriptions; do not copy original analytics/tracking IDs.

## Phase 4: Verify and fix

Use Playwright/browser tools when available. Test all routes, links, buttons, nav, keyboard interactions, phone/map links, optional search, form validation, production build, console errors, missing assets and responsive layouts. Inspect actual rendered pages and compare with originals. Fix defects and record results in `docs/testing-report.md`. Mark unexecuted tests unverified.

## Phase 5: Deliver

Use Vite multi-page inputs for `index.html`, `blog/index.html`, `locations/index.html`, `contact/index.html`. Configure a GitHub Pages-compatible base path and GitHub Actions workflow. Verify built pages and asset paths. Deploy if GitHub access is available; never claim deployment without checking URL.

Capture genuine browser full-page screenshots at desktop 1440px and mobile 390px for all three pages in `screenshots/desktop/{blog,locations,contact}.png` and `screenshots/mobile/{blog,locations,contact}.png`. Do not generate fabricated screenshots. Document blockers if screenshots cannot be captured.

Update `README.md`, `docs/improvements.md`, `docs/testing-report.md`, and `docs/submission-note.md`. Submission note must briefly state (1) actual tests performed, (2) 2–3 real improvements and why, (3) actual tools used, plus verified live preview URL.

## Definition of done

Three complete branded pages; functional relevant links and controls; accurate original content; responsive desktop/mobile; accessible interactions; production build passes; genuine screenshots captured; documentation finished; clickable preview deployed or exact deployment blocker documented.

## Execution

Start by inspecting originals and documenting findings, then implement, test, fix, screenshot and deploy. Do not stop at planning or scaffolding. Keep changes small and maintainable. Report completed files, tests, build status, screenshot paths, deployed URL and limitations truthfully.
