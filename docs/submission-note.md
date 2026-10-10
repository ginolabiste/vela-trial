# Submission note

Completed Vela trial: Blog, Locations and Contact, with a clickable index and a Vite multi-page production build.

Tests performed: 27 passing Playwright checks, covering six widths (320–1440px), loaded images/assets, console errors, internal routes, mobile keyboard navigation, office search/empty state/reset, phone/map URLs, skip link and automated axe accessibility scans. Six genuine desktop/mobile full-page screenshots are supplied.

Improvements: clearer shared page/navigation hierarchy; searchable offices with published hours and direct directions; accessible, lightweight controls with local assets and no original tracking scripts.

Tools used: Node.js/npm, Vite, vanilla JavaScript, CSS, Playwright, Microsoft Edge, axe-core, web retrieval, PowerShell, Git and GitHub CLI/Actions. Sites skill used for design and preview guidance; requested GitHub Pages hosting retained.

Deployment blocker: automatic approval review rejected creating and pushing a public GitHub repository because public source visibility was not explicitly authorized. User approval has been requested. No remote repository was created, no files were pushed, and no live deployment is claimed. GitHub CLI authentication is available, and the exact GitHub Pages subpath build passed all four route checks. Local preview: http://127.0.0.1:4175/ (while the preview server is running).

Limitations: no message backend; contact actions connect to original services. Real phone calls, financial workflows, physical mobile devices and screen-reader user testing were not exercised.

