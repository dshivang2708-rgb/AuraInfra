import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// Frontend calls this after signing in (via Supabase Auth directly) to confirm
// the session is valid AND the account has admin role.
router.get("/me", requireAdmin, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.userRole,
  });
});

export default router;
