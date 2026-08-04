import { useState } from "react";
import { Link } from "@tanstack/react-router";

const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB16OuZYxLnZ7IzPxfxFrAbCzZGu95GrOYe_I_p2U_U_w2gbmdAMHiDCVL8tolKUMX4-3bJzx7VZCL257ax2cZDIROh76OQi9XAWXoxc39QVm4gxpFSYGSUaRRaUXR4ECzlzxPrC5bGJzDsYNCrvpDRAK0Nst4yrqH-lSLouyj4oQojCi1HsGQROE_tASHbzkuOCazoVbh6-xo19Y8qzR1nu72LVLCejy7i_mW3VBYTnesGEZg6RsXFTjBnLlGLw_TXrSc";

const ACCENT = "#006d33";

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Projects", href: "#" },
  { label: "News & Updates", href: "#" },
  { label: "Careers", href: "#" },
];

const EXPLORE_LINKS = ["Buy Property", "Commercial", "Agriculture", "Builders", "Agents"];
const RESOURCE_LINKS = ["Blog", "FAQs", "Legal", "Privacy Policy", "Terms & Conditions"];

const SOCIAL_ICONS = ["qr_code_2", "camera", "work", "play_circle"];

const CONTACT_ITEMS = [
  { icon: "call", text: "+91 98765 43210" },
  { icon: "mail", text: "info@aurainfra.com" },
  { icon: "location_on", text: "Sector 82, Mohali, Punjab, India" },
];

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer
      className="w-full bg-[#0f1719] text-white text-sm"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-8 px-8 py-10 max-w-[1440px] mx-auto">
        {/* Column 1: Brand & Socials */}
        <div className="lg:col-span-1 flex flex-col space-y-2">
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

        {/* Column 2: Company */}
        <FooterColumn title="Company">
          <ul className="space-y-2">
            {COMPANY_LINKS.map((link) => (
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

        {/* Column 3: Explore */}
        <FooterColumn title="Explore">
          <ul className="space-y-2">
            {EXPLORE_LINKS.map((link) => (
              <li key={link}>
                <a className="text-gray-400 hover:text-white transition-colors" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Column 4: Resources */}
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

        {/* Column 5: Contact Us */}
        <FooterColumn title="Contact Us">
          <ul className="space-y-2">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.icon} className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5" style={{ color: ACCENT }}>
                  {item.icon}
                </span>
                <span className="text-gray-400 leading-snug">{item.text}</span>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Column 6: Stay Updated */}
        <div className="lg:col-span-1">
          <h4 className="text-[18px] font-bold text-white mb-6">Stay Updated</h4>
          <p className="text-gray-400 mb-6">Subscribe to get the latest news and property offers.</p>
          <div className="relative">
            <input
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all"
              style={{ "--tw-ring-color": ACCENT }}
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="mt-4 w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group"
              style={{ backgroundColor: subscribed ? "#36aa54" : ACCENT }}
              onClick={handleSubscribe}
            >
              {subscribed ? (
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-4 px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© 2026 Aura Infra. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <span className="text-[#ba1a1a]">❤️</span> for a better tomorrow
          </div>
        </div>
      </div>
    </footer>
  );
}