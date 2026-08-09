import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction", "New Launch"];

export default function SidebarFilters() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const bhk = parseListParam(search.bhk);
  const possession = parseListParam(search.possession);
  const minPrice = search.minPrice || "";
  const maxPrice = search.maxPrice || "";

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

  function toggleBhk(option) {
    const next = bhk.includes(option) ? bhk.filter((b) => b !== option) : [...bhk, option];
    updateSearch({ bhk: next.join(",") || undefined });
  }

  function togglePossession(option) {
    const next = possession.includes(option)
      ? possession.filter((p) => p !== option)
      : [...possession, option];
    updateSearch({ possession: next.join(",") || undefined });
  }

  function clearAll() {
    updateSearch({
      city: "",
      sector: "",
      bhk: undefined,
      possession: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
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
            <i className="fa-solid fa-wallet mr-1" /> Price Range (₹ Lakh)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => updateSearch({ minPrice: e.target.value })}
              placeholder="Min"
              className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => updateSearch({ maxPrice: e.target.value })}
              placeholder="Max"
              className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500">
            <span>₹ 10 Lakh</span>
            <span>₹ 5 Cr+ (500 Lakh)</span>
          </div>
        </div>

        {/* BHK Filter */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">BHK</label>
          <div className="grid grid-cols-4 gap-1">
            {BHK_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleBhk(option)}
                className={`border py-2 rounded text-xs transition ${
                  bhk.includes(option)
                    ? "bg-[#1a6b32] text-white border-[#1a6b32]"
                    : "border-gray-200 hover:bg-[#1a6b32] hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Possession Status */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-key mr-1" /> Possession Status
          </label>
          <div className="space-y-2">
            {POSSESSION_OPTIONS.map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={possession.includes(status)}
                  onChange={() => togglePossession(status)}
                  className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

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