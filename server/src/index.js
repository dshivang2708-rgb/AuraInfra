import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import enquiriesRoutes from "./routes/enquiries.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CLIENT_ORIGIN supports a comma-separated list, e.g.:
// "https://aurainfra.co.in,https://www.aurainfra.co.in,https://aura-infra.vercel.app"
// Trailing slashes are stripped so a stray "/" in the env var can't break CORS.
const ALLOWED_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin(requestOrigin, callback) {
      // Allow non-browser requests (no Origin header, e.g. curl/health checks).
      if (!requestOrigin) return callback(null, true);
      const normalized = requestOrigin.replace(/\/+$/, "");
      if (ALLOWED_ORIGINS.includes(normalized)) {
        return callback(null, true);
      }
      console.warn(`CORS blocked request from origin: ${requestOrigin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Basic rate limiting on all API routes to slow down brute-force/abuse.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Enquiry submissions send real emails (limited daily quota on Resend), so
// they get a tighter limit than the general API traffic above.
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many enquiries submitted. Please wait a while before trying again." },
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryLimiter, enquiriesRoutes);
app.use("/api/contact", enquiryLimiter, contactRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Aura Infra API listening on http://localhost:${PORT}`);
});