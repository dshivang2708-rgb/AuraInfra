const TRUST_POINTS = [
  { icon: "support_agent", title: "Expert Support", description: "Get professional assistance" },
  { icon: "schedule", title: "Quick Response", description: "We reply within 24 hours" },
  { icon: "verified_user", title: "Trusted Partner", description: "Your satisfaction is our priority" },
  { icon: "groups", title: "Client Focused", description: "Personalized solutions for your needs" },
];

export default function ContactHero() {
  return (
    <section
      className="relative min-h-[500px] flex items-center overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.12) saturate(1.1)" }}
          alt="A luxury modern apartment complex at dusk with warm interior lights against a navy sky"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaJlNdn9Xaj0XU8PXvn8H154ICodownkQUs7Xf4nAfQWy-8X-KptAliDdxCxZM25sSp2NznVtYbb9ht1hUzOBGV6yG1fANknWztBjHstzthyOvfwAtQYrRcCiMiPJUcbjHpv-gmt5qpde7wtpM2WFLaP3tTfzUoL7ewHMxlIRSejEKSRyC2_joxtA0W_39nrZnPGTJRLHsvmHSDoswITMJ4W0FlB1n9FYGgx0b324lFW7Dao9_fwmON30dDLl8qmxzS6k=w2400"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(7,24,55,0.75), rgba(7,24,55,0.35), rgba(7,24,55,0))",
          }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-10 py-20">
        <div className="max-w-2xl">
          <span className="text-[#1a6b32] text-xs uppercase tracking-widest mb-4 block font-semibold">
            GET IN TOUCH
          </span>
          <h1 className="text-[32px] md:text-[42px] leading-tight text-white mb-6 font-bold">
            We're Here <br />
            <span className="text-[#1a6b32]">to Help You</span>
          </h1>
          <p className="text-[#8695bb] text-base max-w-md mb-12">
            Have a question or need assistance? Our team is ready to help you find the perfect
            property or investment opportunity.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="group">
                <div className="w-8 h-8 rounded-full bg-[#1a6b32]/20 border border-[#1a6b32]/30 flex items-center justify-center mb-2 group-hover:bg-[#1a6b32] transition-all">
                  <span className="material-symbols-outlined text-[#1a6b32] group-hover:text-white text-[18px]">
                    {point.icon}
                  </span>
                </div>
                <h3 className="text-white text-xs font-bold mb-0.5">{point.title}</h3>
                <p className="text-[#8695bb] text-[11px]">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}