import { useNavigate, useSearch } from "@tanstack/react-router";
import { cleanSearch } from "../../lib/locationFilter.js";

// `keywords` are the words we look for in a property's name/tags/config
// text to decide whether it belongs to this category (see matchesCategory
// in PropertyGrid.jsx). Keep them lowercase.
export const CATEGORY_TABS = [
  { key: "all", label: "All Residential", icon: "fa-solid fa-house-chimney", keywords: [] },
  { key: "apartments", label: "Apartments", icon: "fa-solid fa-building", keywords: ["apartment", "flat"] },
  { key: "villas", label: "Villas", icon: "fa-solid fa-tree-city", keywords: ["villa"] },
  { key: "plots", label: "Plots", icon: "fa-solid fa-map-location-dot", keywords: ["plot"] },
  {
    key: "independent-houses",
    label: "Independent Houses",
    icon: "fa-solid fa-house-user",
    keywords: ["independent house", "independent floor"],
  },
  { key: "row-houses", label: "Row Houses", icon: "fa-solid fa-grip-lines", keywords: ["row house"] },
  { key: "duplex", label: "Duplex Houses", icon: "fa-solid fa-hotel", keywords: ["duplex"] },
  { key: "penthouse", label: "Penthouse", icon: "fa-solid fa-city", keywords: ["penthouse"] },
];

export default function CategoryTabs() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const active = search.type || "all";

  function selectTab(key) {
    navigate({
      to: "/properties/residential",
      search: cleanSearch({ ...search, type: key === "all" ? undefined : key }),
      replace: true,
    });
  }

  return (
    <div className="bg-white border-b sticky top-14 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => selectTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md whitespace-nowrap border transition-colors ${
                  isActive
                    ? "border-[#1a6b32] bg-[#eaf4ef] text-[#1a6b32]"
                    : "border-gray-200 hover:border-[#1a6b32] text-gray-600"
                }`}
              >
                <i className={`${tab.icon} text-sm`} />
                <span className={isActive ? "font-medium" : ""}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}