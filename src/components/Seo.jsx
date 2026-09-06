import { Helmet } from "react-helmet-async";

const SITE_NAME = "Aura Infra";
const SITE_URL = "https://www.aurainfra.co.in";
const DEFAULT_IMAGE = `${SITE_URL}/icons/og-image.jpg`;

function normalizePath(path) {
  if (!path || path === "/") {
    return "/";
  }

  return `/${String(path)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")}`;
}

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
}) {
  const normalizedPath = normalizePath(path);
  const url = `${SITE_URL}${normalizedPath}`;

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Residential, Commercial & Agricultural Properties in Mohali`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && (
        <meta
          name="description"
          content={description}
        />
      )}

      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content={SITE_NAME}
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      {description && (
        <meta
          property="og:description"
          content={description}
        />
      )}

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:image"
        content={image}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      {description && (
        <meta
          name="twitter:description"
          content={description}
        />
      )}

      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  );
}