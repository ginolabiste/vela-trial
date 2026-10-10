import data from "../data/articles.json";
import {
  pageHero,
  quoteBanner,
  escapeHtml,
  origin,
  quote,
} from "../components/shared.js";
const article = (a, index) =>
  `<article class="article ${index === 0 ? "featured" : ""}"><div class="article-date"><span>JUL</span><strong>${Number(a.isoDate.slice(-2))}</strong><span>2026</span></div><div><div class="article-meta"><a href="${a.categoryUrl}">${escapeHtml(a.category)}</a><time datetime="${a.isoDate}">${a.date}</time></div><h2><a href="${a.url}">${escapeHtml(a.title)}</a></h2><p>${escapeHtml(a.excerpt)}</p><a class="text-link" href="${a.url}" aria-label="Read ${escapeHtml(a.title)}">Read article <span aria-hidden="true">↗</span></a></div></article>`;
document.querySelector("#main").innerHTML =
  pageHero(
    "THE IOTS BLOG",
    "Tips & Resources",
    "A little knowledge goes a long way. Explore auto insurance tips, coverage guides and safer driving in Chicago.",
  ) +
  `<div class="container blog-layout section"><section aria-label="Latest articles"><div class="section-heading"><p class="eyebrow">FROM THE BLOG</p><span>Latest articles</span></div>${data.articles.map(article).join("")}<a class="button secondary older" href="${origin}/customer-service/blog/page/2/">Older articles <span aria-hidden="true">→</span></a></section><aside class="blog-sidebar"><div class="quote-card"><p class="eyebrow">YOUR NEXT MILE STARTS HERE</p><h2>Less searching.<br>More saving.</h2><p>Get a free auto insurance quote in 2 minutes.</p><a class="button" href="${quote}">Get free quote ↗</a><a class="sidebar-call" href="tel:+17732025060">Or call 773-202-5060</a></div><div class="topics"><h2>Choose a topic</h2><div>${data.categories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      (c) =>
        `<a href="${c.url}">${escapeHtml(c.name)} <span aria-hidden="true">↗</span></a>`,
    )
    .join("")}</div></div></aside></div>` +
  quoteBanner();
