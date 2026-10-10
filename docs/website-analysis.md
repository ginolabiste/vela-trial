# Original-site analysis

Inspected October 10, 2026 through web retrieval, downloaded HTML/CSS and genuine Edge desktop/mobile renders. Originals: https://www.insureonthespot.com/customer-service/blog/ ; https://www.insureonthespot.com/locations/ ; https://www.insureonthespot.com/contact/ . Reference screenshots are in screenshots/originals; extracted links/images/headings in docs/reference/observations.json.

Brand: supplied blue/orange road logo; blue #005581, deep blue #002d45, gold #ffdd56 / #f7a11a. Original font is Proxima Nova via Typekit; use a system sans-serif fallback to avoid a licensed font dependency. Header has utility payment/renewal/customer service links, primary insurance/about/blog links and a gold quote CTA. Footer groups services, offices, help and legal links.

Blog: four text-only articles dated July 2–5, 2026, category links, fifteen topic links, older-articles pagination. No article images in the listing. Original H1 repeats first article title. Keep titles, dates, excerpts and destinations; change H1 to Tips & Resources and consolidate the sidebar for mobile. No invented article photographs or reading times.

Locations: four offices, list plus map; original renders duplicate office information in map markers. Verified details from each linked office page: headquarters 5485 N Elston Ave, Chicago 60630, weekdays 8am–8pm, Saturday 8am–5:30pm; Chicago South 8537 S Cicero Ave, Chicago 60652, weekdays 9:30am–6pm, Saturday 9am–3pm; Berwyn 7015 W Roosevelt Rd 60402, same hours as Chicago South; Melrose Park 1907 N Mannheim Rd 60160, weekdays 8am–6pm, Saturday 8am–2pm. Sunday hours are not stated; do not infer closure. Phone numbers come from the locations index. Show each office once, local text search and address-specific directions.

Contact: customer service weekdays 8am–8pm/Saturday 8am–5pm; sales weekdays 8am–8:30pm/Saturday 8am–5:30pm. Phone 773-202-5060. No contact-message form exists. Only quote ZIP fields exist; use direct verified quote links instead of reproducing a backend-dependent funnel. No message submission or delivery claim. Preserve referral offer and careers link. Original photos retained locally with provenance.

CMS hints: WordPress, Orbit Media theme, Ninja Forms quote form, WP Store Locator, Superfly mobile navigation, Bootstrap and multiple tracking scripts. None of the original JS, tracking identifiers or CMS dependencies are copied into application code.

Accessibility/usability observations: source images have empty/missing alt text; ZIP fields rely on placeholders; tiny footer links; tall mobile topic list; repeated blog heading. Improvements: meaningful heading structure, descriptive image alternatives, visible focus, 44px controls, disclosure navigation, searchable locations, direct service actions and responsive spacing. Automated checks supplement but do not constitute full WCAG certification.
