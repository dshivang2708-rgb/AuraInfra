import { Router } from "express";
import { listPublicProjects, getPublicProject, listSectors, listCities } from "../controllers/projects.controller.js";

const router = Router();

router.get("/sectors", listSectors);
router.get("/cities", listCities);
router.get("/", listPublicProjects);
router.get("/:category/:slug", getPublicProject);

export default router;