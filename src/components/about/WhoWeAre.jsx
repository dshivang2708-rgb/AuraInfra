import { Link } from "@tanstack/react-router";

const CHECKLIST = ["RERA Approved Projects", "Transparent Deals", "Timely Delivery"];

const STATS = [
  { value: "10+", label: "Years of Excellence" },
  { value: "500+", label: "Happy Families" },
  { value: "25+", label: "Premium Projects" },
];

export default function WhoWeAre() {
  return (
    <section className="bg-[#f9f9ff] py-12" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <span className="text-xs text-[#005ac1] tracking-widest uppercase mb-3 block font-semibold">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#071837] mb-4 leading-tight">
              Building More Than Properties, <br />
              <span className="text-[#6ddd81]">We Build Trust.</span>
            </h2>
            <p className="text-sm text-[#45464e] mb-6 leading-relaxed">
              Aura Infra is a forward-thinking real estate company committed to delivering premium
              residential, commercial, and agricultural properties. With a focus on quality,
              transparency, and customer satisfaction, we create spaces that bring value today and for
              generations to come.
            </p>
            <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 mb-8">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2 font-bold text-sm text-[#151c27] whitespace-nowrap">
                  <span className="material-symbols-outlined text-[#6ddd81] text-lg">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/"
              hash="explore-by-category"
              className="bg-[#071837] text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95"
            >
              Explore Our Projects
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="lg:w-1/2">
            <div className="relative w-full max-w-[480px] mx-auto mt-6 md:mt-8">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  className="w-full object-cover aspect-video"
                  alt="An aerial view of a modern luxury apartment complex in a lush green urban environment"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR5UO_B_35k50Ubb9NALJomwA6-YpcjyunbIbSxzGmN4h-v02JxG02U0GBWJQz3aaEZGYBDg1BkYyHFGwxu8sfVMQ_kXinvq6ZS96xKnfDnswT0OO5I1y9Qwppsg-sHNO5BfwqaenX_hhH78Jbqu-pVP_yaujSO1_XLAJBlzpLXGvMpEqLDO0wPx8XnESDvLENio8nqxYoMAUpK-hQOD4UGIARnri7ffowTYw6K3VoUphXtmOmImtdmyE1cbOGbWV-j5I"
                />
              </div>
              <div className="absolute -top-3 md:-top-4 -right-4 md:-right-6 bg-[#071837] text-white p-4 md:p-5 rounded-2xl shadow-2xl flex flex-col gap-4 min-w-[130px]">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-bold mb-0.5">{stat.value}</div>
                    <div className="text-[11px] opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}