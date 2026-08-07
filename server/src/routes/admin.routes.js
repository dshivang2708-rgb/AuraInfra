import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  listAdminProjects,
  getAdminProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(requireAdmin);

router.get("/projects", listAdminProjects);
router.get("/projects/:id", getAdminProject);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.post("/upload", upload.single("image"), uploadImage);

export default router;