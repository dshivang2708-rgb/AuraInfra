const TIMELINE = [
  {
    year: "2014",
    label: "Founded",
    text: "Our journey began with a simple vision to provide quality homes.",
    dot: "bg-[#005ac1]",
  },
  {
    year: "2016",
    label: "First Project",
    text: "Delivered our first landmark residential project ahead of schedule.",
    dot: "bg-[#005ac1]",
  },
  {
    year: "2019",
    label: "Expansion",
    text: "Expanded into multiple cities and diversified into commercial spaces.",
    dot: "bg-[#005ac1]",
  },
  {
    year: "2024+",
    label: "Growth Ahead",
    text: "Continuing to build sustainable futures and smarter living spaces.",
    dot: "bg-[#6ddd81]",
  },
];

export default function OurStory() {
  return (
    <section className="py-16 overflow-hidden bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-3/5">
            <span className="text-xs text-[#005ac1] tracking-widest uppercase mb-3 block font-semibold">
              Our Story
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#071837] mb-4 leading-tight">
              From A Vision to <br />
              <span className="text-[#005ac1]">Vibrant Communities</span>
            </h2>
            <p className="text-sm text-[#45464e] mb-8 leading-relaxed">
              Founded with a vision to redefine real estate by combining innovation, quality, and
              integrity, Aura Infra has grown into a trusted name in the industry. We believe in
              building long-term relationships through honesty, commitment, and excellence.
            </p>

            <div className="relative pl-6 border-l-2 border-[#dce2f3] space-y-8">
              {TIMELINE.map((item) => (
                <div key={item.year} className="relative">
                  <div
                    className={`absolute -left-[33px] top-0 w-3 h-3 rounded-full border-4 border-[#f9f9ff] shadow-sm ${item.dot}`}
                  />
                  <div className="text-base font-bold text-[#071837] mb-0.5">
                    {item.year} <span className="text-[#45464e] text-xs ml-2 font-normal">— {item.label}</span>
                  </div>
                  <p className="text-xs text-[#45464e]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="lg:w-2/5 relative group">
            <div className="rounded-3xl overflow-hidden relative shadow-2xl aspect-[4/3] max-w-[340px] mx-auto">
              <img
                className="w-full h-full object-cover"
                alt="A sophisticated clubhouse lounge with designer furniture and panoramic garden views"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUWHIzGotecUrqFVaLCtDodOLRe5ev8HhSYcbtebvcV883nq5f9RjOygExdhvnIOMA-QYoCNkAAEuoGl2PBzI1lHdYDL4WoA-a4lVaP6p965E5j_zb4NZ-b9z_FmqJhEX84yl0rbVHIouKYQMQdfH1OPS3D8mgq80QojuUveKRDOvJ1SukaKOpP8vUTpfq5GCY4_y5N-sQLdnuB3SiTBzdMR8Qy2BQGoUcR48INdQHFRSPqj7VyEAfbw"
              />
              <div className="absolute inset-0 bg-[#071837]/20 flex items-center justify-center cursor-pointer">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                </div>
              </div>
            </div>

            <div className="relative md:absolute md:left-6 md:-bottom-16 bg-white p-5 rounded-2xl shadow-xl max-w-[280px] mx-auto md:mx-0 mt-4 md:mt-0 border border-[#c5c6cf]/20">
              <h4 className="text-sm font-bold text-[#071837] mb-1.5">Our Commitment</h4>
              <p className="text-xs text-[#45464e] italic mb-4">
                "We are committed to delivering excellence in every project and creating spaces that
                enrich lives for our community."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#e7eefe]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Rohit Malhotra, Managing Director"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdd8n27vCt05K5T3i06SXSo6CDCHU_m4VUlyX2A86QjT6uh6l2KcC7MQNhPzKVvxhp24XSelHss66XDbougir8rxLPaCyPUl6yPtnLiAuoFpfJ3IXnQytSMhVHNhYyLWTqlgHNTufyP0SqNDMmTsUmraaE_q0NVkpOF1D2nsXjaoi33VOwwdbCUfDtalfIyIfvOsQPsQsizTvtKzFEIAZ6gvs87dX2dHVlaaAVysVGEqG-pHNyYNfmFQ"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#071837]">Rohit Malhotra</div>
                  <div className="text-[11px] text-[#45464e]">Managing Director</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}