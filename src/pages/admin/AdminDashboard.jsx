import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import RequireAdmin from "../../components/admin/RequireAdmin.jsx";

function DashboardContent() {
  const { profile, signOut } = useAdminAuth();

  return (
    <main className="min-h-screen bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header className="bg-white border-b border-[#c5c6cf]/30 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-[#071837]">Aura Infra Admin</h1>
          <p className="text-xs text-[#45464e]">Signed in as {profile?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="text-sm font-semibold text-[#ba1a1a] hover:underline"
        >
          Sign Out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl border border-[#c5c6cf]/30 p-8 text-center">
          <span className="material-symbols-outlined text-[#1a6b32] text-4xl mb-3 block">
            construction
          </span>
          <h2 className="text-xl font-bold text-[#071837] mb-2">Project Management — Coming Next</h2>
          <p className="text-sm text-[#45464e] max-w-md mx-auto">
            This is where you'll list, add, and edit properties across Residential, Commercial,
            Agriculture, and Premium Projects, plus edit each project's description page. Step 2 of the
            build adds this here.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <DashboardContent />
    </RequireAdmin>
  );
}