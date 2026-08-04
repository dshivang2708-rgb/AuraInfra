import { useState } from "react";

const TABS = [
  { key: "all", label: "All Residential", icon: "fa-solid fa-house-chimney" },
  { key: "apartments", label: "Apartments", icon: "fa-solid fa-building" },
  { key: "villas", label: "Villas", icon: "fa-solid fa-tree-city" },
  { key: "plots", label: "Plots", icon: "fa-solid fa-map-location-dot" },
  { key: "independent-houses", label: "Independent Houses", icon: "fa-solid fa-house-user" },
  { key: "row-houses", label: "Row Houses", icon: "fa-solid fa-grip-lines" },
  { key: "duplex", label: "Duplex Houses", icon: "fa-solid fa-hotel" },
  { key: "penthouse", label: "Penthouse", icon: "fa-solid fa-city" },
];

export default function CategoryTabs() {
  const [active, setActive] = useState("all");

  return (
    <div className="bg-white border-b sticky top-14 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
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