import { Link } from "@tanstack/react-router";

export default function UpcomingHero() {
  return (
    <section
      className="py-16 px-4 md:px-8 border-b border-gray-100"
      style={{
        background:
          "linear-gradient(rgba(7,24,55,0.75), rgba(7,24,55,0.55)) center center / cover no-repeat, url('https://lh3.googleusercontent.com/aida-public/AB6AXuCObCl7qpgX5Y2UhsEkUPx0hbCHWs2nwRPkIJQM3eBW38SVuARLCpKpZ0KQlSiLAq62uPPIzH3rY0AkpbMxWAuQAiuJF1iPHn8pUcZrLq9doc9K1PvN6BRqVq82Ef7077iYaQptYuHEDM0XQnLfueIknePH5jO5EEwVtsiXJtJufhNIes-QUw67KejrZ4tDvqilWBThCLHzDCCn2vvF_QCeVtakLX7eAh6RSDAIpzf7uDK-1z27_LDERCQ360eRQ_uq6Mc')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex text-sm text-gray-200 mb-6">
          <Link to="/" className="hover:text-green-300 cursor-pointer">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-white font-medium">Upcoming Projects</span>
        </nav>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            Upcoming Projects
            <br />
            Across <span className="text-green-400">Every Category</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            Get in early on residential, commercial, and agricultural projects that are launching soon.
          </p>
        </div>
      </div>
    </section>
  );
}