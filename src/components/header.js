import { local, origin, quote, payment } from "./shared.js";
export function renderHeader() {
  return `<a class="skip-link" href="#main">Skip to content</a><header><div class="utility"><div class="container utility-inner"><a href="tel:+17732025060">Call now <strong>773-202-5060</strong></a><div><a href="${payment}">Make my payment</a><a href="${payment}">Renew my policy</a><a lang="es" href="${origin}/espanol/">Español</a></div></div></div><div class="container nav-row"><a class="brand" href="${local("")}" aria-label="Insure On The Spot home"><img src="${local("assets/logo.png")}" width="264" height="84" alt="Insure On The Spot"></a><button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false">Menu <span aria-hidden="true">☰</span></button><nav id="primary-navigation" aria-label="Primary navigation"><a href="${origin}/auto-insurance/">Auto insurance</a><a href="${origin}/sr22-insurance/">SR22</a><a href="${origin}/about/">About us</a><a href="${local("blog/")}">Blog</a><a href="${local("locations/")}">Locations</a><a href="${local("contact/")}">Contact</a><a class="button" href="${quote}">Get free quote <span aria-hidden="true">↗</span></a></nav></div></header>`;
}
export function initNavigation() {
  const button = document.querySelector(".menu-toggle"),
    nav = document.querySelector("#primary-navigation");
  const close = () => {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      close();
      button.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-row")) close();
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  matchMedia("(min-width: 1100px)").addEventListener("change", close);
  const current = location.pathname.replace(/index\.html$/, "");
  nav.querySelectorAll("a").forEach((a) => {
    if (new URL(a.href).pathname === current)
      a.setAttribute("aria-current", "page");
  });
}
