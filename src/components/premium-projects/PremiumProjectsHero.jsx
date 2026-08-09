import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";

const STATS = [
  { icon: "workspace_premium", value: "12+", label: "Premium Projects" },
  { icon: "location_on", value: "8+", label: "Top Locations" },
  { icon: "verified_user", value: "Trusted", label: "By Thousands" },
  { icon: "badge", value: "RERA", label: "Approved" },
];

const STATUS_OPTIONS = ["Ready to Move", "Under Construction", "New Launch"];

function draftFromSearch(search) {
  return {
    city: search.city || "",
    sector: search.sector || "",
    minPrice: search.minPrice || "",
    maxPrice: search.maxPrice || "",
    status: search.status || "",
    builder: search.builder || "",
  };
}

export default function PremiumProjectsHero() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  // Every field here is staged locally and only pushed into the URL — which
  // is what ProjectGrid actually reads from — once "Search" is clicked.
  const [draft, setDraft] = useState(() => draftFromSearch(search));

  // Re-sync if the URL changes from outside (browser back/forward, etc).
  useEffect(() => {
    setDraft(draftFromSearch(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.city, search.sector, search.minPrice, search.maxPrice, search.status, search.builder]);

  const cities = useCities();
  const sectors = useSectors(draft.city);

  function updateDraft(next) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function handleCityChange(e) {
    // Changing city clears sector — sectors only make sense within a city.
    updateDraft({ city: e.target.value, sector: "" });
  }

  function runSearch() {
    navigate({
      to: "/properties/premium-projects",
      search: cleanSearch({
        ...search,
        city: draft.city,
        sector: draft.sector,
        minPrice: draft.minPrice || undefined,
        maxPrice: draft.maxPrice || undefined,
        status: draft.status || undefined,
        builder: draft.builder || undefined,
      }),
      replace: true,
    });
  }

  function handleKeyDown(e) {
    // Let people hit Enter in any of the text/number fields to run the search.
    if (e.key === "Enter") runSearch();
  }

  return (
    <section
      className="min-h-[500px] flex flex-col justify-center items-center px-4 pt-12 pb-24 text-white relative"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvP3xZRgalAn9bZbHEMwatQuz-SHF9bE8LWZlHJZRWGMFnfwKRzGGvk9jtc8QDLmjqEoYQEb1upwCjHl1okuzBbC3jy6U1Olhcx00rOsIM-i50svnkcqfD7Dn049LwXf3sT6EPrcM_HRmPnVMlOTm6LZgCNoJpk2x_vEREZgFgzgXSAnHvDVvVed2n-zgyfK3ovz0oNpG2FfUpQfA_ecyZ6_0UiyLhMTK3P5TOXPrUGvKI472mYWe4n-r0ILTV0O1Pyw=w2400')",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <nav className="flex text-sm mb-6 text-slate-300">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span> Projects
            </li>
            <li>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">Premium Projects</span>
            </li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Premium <span className="text-[#1a6b32] brightness-150">Projects</span>
          </h1>
          <p className="text-lg text-slate-200">Exceptional spaces. Timeless value. A better tomorrow.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center space-x-3">
              <div className="p-2 border border-white/20 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-400">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-slate-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Search & Filter Bar — every field is staged in `draft` and
          only applied to the results when "Search" is clicked. */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-7xl px-4">
        <div
          className="bg-white rounded-xl shadow-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-7 gap-4 items-end text-slate-800"
          onKeyDown={handleKeyDown}
        >
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">City</label>
            <select
              value={draft.city}
              onChange={handleCityChange}
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sector</label>
            <select
              value={draft.sector}
              onChange={(e) => updateDraft({ sector: e.target.value })}
              disabled={sectors.length === 0}
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0 disabled:text-slate-400"
            >
              <option value="">All Sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Min Budget (₹ Lakh)</label>
            <input
              type="number"
              min="0"
              value={draft.minPrice}
              onChange={(e) => updateDraft({ minPrice: e.target.value })}
              placeholder="No min"
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Max Budget (₹ Lakh)</label>
            <input
              type="number"
              min="0"
              value={draft.maxPrice}
              onChange={(e) => updateDraft({ maxPrice: e.target.value })}
              placeholder="No max"
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</label>
            <select
              value={draft.status}
              onChange={(e) => updateDraft({ status: e.target.value })}
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0"
            >
              <option value="">Any Status</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Builder</label>
            <input
              type="text"
              value={draft.builder}
              onChange={(e) => updateDraft({ builder: e.target.value })}
              placeholder="e.g. DLF"
              className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <button
              type="button"
              onClick={runSearch}
              className="w-full bg-[#1a6b32] hover:bg-[#145528] text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-base">search</span>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}