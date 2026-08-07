import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "../../lib/supabaseClient.js";

export default function AdminSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setStatus("idle");
      return;
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/30 p-8 text-center">
          <span className="material-symbols-outlined text-[#1a6b32] text-4xl mb-3 block">mark_email_read</span>
          <h1 className="text-xl font-bold text-[#071837] mb-2">Check your email</h1>
          <p className="text-sm text-[#45464e] mb-6">
            We've sent a confirmation link to <strong>{email}</strong>. Confirm your email, then sign in.
          </p>
          <p className="text-xs text-[#75777f] bg-[#f0f3ff] rounded-lg p-3 mb-6">
            Note: new accounts don't have admin access by default. An existing admin needs to grant it to
            you separately.
          </p>
          <p className="text-xs text-[#75777f] mb-6">
            Didn't get it within a minute? Check spam, or{" "}
            <button
              type="button"
              onClick={handleSubmit}
              className="text-[#1a6b32] font-semibold hover:underline"
            >
              try sending again
            </button>
            .
          </p>
          <Link to="/admin/login" className="text-[#1a6b32] font-semibold hover:underline text-sm">
            Go to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#c5c6cf]/30 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#071837]">Create Admin Account</h1>
          <p className="text-sm text-[#45464e] mt-1">Sign up to request access to the admin panel</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
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
              minLength={6}
              required
            />
            <p className="text-xs text-[#75777f] mt-1">At least 6 characters.</p>
          </div>
          <button
            className="w-full bg-[#1a6b32] hover:bg-[#145126] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#45464e] mt-6">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-[#1a6b32] font-semibold hover:underline">
            Sign in
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