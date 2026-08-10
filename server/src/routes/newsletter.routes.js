import { Router } from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/", subscribeNewsletter);

export default router;