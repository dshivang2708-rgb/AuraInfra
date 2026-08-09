import { useState } from "react";
import { Link } from "@tanstack/react-router";

// TODO: replace with the real Aura Infra logo once the file re-uploads correctly
const LOGO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCO97btawLVKEVIoFjH5CztvIxAka22_lw0pMUEkjFg52J_BeNMzFLBLM_dVvJWES6YAYRADKR4qDFG1-CUE1u5j00lWgWFPnv6qrWh4F8LnES2YZikYC-cmnsA7Mb6Dh0lsWx-a38EmS7Zla5g8l8L0k8Uily4E_cYFx-EAAu1cXjzx9Ste2pqF5D0veUTvNaUiesMuLSsNTVbPXqdd9oFt74zMkSf5zPPYUVPIfSxp5el_BRvWIt54T6DObinuuOwaGA";

const ChevronDown = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

// Category links that used to render as plain, non-clickable text with a
// decorative chevron — now real links to each listing page.
const CATEGORY_LINKS = [
  { label: "Residential", to: "/properties/residential" },
  { label: "Commercial", to: "/properties/commercial" },
  { label: "Agriculture", to: "/properties/agriculture" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-10 w-full px-6 pt-0 pb-2 md:px-12 -mt-2">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img alt="Aura Infra Logo" className="h-20 md:h-28 w-auto object-contain" src={LOGO_IMAGE} />
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
          <button className="hidden sm:block text-gray-700 hover:text-brand-green">
            <HeartIcon />
          </button>
          <div className="relative hidden sm:block">
            <button className="text-gray-700 hover:text-brand-green">
              <BellIcon />
            </button>
            <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
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
        <ul className="lg:hidden mt-4 bg-white rounded-xl shadow-lg p-4 space-y-3 text-gray-800 font-medium max-w-7xl mx-auto">
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