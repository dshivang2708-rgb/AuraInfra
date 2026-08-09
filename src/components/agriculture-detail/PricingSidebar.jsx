import EnquiryForm from "../EnquiryForm.jsx";

const PRICE_CHECKLIST = [
  { label: "RERA Approved", icon: "verified" },
  { label: "Clear Title & Legal Verified", icon: "gavel" },
  { label: "Fertile & Cultivable Land", icon: "grass" },
  { label: "Good Water Availability", icon: "water_drop" },
  { label: "High Appreciation Potential", icon: "trending_up" },
];

export default function PricingSidebar({ property }) {
  return (
    <aside className="w-full lg:w-1/4 xl:w-[280px] mx-auto">
      <div className="lg:sticky lg:top-28 flex flex-col gap-6">
        {/* Pricing Card */}
        <div className="bg-[#f0f3ff] rounded-2xl p-6 flex flex-col gap-6 border border-[#c5c6cf]/50 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-[#1a6b32] mb-1">{property.priceRange}</h2>
            <p className="text-[11px] text-[#45464e]">Price Range</p>
          </div>
          <ul className="flex flex-col gap-3 text-sm text-[#151c27]">
            {PRICE_CHECKLIST.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1a6b32] bg-[#1a6b32]/20 rounded-full p-1 text-[16px]">
                  {item.icon}
                </span>
                <span className="font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Enquiry Form */}
        <div className="bg-[#f0f3ff] rounded-2xl p-6 border border-[#c5c6cf]/50 shadow-sm">
          <h3 className="text-base font-bold text-[#071837] mb-4">Enquire About This Land</h3>
          <EnquiryForm
            projectName={property.name}
            projectSlug={property.key}
            category="agriculture"
            interestOptions={property.areaOptions.map((opt) => opt.size)}
            inputClassName="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            selectClassName="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm text-[#45464e] focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            textareaClassName="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] resize-none"
            buttonClassName="w-full bg-[#1a6b32] hover:bg-[#1a6b32]/90 text-white text-sm font-bold py-3 rounded-lg transition-colors mt-2 shadow-sm disabled:opacity-70"
            footNote="Our team will get in touch with you shortly."
            footNoteClassName="text-center text-[10px] text-[#45464e] mt-4 opacity-70 italic"
          />
        </div>
      </div>
    </aside>
  );
}