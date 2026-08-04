const VALUES = [
  {
    icon: "favorite",
    title: "Integrity",
    description: "We believe in honesty, transparency, and ethical practices in every deal.",
  },
  {
    icon: "workspace_premium",
    title: "Quality",
    description: "We deliver the highest standards in every project we undertake.",
  },
  {
    icon: "groups",
    title: "Customer Focus",
    description: "Our customers are our priority. We listen, understand and deliver.",
  },
  {
    icon: "eco",
    title: "Sustainability",
    description: "We build responsibly for a greener and sustainable tomorrow.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description: "We embrace new ideas and technology to create better living spaces.",
  },
];

export default function OurValues() {
  return (
    <section className="py-16 bg-[#f0f3ff] relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs text-[#005ac1] tracking-widest uppercase mb-4 block font-semibold">
            Our Values
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#071837] leading-tight">
            The Principles That <span className="text-[#1a6b32]">Drive Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-3xl border border-[#c5c6cf]/30 text-center flex flex-col items-center hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-[#1a6b32] text-4xl"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 40" }}
                >
                  {value.icon}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#071837] mb-3">{value.title}</h3>
              <p className="text-sm text-[#45464e]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}