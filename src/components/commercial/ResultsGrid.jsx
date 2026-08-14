import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, Square, LayoutGrid, List, ArrowRight } from "lucide-react";
import { api } from "../../lib/api.js";
import { firstNumber, matchesCategory, parseListParam, priceToLakh, sortByPrice, withinRange } from "../../lib/propertyFilters.js";
import { CARPET_AREA_BUCKETS } from "../../lib/commercialFilters.js";
import { CATEGORY_TABS } from "./CategoryTabs.jsx";

// Every badge now uses the same flat dark-green pill with white text, no
// icon — matches the simplified tag design used on the Residential cards.
const BADGE_STYLE = "bg-[#1a6b32] text-white";

function toCardProps(row) {
  const d = row.details || {};
  const tagsText = (row.tags || []).map((t) => (typeof t === "string" ? t : t.label)).join(" ");
  return {
    key: row.slug,
    name: row.name,
    image: row.main_image,
    badge: row.badge,
    location: row.location,
    area: row.area_display,
    priceRange: row.price_range,
    type: d.type,
    // Canonical category key selected by the admin on the listing form
    // (e.g. "office-space") — the reliable way matchesCategory() decides
    // which CategoryTabs tab this property belongs to.
    propertyType: d.propertyType || null,
    // Lowercased blob of everything that might mention the property's
    // category — fallback for older rows saved before propertyType existed.
    typeText: `${row.name || ""} ${tagsText} ${d.configurations || ""} ${d.type || ""}`.toLowerCase(),
  };
}

function PropertyCard({ property }) {
  return (
    <div className="property-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm ${BADGE_STYLE}`}
          >
            {property.badge}
          </span>
        )}
      </div>

      <div className="px-4 pt-3 pb-4">
        {property.type && (
          <span className="inline-block text-[10px] text-[#1a6b32] font-bold uppercase tracking-wider bg-[#eaf4ef] px-2 py-0.5 rounded mb-2">
            {property.type}
          </span>
        )}
        <h4 className="font-extrabold text-xl text-gray-900 mb-1.5">{property.name}</h4>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={13} className="text-[#1a6b32]" />
          </span>
          {property.location}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2">
            <Square size={15} /> {property.area || "—"}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center gap-3">
          <div className="min-w-0">
            <span className="text-[#1a6b32] font-extrabold text-sm">{property.priceRange}</span>
          </div>
          <Link
            to="/properties/commercial/$slug"
            params={{ slug: property.key }}
            className="flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 bg-[#1a6b32] hover:bg-[#145528] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsGrid() {
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [rawProperties, setRawProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const activeCategory = search.type || "all";
  const areas = parseListParam(search.area);
  const minPrice = search.minPrice ? parseFloat(search.minPrice) : null;
  const maxPrice = search.maxPrice ? parseFloat(search.maxPrice) : null;

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ category: "commercial", ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => active && setRawProperties(rows.map(toCardProps)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  // Property Type (via the tabs above), Carpet Area, and Price Range are
  // filtered client-side (no need to re-fetch — city/sector already
  // narrowed things down on the server).
  const properties = useMemo(() => {
    const filtered = rawProperties.filter((property) => {
      if (!matchesCategory(property, activeCategory, CATEGORY_TABS)) return false;
      if (areas.length > 0) {
        const num = firstNumber(property.area);
        const inAnyBucket = areas.some((label) => {
          const bucket = CARPET_AREA_BUCKETS.find((b) => b.label === label);
          return bucket && num !== null && num >= bucket.min && num < bucket.max;
        });
        if (!inAnyBucket) return false;
      }
      if (!withinRange(priceToLakh(property.priceRange), minPrice, maxPrice)) return false;
      return true;
    });
    return sortByPrice(filtered, sortBy, (p) => priceToLakh(p.priceRange));
  }, [rawProperties, activeCategory, areas, minPrice, maxPrice, sortBy]);

  return (
    <div className="flex-1">
      {/* Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-bold">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} ${
                activeCategory !== "all"
                  ? CATEGORY_TABS.find((t) => t.key === activeCategory)?.label || "Commercial"
                  : "Commercial"
              } Properties${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort By:</span>
            <select
              className="border-gray-200 rounded-lg text-sm font-medium py-1.5 focus:ring-[#1a6b32]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
            <button
              className={`p-1.5 rounded ${gridView ? "bg-[#1a6b32] text-white" : "text-gray-400"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`p-1.5 rounded ${!gridView ? "bg-[#1a6b32] text-white" : "text-gray-400"}`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          Couldn't load properties: {error}
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-500">
          No commercial properties found{sector ? ` in ${sector}` : city ? ` in ${city}` : ""}.
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>
    </div>
  );
}