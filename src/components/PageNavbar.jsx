import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuxJP2ipecj7iYc3db-ag_gWYRi-_mnXgEFz69KHsevIWBONaZx012DYYetqf1yqQFggeKJIsAEfsL7US7TyYhYINVYLmbDyR7UUQzH9hbposA1jd24ZG2QJruKKCfhc4U60MGZkaPOlcNZBcFB39qQx8AsPWBqYZhJWX7cWFZVxqZ6GO827N3yLuv8MeczUvkMX84l9xbEkfxZjfPPYySqaQf4YaK0p71CgjcIinVa7blFCAoaW0kcKgoeIQ_NHWdv5I";

const AURA_GREEN = "#0a5d34";

const DROPDOWN_LINKS = ["Buy Property", "Commercial", "Agriculture"];
const SIMPLE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function PageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? "h-12 shadow-md" : "h-14 shadow-sm"
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_IMAGE} alt="Aura Infra Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-black hover:text-[#0a5d34] transition-colors font-semibold"
            activeOptions={{ exact: true }}
            activeProps={{ style: { color: AURA_GREEN, borderBottom: `2px solid ${AURA_GREEN}`, paddingBottom: "4px", fontWeight: 700 } }}
          >
            Home
          </Link>
          {DROPDOWN_LINKS.map((link) => (
            <div key={link} className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-black group-hover:text-[#0a5d34] transition-colors font-semibold">
                {link}
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </div>
            </div>
          ))}
          <Link
            to="/about"
            className="text-black hover:text-[#0a5d34] transition-colors font-semibold"
            activeProps={{ style: { color: AURA_GREEN, borderBottom: `2px solid ${AURA_GREEN}`, paddingBottom: "4px", fontWeight: 700 } }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-[#0a5d34] transition-colors font-semibold"
            activeProps={{ style: { color: AURA_GREEN, borderBottom: `2px solid ${AURA_GREEN}`, paddingBottom: "4px", fontWeight: 700 } }}
          >
            Contact
          </Link>
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-black hover:text-[#0a5d34] transition-colors">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
          </button>
          <div className="relative hidden sm:block">
            <button className="text-black hover:text-[#0a5d34] transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <span
              className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
              style={{ backgroundColor: AURA_GREEN }}
            >
              3
            </span>
          </div>
          <button
            className="lg:hidden text-[#151c27]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[28px]">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <ul className="lg:hidden bg-white shadow-lg p-4 space-y-3 font-semibold text-[#151c27]">
          {SIMPLE_LINKS.map((item) => (
            <li key={item.label} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <Link to={item.to} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          {DROPDOWN_LINKS.map((link) => (
            <li key={link} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              {link}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}