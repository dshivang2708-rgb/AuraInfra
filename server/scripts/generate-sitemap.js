// Generates public/sitemap.xml before every build.
//
// Static pages (home, about, contact, the four listing pages, upcoming) are
// always included. On top of that, this fetches every *published* project
// from the live API (the same Render backend the frontend talks to) and adds
// one URL per project detail page — so new properties added through the
// admin panel show up in the sitemap automatically on the next deploy,
// without anyone having to touch this file.
//
// Runs as part of `npm run build` (see package.json), so it executes on
// Vercel at build time. If the backend is unreachable or slow to wake up
// (e.g. a cold Render free-tier instance), each category fetch is time-boxed
// and failures are swallowed with a warning — the script always finishes and
// still writes a valid sitemap containing at least the static pages, so a
// backend hiccup never breaks the frontend build.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://aurainfra.co.in").replace(/\/+$/, "");
const API_BASE = (process.env.VITE_API_BASE_URL || "https://your-backend.onrender.com").replace(/\/+$/, "");
const FETCH_TIMEOUT_MS = 20_000;

// category -> detail-page route prefix (mirrors src/lib/categoryRoutes.js;
// premium projects live under /properties/premium-projects, not /properties/premium)
const CATEGORY_ROUTES = {
  residential: "/properties/residential",
  commercial: "/properties/commercial",
  agriculture: "/properties/agriculture",
  premium: "/properties/premium-projects",
};

const STATIC_PAGES = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.6" },
  { loc: "/contact", changefreq: "monthly", priority: "0.6" },
  { loc: "/properties/residential", changefreq: "daily", priority: "0.9" },
  { loc: "/properties/commercial", changefreq: "daily", priority: "0.9" },
  { loc: "/properties/agriculture", changefreq: "daily", priority: "0.9" },
  { loc: "/properties/premium-projects", changefreq: "daily", priority: "0.9" },
  { loc: "/properties/upcoming", changefreq: "daily", priority: "0.7" },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPublishedProjects(category) {
  const url = `${API_BASE}/api/projects?category=${category}`;
  try {
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
    if (!res.ok) {
      console.warn(`[sitemap] ${category}: API responded ${res.status}, skipping this category.`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn(`[sitemap] ${category}: could not fetch projects (${err.message}), skipping this category.`);
    return [];
  }
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(`${SITE_URL}${loc}`)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const entries = STATIC_PAGES.map((page) =>
    urlEntry({ ...page, lastmod: new Date().toISOString().slice(0, 10) })
  );

  const categories = Object.keys(CATEGORY_ROUTES);
  const results = await Promise.all(categories.map(fetchPublishedProjects));

  let projectCount = 0;
  categories.forEach((category, i) => {
    const routePrefix = CATEGORY_ROUTES[category];
    for (const project of results[i]) {
      if (!project.slug) continue;
      projectCount += 1;
      entries.push(
        urlEntry({
          loc: `${routePrefix}/${encodeURIComponent(project.slug)}`,
          lastmod: project.created_at ? String(project.created_at).slice(0, 10) : undefined,
          changefreq: "weekly",
          priority: "0.8",
        })
      );
    }
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join("\n") +
    `\n</urlset>\n`;

  const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
  writeFileSync(outPath, xml, "utf8");

  console.log(
    `[sitemap] Wrote public/sitemap.xml with ${STATIC_PAGES.length} static page(s) and ${projectCount} project page(s).`
  );
}

main();