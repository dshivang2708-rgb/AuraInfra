const TRUST_ITEMS = [
  { icon: "verified", title: "RERA Approved", text: "100% Transparent Projects" },
  { icon: "location_on", title: "Prime Locations", text: "Top Real Estate Destinations" },
  { icon: "auto_awesome", title: "Premium Amenities", text: "World Class Lifestyle" },
  { icon: "engineering", title: "Trusted Builders", text: "Quality You Can Rely On" },
  { icon: "trending_up", title: "Secure Investment", text: "High Appreciation Potential" },
  { icon: "account_balance", title: "Easy Home Loans", text: "Hassle Free Financing" },
];

export default function TrustBanner() {
  return (
    <section className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center md:text-left">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl text-green-600">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase mb-1">{item.title}</h4>
                <p className="text-[10px] text-slate-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}