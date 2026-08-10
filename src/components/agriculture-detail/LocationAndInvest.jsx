export default function LocationAndInvest({ property }) {
  const mapQuery = encodeURIComponent(`${property.name}, ${property.location}`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Location mini */}
      <div className="bg-[#f0f3ff] p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-[#071837] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1a6b32] text-[20px]">location_on</span> Location
          </h3>
          <a
            className="text-sm font-semibold text-[#1a6b32] hover:underline flex items-center gap-1"
            href={`https://www.google.com/maps?q=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Map <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 rounded-lg overflow-hidden aspect-square">
            <iframe
              title={`Map showing ${property.name}`}
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center gap-3 text-xs text-[#45464e]">
            {property.nearby.length === 0 ? (
              <p className="text-[#75777f]">No nearby places added yet.</p>
            ) : (
              property.nearby.slice(0, 3).map((item) => (
                <div key={item.place} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1a6b32] text-base">{item.icon}</span>
                  {item.time} <span className="text-[#151c27] truncate">{item.place}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Why Invest */}
      <div className="bg-[#f0f3ff] p-6 rounded-2xl">
        <h3 className="text-base font-bold text-[#071837] mb-4">Why Invest in {property.name}</h3>
        {property.whyInvest.length === 0 ? (
          <p className="text-sm text-[#75777f]">No investment highlights added yet.</p>
        ) : (
          <ul className="flex flex-col gap-3 text-sm text-[#45464e]">
            {property.whyInvest.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#1a6b32] text-[18px] mt-0.5">check</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}