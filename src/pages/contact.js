import {
  pageHero,
  quoteBanner,
  referral,
  local,
  origin,
  quote,
  payment,
} from "../components/shared.js";
document.querySelector("#main").innerHTML =
  pageHero(
    "LET’S TALK",
    "Contact Us",
    "Questions about your policy or your next quote? Our team is here to help you find your way forward.",
  ) +
  `<section class="container section"><div class="contact-grid"><div><p class="eyebrow">A REAL PERSON. A LITTLE PEACE OF MIND.</p><h2>We’re just a call away.</h2><p>Call Insure On The Spot or find the office nearest you.</p><a class="big-phone" href="tel:+17732025060">773-202-5060 <span aria-hidden="true">↗</span></a><div class="service-hours"><article><h3>Customer service</h3><dl class="hours"><div><dt>Monday–Friday</dt><dd>8:00 am – 8:00 pm</dd></div><div><dt>Saturday</dt><dd>8:00 am – 5:00 pm</dd></div></dl></article><article><h3>Sales</h3><dl class="hours"><div><dt>Monday–Friday</dt><dd>8:00 am – 8:30 pm</dd></div><div><dt>Saturday</dt><dd>8:00 am – 5:30 pm</dd></div></dl></article></div><p class="small">Hours as published by Insure On The Spot. Call to confirm holiday availability.</p><div class="actions"><a class="button" href="${quote}">Get a free quote ↗</a><a class="button secondary" href="${local("locations/")}">Find an office →</a></div></div><aside class="contact-aside"><img src="${local("assets/team.jpg")}" width="1024" height="683" alt="Insure On The Spot representative holding a model car"><div><p class="eyebrow">ALREADY A CUSTOMER?</p><h2>One less thing on your list.</h2><a href="${payment}">Make a payment or renew your policy ↗</a><a href="${origin}/customer-service/report-insurance-claim/">Report an auto insurance claim ↗</a><a href="${origin}/customer-service/roadside-assistance/">Get roadside assistance ↗</a></div></aside></div>${referral()}<div class="careers"><div><p class="eyebrow">GROW WITH US</p><h2>Your next opportunity starts here.</h2><p>Interested in joining a growing organization in the Chicagoland area?</p></div><a class="button secondary" href="${origin}/employment-opportunities/">Explore careers ↗</a></div><p class="preview-note">This trial preview does not collect or send messages. Phone, quote and customer-service links connect you to the original services.</p></section>` +
  quoteBanner();
