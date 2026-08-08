import { randomUUID } from "crypto";
import { supabaseAdmin } from "../config/supabaseAdmin.js";

const BUCKET = "project-images";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "application/pdf"];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB — covers brochure PDFs as well as images

export async function uploadImage(req, res) {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded (field name: image)" });

  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return res.status(400).json({ error: `Unsupported file type: ${file.mimetype}` });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return res.status(400).json({ error: "File too large (max 8MB)" });
  }

  const ext = file.originalname.split(".").pop();
  const path = `${req.user.id}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (uploadError) return res.status(500).json({ error: uploadError.message });

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  res.status(201).json({ url: data.publicUrl, path });
}