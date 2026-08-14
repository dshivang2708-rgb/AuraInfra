// Maps a `projects` table row (snake_case columns + a flexible `details` JSONB
// blob) into the prop shape each category's existing detail-page components
// expect. Keeps the detail-page components themselves unchanged.

export function toResidentialDetail(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    tagline: row.tagline,
    badge: row.badge,
    developer: d.developer,
    propertyType: d.propertyType,
    location: row.location,
    beds: d.beds,
    area: row.area_display,
    price: row.price_display,
    priceRange: row.price_range,
    possession: row.possession,
    totalArea: d.totalArea,
    totalUnits: d.totalUnits,
    configurations: d.configurations,
    tags: row.tags || [],
    description: row.description,
    overviewSummary: d.overviewSummary || row.description,
    floorPlans: d.floorPlans || [],
    gallery: row.gallery_images || [],
    brochureUrl: d.brochureUrl || null,
    faqs: d.faqs || [],
    highlights: d.highlights || [],
    image: row.main_image,
  };
}

export function toCommercialDetail(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    tagline: row.tagline,
    type: d.type,
    propertyType: d.propertyType,
    badge: row.badge,
    developer: d.developer,
    location: row.location,
    area: row.area_display,
    priceRange: row.price_range,
    priceNote: d.priceNote,
    possession: row.possession,
    totalArea: d.totalArea,
    totalUnits: d.totalUnits,
    configurations: d.configurations,
    tags: row.tags || [],
    description: row.description,
    overviewSummary: d.overviewSummary || row.description,
    floorPlans: d.floorPlans || [],
    whyInvest: d.whyInvest || [],
    gallery: row.gallery_images || [],
    brochureUrl: d.brochureUrl || null,
    faqs: d.faqs || [],
    highlights: d.highlights || [],
    image: row.main_image,
    images: row.main_images?.length ? row.main_images : row.main_image ? [row.main_image] : [],
  };
}

export function toAgricultureDetail(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    tagline: row.tagline,
    badge: row.badge,
    propertyType: d.propertyType,
    location: row.location,
    area: row.area_display,
    price: row.price_display,
    priceRange: row.price_range,
    priceNote: d.priceNote,
    soilType: d.soilType,
    waterSource: d.waterSource,
    irrigationType: d.irrigationType,
    soilWaterNotes: d.soilWaterNotes,
    possession: row.possession,
    tags: row.tags || [],
    description: row.description,
    areaOptions: d.areaOptions || [],
    nearby: d.nearby || [],
    whyInvest: d.whyInvest || [],
    landDetails: d.landDetails || [],
    documents: d.documents || [],
    gallery: row.gallery_images || [],
    brochureUrl: d.brochureUrl || null,
    faqs: d.faqs || [],
    highlights: d.highlights || [],
    image: row.main_image,
  };
}

// Premium projects use the same generic admin form as the other three
// categories (name, tagline, badge, location, price fields, description,
// gallery, brochure, FAQs, plus a free-form "details" JSON blob for the
// rest) — so this adapter now surfaces every one of those fields, the same
// way toResidentialDetail/toCommercialDetail/toAgricultureDetail do, instead
// of dropping most of what the admin entered.
export function toPremiumDetail(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    tagline: row.tagline,
    badge: row.badge,
    builder: d.builder,
    propertyType: d.propertyType,
    location: row.location,
    area: row.area_display,
    price: row.price_display,
    priceRange: row.price_range,
    priceNote: d.priceNote,
    possession: row.possession,
    totalArea: d.totalArea,
    totalUnits: d.totalUnits,
    configurations: d.configurations,
    tags: row.tags || [],
    description: row.description,
    overviewSummary: d.overviewSummary || row.description,
    floorPlans: d.floorPlans || [],
    whyInvest: d.whyInvest || [],
    amenities: d.amenities || [],
    notes: d.notes || null,
    gallery: row.gallery_images || [],
    brochureUrl: d.brochureUrl || null,
    faqs: d.faqs || [],
    highlights: d.highlights || [],
    image: row.main_image,
  };
}

// Card-listing shapes (simpler, used by the grid pages)

export function toResidentialCard(row) {
  return {
    key: row.slug,
    name: row.name,
    image: row.main_image,
    badge: row.badge,
    propertyType: row.details?.propertyType,
    location: row.location,
    beds: row.details?.beds,
    area: row.area_display,
    price: row.price_display,
    priceNote: null,
  };
}

export function toCommercialCard(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    type: d.type,
    propertyType: d.propertyType,
    badge: row.badge,
    location: row.location,
    area: row.area_display,
    priceRange: row.price_range,
    image: row.main_image,
  };
}

export function toAgricultureCard(row) {
  return {
    key: row.slug,
    name: row.name,
    badge: row.badge,
    propertyType: row.details?.propertyType,
    location: row.location,
    area: row.area_display,
    price: row.price_display,
    priceNote: row.details?.priceNote,
    image: row.main_image,
    tags: row.tags || [],
  };
}

export function toPremiumCard(row) {
  const d = row.details || {};
  return {
    key: row.slug,
    name: row.name,
    builder: d.builder,
    location: row.location,
    tags: row.tags || [],
    price: row.price_display,
    priceRange: row.price_range,
    possession: row.possession,
    image: row.main_image,
  };
}

const CATEGORY_TYPE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  agriculture: "Agriculture",
  premium: "Premium",
};

// Converts a project row from ANY category into the shape the homepage's
// "Featured Properties" section needs. Unlike the other adapters above,
// this one is category-agnostic since a single featured list can mix
// residential/commercial/agriculture properties together.
export function toFeaturedCard(row) {
  const d = row.details || {};
  return {
    key: `${row.category}-${row.slug}`,
    category: row.category,
    slug: row.slug,
    name: row.name,
    price: row.price_display,
    // Best available short "type" label: Commercial Type, then BHK summary,
    // then a generic fallback based on the category.
    type: d.type || d.beds || CATEGORY_TYPE_LABELS[row.category] || row.category,
    location: row.location,
    area: row.area_display,
    image: row.main_image,
  };
}