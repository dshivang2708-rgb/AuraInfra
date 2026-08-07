import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import PageNavbar from "../components/PageNavbar.jsx";
import { api } from "../lib/api.js";
import { toPremiumDetail } from "../lib/adapters.js";

const AMENITIES = [
  { icon: "pool", label: "Swimming Pool" },
  { icon: "fitness_center", label: "Gym" },
  { icon: "park", label: "Landscaped Gardens" },
  { icon: "security", label: "24x7 Security" },
  { icon: "local_parking", label: "Ample Parking" },
  { icon: "groups", label: "Clubhouse" },
];

export default function PremiumProjectDetail() {
  const { slug } = useParams({ strict: false });
  const [project, setProject] = useState(null);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let active = true;
    api
      .getProject("premium", slug)
      .then((row) => {
        if (active) {
          setProject(toPremiumDetail(row));
          setLoadStatus("found");
        }
      })
      .catch(() => active && setLoadStatus("not-found"));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loadStatus === "loading") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </main>
      </>
    );
  }

  if (loadStatus === "not-found") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <Link to="/properties/premium-projects" className="text-[#1a6b32] font-semibold hover:underline">
            Back to Premium Projects
          </Link>
        </main>
      </>
    );
  }

  const description = `${project.name} by ${project.builder} offers premium residences in ${project.location}, combining thoughtful design, quality construction, and a full suite of modern amenities.`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
    }, 1000);
  };

  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-slate-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link className="hover:text-[#1a6b32]" to="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link className="hover:text-[#1a6b32]" to="/properties/premium-projects">
              Premium Projects
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-gray-900 font-medium">{project.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-80 md:h-96">
                  <img alt={project.name} className="w-full h-full object-cover" src={project.image} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-slate-700">{project.builder}</span>
                  </div>
                  <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Premium Project
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    {project.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-8">{description}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-[#1a6b32] hover:bg-[#145126] text-white text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-base">download</span> Download Brochure
                    </button>
                    <button className="flex-1 border border-[#1a6b32] text-[#1a6b32] hover:bg-[#eaf4ef] text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-base">calendar_today</span> Schedule Site Visit
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Amenities</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 text-center">
                  {AMENITIES.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#eaf4ef] flex items-center justify-center text-[#1a6b32]">
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-[#eaf4ef] rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{project.price}</h2>
                <p className="text-sm text-gray-500 mb-6">Starting Price</p>
                <button className="w-full bg-[#1a6b32] hover:bg-[#145126] text-white py-3 rounded-lg font-semibold transition-colors mb-4 flex justify-center items-center gap-2">
                  Enquire Now <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Or Call Us</p>
                  <a className="text-lg font-bold text-[#1a6b32] flex items-center justify-center gap-2" href="tel:+919876543210">
                    <span className="material-symbols-outlined text-base">call</span> +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Enquire About This Project</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]" placeholder="Your Name" type="text" required />
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]" placeholder="Phone Number" type="tel" required />
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]" placeholder="Email Address" type="email" required />
                  <button
                    className="w-full bg-[#1a6b32] hover:bg-[#145126] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-70"
                    type="submit"
                    disabled={status !== "idle"}
                  >
                    {status === "idle" && "Send Enquiry"}
                    {status === "sending" && "Sending..."}
                    {status === "sent" && "Enquiry Sent!"}
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}