import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import RequireAdmin from "../../components/admin/RequireAdmin.jsx";
import ResidentialProjectForm from "./forms/ResidentialProjectForm.jsx";
import CommercialProjectForm from "./forms/CommercialProjectForm.jsx";
import AgricultureProjectForm from "./forms/AgricultureProjectForm.jsx";
import PremiumProjectForm from "./forms/PremiumProjectForm.jsx";
import { api } from "../../lib/api.js";

const CATEGORIES = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "agriculture", label: "Agriculture" },
  { key: "premium", label: "Premium" },
];

// Every category now has its own dedicated form component (see ./forms/)
// with fields that map 1:1 onto that category's detail-page tabs.
function formComponentFor(category) {
  switch (category) {
    case "residential":
      return ResidentialProjectForm;
    case "commercial":
      return CommercialProjectForm;
    case "agriculture":
      return AgricultureProjectForm;
    case "premium":
      return PremiumProjectForm;
    default:
      return ResidentialProjectForm;
  }
}

function ProjectsManager() {
  const { profile, signOut } = useAdminAuth();
  const [category, setCategory] = useState("residential");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState({ mode: "list" }); // { mode: 'list' } | { mode: 'create' } | { mode: 'edit', project }

  useEffect(() => {
    if (view.mode !== "list") return;
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, view.mode]);

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await api.adminListProjects(category);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(project) {
    if (!confirm(`Delete "${project.name}"? This can't be undone.`)) return;
    try {
      await api.adminDeleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header className="bg-white border-b border-[#c5c6cf]/30 px-4 sm:px-8 py-4 flex justify-between items-center gap-3">
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#071837] truncate">Aura Infra Admin</h1>
          <p className="text-xs text-[#45464e] truncate">Signed in as {profile?.email}</p>
        </div>
        <button onClick={signOut} className="shrink-0 text-sm font-semibold text-[#ba1a1a] hover:underline">
          Sign Out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {view.mode === "list" && (
          <>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      category === c.key
                        ? "bg-[#1a6b32] text-white"
                        : "bg-white border border-[#c5c6cf] text-[#45464e] hover:border-[#1a6b32]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setView({ mode: "create" })}
                className="w-full sm:w-auto sm:self-end bg-[#1a6b32] hover:bg-[#145126] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add {CATEGORIES.find((c) => c.key === category)?.label} Project
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <p className="text-sm text-[#45464e]">Loading projects...</p>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#c5c6cf]/30 p-10 text-center text-sm text-[#45464e]">
                No {category} projects yet. Click "Add" above to create one.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#c5c6cf]/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-[#f0f3ff] text-[#45464e] text-xs uppercase">
                      <tr>
                        <th className="text-left px-5 py-3">Project</th>
                        <th className="text-left px-5 py-3">Location</th>
                        <th className="text-left px-5 py-3">Price</th>
                        <th className="text-left px-5 py-3">Status</th>
                        <th className="text-right px-5 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.id} className="border-t border-[#c5c6cf]/20">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {p.main_image && (
                                <img src={p.main_image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="font-bold text-[#151c27] truncate">{p.name}</p>
                                <p className="text-xs text-[#75777f] truncate">/{p.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-[#45464e]">{p.location}</td>
                          <td className="px-5 py-3 text-[#1a6b32] font-semibold">{p.price_display || "—"}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-1 rounded whitespace-nowrap ${
                                p.is_published ? "bg-[#eaf4ef] text-[#1a6b32]" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {p.is_published ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                            <button
                              onClick={() => setView({ mode: "edit", project: p })}
                              className="text-[#1a6b32] font-semibold hover:underline text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="text-[#ba1a1a] font-semibold hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {view.mode === "create" && (
          <>
            <button
              onClick={() => setView({ mode: "list" })}
              className="text-sm text-[#45464e] hover:text-[#1a6b32] mb-4 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span> Back to list
            </button>
            {(() => {
              const FormComponent = formComponentFor(category);
              return (
                <FormComponent
                  onSaved={() => setView({ mode: "list" })}
                  onCancel={() => setView({ mode: "list" })}
                />
              );
            })()}
          </>
        )}

        {view.mode === "edit" && (
          <>
            <button
              onClick={() => setView({ mode: "list" })}
              className="text-sm text-[#45464e] hover:text-[#1a6b32] mb-4 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span> Back to list
            </button>
            {(() => {
              const FormComponent = formComponentFor(view.project.category);
              return (
                <FormComponent
                  project={view.project}
                  onSaved={() => setView({ mode: "list" })}
                  onCancel={() => setView({ mode: "list" })}
                />
              );
            })()}
          </>
        )}
      </div>
    </main>
  );
}

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <ProjectsManager />
    </RequireAdmin>
  );
}