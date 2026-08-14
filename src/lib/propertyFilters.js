// Shared helpers that let the listing-page filter sidebars actually filter
// results, even though price/area are stored as free-text display strings
// (e.g. "₹ 85 Lakh", "1200 - 2400 Sq.ft") rather than structured numbers.

// Extracts the first number in a string, e.g. "1200 - 2400 Sq.ft" -> 1200,
// "10 Acre" -> 10. Handles commas as thousand separators. Returns null if no
// number is found.
export function firstNumber(str) {
  if (!str) return null;
  const match = String(str).replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

// Converts a price string like "₹ 85 Lakh", "₹1.2 Cr", "1.5 Crore" into a
// number of Lakhs, so amounts in different units can be compared on one
// scale. Returns null if no number is found.
export function priceToLakh(str) {
  const n = firstNumber(str);
  if (n === null) return null;
  const isCrore = /\bcr\b|crore/i.test(str);
  return isCrore ? n * 100 : n;
}

// Case-insensitive "these two labels are close enough" check. Tolerant of
// free-text admin-entered values not exactly matching a filter's fixed
// option label in either direction (e.g. project type "Warehouse /
// Industrial" vs filter option "Warehouse").
export function looselyMatches(haystack, needle) {
  if (!haystack || !needle) return false;
  const h = String(haystack).toLowerCase();
  const n = String(needle).toLowerCase();
  return h.includes(n) || n.includes(h);
}

// True if `haystack` (a single string) loosely matches any of `selected`.
// An empty `selected` list means "no filter applied" -> always true.
export function matchesAnySelected(haystack, selected) {
  if (!selected || selected.length === 0) return true;
  return selected.some((s) => looselyMatches(haystack, s));
}

// True if any item in `haystackList` (e.g. a project's tags array) loosely
// matches any of `selected`. An empty `selected` list means "no filter
// applied" -> always true.
export function matchesAnySelectedInList(haystackList, selected) {
  if (!selected || selected.length === 0) return true;
  const list = Array.isArray(haystackList) ? haystackList : [];
  return list.some((item) => selected.some((s) => looselyMatches(item, s)));
}

// Parses a comma-separated URL search param into an array, e.g.
// "Office Space,Showroom" -> ["Office Space", "Showroom"]. Empty/undefined
// input returns [].
export function parseListParam(value) {
  return value ? String(value).split(",").filter(Boolean) : [];
}

// True if the property belongs to the active category tab. Prefers the
// admin-selected `propertyType` (set via the dropdown on the listing form —
// this is the reliable source once a project has been saved/edited with it).
// Falls back to keyword matching against `property.typeText` (a lowercased
// blob of its name/tags/config text — see toCardProps in PropertyGrid.jsx)
// for older rows that predate the field. An "all" tab always matches.
export function matchesCategory(property, activeKey, tabs) {
  if (!activeKey || activeKey === "all") return true;
  if (property.propertyType) return property.propertyType === activeKey;
  const tab = tabs.find((t) => t.key === activeKey);
  if (!tab || !tab.keywords.length) return true;
  const haystack = property.typeText || "";
  return tab.keywords.some((k) => haystack.includes(k));
}

// True if `value` (a number, possibly null) falls within [min, max].
// Missing min/max bounds are treated as "no limit" on that side. A null
// value (couldn't be parsed) is excluded whenever any bound is set.
export function withinRange(value, min, max) {
  if (min == null && max == null) return true;
  if (value == null) return false;
  if (min != null && value < min) return false;
  if (max != null && value > max) return false;
  return true;
}

// Sorts a list of properties by price, given a `priceKey` function that
// extracts a comparable Lakh value from each item (usually
// `(p) => priceToLakh(p.price)`). `order` is one of:
//   "newest"     - no re-sort; the list already arrives newest-first from
//                  the API (rows are ordered by created_at desc server-side)
//   "price-asc"  - cheapest first
//   "price-desc" - most expensive first
// Items whose price couldn't be parsed (null) are pushed to the end
// regardless of direction, rather than sorting unpredictably around them.
export function sortByPrice(list, order, priceKey) {
  if (order !== "price-asc" && order !== "price-desc") return list;
  const sorted = [...list].sort((a, b) => {
    const pa = priceKey(a);
    const pb = priceKey(b);
    if (pa == null && pb == null) return 0;
    if (pa == null) return 1;
    if (pb == null) return -1;
    return order === "price-asc" ? pa - pb : pb - pa;
  });
  return sorted;
}