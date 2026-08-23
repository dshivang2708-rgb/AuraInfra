import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, BedDouble, Ruler, ArrowRight } from "lucide-react";
import { api } from "../../lib/api.js";
import { matchesAnySelected, matchesCategory, parseListParam, priceToLakh, sortByPrice, withinRange } from "../../lib/propertyFilters.js";
import { CATEGORY_TABS } from "./CategoryTabs.jsx";

// Every badge (New Launch, Premium, Ready to Move, etc) now uses the same
// flat dark-green pill with white text, no icon — matches the simplified tag design.
const BADGE_STYLE = "bg-[#1a6b32] text-white";

function toCardProps(row) {
  const tagsText = (row.tags || []).map((t) => (typeof t === "string" ? t : t.label)).join(" ");
  return {
    key: row.slug,
    name: row.name,
    image: row.main_image,
    badge: row.badge,
    location: row.location,
    beds: row.details?.beds,
    floorPlanTypes: (row.details?.floorPlans || []).map((fp) => fp.type).filter(Boolean),
    possession: row.possession,
    area: row.area_display,
    price: row.price_display,
    priceNote: null,
    propertyType: row.details?.propertyType || null,
    typeText: `${row.name || ""} ${tagsText} ${row.details?.configurations || ""} ${row.details?.beds || ""}`.toLowerCase(),
  };
}

function matchesBhk(property, selectedBhks) {
  if (!selectedBhks.length) return true;
  const beds = (property.beds || "").toLowerCase();
  return selectedBhks.some(
    (bhk) => beds.includes(bhk.toLowerCase()) || property.floorPlanTypes.some((t) => t.toLowerCase() === bhk.toLowerCase())
  );
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
        <h4 className="font-extrabold text-xl text-gray-900 mb-1.5">{property.name}</h4>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={13} className="text-[#1a6b32]" />
          </span>
          {property.location}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2">
            <BedDouble size={15} /> {property.beds || "—"}
          </span>
          <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2">
            <Ruler size={15} /> {property.area || "—"}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center gap-3">
          <div className="min-w-0">
            <span className="text-[#1a6b32] font-extrabold text-sm">{property.price}</span>
            {property.priceNote && <span className="text-gray-400 text-xs font-medium"> {property.priceNote}</span>}
          </div>
          <Link
            to="/properties/residential/$slug"
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

// Horizontal card used when the "List view" toggle is active — same data,
// laid out as a row (image left, details right) instead of a stacked tile.
function PropertyListRow({ property }) {
  return (
    <div className="property-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
      <div className="relative sm:w-64 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm ${BADGE_STYLE}`}
          >
            {property.badge}
          </span>
        )}
      </div>

      <div className="flex-1 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-extrabold text-xl text-gray-900 mb-1.5">{property.name}</h4>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <MapPin size={13} className="text-[#1a6b32]" />
            </span>
            {property.location}
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2">
              <BedDouble size={15} /> {property.beds || "—"}
            </span>
            <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2">
              <Ruler size={15} /> {property.area || "—"}
            </span>
          </div>
        </div>

        <div className="flex sm:flex-col sm:items-end justify-between sm:justify-center gap-2 sm:border-l sm:border-gray-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <div className="min-w-0">
            <span className="text-[#1a6b32] font-extrabold text-sm block">{property.price}</span>
            {property.priceNote && <span className="text-gray-400 text-xs font-medium">{property.priceNote}</span>}
          </div>
          <Link
            to="/properties/residential/$slug"
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

export default function PropertyGrid() {
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [rawProperties, setRawProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const activeCategory = search.type || "all";
  const bhk = parseListParam(search.bhk);
  const possession = parseListParam(search.possession);
  const minPrice = search.minPrice ? parseFloat(search.minPrice) : null;
  const maxPrice = search.maxPrice ? parseFloat(search.maxPrice) : null;

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ category: "residential", ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => {
        if (active) setRawProperties(rows.map(toCardProps));
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  const properties = useMemo(() => {
    const filtered = rawProperties.filter((property) => {
      if (!matchesCategory(property, activeCategory, CATEGORY_TABS)) return false;
      if (!matchesBhk(property, bhk)) return false;
      if (!matchesAnySelected(property.possession, possession)) return false;
      if (!withinRange(priceToLakh(property.price), minPrice, maxPrice)) return false;
      return true;
    });
    return sortByPrice(filtered, sortBy, (p) => priceToLakh(p.price));
  }, [rawProperties, activeCategory, bhk, possession, minPrice, maxPrice, sortBy]);

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-sm font-semibold text-gray-600">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} ${
                activeCategory !== "all"
                  ? CATEGORY_TABS.find((t) => t.key === activeCategory)?.label || "Residential"
                  : "Residential"
              } Properties${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            className="border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] py-1.5 pl-3 pr-8"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
          <div className="flex border border-gray-200 rounded overflow-hidden">
            <button
              className={`p-2 ${gridView ? "bg-[#1a6b32] text-white" : "bg-white text-gray-400"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <i className="fa-solid fa-grip" />
            </button>
            <button
              className={`p-2 border-l border-gray-200 ${
                !gridView ? "bg-[#1a6b32] text-white" : "bg-white text-gray-400"
              }`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <i className="fa-solid fa-list" />
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
          No residential properties found{sector ? ` in ${sector}` : city ? ` in ${city}` : ""}.
        </div>
      )}

      {/* Grid / List */}
      <div className={gridView ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {properties.map((property) =>
          gridView ? (
            <PropertyCard key={property.key} property={property} />
          ) : (
            <PropertyListRow key={property.key} property={property} />
          )
        )}
      </div>
    </div>
  );
}