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

function EmptyTabState({ message }) {
  return <p className="text-sm text-[#45464e] py-10 text-center">{message}</p>;
}

function OverviewTab({ property }) {
  return (
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
          <div className="text-[#151c27] font-semibold">{property.soilType || "—"}</div>
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
        {property.areaOptions.length === 0 ? (
          <p className="text-xs text-[#75777f]">No area options listed yet.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}

function LandDetailsTab({ property }) {
  const baseline = [
    { label: "Property Type", value: property.badge },
    { label: "Total Area", value: property.area },
    { label: "Soil Type", value: property.soilType },
    { label: "Possession", value: property.possession },
  ].filter((row) => row.value);

  const rows = [...baseline, ...property.landDetails];

  if (rows.length === 0) {
    return <EmptyTabState message="No land details added yet." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
      {rows.map((row, i) => (
        <div key={`${row.label}-${i}`} className="flex justify-between border-b border-[#c5c6cf]/40 py-2 text-sm">
          <span className="text-[#45464e]">{row.label}</span>
          <span className="text-[#151c27] font-semibold text-right">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function LocationTab({ property }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#dce2f3] rounded-xl aspect-video flex items-center justify-center">
        <span className="material-symbols-outlined text-[#1a6b32] text-5xl">location_on</span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#071837] mb-1">Full Address</h3>
          <p className="text-sm text-[#45464e]">{property.location}</p>
        </div>
        {property.nearby.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-[#071837] mb-2">What's Nearby</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.nearby.map((item) => (
                <div key={item.place} className="flex items-center gap-2 text-xs text-[#45464e]">
                  <span className="material-symbols-outlined text-[#1a6b32] text-base">{item.icon}</span>
                  {item.time} <span className="text-[#151c27] font-medium truncate">{item.place}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryTab({ property }) {
  if (property.gallery.length === 0) {
    return <EmptyTabState message="No gallery images uploaded yet." />;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {property.gallery.map((url, i) => (
        <img
          key={url}
          src={url}
          alt={`${property.name} gallery ${i + 1}`}
          className="w-full h-32 object-cover rounded-lg border border-[#c5c6cf]/40"
        />
      ))}
    </div>
  );
}

function SoilWaterTab({ property }) {
  const facts = [
    { icon: "compost", label: "Soil Type", value: property.soilType },
    { icon: "water_drop", label: "Water Source", value: property.waterSource },
    { icon: "water", label: "Irrigation Type", value: property.irrigationType },
  ].filter((f) => f.value);

  if (facts.length === 0 && !property.soilWaterNotes) {
    return <EmptyTabState message="No soil & water details added yet." />;
  }

  return (
    <div>
      {facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {facts.map((f) => (
            <div key={f.label} className="bg-[#f0f3ff] rounded-lg p-4 border border-[#c5c6cf]/30">
              <span className="material-symbols-outlined text-[#1a6b32] text-2xl mb-1 block">{f.icon}</span>
              <p className="text-[11px] text-[#45464e]">{f.label}</p>
              <p className="text-sm font-bold text-[#151c27]">{f.value}</p>
            </div>
          ))}
        </div>
      )}
      {property.soilWaterNotes && (
        <p className="text-[13px] leading-relaxed text-[#45464e]">{property.soilWaterNotes}</p>
      )}
    </div>
  );
}

function NearbyTab({ property }) {
  if (property.nearby.length === 0) {
    return <EmptyTabState message="No nearby places added yet." />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {property.nearby.map((item) => (
        <div
          key={item.place}
          className="flex items-center gap-3 bg-[#f0f3ff] rounded-lg p-3 border border-[#c5c6cf]/30"
        >
          <span className="material-symbols-outlined text-[#1a6b32] text-2xl">{item.icon}</span>
          <div>
            <p className="text-sm font-semibold text-[#151c27]">{item.place}</p>
            <p className="text-xs text-[#45464e]">{item.time} away</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentsTab({ property }) {
  const hasDocs = property.brochureUrl || property.documents.length > 0;
  if (!hasDocs) {
    return <EmptyTabState message="No documents uploaded yet." />;
  }
  return (
    <div className="flex flex-col gap-3">
      {property.brochureUrl && (
        <a
          href={property.brochureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#f0f3ff] rounded-lg p-3 border border-[#c5c6cf]/30 hover:border-[#1a6b32] transition-colors"
        >
          <span className="material-symbols-outlined text-[#1a6b32] text-2xl">picture_as_pdf</span>
          <span className="text-sm font-semibold text-[#151c27]">Project Brochure</span>
          <span className="material-symbols-outlined text-[#1a6b32] text-lg ml-auto">download</span>
        </a>
      )}
      {property.documents.map((doc) => (
        <a
          key={doc.url}
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#f0f3ff] rounded-lg p-3 border border-[#c5c6cf]/30 hover:border-[#1a6b32] transition-colors"
        >
          <span className="material-symbols-outlined text-[#1a6b32] text-2xl">description</span>
          <span className="text-sm font-semibold text-[#151c27]">{doc.label}</span>
          <span className="material-symbols-outlined text-[#1a6b32] text-lg ml-auto">download</span>
        </a>
      ))}
    </div>
  );
}

function FaqsTab({ property }) {
  if (property.faqs.length === 0) {
    return <EmptyTabState message="No FAQs added yet." />;
  }
  return (
    <div className="flex flex-col gap-4">
      {property.faqs.map((faq) => (
        <div key={faq.question} className="border-b border-[#c5c6cf]/40 pb-4">
          <p className="text-sm font-bold text-[#151c27] mb-1">{faq.question}</p>
          <p className="text-[13px] text-[#45464e] leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

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
        {activeTab === "Overview" && <OverviewTab property={property} />}
        {activeTab === "Land Details" && <LandDetailsTab property={property} />}
        {activeTab === "Location" && <LocationTab property={property} />}
        {activeTab === "Gallery" && <GalleryTab property={property} />}
        {activeTab === "Soil & Water" && <SoilWaterTab property={property} />}
        {activeTab === "Nearby" && <NearbyTab property={property} />}
        {activeTab === "Documents" && <DocumentsTab property={property} />}
        {activeTab === "FAQs" && <FaqsTab property={property} />}
      </div>
    </div>
  );
}