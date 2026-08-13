import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { api } from "../lib/api.js";

const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB16OuZYxLnZ7IzPxfxFrAbCzZGu95GrOYe_I_p2U_U_w2gbmdAMHiDCVL8tolKUMX4-3bJzx7VZCL257ax2cZDIROh76OQi9XAWXoxc39QVm4gxpFSYGSUaRRaUXR4ECzlzxPrC5bGJzDsYNCrvpDRAK0Nst4yrqH-lSLouyj4oQojCi1HsGQROE_tASHbzkuOCazoVbh6-xo19Y8qzR1nu72LVLCejy7i_mW3VBYTnesGEZg6RsXFTjBnLlGLw_TXrSc";

const ACCENT = "#006d33";

const EXPLORE_LINKS = [
  { label: "Residential", to: "/properties/residential" },
  { label: "Commercial", to: "/properties/commercial" },
  { label: "Agriculture", to: "/properties/agriculture" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];
const RESOURCE_LINKS = ["Terms & Conditions","Privacy Policy"];

const SOCIAL_ICONS = ["qr_code_2", "camera", "work", "play_circle"];

const CONTACT_ITEMS = [
  { icon: "mail", text: "aurainfraadmin@gmail.com" },
  { icon: "location_on", text: "SCO 16, 1st Floor, Sector 82-A, JLPL, SAS Nagar, Mohali, Punjab 140306 India" },
];

function FooterColumn({ title, children }) {
  return (
    <div className="min-w-0">
      <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | subscribed | error
  const [error, setError] = useState("");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await api.subscribeNewsletter(trimmedEmail);
      setStatus("subscribed");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 3000);
    } catch (err) {
      setError(err.message || "Could not subscribe right now. Please try again.");
      setStatus("error");
    }
  };

  return (
    <footer
      className="w-full bg-[#0f1719] text-white text-sm"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.7fr_0.85fr] gap-x-10 gap-y-8 px-8 py-10 max-w-[1440px] mx-auto min-w-0">
        {/* Column 1: Brand & Socials */}
        <div className="flex flex-col space-y-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_IMAGE} alt="Aura Infra Logo" className="h-28 w-auto object-contain block" />
          </Link>
          <p className="text-gray-400 leading-relaxed">
            Building spaces that inspire and communities that last. We specialize in premium real
            estate and infrastructure solutions.
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_ICONS.map((icon) => (
              <a
                key={icon}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-1 flex items-center justify-center transition-all duration-300"
                href="#"
                aria-label={icon}
              >
                <span className="material-symbols-outlined text-white text-xl">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Columns 2-4: Explore, Resources, Contact Us — grouped with a
            tighter gap between them than the spacing on either side of the
            group. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 min-w-0">
          {/* Column 2: Explore */}
          <FooterColumn title="Explore">
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link className="text-gray-400 hover:text-white transition-colors" to={link.to}>
                      {link.label}
                    </Link>
                  ) : (
                    <a className="text-gray-400 hover:text-white transition-colors" href={link.href}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Column 3: Resources */}
          <FooterColumn title="Resources">
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link}>
                  <a className="text-gray-400 hover:text-white transition-colors" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Column 4: Contact Us */}
          <FooterColumn title="Contact Us">
            <ul className="space-y-2">
              {CONTACT_ITEMS.map((item) => (
                <li key={item.icon} className="flex items-start gap-3 min-w-0">
                  <span className="material-symbols-outlined mt-0.5" style={{ color: ACCENT }}>
                    {item.icon}
                  </span>
                  <span className="text-gray-400 leading-snug break-all">{item.text}</span>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* Column 5: Stay Updated */}
        <div className="min-w-0">
          <h4 className="text-[18px] font-bold text-white mb-6">Stay Updated</h4>
          <p className="text-gray-400 mb-6">Subscribe to get the latest news and property offers.</p>
          <div className="relative">
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all disabled:opacity-60"
              style={{ "--tw-ring-color": ACCENT }}
              placeholder="Email Address"
              type="email"
              value={email}
              disabled={status === "loading"}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubscribe();
              }}
            />
            <button
              className="mt-4 w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-80"
              style={{ backgroundColor: status === "subscribed" ? "#36aa54" : ACCENT }}
              onClick={handleSubscribe}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : status === "subscribed" ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe
                  <span className="material-symbols-outlined text-white transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
            {status === "error" && (
              <p className="mt-2 text-xs text-red-400">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-4 px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© 2026 Aura Infra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}