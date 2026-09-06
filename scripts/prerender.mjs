import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");
const INDEX_FILE = path.join(DIST_DIR, "index.html");

const SITE_URL = "https://www.aurainfra.co.in";
const SITE_NAME = "Aura Infra";

const API_BASE_URL =
  process.env.PRERENDER_API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  "";

const staticRoutes = [
  {
    path: "/",
    title:
      "Aura Infra - Residential, Commercial & Agricultural Properties in Mohali",
    description:
      "Aura Infra is a Mohali-based real estate company offering premium residential, commercial and agricultural properties across Mohali, Chandigarh and North India.",
  },
  {
    path: "/about",
    title: "About Aura Infra",
    description:
      "Learn about Aura Infra, a Mohali-based real estate company offering residential, commercial and agricultural properties.",
  },
  {
    path: "/contact",
    title: "Contact Aura Infra",
    description:
      "Contact Aura Infra for residential, commercial and agricultural property opportunities in Mohali and North India.",
  },
  {
    path: "/properties/residential",
    title: "Residential Properties in Mohali",
    description:
      "Explore residential properties and projects offered by Aura Infra across Mohali and nearby areas.",
  },
  {
    path: "/properties/commercial",
    title: "Commercial Properties in Mohali",
    description:
      "Explore commercial properties and projects offered by Aura Infra across Mohali and nearby areas.",
  },
  {
    path: "/properties/agriculture",
    title: "Agricultural Properties in Punjab",
    description:
      "Explore agricultural land and property opportunities offered by Aura Infra.",
  },
  {
    path: "/properties/premium-projects",
    title: "Premium Projects | Aura Infra",
    description:
      "Explore premium real estate projects offered by Aura Infra.",
  },
  {
    path: "/properties/upcoming",
    title: "Upcoming Projects | Aura Infra",
    description:
      "Discover upcoming residential, commercial and agricultural projects from Aura Infra.",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms and Conditions | Aura Infra",
    description:
      "Read the terms and conditions for using the Aura Infra website.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Aura Infra",
    description:
      "Read the privacy policy for the Aura Infra website.",
  },
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizePath(value) {
  if (!value || value === "/") return "/";
  return `/${String(value).replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function createAbsoluteUrl(routePath) {
  return `${SITE_URL}${normalizePath(routePath)}`;
}

function createMetadata(html, route) {
  const canonicalUrl = createAbsoluteUrl(route.path);

  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description || "");
  const canonical = escapeHtml(canonicalUrl);

  const image = `${SITE_URL}/icons/og-image.jpg`;

  let output = html;

  output = output.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  output = output.replace(
    /<meta[^>]+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}" />`
  );

  output = output.replace(
    /<meta[^>]+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`
  );

  output = output.replace(
    /<link[^>]+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  output = output.replace(
    /<meta[^>]+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${title}" />`
  );

  output = output.replace(
    /<meta[^>]+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${description}" />`
  );

  output = output.replace(
    /<meta[^>]+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`
  );

  output = output.replace(
    /<meta[^>]+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${image}" />`
  );

  output = output.replace(
    /<meta[^>]+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}" />`
  );

  output = output.replace(
    /<meta[^>]+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}" />`
  );

  output = output.replace(
    /<meta[^>]+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${image}" />`
  );

  return output;
}

async function fetchProjects(category) {
  if (!API_BASE_URL) {
    return [];
  }

  const base = API_BASE_URL.replace(/\/+$/, "");

  const url =
    `${base}/api/projects?category=${encodeURIComponent(category)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${category} projects: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.projects)) {
    return data.projects;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

function getProjectSlug(project) {
  return (
    project.slug ||
    project.urlSlug ||
    project.seoSlug ||
    project.projectSlug ||
    null
  );
}

function getProjectTitle(project) {
  return (
    project.seoTitle ||
    project.title ||
    project.name ||
    project.projectName ||
    "Real Estate Project"
  );
}

function getProjectDescription(project) {
  return (
    project.seoDescription ||
    project.metaDescription ||
    project.description ||
    `Explore ${getProjectTitle(project)} by Aura Infra.`
  );
}

async function buildDynamicRoutes() {
  if (!API_BASE_URL) {
    console.warn(
      "VITE_API_BASE_URL / PRERENDER_API_BASE_URL is not configured."
    );
    console.warn(
      "Static routes will be prerendered, but dynamic project pages will not be added to the sitemap."
    );
    return [];
  }

  const categories = [
    {
      apiCategory: "residential",
      routeCategory: "residential",
    },
    {
      apiCategory: "commercial",
      routeCategory: "commercial",
    },
    {
      apiCategory: "agriculture",
      routeCategory: "agriculture",
    },
    {
      apiCategory: "premium",
      routeCategory: "premium-projects",
    },
  ];

  const dynamicRoutes = [];

  for (const category of categories) {
    const projects = await fetchProjects(category.apiCategory);

    for (const project of projects) {
      const slug = getProjectSlug(project);

      if (!slug) {
        continue;
      }

      const routePath =
        `/properties/${category.routeCategory}/${slug}`;

      dynamicRoutes.push({
        path: routePath,
        title: getProjectTitle(project),
        description: getProjectDescription(project),
      });
    }
  }

  return dynamicRoutes;
}

function writeRoute(html, route) {
  const routePath = normalizePath(route.path);

  const destination =
    routePath === "/"
      ? INDEX_FILE
      : path.join(DIST_DIR, routePath.replace(/^\/+/, ""), "index.html");

  fs.mkdirSync(path.dirname(destination), {
    recursive: true,
  });

  const finalHtml = createMetadata(html, route);

  fs.writeFileSync(destination, finalHtml, "utf8");

  console.log(`Prerendered: ${routePath}`);
}

function createSitemap(routes) {
  const urls = routes
    .map((route) => {
      const loc = createAbsoluteUrl(route.path);

      return `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  if (!fs.existsSync(INDEX_FILE)) {
    throw new Error(
      `Could not find ${INDEX_FILE}. Run "vite build" before prerendering.`
    );
  }

  const baseHtml = fs.readFileSync(INDEX_FILE, "utf8");

  const dynamicRoutes = await buildDynamicRoutes();

  const allRoutes = [
    ...staticRoutes,
    ...dynamicRoutes,
  ];

  const uniqueRoutes = Array.from(
    new Map(
      allRoutes.map((route) => [
        normalizePath(route.path),
        {
          ...route,
          path: normalizePath(route.path),
        },
      ])
    ).values()
  );

  for (const route of uniqueRoutes) {
    writeRoute(baseHtml, route);
  }

  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");

  fs.writeFileSync(
    sitemapPath,
    createSitemap(uniqueRoutes),
    "utf8"
  );

  console.log(
    `\nSitemap generated with ${uniqueRoutes.length} URLs: ${sitemapPath}`
  );

  console.log("\nPrerender complete.");
}

main().catch((error) => {
  console.error("\nPrerender failed:");
  console.error(error);

  process.exit(1);
});