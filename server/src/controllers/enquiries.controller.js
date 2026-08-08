import { resend, FROM_EMAIL, ADMIN_NOTIFY_EMAIL } from "../config/resend.js";
import { supabaseAdmin } from "../config/supabaseAdmin.js";

const CATEGORY_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  agriculture: "Agriculture",
  premium: "Premium Project",
};

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function createEnquiry(req, res) {
  const { name, email, phone, message, interestedIn, projectName, projectSlug, category } = req.body || {};

  if (!name || !email || !phone || !projectName) {
    return res.status(400).json({ error: "Name, email, phone and project are required." });
  }

  const categoryLabel = CATEGORY_LABELS[category] || "Property";

  // Store the lead so admins have a permanent record even if an email bounces.
  // Best-effort — a DB hiccup should never block the enquiry from reaching the admin's inbox.
  const { error: dbError } = await supabaseAdmin.from("enquiries").insert({
    name,
    email,
    phone,
    message: message || null,
    interested_in: interestedIn || null,
    project_name: projectName,
    project_slug: projectSlug || null,
    category: category || null,
  });
  if (dbError) {
    console.error("Failed to store enquiry in database:", dbError.message);
  }

  const safeName = escapeHtml(name);
  const safeProject = escapeHtml(projectName);
  const safeMessage = escapeHtml(message);
  const safeInterest = escapeHtml(interestedIn);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Enquiry: ${projectName} (${categoryLabel})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <h2 style="color:#1a6b32; margin-bottom: 4px;">New Project Enquiry</h2>
          <p style="margin-top:0;">A customer submitted an enquiry through the website.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
            <tr><td style="padding:6px 0; color:#45464e;">Project</td><td style="padding:6px 0;"><strong>${safeProject}</strong> (${categoryLabel})</td></tr>
            ${interestedIn ? `<tr><td style="padding:6px 0; color:#45464e;">Interested in</td><td style="padding:6px 0;">${safeInterest}</td></tr>` : ""}
            <tr><td style="padding:6px 0; color:#45464e;">Name</td><td style="padding:6px 0;">${safeName}</td></tr>
            <tr><td style="padding:6px 0; color:#45464e;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
            <tr><td style="padding:6px 0; color:#45464e;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          </table>
          ${message ? `<p style="margin-top:16px; color:#45464e;">Message</p><p style="white-space:pre-wrap;">${safeMessage}</p>` : ""}
        </div>
      `,
    });
  } catch (mailErr) {
    console.error("Failed to send admin notification email:", mailErr);
    return res.status(502).json({ error: "Could not send your enquiry right now. Please try again shortly." });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Thank you for your interest in ${projectName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <p>Hi ${safeName},</p>
          <p>Thank you for your enquiry about <strong>${safeProject}</strong>. Our team has received your details and will get in touch with you shortly.</p>
          <p>If you have any urgent questions in the meantime, feel free to call us at <a href="tel:+919876543210">+91 98765 43210</a>.</p>
          <br/>
          <p>Warm regards,<br/>Team AuraInfra</p>
        </div>
      `,
    });
  } catch (mailErr) {
    // The admin was already notified above — don't fail the whole request just
    // because the customer-facing confirmation email didn't go through.
    console.error("Failed to send customer thank-you email:", mailErr);
  }

  return res.status(201).json({ success: true });
}