import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, cleanSearch } from "../../lib/locationFilter.js";

const STATS = [
  { icon: "workspace_premium", value: "12+", label: "Premium Projects" },
  { icon: "location_on", value: "8+", label: "Top Locations" },
  { icon: "verified_user", value: "Trusted", label: "By Thousands" },
  { icon: "badge", value: "RERA", label: "Approved" },
];

export default function PremiumProjectsHero() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const cities = useCities();

  function handleCityChange(e) {
    navigate({
      to: "/properties/premium-projects",
      search: cleanSearch({ ...search, city: e.target.value }),
      replace: true,
    });
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

      {/* Floating Search & Filter Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-7xl px-4">
        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-7 gap-4 items-end text-slate-800">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">City</label>
            <select
              value={city}
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
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Project Type</label>
            <select className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0">
              <option>All Types</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Budget</label>
            <select className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0">
              <option>All Range</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">BHK</label>
            <select className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</label>
            <select className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0">
              <option>Ongoing</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Builder</label>
            <select className="w-full border-none bg-slate-50 rounded-lg text-sm font-semibold focus:ring-0">
              <option>All Builders</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1 flex gap-2">
            <button className="flex-1 border border-slate-200 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50">
              <span className="material-symbols-outlined text-base">tune</span>
              More Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
