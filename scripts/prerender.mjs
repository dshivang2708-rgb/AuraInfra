// scripts/prerender.mjs
//
// Runs after `vite build` (wired into the "build" script — see
// package.json). For every static marketing route, this actually
// server-renders the real page (via src/entry-server.jsx +
// react-dom/server) and writes the resulting HTML — real headings,
// paragraphs, links — into dist/<route>/index.html, with the
// <title>/<meta description>/<link rel="canonical">/OG tags taken
// from react-helmet-async (the same <Seo ... /> each page already
// renders — see src/components/Seo.jsx).
//
// WHY THIS MATTERS FOR INDEXING:
// Googlebot's *raw* HTML fetch (the "Page fetch" step in Search
// Console's URL Inspection) happens before/independent of any JS
// execution. This app is a client-rendered SPA (see src/main.jsx —
// ReactDOM.createRoot(...).render(...) into an empty <div id="root">),
// so a plain fetch of https://www.aurainfra.co.in/ returns a <body>
// with nothing but that empty div: no headings, no text, no links.
// Google *can* run the JS in a second "rendering" wave, but that wave
// is queued, can take days, and — especially for a new/low-authority
// domain — a raw HTML fetch with zero visible content is a strong
// contributor to a "Crawled - currently not indexed" verdict even
// though the crawl itself succeeded. Baking the real rendered markup
// into the static HTML removes that dependency entirely: the very
// first fetch already contains the page's actual content.
//
// PREVIOUS VERSIONS OF THIS FILE:
// v1 used Puppeteer/@sparticuz-chromium to screenshot the post-JS DOM.
// Headless Chromium was fragile inside Vercel's build container
// (missing shared libs, launch timeouts), so it was replaced with v2,
// which only swapped <title>/<meta>/<link rel="canonical"> strings on
// top of the empty index.html shell — cheap and reliable, but it left
// the actual page body empty, which is the specific problem above.
// This version renders the real component tree with react-dom/server
// (no browser, so nothing to launch or time out) and gets its
// title/meta from react-helmet-async instead of a hand-maintained
// list, so there's no separate copy of each page's copy to keep in
// sync.
//
// Detail pages (/properties/<category>/:slug) are NOT covered here —
// their slugs are dynamic/data-driven (Supabase), and the map widgets
// on some of them rely on browser-only APIs that don't run under
// Node. Admin routes are skipped (noindex via robots.txt, behind
// auth). If detail pages need indexing later, fetch the published
// slugs here and add one ROUTE entry per slug (or loop), the same way.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const DIST_DIR = path.resolve("dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

// Every static route worth indexing. Each page sets its own
// title/description via <Seo ... /> (see src/pages/*.jsx) — nothing
// route-specific needs to be duplicated here.
const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/properties/residential",
  "/properties/commercial",
  "/properties/agriculture",
  "/properties/premium-projects",
  "/properties/upcoming",
  "/terms-and-conditions",
  "/privacy-policy",
];

// Whitespace/newline-tolerant matcher for a self-closing <meta> tag, e.g.
//   <meta property="og:title" content="..." />
// or the same tag reformatted across multiple lines with attributes in
// either order. \s already matches newlines in JS regex.
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function metaTagRegex(attrName, attrValue) {
  const name = escapeRegex(attrName);
  const value = escapeRegex(attrValue);
  return new RegExp(
    `\\s*<meta\\s+(?:${name}="${value}"\\s+content="[^"]*"|content="[^"]*"\\s+${name}="${value}")\\s*/>`,
    "g"
  );
}
function linkTagRegex(relValue) {
  const rel = escapeRegex(relValue);
  return new RegExp(
    `\\s*<link\\s+(?:rel="${rel}"\\s+href="[^"]*"|href="[^"]*"\\s+rel="${rel}")\\s*/>`,
    "g"
  );
}

// index.html ships a static fallback title/description/canonical/OG/
// Twitter block for the (rare) case JS never runs at all. Every one of
// these is also emitted by <Seo/> via Helmet for every route we
// prerender, so once Helmet's version is injected the static originals
// would just be dead-weight duplicates sitting later in the same
// <head> — two <meta name="description">, two canonical links, etc.
// Strip the specific tags Helmet always re-emits before inserting its
// version; leave everything Helmet doesn't touch (icons, fonts,
// structured data, robots, theme-color, og:type/site_name/locale/
// image:width/height) as the static defaults they already are.
function stripStaticSeoTags(html) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, "");
  out = out.replace(metaTagRegex("name", "description"), "");
  out = out.replace(linkTagRegex("canonical"), "");
  out = out.replace(metaTagRegex("property", "og:title"), "");
  out = out.replace(metaTagRegex("property", "og:description"), "");
  out = out.replace(metaTagRegex("property", "og:url"), "");
  out = out.replace(metaTagRegex("property", "og:image"), "");
  out = out.replace(metaTagRegex("name", "twitter:title"), "");
  out = out.replace(metaTagRegex("name", "twitter:description"), "");
  out = out.replace(metaTagRegex("name", "twitter:image"), "");
  return out;
}

function outputPathFor(routePath) {
  if (routePath === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

// react-helmet-async's helmet.title / helmet.meta / helmet.link objects
// each render as a ready-to-inject `.toString()` (or an empty string if
// that page never set one). This entirely replaces the old hand-rolled
// regex tag-swapping — whatever a page's <Seo/> actually renders is
// what ends up in the static HTML, so the two can't drift apart.
function renderHead(helmet) {
  return [helmet.title, helmet.meta, helmet.link]
    .map((piece) => (piece ? piece.toString() : ""))
    .filter(Boolean)
    .join("\n    ");
}

function injectIntoTemplate(template, { appHtml, helmet }) {
  let html = template;

  // Drop the static fallback title/description/canonical/OG/Twitter
  // tags so Helmet's per-route versions (inserted right after) are the
  // only copies left in the document — no duplicate <meta name=
  // "description">, no duplicate canonical.
  html = stripStaticSeoTags(html);
  html = html.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\n    <!-- Primary SEO (injected at build time — see scripts/prerender.mjs) -->\n    ${renderHead(helmet)}`
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  return html;
}

async function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error("dist/index.html not found — run `vite build` before prerendering.");
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  // Middleware-mode Vite server, used purely as a module runner so
  // entry-server.jsx (and everything it imports — router.jsx, every
  // page component, Seo.jsx, etc.) gets the same JSX/ESM transforms as
  // the real app, without needing a headless browser or a separate SSR
  // bundle step.
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  let failures = 0;

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    for (const routePath of ROUTES) {
      try {
        const { appHtml, helmet } = await render(routePath);
        const html = injectIntoTemplate(template, { appHtml, helmet });
        const outPath = outputPathFor(routePath);
        mkdirSync(path.dirname(outPath), { recursive: true });
        writeFileSync(outPath, html, "utf-8");
        console.log(`Prerendered ${routePath} -> ${path.relative(process.cwd(), outPath)}`);
      } catch (err) {
        failures += 1;
        console.error(`! Failed to prerender ${routePath}:`, err);
      }
    }
  } finally {
    await vite.close();
  }

  if (failures > 0) {
    // Fail the build loudly instead of silently shipping a route with
    // stale/duplicate meta tags or an empty body again.
    console.error(`\n${failures} route(s) failed to prerender. Failing the build.`);
    process.exit(1);
  }

  console.log(`\nAll ${ROUTES.length} static routes prerendered successfully.`);
}

main();
