export default function LocationAndInvest({ property }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Location mini */}
      <div className="bg-[#f0f3ff] p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-[#071837] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1a6b32] text-[20px]">location_on</span> Location
          </h3>
          <a className="text-sm font-semibold text-[#1a6b32] hover:underline flex items-center gap-1" href="#">
            View on Map <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 bg-[#dce2f3] rounded-lg overflow-hidden relative aspect-square flex items-center justify-center">
            <span className="material-symbols-outlined text-[#1a6b32] text-4xl">location_on</span>
          </div>
          <div className="w-1/2 flex flex-col justify-center gap-3 text-xs text-[#45464e]">
            {property.nearby.map((item) => (
              <div key={item.place} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1a6b32] text-base">{item.icon}</span>
                {item.time} <span className="text-[#151c27] truncate">{item.place}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Invest */}
      <div className="bg-[#f0f3ff] p-6 rounded-2xl">
        <h3 className="text-base font-bold text-[#071837] mb-4">Why Invest in {property.name}</h3>
        <ul className="flex flex-col gap-3 text-sm text-[#45464e]">
          {property.whyInvest.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#1a6b32] text-[18px] mt-0.5">check</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}