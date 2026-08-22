import { Helmet } from "react-helmet-async";

const SITE_NAME = "Aura Infra";
const SITE_URL = "https://aurainfra.co.in";
const DEFAULT_IMAGE = `${SITE_URL}/icons/og-image.jpg`;

/**
 * Drop this at the top of any page to set that page's title,
 * meta description, canonical URL, and social preview tags.
 *
 * <Seo
 *   title="About Us"
 *   description="Learn about Aura Infra..."
 *   path="/about"
 * />
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
}) {
    const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Residential, Commercial & Agricultural Properties in Mohali`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
