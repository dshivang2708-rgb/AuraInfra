import { COMMERCIAL_AMENITIES } from "../../data/commercialProperties.js";

export default function Amenities() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Amenities</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 text-center">
        {COMMERCIAL_AMENITIES.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-[#006D32] text-xl">
              <i className={item.icon} />
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}