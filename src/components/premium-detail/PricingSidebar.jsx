import EnquiryForm from "../EnquiryForm.jsx";

const PRICE_CHECKLIST = [
  { label: "RERA Approved", icon: "verified" },
  { label: "Premium Quality Construction", icon: "apartment" },
  { label: "Prime Location", icon: "location_on" },
  { label: "High Appreciation Potential", icon: "trending_up" },
];

export default function PricingSidebar({ property }) {
  const checklist = property.highlights?.length ? property.highlights : PRICE_CHECKLIST;
  return (
    <aside className="space-y-6">
      <div className="bg-[#eaf4ef] rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.priceRange || property.price}</h2>
        <p className="text-sm text-gray-500 mb-6">{property.priceNote || "Starting Price"}</p>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="material-symbols-outlined text-[#1a6b32] bg-white p-1 rounded-full text-[16px] w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enquire About This Project</h3>
        <EnquiryForm
          projectName={property.name}
          projectSlug={property.key}
          category="premium"
          interestOptions={(property.floorPlans || []).map((plan) => plan.type)}
          inputClassName="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          selectClassName="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          textareaClassName="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          buttonClassName="w-full bg-[#1a6b32] hover:bg-[#145126] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-70"
          footNoteClassName="text-xs text-center text-gray-500 mt-2"
        />
      </div>
    </aside>
  );
}