import { useState } from "react";

const PRICE_CHECKLIST = [
  "RERA Approved",
  "Clear Title & Legal Verified",
  "Fertile & Cultivable Land",
  "Good Water Availability",
  "High Appreciation Potential",
];

export default function PricingSidebar({ property }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
    }, 1000);
  };

  return (
    <aside className="w-full lg:w-1/4 xl:w-[280px] mx-auto">
      <div className="lg:sticky lg:top-28 flex flex-col gap-6">
        {/* Pricing Card */}
        <div className="bg-[#f0f3ff] rounded-2xl p-6 flex flex-col gap-6 border border-[#c5c6cf]/50 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-[#1a6b32] mb-1">{property.priceRange}</h2>
            <p className="text-[11px] text-[#45464e]">Price Range</p>
          </div>
          <ul className="flex flex-col gap-3 text-sm text-[#151c27]">
            {PRICE_CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1a6b32] bg-[#1a6b32]/20 rounded-full p-1 text-[16px]">
                  check
                </span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2">
            <button className="w-full bg-[#1a6b32] hover:bg-[#1a6b32]/90 text-white text-sm font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
              Enquire Now <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <div className="text-center text-[10px] uppercase tracking-wider text-[#45464e] mt-2 mb-1 opacity-70">
              Or Call Us
            </div>
            <a
              className="flex items-center justify-center gap-1 text-[#151c27] text-sm hover:text-[#1a6b32] transition-colors"
              href="tel:+919876543210"
            >
              <span className="material-symbols-outlined text-[#1a6b32] text-[16px]">call</span> +91 98765 43210
            </a>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-[#f0f3ff] rounded-2xl p-6 border border-[#c5c6cf]/50 shadow-sm">
          <h3 className="text-base font-bold text-[#071837] mb-4">Enquire About This Land</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
              placeholder="Your Name"
              type="text"
              required
            />
            <input
              className="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
              placeholder="Phone Number"
              type="tel"
              required
            />
            <input
              className="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
              placeholder="Email Address"
              type="email"
              required
            />
            <select className="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm text-[#45464e] focus:ring-[#1a6b32] focus:border-[#1a6b32]">
              <option>I'm interested in</option>
              {property.areaOptions.map((opt) => (
                <option key={opt.size}>{opt.size}</option>
              ))}
            </select>
            <textarea
              className="w-full bg-white border-[#c5c6cf] rounded-lg p-3 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] resize-none"
              placeholder="Message"
              rows={3}
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className="w-full bg-[#1a6b32] hover:bg-[#1a6b32]/90 text-white text-sm font-bold py-3 rounded-lg transition-colors mt-2 shadow-sm disabled:opacity-70"
            >
              {status === "idle" && "Send Enquiry"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Enquiry Sent!"}
            </button>
            <p className="text-center text-[10px] text-[#45464e] mt-4 opacity-70 italic">
              Our team will get in touch with you shortly.
            </p>
          </form>
        </div>
      </div>
    </aside>
  );
}