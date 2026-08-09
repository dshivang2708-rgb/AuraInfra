import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, Square } from "lucide-react";
import { api } from "../../lib/api.js";
import { toFeaturedCard } from "../../lib/adapters.js";
import { CATEGORY_DETAIL_ROUTES } from "../../lib/categoryRoutes.js";
import { parseListParam } from "../../lib/propertyFilters.js";

const CATEGORY_BADGE_STYLES = {
  residential: "bg-[#1a6b32]",
  commercial: "bg-[#4285f4]",
  agriculture: "bg-[#558b2f]",
};

const CATEGORY_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  agriculture: "Agriculture",
};

function PropertyCard({ property }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <span
          className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
            CATEGORY_BADGE_STYLES[property.category] || "bg-[#1a6b32]"
          }`}
        >
          {CATEGORY_LABELS[property.category] || property.category}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#071837] text-[10px] font-bold px-2 py-1 rounded">
          Upcoming
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{property.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={12} /> {property.location}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Square size={14} /> {property.area || "—"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-[#1a6b32] font-bold text-lg">{property.price}</span>
          <Link
            to={CATEGORY_DETAIL_ROUTES[property.category] || "/properties/residential/$slug"}
            params={{ slug: property.slug }}
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
  const [rawProperties, setRawProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const categories = parseListParam(search.category);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ upcoming: true, ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => active && setRawProperties(rows.map(toFeaturedCard)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  // Category is filtered client-side — no need to re-fetch, city/sector
  // already narrowed things down server-side, and a single request covering
  // all three categories at once keeps this fast.
  const properties = useMemo(() => {
    if (categories.length === 0) return rawProperties;
    return rawProperties.filter((p) => categories.includes(p.category));
  }, [rawProperties, categories]);

  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-bold">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} Upcoming Projects${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          Couldn't load projects: {error}
        </div>
      )}

      {!loading && !error && properties.length === 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-500">
          No upcoming projects found{sector ? ` in ${sector}` : city ? ` in ${city}` : ""} right now — check back
          soon.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>
    </div>
  );
}