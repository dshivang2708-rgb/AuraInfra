const TRUST_ITEMS = [
  { icon: "fa-regular fa-circle-check", title: "Verified Properties", text: "100% verified & authentic listings" },
  { icon: "fa-solid fa-tag", title: "Best Prices", text: "Get the best deals & offers" },
  { icon: "fa-solid fa-headset", title: "Expert Support", text: "Our team is here to help you" },
  { icon: "fa-solid fa-hand-holding-dollar", title: "Easy Home Loans", text: "Hassle free loan assistance" },
  { icon: "fa-solid fa-shield-halved", title: "Safe & Secure", text: "Secure your future with us" },
];

export default function TrustBanner() {
  return (
    <section className="bg-white border-t border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#eaf4ef] text-[#1a6b32] rounded-full flex items-center justify-center mb-3">
                <i className={`${item.icon} text-2xl`} />
              </div>
              <h5 className="font-bold text-sm mb-1">{item.title}</h5>
              <p className="text-gray-500 text-xs">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}