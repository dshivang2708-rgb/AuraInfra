import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { api } from "../../lib/api.js";
import { firstNumber, matchesCategory, withinRange } from "../../lib/propertyFilters.js";
import { CATEGORY_TABS } from "./CategoryTabs.jsx";

function toCardProps(row) {
  const d = row.details || {};
  const tagsText = (row.tags || []).map((t) => (typeof t === "string" ? t : t.label)).join(" ");
  return {
    key: row.slug,
    name: row.name,
    badge: row.badge,
    location: row.location,
    area: row.area_display,
    price: row.price_display,
    priceNote: d.priceNote,
    image: row.main_image,
    // Canonical category key selected by the admin on the listing form
    // (e.g. "farmhouse-land") — the reliable way matchesCategory() decides
    // which CategoryTabs tab this property belongs to.
    propertyType: d.propertyType || null,
    // Lowercased blob of everything that might mention the property's
    // category — fallback for older rows saved before propertyType existed.
    typeText: `${row.name || ""} ${tagsText}`.toLowerCase(),
  };
}

function PropertyCard({ property }) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span className="absolute top-3 left-3 bg-[#1a6b32]/80 text-white text-[10px] px-2 py-1 rounded font-bold">
            {property.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 text-white hover:text-red-400" aria-label="Save property">
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{property.name}</h3>
        <p className="text-gray-500 text-xs flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {property.location}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
          <span className="material-symbols-outlined text-base text-[#1a6b32]">aspect_ratio</span>
          {property.area}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[#1a6b32] font-bold text-lg">{property.price}</p>
            <p className="text-[10px] text-gray-400">{property.priceNote}</p>
          </div>
          <Link
            to="/properties/agriculture/$slug"
            params={{ slug: property.key }}
            className="border border-[#1a6b32] text-[#1a6b32] hover:bg-[#1a6b32] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
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
  const activeCategory = search.type || "all";
  const minArea = search.minArea ? parseFloat(search.minArea) : null;
  const maxArea = search.maxArea ? parseFloat(search.maxArea) : null;

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ category: "agriculture", ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => active && setRawProperties(rows.map(toCardProps)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  // Property Type (via the tabs above) and Land Area are filtered
  // client-side (no need to re-fetch — city/sector already narrowed things
  // down on the server).
  const properties = useMemo(() => {
    return rawProperties.filter((property) => {
      if (!matchesCategory(property, activeCategory, CATEGORY_TABS)) return false;
      if (!withinRange(firstNumber(property.area), minArea, maxArea)) return false;
      return true;
    });
  }, [rawProperties, activeCategory, minArea, maxArea]);

  return (
    <section className="flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-lg font-bold">
          {loading
            ? "Loading..."
            : `Showing ${properties.length} ${
                activeCategory !== "all"
                  ? CATEGORY_TABS.find((t) => t.key === activeCategory)?.label || "Agriculture"
                  : "Agriculture"
              } Properties${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-bold whitespace-nowrap">Sort By:</span>
            <select className="text-xs border-gray-200 rounded-lg focus:ring-[#1a6b32] focus:border-[#1a6b32] py-1 pr-8">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${gridView ? "bg-[#1a6b32] text-white" : "bg-white text-gray-400"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <span className="material-symbols-outlined text-base block">grid_view</span>
            </button>
            <button
              className={`p-2 border-l ${!gridView ? "bg-[#1a6b32] text-white" : "bg-white text-gray-400"}`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <span className="material-symbols-outlined text-base block">view_list</span>
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
          No agriculture properties found{sector ? ` in ${sector}` : city ? ` in ${city}` : ""}.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>
    </section>
  );
}