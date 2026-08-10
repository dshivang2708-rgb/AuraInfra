const FEATURES = [
  {
    icon: "shield",
    title: "Trusted & Reliable",
    description: "Years of experience and a strong reputation for delivering what we promise.",
  },
  {
    icon: "award_star",
    title: "Quality Construction",
    description: "We use premium materials and follow the highest standards of construction.",
  },
  {
    icon: "location_on",
    title: "Prime Locations",
    description: "Carefully selected locations that offer great connectivity and future value.",
  },
  {
    icon: "description",
    title: "Transparent Deals",
    description: "Clear documentation and honest communication at every step.",
  },
  {
    icon: "group",
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here before, during and after your buy.",
  },
  {
    icon: "payments",
    title: "Best Value",
    description: "Competitive pricing with maximum value and long term benefits.",
  },
];

const STATS = [
  { icon: "domain", value: "25+", label: "Projects Delivered" },
  { icon: "groups", value: "500+", label: "Happy Families" },
  { icon: "verified_user", value: "10+", label: "Years of Excellence" },
];

export default function WhyChooseUs() {
  return (
    <section
      className="max-w-7xl mx-auto px-8 pt-10 pb-20"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#1a6b32] text-xs uppercase tracking-widest mb-4 block font-semibold">
          WHY CHOOSE US
        </span>
        <h2 className="text-[32px] font-bold text-[#071837] mb-6">
          Why Choose <span className="text-[#1a6b32]">Aura Infra?</span>
        </h2>
        <p className="max-w-2xl mx-auto text-base text-[#75777f]">
          We are committed to delivering excellence in every project and building lasting
          relationships with our customers.
        </p>
      </div>

      {/* 6-Column Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-4 rounded-xl border border-[#c5c6cf]/30 text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#1a6b32]/10 flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-[#1a6b32] text-[32px]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
              >
                {feature.icon}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#071837] mb-1.5">{feature.title}</h3>
            <div className="w-8 h-[2px] bg-[#1a6b32] mb-2" />
            <p className="text-xs text-[#75777f]">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Statistics Banner */}
      <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-[#e7eefe]/30 border border-[#c5c6cf]/20 shadow-sm">
        {/* Image */}
        <div className="lg:w-2/5 min-h-[200px] max-h-[260px] lg:max-h-none relative overflow-hidden">
          <img
            className="w-full h-full object-cover max-h-[260px] lg:max-h-full"
            alt="Luxury modern villa at twilight with warm interior lighting and manicured garden"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp5QNuBYNY3U2ygRpD7Kev-i_Vv6Dyib6rPlei9m4UaXu5oBO8McX5vyf2aZl6pcfnZhBSEoTHTKCG5fsEDU7kZle6mJxMJFgJ4fj4qpAHnNmrIca9R-UuJiwXxL-hf424vBFyuhfI3Yx0-92tTikQ_h0Y6tx0BFOkNSfZgRkDHqRCkrWYmWOTfrBbo7wZAVzyob8C7dywKmXz05Kf3T87b2Vvbxc2uLoYYX3PA6_IvVmhjvVcEimxl8BnL3LBOSMnnBQ=s1920"
          />
        </div>

        {/* Content */}
        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a6b32] rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-lg">format_quote</span>
                </div>
                <h2 className="text-lg font-bold text-[#071837] leading-snug">
                  Building Spaces,
                  <br />
                  <span className="text-[#1a6b32] block">Creating Futures.</span>
                </h2>
              </div>
              <p className="text-sm text-[#75777f] mb-6 leading-relaxed">
                At Aura Infra, we don't just build properties, we create spaces that inspire,
                communities that thrive and futures that last for generations.
              </p>
              <a
                href="#explore-by-category"
                className="bg-[#1a6b32] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity self-start"
              >
                Explore Our Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 pt-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a6b32]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#1a6b32] text-[18px]">{stat.icon}</span>
                  </div>
                  <div>
                    <span className="block text-base font-bold text-[#1a6b32]">{stat.value}</span>
                    <span className="text-xs text-[#75777f]">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}