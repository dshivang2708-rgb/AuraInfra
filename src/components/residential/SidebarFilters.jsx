import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction", "New Launch"];

export default function SidebarFilters() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";

  const cities = useCities();
  const sectors = useSectors(city);

  function updateSearch(next) {
    navigate({
      to: "/properties/residential",
      search: cleanSearch({ ...search, ...next }),
      replace: true,
    });
  }

  function handleCityChange(e) {
    // Changing city clears sector — sectors only make sense within a city.
    updateSearch({ city: e.target.value, sector: "" });
  }

  function handleSectorChange(e) {
    updateSearch({ sector: e.target.value });
  }

  function clearAll() {
    updateSearch({ city: "", sector: "" });
  }

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white p-5 rounded-lg border border-gray-200 lg:sticky lg:top-32">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Filter Properties</h2>
          <button onClick={clearAll} className="text-[#1a6b32] text-xs font-semibold uppercase">
            Clear All
          </button>
        </div>

        {/* City Filter */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-location-dot mr-1" /> City
          </label>
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sector Filter — scoped to the selected city */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-map-pin mr-1" /> Sector
          </label>
          <select
            value={sector}
            onChange={handleSectorChange}
            disabled={sectors.length === 0}
            className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">All Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {city && sectors.length === 0 && (
            <p className="text-[11px] text-gray-400 mt-1">No specific sectors listed for {city} yet.</p>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-wallet mr-1" /> Price Range
          </label>
          <input
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a6b32]"
            type="range"
          />
          <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500">
            <span>₹ 10 Lakh</span>
            <span>₹ 5 Cr+</span>
          </div>
        </div>

        {/* BHK Filter */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">BHK</label>
          <div className="grid grid-cols-4 gap-1">
            {BHK_OPTIONS.map((bhk) => (
              <button
                key={bhk}
                className="border border-gray-200 py-2 rounded text-xs hover:bg-[#1a6b32] hover:text-white transition"
              >
                {bhk}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Budget</label>
          <select className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]">
            <option>All Budget</option>
            <option>Below 50 Lakh</option>
            <option>50 Lakh - 1 Cr</option>
          </select>
        </div>

        {/* Possession Status */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-key mr-1" /> Possession Status
          </label>
          <div className="space-y-2">
            {POSSESSION_OPTIONS.map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => updateSearch({ city, sector })}
          className="w-full bg-[#1a6b32] text-white py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 mb-3"
        >
          <i className="fa-solid fa-sliders" /> Apply Filters
        </button>
        <button
          onClick={clearAll}
          className="w-full text-gray-500 text-xs font-bold py-1 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-rotate-left" /> Reset All
        </button>
      </div>
    </aside>
  );
}
