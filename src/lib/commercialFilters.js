// Shared between FilterSidebar and ResultsGrid so the filter options and the
// actual filtering logic never drift apart.

// Kept in sync with the "Commercial Type" suggestions in the admin form
// (src/pages/admin/forms/CommercialProjectForm.jsx). Matching is loose
// (substring, case-insensitive — see propertyFilters.js) so free-text admin
// entries like "Warehouse / Industrial" still match the "Warehouse" filter.
export const COMMERCIAL_PROPERTY_TYPES = [
  "Office Space",
  "Retail Shop",
  "Showroom",
  "Warehouse",
  "Co-working Space",
  "Mixed Use",
];

export const CARPET_AREA_BUCKETS = [
  { label: "0 - 1000 sq ft", min: 0, max: 1000 },
  { label: "1000 - 5000 sq ft", min: 1000, max: 5000 },
  { label: "5000 - 10000 sq ft", min: 5000, max: 10000 },
  { label: "10000+ sq ft", min: 10000, max: Infinity },
];