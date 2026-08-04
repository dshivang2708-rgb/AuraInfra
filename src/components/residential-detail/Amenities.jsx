import { AMENITIES } from "../../data/residentialProperties.js";

export default function Amenities() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 border-l-4 border-[#1a6b32] pl-3">Amenities</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 text-center">
        {AMENITIES.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#e8f3ec] flex items-center justify-center text-[#1a6b32] text-xl">
              <i className={item.icon} />
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}