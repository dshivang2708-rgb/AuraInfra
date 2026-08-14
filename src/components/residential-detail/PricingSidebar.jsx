import EnquiryForm from "../EnquiryForm.jsx";

const PRICE_CHECKLIST = [
  { label: "RERA Approved", icon: "fa-solid fa-shield-halved" },
  { label: "Premium Quality Construction", icon: "fa-solid fa-building" },
  { label: "Excellent Location", icon: "fa-solid fa-location-dot" },
  { label: "High Appreciation Potential", icon: "fa-solid fa-arrow-trend-up" },
];

export default function PricingSidebar({ property }) {
  const checklist = property.highlights?.length ? property.highlights : PRICE_CHECKLIST;
  return (
    <div className="space-y-6">
      {/* Pricing Sidebar */}
      <div className="bg-[#e8f3ec] rounded-xl p-6 shadow-sm border border-green-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.priceRange}</h2>
        <p className="text-sm text-gray-500 mb-6">Price Range</p>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
              <i className={`${item.icon} text-[#1a6b32] bg-green-200 p-1 rounded-full text-[10px] w-5 h-5 flex items-center justify-center`} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Form Sidebar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enquire About This Project</h3>
        <EnquiryForm
          projectName={property.name}
          projectSlug={property.key}
          category="residential"
          interestOptions={property.floorPlans.map((plan) => plan.type)}
          inputClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          selectClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-500 focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          textareaClassName="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          buttonClassName="w-full bg-[#1a6b32] text-white py-3 rounded-md font-medium hover:bg-green-700 transition disabled:opacity-70"
          footNoteClassName="text-xs text-center text-gray-500 mt-2"
        />
      </div>
    </div>
  );
}