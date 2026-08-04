import { Link } from "@tanstack/react-router";
import { MapPin, Building2, Wallet, Search } from "lucide-react";

export default function CommercialHero() {
  return (
    <section
      className="py-16 px-4 md:px-8 border-b border-gray-100"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuDG-R0g-pycJ1SeyjueQ2eoJG-PZ_JvBrmsIi08MOBf7GSMXywC5hla16GLkGGeErLTnYRGS1etNlR80lNFgppBoXrAnQ-vjaRToI5nq9lECn52ZUpLRwkyoFlzlOAnZ9Nbd20gobpZvTbkjQG3RZpYtCvXmqvEi7vb8sjSuwQdxze0KlrYxKbCOAh5wZbdfgUFp5S-WaDPqS64gxreLVTA4FWdaqrGJH8tjr7mGVmAJjKQ5livbK9CXA-w7Grpx8cfOQ=w2400')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex text-sm text-gray-200 mb-6">
          <Link to="/" className="hover:text-green-300 cursor-pointer">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-white font-medium">Commercial Properties</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            Commercial Properties
            <br />
            For Every <span className="text-green-400">Business Need</span>
          </h1>
          <p className="max-w-2xl text-lg text-white">
            Discover premium commercial spaces in prime locations that elevate your business to the
            next level.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-4 max-w-6xl">
          <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-100 last:border-0 w-full">
            <div className="bg-[#eaf4ef] p-2 rounded-lg text-[#1a6b32]">
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Location
              </label>
              <input
                className="w-full border-0 p-0 focus:ring-0 text-sm font-medium placeholder-gray-400"
                placeholder="Enter location"
                type="text"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-100 last:border-0 w-full">
            <div className="bg-[#eaf4ef] p-2 rounded-lg text-[#1a6b32]">
              <Building2 size={20} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Property Type
              </label>
              <select className="w-full border-0 p-0 focus:ring-0 text-sm font-medium bg-transparent">
                <option>All Types</option>
                <option>Office Space</option>
                <option>Retail Space</option>
              </select>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 px-4 border-r border-gray-100 last:border-0 w-full">
            <div className="bg-[#eaf4ef] p-2 rounded-lg text-[#1a6b32]">
              <Wallet size={20} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Budget
              </label>
              <select className="w-full border-0 p-0 focus:ring-0 text-sm font-medium bg-transparent">
                <option>Select budget</option>
                <option>1 Cr - 5 Cr</option>
                <option>5 Cr - 10 Cr</option>
              </select>
            </div>
          </div>

          <button className="bg-[#1a6b32] hover:bg-[#145126] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all w-full md:w-auto justify-center">
            Search Properties
            <Search size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}