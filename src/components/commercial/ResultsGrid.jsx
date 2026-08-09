import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, Square, Heart, LayoutGrid, List } from "lucide-react";
import { api } from "../../lib/api.js";
import { toCommercialCard } from "../../lib/adapters.js";
import { firstNumber, matchesAnySelected, parseListParam } from "../../lib/propertyFilters.js";
import { CARPET_AREA_BUCKETS } from "../../lib/commercialFilters.js";

const BADGE_STYLES = {
  Premium: "bg-[#1a6b32]",
  Featured: "bg-blue-600",
  New: "bg-gray-800",
};

function PropertyCard({ property }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded ${
              BADGE_STYLES[property.badge] || "bg-[#1a6b32]"
            }`}
          >
            {property.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 bg-white/50 backdrop-blur text-white p-1.5 rounded-full hover:bg-white hover:text-red-500 transition-colors"
          aria-label="Save property"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-[10px] text-[#1a6b32] font-bold uppercase tracking-wider bg-[#eaf4ef] px-2 py-0.5 rounded">
          {property.type}
        </span>
        <h3 className="font-bold text-lg mt-2 mb-1">{property.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={12} /> {property.location}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Square size={14} /> {property.area}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-[#1a6b32] font-bold text-lg">{property.priceRange}</span>
          </div>
          <Link
            to="/properties/commercial/$slug"
            params={{ slug: property.key }}
            className="text-[#1a6b32] border border-[#1a6b32] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1a6b32] hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ResultsGrid() {
  const [gridView, setGridView] = useState(true);
  const [rawProperties, setRawProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const types = parseListParam(search.types);
  const areas = parseListParam(search.area);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ category: "commercial", ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => active && setRawProperties(rows.map(toCommercialCard)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  // Property Type and Carpet Area are filtered client-side (no need to
  // re-fetch — city/sector already narrowed things down on the server).
  const properties = useMemo(() => {
    return rawProperties.filter((property) => {
      if (!matchesAnySelected(property.type, types)) return false;
      if (areas.length > 0) {
        const num = firstNumber(property.area);
        const inAnyBucket = areas.some((label) => {
          const bucket = CARPET_AREA_BUCKETS.find((b) => b.label === label);
          return bucket && num !== null && num >= bucket.min && num < bucket.max;
        });
        if (!inAnyBucket) return false;
      }
      return true;
    });
  }, [rawProperties, types, areas]);

  return (
    <div className="flex-1">
      {/* Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-bold">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} Properties${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort By:</span>
            <select className="border-gray-200 rounded-lg text-sm font-medium py-1.5 focus:ring-[#1a6b32]">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
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