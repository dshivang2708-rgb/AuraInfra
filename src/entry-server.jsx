// src/entry-server.jsx
//
// Build-time-only entry point. Never shipped to the browser and never
// imported by src/main.jsx — scripts/prerender.mjs loads this through
// Vite's SSR module runner (vite.ssrLoadModule) after `vite build`, to
// render each static route to real HTML (not just a swapped <title>/
// <meta> shell) for Googlebot's raw-HTML crawl to see.
//
// A fresh in-memory router is created per call so concurrent/sequential
// prerenders never share navigation state.
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./router.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

export async function render(url) {
  const history = createMemoryHistory({ initialEntries: [url] });
  const router = createRouter({ routeTree, history });

  // Resolves the matched route (including .lazy() chunks) before we render,
  // so lazy-loaded pages (About, Contact, etc.) aren't left blank.
  await router.load();

  const helmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </HelmetProvider>
  );

  // react-helmet-async collects every <Seo> (see src/components/Seo.jsx)
  // call made during that render — this is the single source of truth for
  // title/meta/canonical, so prerender.mjs no longer needs its own
  // hand-maintained copy of each page's title/description.
  const { helmet } = helmetContext;

  return { appHtml, helmet };
}