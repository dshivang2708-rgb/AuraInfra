import MapEmbed from "./MapEmbed.jsx";

const LOCATION_DETAILS = [
  { icon: "location_city", title: "Landmark", text: "Near Mohali International Airport" },
  { icon: "local_parking", title: "Parking", text: "Ample parking available" },
  { icon: "directions_bus", title: "Public Transport", text: "Well connected by bus and metro" },
];

export default function LocationSection() {
  return (
    <section className="py-14 bg-[#f0f3ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#c5c6cf] flex flex-col md:flex-row">
          {/* Map */}
          <div className="md:w-3/5 h-[340px] md:h-[420px] relative bg-[#f1f3f4] overflow-hidden">
            <MapEmbed />

            <div className="absolute top-4 left-4 z-20 max-w-[220px] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#c5c6cf] pointer-events-none">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#071837]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#071837] text-[16px]">corporate_fare</span>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#151c27]">Aura Infra HQ</h4>
                  <p className="text-[10px] text-[#45464e] leading-tight">Sector 82, Mohali, Punjab 140306</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Sector+82,+Mohali,+Punjab+140306,+India"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 bg-[#071837] text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#005ac1] transition-colors pointer-events-auto"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined text-[14px]">directions</span>
              </a>
            </div>
          </div>

          {/* Office info */}
          <div className="md:w-2/5 p-8 flex flex-col justify-center bg-[#f9f9ff]">
            <h3 className="text-lg font-bold mb-2 text-[#151c27]">Our Office Location</h3>
            <p className="text-[#45464e] text-sm mb-4">
              Conveniently located in the heart of Mohali with easy access and ample parking.
            </p>
            <div className="space-y-3">
              {LOCATION_DETAILS.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="material-symbols-outlined text-[#1a6b32] text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold mb-0.5 text-[#151c27]">{item.title}</p>
                    <p className="text-[#45464e] text-xs">{item.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#1a6b32] text-xl">map</span>
                <div>
                  <p className="text-xs font-bold mb-0.5 text-[#151c27]">Google Maps</p>
                  <a
                    className="inline-flex items-center gap-1 text-[#071837] text-xs font-semibold hover:text-[#005ac1] transition-colors group"
                    href="https://maps.app.goo.gl/gtAs5w5BsuDZ3j7y5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Open in Google Maps</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}