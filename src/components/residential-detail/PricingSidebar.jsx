import EnquiryForm from "../EnquiryForm.jsx";

const PRICE_CHECKLIST = [
  "RERA Approved",
  "Premium Quality Construction",
  "Excellent Location",
  "High Appreciation Potential",
];

export default function PricingSidebar({ property }) {
  return (
    <div className="space-y-6">
      {/* Pricing Sidebar */}
      <div className="bg-[#e8f3ec] rounded-xl p-6 shadow-sm border border-green-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.priceRange}</h2>
        <p className="text-sm text-gray-500 mb-6">Price Range</p>
        <ul className="space-y-3 mb-8">
          {PRICE_CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <i className="fa-solid fa-check text-[#1a6b32] bg-green-200 p-1 rounded-full text-[10px]" /> {item}
            </li>
          ))}
        </ul>
        <button className="w-full bg-[#1a6b32] text-white py-3 rounded-md font-medium hover:bg-green-700 transition mb-4 flex justify-center items-center gap-2">
          Enquire Now <i className="fa-solid fa-arrow-right" />
        </button>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Or Call Us</p>
          
            className="text-lg font-bold text-[#1a6b32] flex items-center justify-center gap-2"
            href="tel:+919876543210"
          <a>
            <i className="fa-solid fa-phone" /> +91 98765 43210
          </a>
        </div>
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