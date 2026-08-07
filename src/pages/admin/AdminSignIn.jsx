import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../../lib/supabaseClient.js";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resendStatus, setResendStatus] = useState("idle"); // idle | sending | sent
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUnconfirmed(false);
    setResendStatus("idle");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      // Supabase returns this specific message when the account exists but
      // the confirmation link hasn't been clicked yet.
      if (signInError.message?.toLowerCase().includes("email not confirmed")) {
        setUnconfirmed(true);
      }
      setError(signInError.message);
      return;
    }
    navigate({ to: "/admin/dashboard" });
  };

  const handleResend = async () => {
    setResendStatus("sending");
    const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
    if (resendError) {
      setError(resendError.message);
      setResendStatus("idle");
      return;
    }
    setResendStatus("sent");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/30 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#071837]">Admin Sign In</h1>
          <p className="text-sm text-[#45464e] mt-1">Sign in to manage Aura Infra listings</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
            {unconfirmed && (
              <div className="mt-2">
                {resendStatus === "sent" ? (
                  <p className="text-green-700 text-sm">Confirmation email resent — check your inbox (and spam folder).</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendStatus === "sending"}
                    className="text-red-800 font-semibold underline text-sm disabled:opacity-60"
                  >
                    {resendStatus === "sending" ? "Resending..." : "Resend confirmation email"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-[#151c27] mb-1">Email</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-[#c5c6cf] focus:ring-2 focus:ring-[#1a6b32]/20 focus:border-[#1a6b32] outline-none text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#151c27] mb-1">Password</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-[#c5c6cf] focus:ring-2 focus:ring-[#1a6b32]/20 focus:border-[#1a6b32] outline-none text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-[#1a6b32] hover:bg-[#145126] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#45464e] mt-6">
          Don't have an account?{" "}
          <Link to="/admin/signup" className="text-[#1a6b32] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-xs text-[#75777f] mt-4">
          <Link to="/" className="hover:text-[#1a6b32]">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}