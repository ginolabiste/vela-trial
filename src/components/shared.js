export const origin = "https://www.insureonthespot.com";
export const quote = "https://quote.insureonthespot.com/";
export const payment = "https://csp.insureonthespot.com/Login.aspx";
export const local = (path) => `${import.meta.env.BASE_URL}${path}`;
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const link = (label, path) => `<a href="${path}">${label}</a>`;
export function pageHero(eyebrow, title, description) {
  return `<section class="hero"><div class="container"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${description}</p></div></section>`;
}
export function quoteBanner() {
  return `<section class="quote-banner"><div class="container banner-inner"><div><p class="eyebrow">WE SHOP. YOU SAVE.</p><h2>Get a free auto insurance quote.</h2><p>Find your next step with Insure On The Spot.</p></div><a class="button" href="${quote}">Get my free quote <span aria-hidden="true">↗</span></a></div></section>`;
}
export function referral() {
  return `<aside class="referral"><span class="eyebrow">BETTER TOGETHER</span><h2>Refer friends & family.</h2><p>Free $100 AMAZON Gift Card. Mention your client code. Policy starts—get a $100 gift card.</p><a href="tel:+17732025060">Call for referral details →</a></aside>`;
}
