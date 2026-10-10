import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { offices } from "../data/offices.js";
import { pageHero, quoteBanner, referral, origin } from "../components/shared.js";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const card = (o, i) =>
  `<article class="office" data-search="${o.name} ${o.address}"><div class="office-heading"><span class="office-number" aria-hidden="true">0${i + 1}</span><div><p class="eyebrow">${i === 0 ? "CHICAGO · NORTHWEST" : "CHICAGOLAND"}</p><h2>${o.name}</h2></div></div><address>${o.address}</address><a class="office-phone" href="tel:+1${o.phone.replaceAll("-", "")}">${o.phone}</a><dl class="hours"><div><dt>Monday–Friday</dt><dd>${o.week}</dd></div><div><dt>Saturday</dt><dd>${o.saturday}</dd></div></dl><p class="small">Free parking available · Call to confirm holiday hours.</p><div class="office-actions"><a class="button secondary" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.address)}">Get directions ↗</a><a class="text-link" href="${origin}/locations/${o.slug}/">Office details ↗</a></div></article>`;
document.querySelector("#main").innerHTML =
  pageHero(
    "NEARBY. READY TO HELP.",
    "Our Locations",
    "Come in and see us! Get a free quote, buy or renew your policy, or make a payment at one of our Chicagoland offices.",
  ) +
  `<section class="container section"><div class="location-intro"><div><p class="eyebrow">FIND YOUR LOCAL OFFICE</p><h2>Good neighbors.<br>Great service.</h2><p>Our friendly staff is here to help. Find an office by city, street or ZIP code.</p><label for="location-search">Search our locations</label><div class="search-row"><input id="location-search" type="search" placeholder="Try Berwyn or 60630" autocomplete="off"><button class="button secondary" id="clear-search" type="button">Clear</button></div><p class="small" role="status" id="search-status">4 locations</p></div><div class="location-photo" id="location-map" aria-label="Map showing the four Insure On The Spot office locations across Chicagoland"></div></div><div class="office-grid">${offices.map(card).join("")}</div><div class="empty-state" id="empty-state" hidden><h2>No offices found</h2><p>Try a city, street or ZIP code, or clear your search to see all four offices.</p><a href="tel:+17732025060">Need help? Call 773-202-5060</a></div><p class="small">Sunday hours are not listed on the original office pages. Please call before visiting.</p>${referral()}</section>` +
  quoteBanner();
const input = document.querySelector("#location-search");
const normalize = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");
function filter() {
  const query = normalize(input.value);
  let count = 0;
  document.querySelectorAll(".office").forEach((office) => {
    const matches = normalize(office.dataset.search).includes(query);
    office.hidden = !matches;
    if (matches) count++;
  });
  document.querySelector("#search-status").textContent =
    `${count} ${count === 1 ? "location" : "locations"} found`;
  document.querySelector("#empty-state").hidden = count > 0;
}
input.addEventListener("input", filter);
document.querySelector("#clear-search").addEventListener("click", () => {
  input.value = "";
  filter();
  input.focus();
});
const map = L.map("location-map", { scrollWheelZoom: false });
const markers = offices.map((o) =>
  L.marker([o.lat, o.lng]).bindPopup(`<strong>${o.name}</strong><br>${o.address}`),
);
const markerGroup = L.featureGroup(markers).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
map.fitBounds(markerGroup.getBounds().pad(0.2));
// Leaflet's default zoom control links use href="#", which fails link-validation
// checks (empty/placeholder hrefs). Point them at the map container instead.
document
  .querySelectorAll(".leaflet-control-zoom-in, .leaflet-control-zoom-out")
  .forEach((a) => a.setAttribute("href", "#location-map"));
