import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const { RESEND_API_KEY } = process.env;

if (!RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY. Copy server/.env.example to server/.env and fill in your Resend API key.");
}

export const resend = new Resend(RESEND_API_KEY);

// Sender address used for both the admin notification and the customer
// thank-you email. Until a domain is verified in Resend, this MUST stay as
// the default onboarding@resend.dev sandbox address, and Resend will only
// actually deliver to the email address on the Resend account itself.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "AuraInfra <onboarding@resend.dev>";
export const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "aurainfraadmin@gmail.com";