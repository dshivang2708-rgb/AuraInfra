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
      className="relative pt-6 pb-12 px-4 md:px-12"
      style={{
        background:
          "linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.1)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0zCCGyf4F7rtqtdFFGopJXagqEJFDMdKVHMBYiWgQgzF6BmS1-ufOw75N2-hALEA7XMaqJ8vBD7CRjiCgd4lnZ1RSoNU_Bj1Y8c-y0R5T1k0vk44R66VGhaIQbgQNlidEIbHtzjguLKWgKNNP7i3DI_vMmKXwAFfuGkWjxYj3FtiSzJjmtbvp7ZogIcORizkOLja46nEIeGU5f-1h5AKk5sBbszi3wvaiX9WSKzEw9Y2_fFpsjttCfq3mQXFFtOhkJw=w2400')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm mb-4 text-gray-600">
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
          <p className="text-gray-600 text-lg mb-6">
            Explore verified agricultural properties in prime locations and grow your tomorrow.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          {FEATURE_POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-3 sm:flex-1 sm:min-w-0">
              <div className="p-2 bg-white rounded-full shadow-sm text-[#1a6b32] flex-shrink-0">
                <span className="material-symbols-outlined text-xl">{point.icon}</span>
              </div>
              <div>
                <p className="font-bold text-sm">{point.title}</p>
                <p className="text-xs text-gray-500">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}