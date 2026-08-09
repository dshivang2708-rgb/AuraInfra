import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { api } from "../../lib/api.js";
import { matchesAnySelected, parseListParam, priceToLakh, withinRange } from "../../lib/propertyFilters.js";

const BADGE_STYLES = {
  Premium: "bg-[#1a6b32]",
  "New Launch": "bg-blue-600",
  "Ready to Move": "bg-yellow-500",
};

function toCardProps(row) {
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
  };
}

// A property matches a selected BHK if either its "beds" summary text
// mentions it (e.g. "2, 3 & 4 BHK") or one of its individual floor plans is
// that exact configuration.
function matchesBhk(property, selectedBhks) {
  if (!selectedBhks.length) return true;
  const beds = (property.beds || "").toLowerCase();
  return selectedBhks.some(
    (bhk) => beds.includes(bhk.toLowerCase()) || property.floorPlanTypes.some((t) => t.toLowerCase() === bhk.toLowerCase())
  );
}

function PropertyCard({ property }) {
  return (
    <div className="property-card bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] px-2 py-1 rounded font-bold uppercase ${
              BADGE_STYLES[property.badge] || "bg-[#1a6b32]"
            }`}
          >
            {property.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:text-red-500"
          aria-label="Save property"
        >
          <i className="fa-regular fa-heart" />
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-[#1a1a1a]">{property.name}</h4>
        <div className="flex items-center text-gray-500 text-xs mt-1 mb-3">
          <i className="fa-solid fa-location-dot mr-1" /> {property.location}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-bed" /> {property.beds || "—"}
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-chart-area" /> {property.area || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-[#1a6b32] font-bold">
            {property.price}{" "}
            {property.priceNote && <span className="text-[10px] font-normal">{property.priceNote}</span>}
          </div>
          <Link
            to="/properties/residential/$slug"
            params={{ slug: property.key }}
            className="text-[#1a6b32] text-xs font-bold border-b border-[#1a6b32]"
          >
            View Details <i className="fa-solid fa-arrow-right-long ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PropertyGrid() {
  const [gridView, setGridView] = useState(true);
  const [rawProperties, setRawProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
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

  // BHK, Possession Status and Price Range are filtered client-side (no
  // need to re-fetch — city/sector already narrowed things down server-side).
  const properties = useMemo(() => {
    return rawProperties.filter((property) => {
      if (!matchesBhk(property, bhk)) return false;
      if (!matchesAnySelected(property.possession, possession)) return false;
      if (!withinRange(priceToLakh(property.price), minPrice, maxPrice)) return false;
      return true;
    });
  }, [rawProperties, bhk, possession, minPrice, maxPrice]);

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-sm font-semibold text-gray-600">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} Residential Properties${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] py-1.5 pl-3 pr-8">
            <option>Newest First</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>
    </div>
  );
}