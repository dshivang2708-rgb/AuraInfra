import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { api } from "../lib/api.js";
import { toFeaturedCard } from "../lib/adapters.js";
import { CATEGORY_DETAIL_ROUTES } from "../lib/categoryRoutes.js";

const VerifiedIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.99 15l-3.51-3.51 1.41-1.41 2.1 2.1 5.61-5.61 1.41 1.41L10.01 16z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const SquareFootIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M4 4h16v16H4V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M4 15h4v5M4 4v4h5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const PersonIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

function PropertyCard({ property }) {
  return (
    <Link
      to={CATEGORY_DETAIL_ROUTES[property.category] || "/properties/residential/$slug"}
      params={{ slug: property.slug }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#c5c6cf]/30 flex flex-col h-full max-w-[275px] mx-auto w-full"
    >
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          role="img"
          aria-label={property.name}
          style={{ backgroundImage: `url('${property.image}')` }}
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#1a6b32] text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
          <VerifiedIcon /> Verified
        </div>
        <button
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#071837] hover:text-[#ba1a1a] transition-colors"
          aria-label="Save property"
          onClick={(e) => e.preventDefault()}
        >
          <HeartIcon />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <h3 className="text-sm font-bold text-[#071837] mb-0.5">{property.price}</h3>
        <p className="text-xs text-[#2b2c30] mb-1.5">{property.type}</p>
        <div className="flex items-center gap-1 text-[#2b2c30]/80 mb-auto">
          <LocationIcon />
          <span className="text-[11px]">{property.location}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#c5c6cf]/30 flex justify-between items-center text-[#2b2c30]/80">
          <div className="flex items-center gap-1.5">
            <SquareFootIcon />
            <span className="text-[11px]">{property.area}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PersonIcon />
            <span className="text-[11px] uppercase">Owner</span>
          </div>
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