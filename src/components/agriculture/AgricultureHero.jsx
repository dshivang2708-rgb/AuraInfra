import { Link } from "@tanstack/react-router";

const FEATURE_POINTS = [
  {
    icon: "verified",
    title: "Verified Properties",
    text: "All properties are legally verified & genuine.",
  },
  {
    icon: "location_on",
    title: "Prime Locations",
    text: "Fertile lands in high potential areas.",
  },
  {
    icon: "trending_up",
    title: "Great Investment",
    text: "High returns with long term value.",
  },
];

export default function AgricultureHero() {
  return (
    <section
      className="relative py-16 px-4 md:px-12"
      style={{
        background:
          "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.3)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0zCCGyf4F7rtqtdFFGopJXagqEJFDMdKVHMBYiWgQgzF6BmS1-ufOw75N2-hALEA7XMaqJ8vBD7CRjiCgd4lnZ1RSoNU_Bj1Y8c-y0R5T1k0vk44R66VGhaIQbgQNlidEIbHtzjguLKWgKNNP7i3DI_vMmKXwAFfuGkWjxYj3FtiSzJjmtbvp7ZogIcORizkOLja46nEIeGU5f-1h5AKk5sBbszi3wvaiX9WSKzEw9Y2_fFpsjttCfq3mQXFFtOhkJw=w2400')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm mb-6 text-gray-600">
          <Link className="hover:underline" to="/">
            Home
          </Link>
          &nbsp;&gt;&nbsp; <span className="font-medium">Agriculture Properties</span>
        </nav>

        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Invest in Land.
            <br />
            <span className="text-[#1a6b32]">Harvest</span> the Future.
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Explore verified agricultural properties in prime locations and grow your tomorrow.
          </p>

          <div className="flex flex-nowrap gap-6 mb-12 overflow-x-auto">
            {FEATURE_POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-3 flex-shrink-0">
                <div className="p-2 bg-white rounded-full shadow-sm text-[#1a6b32]">
                  <span className="material-symbols-outlined text-xl">{point.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-sm whitespace-nowrap">{point.title}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1 border-r border-gray-100 pr-4">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">location_on</span>
              Location
            </label>
            <input
              className="border-none focus:ring-0 p-0 text-sm font-medium placeholder-gray-400"
              placeholder="Enter location"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1 border-r border-gray-100 pr-4">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">category</span>
              Property Type
            </label>
            <select className="border-none focus:ring-0 p-0 text-sm font-medium appearance-none">
              <option>All Types</option>
              <option>Agricultural Land</option>
              <option>Farmhouse</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 border-r border-gray-100 pr-4">
            <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">payments</span>
              Budget
            </label>
            <select className="border-none focus:ring-0 p-0 text-sm font-medium appearance-none">
              <option>Select budget</option>
              <option>Below 50L</option>
              <option>50L - 1Cr</option>
              <option>Above 1Cr</option>
            </select>
          </div>

          <button className="bg-[#1a6b32] hover:bg-[#145126] text-white rounded-lg py-3 px-6 flex items-center justify-center gap-2 font-medium transition-colors">
            Search Properties
            <span className="material-symbols-outlined text-base">search</span>
          </button>
        </div>
      </div>
    </section>
  );
}