// scripts/prerender.mjs
//
// Runs after `vite build`. Boots the production build locally with
// `vite preview`, visits each real route with a headless browser,
// waits for React (and any data fetching + react-helmet-async) to
// finish, then writes the fully-rendered HTML to disk as a static
// file for that route.
//
// Why: this is a client-only React SPA, so every URL is served the
// same generic index.html and the real <title>/<meta description>
// only appear after JS runs (see src/components/Seo.jsx). Crawlers
// that don't wait for that end up indexing the generic homepage
// title/description for every page. Prerendering bakes the correct
// tags into the actual HTML file served for each route, so no JS
// execution is required to see them.
//
// Detail pages (/properties/<category>/:slug) are intentionally
// NOT prerendered here — their slugs are dynamic/data-driven and
// would need a separate "fetch all slugs, then render each" step.
// The static marketing/listing routes below are what showed up
// wrong in Google, so they're the priority.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

// Vercel's build container doesn't ship the shared libraries (libnss3.so
// and friends) that a normal downloaded Chromium binary needs, so the
// full `puppeteer` package's bundled browser can't launch there — it
// only works on a full desktop/CI Linux image. `@sparticuz/chromium` is
// a Chromium build compiled specifically for serverless/build
// environments like Vercel and AWS Lambda that has no missing native
// deps, paired with `puppeteer-core` (same API, no bundled browser).
// Locally (and in any other CI that has real Chrome deps installed) we
// keep using the full `puppeteer` package's bundled browser as before.
const isVercel = !!process.env.VERCEL;

async function launchBrowser() {
  if (isVercel) {
    const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
      import("@sparticuz/chromium"),
      import("puppeteer-core"),
    ]);
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const PORT = 4321;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;
const DIST_DIR = path.resolve("dist");

// Every static route worth prerendering (no dynamic :slug params).
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

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return resolve();
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Timed out waiting for ${url}`));
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

function outputPathFor(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, route.replace(/^\//, ""), "index.html");
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error("dist/ not found — run `vite build` before prerendering.");
    process.exit(1);
  }

  console.log(`Starting preview server on ${BASE_URL} ...`);
  // shell: true is required on Windows, where "npx" actually resolves to
  // "npx.cmd" and Node's spawn() won't find it without going through a shell.
  const server = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--host", HOST, "--strictPort"],
    { stdio: "inherit", shell: true }
  );

  const cleanupAndExit = (code) => {
    server.kill();
    process.exit(code);
  };

  try {
    await waitForServer(BASE_URL);

    const browser = await launchBrowser();

    for (const route of ROUTES) {
      const page = await browser.newPage();
      const url = `${BASE_URL}${route}`;
      console.log(`Prerendering ${route} ...`);

      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        // Small extra settle time for react-helmet-async's effect to flush.
        await new Promise((r) => setTimeout(r, 150));

        const html = await page.content();
        const outPath = outputPathFor(route);
        mkdirSync(path.dirname(outPath), { recursive: true });
        writeFileSync(outPath, html, "utf-8");
        console.log(`  -> wrote ${path.relative(process.cwd(), outPath)}`);
      } catch (err) {
        console.error(`  ! failed to prerender ${route}:`, err.message);
      } finally {
        await page.close();
      }
    }

    await browser.close();
    cleanupAndExit(0);
  } catch (err) {
    console.error("Prerender failed:", err);
    cleanupAndExit(1);
  }
}

main();