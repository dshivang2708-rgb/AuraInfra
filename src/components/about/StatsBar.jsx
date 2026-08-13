const STATS = [
  { icon: "domain", value: "70+", label: "Project Deals" },
  { icon: "family_restroom", value: "50+", label: "Happy Families" },
  { icon: "location_on", value: "8+", label: "Prime Locations" },
  { icon: "workspace_premium", value: "10+", label: "Years Experience" },
  { icon: "engineering", value: "10+", label: "Expert Professionals" },
];

export default function StatsBar() {
  return (
    <section className="py-6 bg-[#f0f3ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-center">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-row items-center justify-center gap-2 ${
                i > 0 ? "border-l border-[#c5c6cf]/30" : ""
              } ${i === 1 || i === 4 ? "hidden md:flex" : ""}`}
            >
              <span className="material-symbols-outlined text-[#1a6b32] text-4xl">{stat.icon}</span>
              <div className="text-left">
                <div className="text-base font-bold text-[#071837] leading-tight">{stat.value}</div>
                <div className="text-[11px] text-[#45464e]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}