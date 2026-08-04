const TRUST_ITEMS = [
  { icon: "verified", title: "100% Verified", description: "All properties are verified" },
  { icon: "payments", title: "Best Prices", description: "Competitive prices guaranteed" },
  { icon: "gavel", title: "Legal Assistance", description: "Complete legal support" },
  { icon: "account_balance", title: "Easy Financing", description: "Home loan assistance" },
  { icon: "headset_mic", title: "After Sales Support", description: "We're with you even after purchase" },
];

export default function TrustBar() {
  return (
    <section
      className="py-12 bg-white border-y border-[#c5c6cf]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-[#1a6b32] text-[32px]">{item.icon}</span>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#151c27]">{item.title}</p>
                <p className="text-[11px] text-[#45464e]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}