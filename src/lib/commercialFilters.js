// Shared between FilterSidebar and ResultsGrid so the Carpet Area options
// and the actual filtering logic never drift apart. (Property Type used to
// live here too, but that's now handled by CategoryTabs.jsx + the
// admin-selected propertyType field — see propertyFilters.js#matchesCategory.)

export const CARPET_AREA_BUCKETS = [
  { label: "0 - 1000 sq ft", min: 0, max: 1000 },
  { label: "1000 - 5000 sq ft", min: 1000, max: 5000 },
  { label: "5000 - 10000 sq ft", min: 5000, max: 10000 },
  { label: "10000+ sq ft", min: 10000, max: Infinity },
];