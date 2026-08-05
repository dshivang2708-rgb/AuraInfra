import { supabaseAdmin } from "../config/supabaseAdmin.js";

/**
 * Verifies the Supabase access token sent by the frontend (Authorization: Bearer <token>),
 * then checks the user has role = 'admin' in the profiles table.
 * Attaches the verified user to req.user on success.
 */
export async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(403).json({ error: "No profile found for this account" });
    }

    if (profile.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = userData.user;
    req.userRole = profile.role;
    next();
  } catch (err) {
    console.error("requireAdmin error:", err);
    res.status(500).json({ error: "Authentication check failed" });
  }
}