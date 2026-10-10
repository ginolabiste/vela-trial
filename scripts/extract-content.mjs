import fs from "node:fs";
const raw = fs.readFileSync("docs/reference/blog.html", "utf8");
const clean = (s) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsaquo;/g, "")
    .trim();
const articles = [
  ...raw.matchAll(
    /<h2 class="postTitle"><a href="([^"]+)">([\s\S]*?)<\/a><\/h2>[\s\S]*?<div class="post-date">(.*?)<\/div>[\s\S]*?<p class="wp-block-paragraph">([\s\S]*?)<a class="readMore"[\s\S]*?<a href="([^"]+)" rel="category tag">(.*?)<\/a>/g,
  ),
].map((m) => ({
  url: m[1],
  title: clean(m[2]),
  date: m[3],
  isoDate: new Date(`${m[3]} 12:00:00 UTC`).toISOString().slice(0, 10),
  excerpt: clean(m[4]),
  categoryUrl: m[5],
  category: clean(m[6]),
}));
const categories = [
  ...raw.matchAll(
    /<a href="(https:\/\/www.insureonthespot.com\/category\/[^" ]+)"[^>]*>([^<]+)<\/a>/g,
  ),
]
  .map((m) => ({ url: m[1], name: clean(m[2]) }))
  .filter((x, i, a) => a.findIndex((y) => y.url === x.url) === i);
fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync(
  "src/data/articles.json",
  JSON.stringify({ articles, categories }, null, 2),
);
console.log(articles.length, categories.length);
