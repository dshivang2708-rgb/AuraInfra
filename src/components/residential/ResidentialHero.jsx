import { Link } from "@tanstack/react-router";

const TRUST_BADGES = [
  { icon: "fa-regular fa-circle-check", title: "Verified Listings", text: "100% verified properties" },
  { icon: "fa-solid fa-location-dot", title: "Best Locations", text: "Prime residential areas" },
  { icon: "fa-solid fa-users", title: "Trusted by Thousands", text: "Happy customers" },
  { icon: "fa-solid fa-tag", title: "Great Value", text: "Best price guaranteed" },
];

export default function ResidentialHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        alt="Property Banner"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfLIZ05qanAW01aKSoWpOsDOa5uZYPt7A96igETkhKoci2fDErbI41xGpEYDcWjI7Eia0mXCoM06mppx-TKqlJYtyZEVVVsveeLom8OY-BlIWzizYJei4mNbaK4YmLZaeOj-mz-WflniDBkOjH8VLBolW5fWHVHMqNr1CuOg_HpC3dy8iRg9UWE3IeVmZyC1iLcJAbZSsLoXGwPpb_nBQruxFl8gAmod6MJEWUKAUdSI8kxD1DmaxfVfpXiduLA0pRIg=w2400"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-14 md:py-16 flex flex-col justify-center text-white min-h-[300px]">
        <nav className="text-sm mb-4">
          <ol className="flex flex-wrap space-x-2 items-center">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-chevron-right text-[10px]" /> Explore by Category
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-chevron-right text-[10px]" />
              <span className="text-white font-semibold">Residential</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Residential <span className="text-green-400">Properties</span>
        </h1>
        <p className="max-w-xl text-gray-200">
          Discover premium residential properties that offer comfort, convenience and a better
          lifestyle.
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-8 mt-6 sm:mt-8 text-xs md:text-sm">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="flex items-center gap-2">
              <i className={`${badge.icon} text-green-400 text-xl`} />
              <div>
                <p className="font-bold">{badge.title}</p>
                <p className="text-gray-300">{badge.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}