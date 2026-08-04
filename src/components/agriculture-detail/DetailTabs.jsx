import { useState } from "react";

const TABS = ["Overview", "Land Details", "Location", "Gallery", "Soil & Water", "Nearby", "Documents", "FAQs"];

const HIGHLIGHTS = [
  { icon: "compost", label: "Fertile" },
  { icon: "water_drop", label: "Irrigation" },
  { icon: "add_road", label: "Roads" },
  { icon: "bolt", label: "Power" },
  { icon: "storefront", label: "Market" },
  { icon: "description", label: "Clear Title" },
];

export default function DetailTabs({ property }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="border border-[#c5c6cf] rounded-2xl bg-white mb-8 overflow-hidden">
      <div className="flex overflow-x-auto border-b border-[#c5c6cf]" style={{ scrollbarWidth: "none" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "text-[#1a6b32] border-b-2 border-[#1a6b32]"
                : "text-[#45464e] hover:text-[#151c27] hover:bg-[#dce2f3]/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About */}
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#071837] mb-3">About This Land</h3>
              <p className="text-[13px] leading-relaxed text-[#45464e] mb-4">{property.description}</p>
              <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2 text-xs text-[#45464e]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">landscape</span> Type
                </div>
                <div>:</div>
                <div className="text-[#151c27] font-semibold">{property.badge}</div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">straighten</span> Area
                </div>
                <div>:</div>
                <div className="text-[#151c27] font-semibold">{property.area}</div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">compost</span> Soil
                </div>
                <div>:</div>
                <div className="text-[#151c27] font-semibold">{property.soilType}</div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">key</span> Poss.
                </div>
                <div>:</div>
                <div className="text-[#151c27] font-semibold">{property.possession}</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#071837] mb-3">Highlights</h3>
              <div className="grid grid-cols-3 gap-2">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="bg-[#f0f3ff] p-2 rounded-lg text-center flex flex-col items-center justify-center border border-[#c5c6cf]/30"
                  >
                    <span className="material-symbols-outlined text-[#1a6b32] text-xl">{h.icon}</span>
                    <span className="text-[10px] text-[#45464e] mt-1">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Options */}
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#071837] mb-3">Area Options</h3>
              <div className="flex flex-col gap-2">
                {property.areaOptions.map((opt, i) => (
                  <div
                    key={opt.size}
                    className={`flex items-center gap-3 p-2 rounded-lg bg-white transition-shadow ${
                      i === property.areaOptions.length - 1
                        ? "border-2 border-[#1a6b32] shadow-sm"
                        : "border border-[#c5c6cf] hover:shadow-sm"
                    }`}
                  >
                    <img className="w-12 h-12 rounded object-cover" src={property.image} alt={opt.size} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#151c27] truncate">{opt.size}</p>
                      <p className="text-[11px] text-[#1a6b32] font-semibold">{opt.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#45464e] py-6 text-center">
            {activeTab} details coming soon — reach out to us for the full breakdown.
          </p>
        )}
      </div>
    </div>
  );
}