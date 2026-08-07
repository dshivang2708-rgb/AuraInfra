import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";

/**
 * Client-side route guard for admin pages.
 * Uses the AdminAuthContext (backed by Supabase auth + the `profiles` table)
 * to confirm the visitor is signed in AND has role = 'admin'.
 * Redirects to /admin/login otherwise. Actual authorization is still
 * enforced server-side by requireAdmin middleware / RLS — this only
 * gates the UI.
 */
export default function RequireAdmin({ children }) {
  const { session, profile, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate({ to: "/admin/login" });
      return;
    }
    if (profile && !isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, profile, isAdmin, navigate]);

  if (loading || !session || !isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
        <p className="text-sm text-[#45464e]">Checking access…</p>
      </main>
    );
  }

  return children;
}