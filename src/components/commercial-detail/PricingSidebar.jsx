import EnquiryForm from "../EnquiryForm.jsx";

const PRICE_CHECKLIST = [
  { label: "RERA Approved", icon: "fa-solid fa-shield-halved" },
  { label: "Grade A Construction", icon: "fa-solid fa-building" },
  { label: "Prime Business Location", icon: "fa-solid fa-location-dot" },
  { label: "High Rental Yield", icon: "fa-solid fa-arrow-trend-up" },
];

export default function PricingSidebar({ property }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#E6F4EC] rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.priceRange}</h2>
        <p className="text-sm text-gray-500 mb-6">{property.priceNote || "Total Price"}</p>
        <ul className="space-y-3">
          {PRICE_CHECKLIST.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
              <i className={`${item.icon} text-[#006D32] bg-white p-1 rounded-full text-[10px] w-5 h-5 flex items-center justify-center`} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Enquire About This Property</h3>
        <EnquiryForm
          projectName={property.name}
          projectSlug={property.key}
          category="commercial"
          interestOptions={property.floorPlans.map((plan) => plan.type)}
          inputClassName="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-[#006D32] focus:border-[#006D32]"
          selectClassName="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:ring-[#006D32] focus:border-[#006D32]"
          textareaClassName="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-[#006D32] focus:border-[#006D32]"
          buttonClassName="w-full bg-[#006D32] hover:bg-[#005a29] text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-70"
          footNoteClassName="text-xs text-center text-gray-500 mt-2"
        />
      </div>
    </div>
  );
}