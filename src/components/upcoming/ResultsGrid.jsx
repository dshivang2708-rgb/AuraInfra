import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, Ruler, ArrowRight } from "lucide-react";
import { api } from "../../lib/api.js";
import { toFeaturedCard } from "../../lib/adapters.js";
import { CATEGORY_DETAIL_ROUTES } from "../../lib/categoryRoutes.js";
import { parseListParam } from "../../lib/propertyFilters.js";

const CATEGORY_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  agriculture: "Agriculture",
};

function PropertyCard({ property }) {
  return (
    <div className="property-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm bg-[#1a6b32] text-white">
          {CATEGORY_LABELS[property.category] || property.category}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#071837] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
          Upcoming
        </span>
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
            <Ruler size={15} /> {property.area || "—"}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center gap-3">
          <span className="text-[#1a6b32] font-extrabold text-sm min-w-0 truncate">{property.price}</span>
          <Link
            to={CATEGORY_DETAIL_ROUTES[property.category] || "/properties/residential/$slug"}
            params={{ slug: property.slug }}
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