import { resend, FROM_EMAIL, ADMIN_NOTIFY_EMAIL } from "../config/resend.js";
import { supabaseAdmin } from "../config/supabaseAdmin.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function subscribeNewsletter(req, res) {
  const { email } = req.body || {};

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { error: dbError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .insert({ email: normalizedEmail });

  if (dbError) {
    // Unique violation — they're already on the list. Treat as a friendly
    // success rather than an error so re-submitting doesn't look broken.
    if (dbError.code === "23505") {
      return res.status(200).json({ success: true, alreadySubscribed: true });
    }
    console.error("Failed to store newsletter subscriber:", dbError.message);
    return res.status(502).json({ error: "Could not subscribe right now. Please try again shortly." });
  }

  const safeEmail = escapeHtml(normalizedEmail);

  // Best-effort notification + welcome emails — don't fail the request if
  // either of these doesn't go through, the subscriber is already saved.
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_NOTIFY_EMAIL,
      subject: "New Newsletter Subscriber",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <h2 style="color:#1a6b32; margin-bottom: 4px;">New Newsletter Subscriber</h2>
          <p>A visitor subscribed to the newsletter from the footer: <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error("Failed to send admin notification email:", mailErr);
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: normalizedEmail,
      subject: "You're subscribed to AuraInfra updates",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <p>Hi there,</p>
          <p>Thanks for subscribing! You'll now get the latest news and property offers from AuraInfra straight to your inbox.</p>
          <br/>
          <p>Warm regards,<br/>Team AuraInfra</p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error("Failed to send subscriber welcome email:", mailErr);
  }

  return res.status(201).json({ success: true });
}