import { resend, FROM_EMAIL } from "../config/resend.js";
import { supabaseAdmin } from "../config/supabaseAdmin.js";
import {
  generateOtp,
  hashOtp,
  issueVerificationToken,
  normalizeEmail,
  safeCompareHex,
  OTP_EXPIRY_MINUTES,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "../config/otp.js";

const PURPOSE = "enquiry";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// POST /api/otp/send — { email } -> emails a 6-digit code to the address the
// customer typed into the "Enquire About This Project" form.
export async function sendEnquiryOtp(req, res) {
  const { email } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const normalizedEmail = normalizeEmail(email);

  // Cooldown so the "Send code" button can't be spammed.
  const { data: recent, error: recentError } = await supabaseAdmin
    .from("otp_verifications")
    .select("created_at")
    .eq("email", normalizedEmail)
    .eq("purpose", PURPOSE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recentError) {
    console.error("Failed to check recent OTP requests:", recentError.message);
  }

  if (recent?.created_at) {
    const secondsSinceLast = (Date.now() - new Date(recent.created_at).getTime()) / 1000;
    if (secondsSinceLast < OTP_RESEND_COOLDOWN_SECONDS) {
      return res.status(429).json({
        error: `Please wait ${Math.ceil(OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLast)}s before requesting another code.`,
        retryAfterSeconds: Math.ceil(OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLast),
      });
    }
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp, normalizedEmail);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();

  // Clear out any earlier unused codes for this email so only the latest one works.
  await supabaseAdmin
    .from("otp_verifications")
    .delete()
    .eq("email", normalizedEmail)
    .eq("purpose", PURPOSE)
    .eq("verified", false);

  const { error: insertError } = await supabaseAdmin.from("otp_verifications").insert({
    email: normalizedEmail,
    purpose: PURPOSE,
    otp_hash: otpHash,
    expires_at: expiresAt,
    attempts: 0,
    verified: false,
  });

  if (insertError) {
    console.error("Failed to store OTP:", insertError.message);
    return res.status(500).json({ error: "Could not send a verification code right now. Please try again." });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: normalizedEmail,
      subject: `Your AuraInfra verification code: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27;">
          <h2 style="color:#1a6b32; margin-bottom: 4px;">Verify your email</h2>
          <p style="margin-top:0;">Use the code below to confirm your email address and send your enquiry to AuraInfra.</p>
          <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; margin: 24px 0; color:#151c27;">${otp}</p>
          <p style="color:#45464e;">This code expires in ${OTP_EXPIRY_MINUTES} minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error("Failed to send OTP email:", mailErr);
    return res.status(502).json({ error: "Could not send the verification code right now. Please try again shortly." });
  }

  return res.status(200).json({ success: true, expiresInMinutes: OTP_EXPIRY_MINUTES });
}

// POST /api/otp/verify — { email, otp } -> on success, returns a short-lived
// signed token the frontend must send along with the actual enquiry submission.
export async function verifyEnquiryOtp(req, res) {
  const { email, otp } = req.body || {};

  if (!isValidEmail(email) || !otp || String(otp).trim().length !== 6) {
    return res.status(400).json({ error: "Please enter the 6-digit code sent to your email." });
  }

  const normalizedEmail = normalizeEmail(email);

  const { data: record, error: fetchError } = await supabaseAdmin
    .from("otp_verifications")
    .select("*")
    .eq("email", normalizedEmail)
    .eq("purpose", PURPOSE)
    .eq("verified", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error("Failed to fetch OTP record:", fetchError.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }

  if (!record) {
    return res.status(400).json({ error: "No pending verification for this email. Please request a new code." });
  }

  if (new Date(record.expires_at).getTime() < Date.now()) {
    return res.status(400).json({ error: "This code has expired. Please request a new one." });
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return res.status(429).json({ error: "Too many incorrect attempts. Please request a new code." });
  }

  const suppliedHash = hashOtp(otp, normalizedEmail);
  const matches = safeCompareHex(suppliedHash, record.otp_hash);

  if (!matches) {
    await supabaseAdmin
      .from("otp_verifications")
      .update({ attempts: record.attempts + 1 })
      .eq("id", record.id);
    return res.status(400).json({ error: "Incorrect code. Please check and try again." });
  }

  await supabaseAdmin.from("otp_verifications").update({ verified: true }).eq("id", record.id);

  const token = issueVerificationToken(normalizedEmail);
  return res.status(200).json({ success: true, verified: true, token });
}