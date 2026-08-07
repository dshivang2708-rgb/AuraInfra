import { Link } from "@tanstack/react-router";
import { useCities } from "../lib/locationFilter.js";

const FALLBACK_CITIES = ["Mohali", "Chandigarh", "Delhi", "Noida", "Gurgaon", "Pune", "Jaipur", "Lucknow"];

const COLLECTIONS = [
  { key: "villas", icon: "home_work", label: "Luxury Villas" },
  { key: "affordable", icon: "villa", label: "Affordable Homes" },
  { key: "farms_plots", icon: "landscape", label: "Farms & Plots" },
  { key: "investment", icon: "trending_up", label: "Investment Properties" },
  { key: "farm_lands", icon: "agriculture", label: "Farm Lands" },
  { key: "ready", icon: "check_circle", label: "Ready to Move" },
  { key: "new_launch", icon: "rocket_launch", label: "New Launch" },
  { key: "commercial", icon: "apartment", label: "Commercial Spaces" },
];

const ArrowForwardIcon = ({ className = "w-[18px] h-[18px]" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const HomeWorkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M3 21V9l6-4 6 4v12M9 21v-6h4v6M15 21V11l6-3v13h-6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const VillaIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M3 11l9-7 9 7M5 10v10h14V10M9 21v-6h6v6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const LandscapeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M3 18l5-7 3 4 2-3 8 6H3zM8 10a2 2 0 100-4 2 2 0 000 4z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
  </svg>
);

const AgricultureIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 21V9m0 0c0-3.5-2-6-6-6 0 4 1 7 6 6zm0 0c0-3.5 2-6 6-6 0 4-1 7-6 6zM5 21h14"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const RocketLaunchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 2c2.5 2 4 5.5 4 9 0 2-1 4-1 4l-3 3-3-3s-1-2-1-4c0-3.5 1.5-7 4-9zM9 15l-3 1 1-3M15 15l3 1-1-3M10.5 8.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
    />
  </svg>
);

const ApartmentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M4 21V5a1 1 0 011-1h10a1 1 0 011 1v16M4 21h16M9 8h1m3 0h1m-5 4h1m3 0h1m-5 4h1m3 0h1M16 21v-6h4v6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const COLLECTION_ICONS = {
  home_work: HomeWorkIcon,
  villa: VillaIcon,
  landscape: LandscapeIcon,
  trending_up: TrendingUpIcon,
  agriculture: AgricultureIcon,
  check_circle: CheckCircleIcon,
  rocket_launch: RocketLaunchIcon,
  apartment: ApartmentIcon,
};

export default function CitiesAndCollections() {
  const fetchedCities = useCities();
  const CITIES = fetchedCities.length > 0 ? fetchedCities : FALLBACK_CITIES;

  return (
    <section className="py-8 bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Popular Cities */}
          <div className="lg:col-span-3">
            <h2 className="text-[18px] font-bold text-[#071837] mb-0.5">Popular Cities</h2>
            <p className="text-sm text-[#45464e] mb-5">Explore top locations</p>
            <div className="flex flex-wrap mb-6 gap-1.5">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  to="/properties/residential"
                  search={{ city }}
                  className="px-3 py-1 rounded-lg border border-[#c5c6cf] text-xs text-[#151c27] hover:bg-[#e7eefe] transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[#1a6b32] font-bold text-sm hover:underline"
            >
              View All Cities
              <ArrowForwardIcon />
            </a>
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center h-full">
            <div className="w-px h-full bg-[#c5c6cf] opacity-30" />
          </div>

          {/* Column 2: Property Collections */}
          <div className="lg:col-span-4 lg:-ml-4">
            <h2 className="text-[18px] font-bold text-[#071837] mb-4">Property Collections</h2>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {COLLECTIONS.map((item) => {
                const Icon = COLLECTION_ICONS[item.icon];
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] transition-all cursor-pointer"
                  >
                    <span className="text-[#1a6b32]">
                      <Icon />
                    </span>
                    <span className="text-[11px] font-semibold text-[#151c27]">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Green Banner */}
          <div className="lg:col-span-4 mt-4 lg:mt-0">
            <div className="rounded-2xl p-4 h-[160px] relative overflow-hidden flex flex-col justify-between bg-[#071837]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoxtzXu-3Ve0vTTwrvOQnOVyJFNX9Itt19sufJ6zFtGjv_QwBi2muYIz2DQkfbJCh8_9JElvz6ElkHVbV6NzrYCnqzuZcGMCVY9PpK7HEKnXvxb6e1at12BEIenQ0LxkPSZqOycHwLNzMhwdd9IYQvWMxPrYTQGcBFTIQ50egNFNbZoBQJGOI_uoc95Bb_I_DBRAPTOJKVIFXlsxP0ZPftnu7adzYlApgS45QofYdoT7jBD6eSHaFRAZXSYROW5ndRYrM"
                alt="Promotional background"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div
                className="absolute inset-0 z-[1]"
                style={{ background: "linear-gradient(90deg, rgba(10,40,20,0.9) 0%, rgba(10,40,20,0.55) 35%, rgba(10,40,20,0) 65%)" }}
              />
              <div className="relative z-10">
                <h3 className="text-white text-[18px] font-bold leading-tight">
                  Find Better.
                  <br />
                  Live Better.
                </h3>
                <p className="text-white/80 text-[11px] mt-1 max-w-[160px]">
                  List your property with Aura Infra and reach millions of verified buyers.
                </p>
              </div>
              <button className="relative z-10 bg-white text-[#1a6b32] flex items-center justify-between gap-2 px-3 py-1.5 rounded-full font-bold text-[11px] w-fit min-w-[140px] hover:bg-white/90 transition-transform active:scale-95">
                Find Your Property <ArrowForwardIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}