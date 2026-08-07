import { Router } from "express";
import { listPublicProjects, getPublicProject, listSectors } from "../controllers/projects.controller.js";

const router = Router();

router.get("/sectors", listSectors);
router.get("/", listPublicProjects);
router.get("/:category/:slug", getPublicProject);

export default router;