import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Ruler, ArrowRight } from "lucide-react";
import { api } from "../lib/api.js";
import { toFeaturedCard } from "../lib/adapters.js";
import { CATEGORY_DETAIL_ROUTES } from "../lib/categoryRoutes.js";

function PropertyCard({ property }) {
  return (
    <Link
      to={CATEGORY_DETAIL_ROUTES[property.category] || "/properties/residential/$slug"}
      params={{ slug: property.slug }}
      className="property-card group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          role="img"
          aria-label={property.name}
          style={{ backgroundImage: `url('${property.image}')` }}
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm bg-[#1a6b32] text-white">
          Verified
        </span>
      </div>

      <div className="px-4 pt-3 pb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <h4 className="font-extrabold text-lg text-gray-900 mb-1.5 truncate">{property.name}</h4>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={13} className="text-[#1a6b32]" />
          </span>
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {property.type && (
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2 truncate">
              {property.type}
            </span>
          )}
          {property.area && (
            <span className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2 whitespace-nowrap">
              <Ruler size={15} /> {property.area}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center gap-3">
          <span className="text-[#1a6b32] font-extrabold text-sm min-w-0 truncate">{property.price}</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 bg-[#1a6b32] group-hover:bg-[#145528] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .listProjects({ featured: true })
      .then((rows) => active && setProperties(rows.map(toFeaturedCard)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Nothing to feature yet (or the fetch failed) — skip the section
  // entirely rather than showing an empty/broken block on the homepage.
  if (!loading && (error || properties.length === 0)) return null;

  return (
    <section className="py-10 bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#151c27]">Featured Properties</h2>
            <div className="h-1 w-12 bg-[#4d8efe] mt-2 rounded-full" />
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-[#75777f]">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard key={property.key} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}