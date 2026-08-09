import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const { OTP_TOKEN_SECRET } = process.env;

if (!OTP_TOKEN_SECRET) {
  throw new Error(
    "Missing OTP_TOKEN_SECRET. Copy server/.env.example to server/.env and set a long random string for it " +
      "(e.g. run `node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"`)."
  );
}

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
// How long a verified email stays "trusted" for actually submitting the
// enquiry after the OTP check succeeds.
export const OTP_TOKEN_EXPIRY_MINUTES = 30;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_SECONDS = 45;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function generateOtp() {
  // 6-digit numeric code, zero-padded (e.g. "004821").
  return crypto.randomInt(0, 1_000_000).toString().padStart(OTP_LENGTH, "0");
}

export function hashOtp(otp, email) {
  return crypto
    .createHmac("sha256", OTP_TOKEN_SECRET)
    .update(`${normalizeEmail(email)}:${String(otp).trim()}`)
    .digest("hex");
}

export function safeCompareHex(a, b) {
  try {
    const bufA = Buffer.from(String(a), "hex");
    const bufB = Buffer.from(String(b), "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Signed, stateless "this email was just verified via OTP" token handed back
// to the frontend. The enquiry-submission endpoint checks the signature and
// expiry instead of hitting the database again — it can't be forged without
// OTP_TOKEN_SECRET, can't be reused for a different email, and expires on
// its own without needing any cleanup job.
export function issueVerificationToken(email) {
  const normalizedEmail = normalizeEmail(email);
  const expiresAt = Date.now() + OTP_TOKEN_EXPIRY_MINUTES * 60 * 1000;
  const payload = `${normalizedEmail}|${expiresAt}`;
  const signature = crypto.createHmac("sha256", OTP_TOKEN_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}|${signature}`, "utf8").toString("base64url");
}

export function verifyVerificationToken(token, email) {
  try {
    const decoded = Buffer.from(String(token), "base64url").toString("utf8");
    const [tokenEmail, expiresAtStr, signature] = decoded.split("|");
    if (!tokenEmail || !expiresAtStr || !signature) return false;

    const payload = `${tokenEmail}|${expiresAtStr}`;
    const expectedSignature = crypto.createHmac("sha256", OTP_TOKEN_SECRET).update(payload).digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSignature, "hex");
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return false;
    }

    if (Date.now() > Number(expiresAtStr)) return false;
    if (tokenEmail !== normalizeEmail(email)) return false;

    return true;
  } catch {
    return false;
  }
}