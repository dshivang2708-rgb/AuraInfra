import { Link } from "@tanstack/react-router";
import propertiesNearYouImage from "../assets/properties-near-you-house-opt.webp";

const SEGMENTS = [
  { key: "verified", icon: "verified", label: "Verified\nListings" },
  { key: "brokerage", icon: "handshake", label: "Happy\nFamilies" },
  { key: "location", icon: "location", label: "Location Based\nSearch" },
  { key: "owner", icon: "person", label: "Direct Deal\nAccess" },
  { key: "safe", icon: "shield", label: "Safe &\nReliable" },
];

const LocationPinIcon = ({ className = "w-[26px] h-[26px]" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const DomainIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M3 21h18M5 21V5a1 1 0 011-1h8a1 1 0 011 1v16M9 8h1m-1 4h1m3-4h1m-1 4h1M19 21v-9a1 1 0 00-1-1h-3v10"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M4 21V9l6-4v16M13 21V4l7 5v12M4 21h16M8 12h.01M8 16h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 3l7 3v6c0 4.97-3 8.5-7 9-4-.5-7-4.03-7-9V6l7-3z M9 12l2 2 4-4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M3 17l6-6 4 4 8-8M15 7h6v6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg className="w-[34px] h-[34px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.99 15l-3.51-3.51 1.41-1.41 2.1 2.1 5.61-5.61 1.41 1.41L10.01 16z" />
  </svg>
);

const HandshakeIcon = () => (
  <svg className="w-[34px] h-[34px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M8 12l2.5 2.5a1.5 1.5 0 002.12-2.12L10.5 10M8 12l-3-3 3.5-3.5a2 2 0 012.8 0L14 8m-6 4l4.5 4.5a1.5 1.5 0 002.12-2.12M13 9l2.5-2.5a2 2 0 012.8 0L21 9l-5 5-1.5-1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const PersonIcon = () => (
  <svg className="w-[34px] h-[34px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-[34px] h-[34px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 3l7 3v6c0 4.97-3 8.5-7 9-4-.5-7-4.03-7-9V6l7-3z M9.5 12l1.75 1.75L14.5 10"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
);

const SEGMENT_ICONS = {
  verified: VerifiedIcon,
  handshake: HandshakeIcon,
  location: LocationPinIcon,
  person: PersonIcon,
  shield: ShieldIcon,
};

export default function ServiceHighlights() {
  return (
    <section className="py-10 bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* 1. Better Properties, Better Choices */}
          <div
            className="lg:col-span-3 rounded-3xl p-4 relative overflow-hidden border border-[#c5c6cf]/10 shadow-sm flex flex-col h-full min-h-[260px] bg-cover bg-center"
            style={{ backgroundImage: `url(${propertiesNearYouImage})` }}
            role="img"
            aria-label="Modern house illustration"
          >
            {/* Dotted pattern accent */}
            <div className="absolute top-4 right-4 grid grid-cols-4 gap-[3px] opacity-50 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#5b6fd8]" />
              ))}
            </div>

            {/* Icon + heading + description */}
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#e4e7fb] flex items-center justify-center text-[#5b6fd8] mb-2.5">
                <BuildingIcon />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#071837] leading-snug mb-1.5">
                Better Properties,
                <br />
                Better Choices
              </h3>
              <p className="text-[10.5px] text-[#45464e] leading-snug max-w-[68%]">
                We curate quality properties to help you make confident decisions.
              </p>
            </div>

            {/* Verified Listings pill */}
            <div className="relative z-10 mt-auto inline-flex items-center gap-2 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-lg shadow-md w-fit">
              <span className="text-[#5b6fd8]">
                <ShieldCheckIcon />
              </span>
              <div className="leading-tight">
                <p className="text-[8.5px] font-bold text-[#071837]">Verified Listings</p>
                <p className="text-[7.5px] text-[#75777f]">Trusted by thousands</p>
              </div>
            </div>

            {/* Growing Opportunities pill */}
            <div className="relative z-10 mt-3 inline-flex items-center gap-2 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-lg shadow-md w-fit">
              <div className="w-7 h-7 rounded-full bg-[#e4e7fb] flex items-center justify-center text-[#5b6fd8] shrink-0">
                <TrendingUpIcon />
              </div>
              <div className="leading-tight">
                <p className="text-[7.5px] font-bold text-[#071837]">Growing Opportunities</p>
                <p className="text-[6.5px] text-[#75777f]">More coming soon</p>
              </div>
            </div>
          </div>


          {/* 2. Service Highlights Pill */}
          <div className="lg:col-span-6 bg-[#f0f3ff] rounded-3xl lg:rounded-[5rem] p-4 border border-[#c5c6cf]/30 shadow-xl flex items-center justify-center self-center h-fit w-full">
            <div className="flex flex-wrap lg:flex-row w-full justify-around items-center py-6 px-4 gap-y-6">
              {SEGMENTS.map((segment, i) => {
                const Icon = SEGMENT_ICONS[segment.icon];
                return (
                  <div key={segment.key} className="contents">
                    <div className="flex flex-col items-center gap-3 px-2 min-w-[100px] flex-1">
                      <div className="w-14 h-14 rounded-full text-[#1a6b32] flex items-center justify-center">
                        <Icon />
                      </div>
                      <span
                        className="text-[11px] text-[#151c27] text-center font-bold whitespace-pre-line"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {segment.label}
                      </span>
                    </div>
                    {i < SEGMENTS.length - 1 && (
                      <div className="h-16 border-l border-dashed border-[#c5c6cf]/50 hidden lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Premium Projects */}
          <Link
            to="/properties/premium-projects"
            className="lg:col-span-3 bg-[#f0f3ff] rounded-3xl p-4 border border-[#c5c6cf]/10 shadow-sm flex flex-col h-full min-h-[260px] overflow-hidden block"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1a6b32] flex items-center justify-center text-white shadow-sm">
                <DomainIcon />
              </div>
              <h3 className="text-base font-bold text-[#071837]">Premium Projects</h3>
            </div>

            <div className="relative flex-grow overflow-hidden mb-3 group -mx-4">
              <div
                className="w-full h-36 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                role="img"
                aria-label="Premium builder project"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5E4SrVuhyinhvbzbVaoMAhEAQE24TEqfJweu9krjmJtJCgYDwSH1HVzaD_yDAOytcX7hwKveM26tlC2EB_MoUCnEsEZv0I9hNINGY2tsbjLCl_SovIW7VOTj4siX9AhxchvI2OALTiuqBtA1arA7ICUk_9J5LCh9wWn4VN6tLisC7rR4Tc3fqhMs1_niGdQxWSU4Us8WVC6hYAi-C72aAUZw1n2_uWmakwRMmBMTUjOY3Fob7Ib98tA')",
                }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-[#071837] scale-90 group-hover:scale-100 transition-all"
                aria-hidden="true"
              >
                <ChevronRightIcon />
              </span>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] font-bold text-[#071837] uppercase tracking-widest shadow-sm">
                Featured
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-[#071837] font-bold">Top builders. Better living.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}