import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

// TODO: replace with the real Aura Infra logo once the file re-uploads correctly
const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCO97btawLVKEVIoFjH5CztvIxAka22_lw0pMUEkjFg52J_BeNMzFLBLM_dVvJWES6YAYRADKR4qDFG1-CUE1u5j00lWgWFPnv6qrWh4F8LnES2YZikYC-cmnsA7Mb6Dh0lsWx-a38EmS7Zla5g8l8L0k8Uily4E_cYFx-EAAu1cXjzx9Ste2pqF5D0veUTvNaUiesMuLSsNTVbPXqdd9oFt74zMkSf5zPPYUVPIfSxp5el_BRvWIt54T6DObinuuOwaGA";

const ChevronDown = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

// Category links that used to render as plain, non-clickable text with a
// decorative chevron — now real links to each listing page.
const CATEGORY_LINKS = [
  { label: "Residential", to: "/properties/residential" },
  { label: "Commercial", to: "/properties/commercial" },
  { label: "Agriculture", to: "/properties/agriculture" },
];

// This navbar is now built exactly like PageNavbar (the header used on
// About/Residential/Commercial/etc, where the mobile menu already works
// correctly): a `fixed` header sitting completely outside the page's normal
// layout flow, with the mobile dropdown as a plain block inside it. Because
// the header is fixed, growing it to show the dropdown can never collide
// with or get clipped by the hero section behind it — the same guarantee
// every other page already relies on.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? "h-12 bg-white shadow-md" : "h-24 md:h-28 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              alt="Aura Infra Logo"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-16" : "h-16 md:h-24"}`}
              src={LOGO_IMAGE}
            />
          </Link>
        </div>

        <ul className="hidden lg:flex items-center space-x-6 text-gray-800 font-medium">
          <li>
            <Link
              className="text-brand-green font-bold border-b-2 border-brand-green pb-1"
              to="/"
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
          </li>
          {CATEGORY_LINKS.map((link) => (
            <li key={link.label}>
              <Link className="flex items-center hover:text-brand-green" to={link.to}>
                {link.label}
                <ChevronDown />
              </Link>
            </li>
          ))}
          <li>
            <Link className="hover:text-brand-green" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="hover:text-brand-green" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul className="lg:hidden mt-4 bg-white rounded-xl shadow-lg border-t border-gray-200 p-4 space-y-3 text-gray-800 font-medium max-w-7xl mx-auto">
          <li className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          {CATEGORY_LINKS.map((link) => (
            <li key={link.label} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <Link to={link.to} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <Link to="/about" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
          </li>
          <li className="pb-2">
            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}