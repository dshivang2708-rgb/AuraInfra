import { Router } from "express";
import { sendEnquiryOtp, verifyEnquiryOtp } from "../controllers/otp.controller.js";

const router = Router();

router.post("/send", sendEnquiryOtp);
router.post("/verify", verifyEnquiryOtp);

export default router;