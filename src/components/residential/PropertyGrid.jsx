import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { RESIDENTIAL_PROPERTIES } from "../../data/residentialProperties.js";

const BADGE_STYLES = {
  Premium: "bg-[#1a6b32]",
  "New Launch": "bg-blue-600",
  "Ready to Move": "bg-yellow-500",
};

const PAGE_NUMBERS = [1, 2, 3, 4, "…", 18];

function PropertyCard({ property }) {
  return (
    <div className="property-card bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <span
          className={`absolute top-3 left-3 text-white text-[10px] px-2 py-1 rounded font-bold uppercase ${
            BADGE_STYLES[property.badge]
          }`}
        >
          {property.badge}
        </span>
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
            <i className="fa-solid fa-bed" /> {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-chart-area" /> {property.area}
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
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-sm font-semibold text-gray-600">Showing 1 – 12 of 215 Properties</h3>
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {RESIDENTIAL_PROPERTIES.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-2">
        <button
          className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:border-[#1a6b32] hover:text-[#1a6b32]"
          aria-label="Previous page"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>
        {PAGE_NUMBERS.map((num, i) =>
          num === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={num}
              onClick={() => setActivePage(num)}
              className={`w-10 h-10 rounded-md flex items-center justify-center font-bold ${
                activePage === num
                  ? "bg-[#1a6b32] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-[#1a6b32] hover:text-[#1a6b32] font-normal"
              }`}
            >
              {num}
            </button>
          )
        )}
        <button
          className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:border-[#1a6b32] hover:text-[#1a6b32]"
          aria-label="Next page"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>
    </div>
  );
}