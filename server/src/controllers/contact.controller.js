import { resend, FROM_EMAIL, ADMIN_NOTIFY_EMAIL } from "../config/resend.js";
import { supabaseAdmin } from "../config/supabaseAdmin.js";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function createContactMessage(req, res) {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "Name, phone, email, subject and message are all required." });
  }

  // Best-effort record in the database — don't block the message if this fails.
  const { error: dbError } = await supabaseAdmin.from("contact_messages").insert({
    name,
    email,
    phone,
    subject,
    message,
  });
  if (dbError) {
    console.error("Failed to store contact message in database:", dbError.message);
  }

  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <h2 style="color:#1a6b32; margin-bottom: 4px;">New Contact Form Message</h2>
          <p style="margin-top:0;">A visitor submitted the "Send Us a Message" form on the contact page.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
            <tr><td style="padding:6px 0; color:#45464e;">Subject</td><td style="padding:6px 0;"><strong>${safeSubject}</strong></td></tr>
            <tr><td style="padding:6px 0; color:#45464e;">Name</td><td style="padding:6px 0;">${safeName}</td></tr>
            <tr><td style="padding:6px 0; color:#45464e;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
            <tr><td style="padding:6px 0; color:#45464e;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          </table>
          <p style="margin-top:16px; color:#45464e;">Message</p>
          <p style="white-space:pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error("Failed to send admin notification email:", mailErr);
    return res.status(502).json({ error: "Could not send your message right now. Please try again shortly." });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Thank you for contacting AuraInfra",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <p>Hi ${safeName},</p>
          <p>Thank you for reaching out to AuraInfra. We've received your message and our team will get back to you shortly.</p>
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