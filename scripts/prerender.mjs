// scripts/prerender.mjs
//
// Runs after `vite build` (now wired into the actual "build" script — see
// package.json). Writes a real, per-route static HTML file for every
// static marketing/listing route, with the correct <title>/<meta
// description>/<link rel="canonical">/OG tags baked directly into the raw
// HTML. No headless browser required.
//
// WHY THIS REPLACED THE OLD PUPPETEER-BASED VERSION:
// The previous version booted `vite preview` and used
// Puppeteer/@sparticuz-chromium to visit each route in a headless browser
// and snapshot the post-JS DOM. Two problems:
//   1. It was only ever wired up as a separate "build:with-prerender"
//      script. Vercel's actual build command was plain "vite build", so
//      the prerender step never ran in production at all.
//   2. Even if it had been wired up, headless Chromium is fragile inside
//      Vercel's build container (missing shared libs, launch timeouts).
//
// The practical effect: every route (/about, /properties/residential,
// /properties/commercial, etc.) served the exact same generic
// index.html — same <title>, same <meta description>, and critically
// the same hardcoded <link rel="canonical" href="https://aurainfra.co.in/">.
// Googlebot's raw HTML fetch (before/independent of JS execution) saw
// identical content with a canonical tag pointing every route back to
// "/", so it folded all the inner pages into the homepage and only ever
// indexed "/". This script removes that failure mode entirely: the tags
// below are static strings pulled straight from each page's <Seo ... />
// props (see src/pages/*.jsx), so there's nothing that can fail to
// launch, time out, or silently get skipped.
//
// Detail pages (/properties/<category>/:slug) are NOT covered here —
// their slugs are dynamic/data-driven (Supabase). Admin routes are
// skipped (noindex via robots.txt, behind auth). If detail pages need
// indexing later, generate them the same way: fetch the slugs, then
// add an entry per slug below (or loop and call writeRoute()).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE_URL = "https://aurainfra.co.in";
const SITE_NAME = "Aura Infra";
const DIST_DIR = path.resolve("dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

// Keep these in sync with the <Seo title=... description=... path=... />
// props on each page component in src/pages/. Plain strings only — this
// script has zero runtime dependencies beyond Node's fs.
const ROUTES = [
  {
    path: "/",
    // Home.jsx now omits `title` (see src/pages/Home.jsx), so Seo.jsx's
    // default applies — keep this identical to that default AND to the
    // static <title> already in index.html.
    title: `${SITE_NAME} - Residential, Commercial & Agricultural Properties in Mohali`,
    description:
      "Aura Infra is a Mohali-based real estate company offering premium residential, commercial and agricultural properties across Mohali, Chandigarh and North India. Building spaces, creating futures.",
  },
  {
    path: "/about",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Learn about Aura Infra's journey, values and leadership. A Mohali-based real estate company building spaces and creating futures across North India.",
  },
  {
    path: "/contact",
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Get in touch with Aura Infra. Visit us at SCO 16, Sector 82-A, JLPL, SAS Nagar, Mohali, Punjab, or reach out online to discuss your next property.",
  },
  {
    path: "/properties/residential",
    title: `Residential Properties in Mohali | ${SITE_NAME}`,
    description:
      "Browse premium residential properties, flats and villas in Mohali, Sector 82, Aerocity and more with Aura Infra.",
  },
  {
    path: "/properties/commercial",
    title: `Commercial Properties in Mohali | ${SITE_NAME}`,
    description:
      "Explore commercial spaces, office towers and retail units in Mohali and Chandigarh tricity with Aura Infra.",
  },
  {
    path: "/properties/agriculture",
    title: `Agricultural Land in Mohali & Punjab | ${SITE_NAME}`,
    description:
      "Find agricultural land, farmhouse plots and fertile land for sale in Mohali, Kharar and across Punjab with Aura Infra.",
  },
  {
    path: "/properties/premium-projects",
    title: `Premium Projects | ${SITE_NAME}`,
    description:
      "Discover Aura Infra's curated premium real estate projects, offering elevated design and prime locations across Mohali and North India.",
  },
  {
    path: "/properties/upcoming",
    title: `Upcoming Projects | ${SITE_NAME}`,
    description:
      "Get an early look at Aura Infra's upcoming residential, commercial and agricultural projects across Mohali and North India.",
  },
  {
    path: "/terms-and-conditions",
    title: `Terms & Conditions | ${SITE_NAME}`,
    description:
      "Terms & Conditions for using the Aura Infra website and real estate consulting, sales and brokerage services.",
  },
  {
    path: "/privacy-policy",
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "How Aura Infra collects, uses, and protects your personal information across our website and consulting, sales and brokerage services.",
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceTag(html, regex, replacement) {
  if (!regex.test(html)) {
    throw new Error(`Expected tag not found in template (pattern: ${regex})`);
  }
  return html.replace(regex, replacement);
}

function buildHtmlForRoute(template, route) {
  const canonicalUrl = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceTag(
    html,
    /<meta name="title" content="[^"]*" \/>/,
    `<meta name="title" content="${title}" />`
  );
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${description}" />`
  );

  return html;
}

function outputPathFor(routePath) {
  if (routePath === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error("dist/index.html not found — run `vite build` before prerendering.");
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  let failures = 0;

  for (const route of ROUTES) {
    try {
      const html = buildHtmlForRoute(template, route);
      const outPath = outputPathFor(route.path);
      mkdirSync(path.dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, "utf-8");
      console.log(`Prerendered ${route.path} -> ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
      failures += 1;
      console.error(`! Failed to prerender ${route.path}: ${err.message}`);
    }
  }

  if (failures > 0) {
    // Fail the build loudly instead of silently shipping pages with a
    // wrong/duplicate canonical tag again.
    console.error(`\n${failures} route(s) failed to prerender. Failing the build.`);
    process.exit(1);
  }

  console.log(`\nAll ${ROUTES.length} static routes prerendered successfully.`);
}

main();