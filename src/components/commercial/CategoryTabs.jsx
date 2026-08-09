import { useNavigate, useSearch } from "@tanstack/react-router";
import { cleanSearch } from "../../lib/locationFilter.js";

// `keywords` are the words we look for in a property's name/tags/config
// text to decide whether it belongs to this category (see matchesCategory
// in propertyFilters.js) — a fallback for rows saved before propertyType
// existed. Keep them lowercase.
export const CATEGORY_TABS = [
  { key: "all", label: "All Commercial", icon: "fa-solid fa-building-columns", keywords: [] },
  { key: "office-space", label: "Office Space", icon: "fa-solid fa-briefcase", keywords: ["office"] },
  { key: "retail-shop", label: "Retail Shop", icon: "fa-solid fa-store", keywords: ["retail", "shop"] },
  { key: "showroom", label: "Showroom", icon: "fa-solid fa-shop", keywords: ["showroom"] },
  {
    key: "warehouse",
    label: "Warehouse",
    icon: "fa-solid fa-warehouse",
    keywords: ["warehouse", "industrial"],
  },
  {
    key: "co-working-space",
    label: "Co-working Space",
    icon: "fa-solid fa-people-group",
    keywords: ["co-working", "coworking", "co working"],
  },
  { key: "mixed-use", label: "Mixed Use", icon: "fa-solid fa-layer-group", keywords: ["mixed use"] },
];

export default function CategoryTabs() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const active = search.type || "all";

  function selectTab(key) {
    navigate({
      to: "/properties/commercial",
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