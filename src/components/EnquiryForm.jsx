import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api.js";

const EMPTY_FORM = { name: "", phone: "", email: "", interestedIn: "", message: "" };
const RESEND_COOLDOWN_SECONDS = 45;

/**
 * "Enquire About This Project" form. Shared across all four project-detail
 * pages (residential / commercial / agriculture / premium) — each page passes
 * its own class names so the existing visual style is preserved exactly.
 *
 * Flow:
 *   1. Customer fills the form and clicks "Send Enquiry" -> we email a 6-digit
 *      OTP to the address they typed (via /api/otp/send).
 *   2. Customer enters the code -> we verify it (via /api/otp/verify), which
 *      returns a short-lived signed token proving that email was confirmed.
 *   3. We submit the enquiry together with that token; the backend rejects
 *      the enquiry if the token is missing/expired/for a different email.
 */
export default function EnquiryForm({
  projectName,
  projectSlug,
  category,
  interestOptions = [],
  showMessageField = true,
  inputClassName = "",
  selectClassName = "",
  textareaClassName = "",
  buttonClassName = "",
  footNote = "Our team will get in touch with you shortly.",
  footNoteClassName = "",
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [otp, setOtp] = useState("");
  // idle | sending-otp | otp-sent | verifying | submitting | sent | error
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(cooldownRef.current);
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const isOtpStep = status === "otp-sent" || status === "verifying";

  // Step 1: validate the form, then email the OTP instead of submitting directly.
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setStatus("sending-otp");
    setErrorMsg("");
    try {
      await api.sendEnquiryOtp(form.email);
      setOtp("");
      setStatus("otp-sent");
      startCooldown();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not send a verification code. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setErrorMsg("");
    try {
      await api.sendEnquiryOtp(form.email);
      setOtp("");
      startCooldown();
    } catch (err) {
      setErrorMsg(err.message || "Could not resend the code. Please try again.");
    }
  };

  const handleChangeEmail = () => {
    clearInterval(cooldownRef.current);
    setCooldown(0);
    setOtp("");
    setStatus("idle");
    setErrorMsg("");
  };

  // Step 2: verify the code, then submit the enquiry with the resulting token.
  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setStatus("verifying");
    setErrorMsg("");
    try {
      const { token } = await api.verifyEnquiryOtp(form.email, otp);

      setStatus("submitting");
      await api.submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        interestedIn: form.interestedIn || undefined,
        message: form.message || undefined,
        projectName,
        projectSlug,
        category,
        otpToken: token,
      });

      clearInterval(cooldownRef.current);
      setCooldown(0);
      setStatus("sent");
      setForm(EMPTY_FORM);
      setOtp("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("otp-sent");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (isOtpStep) {
    const verifying = status === "verifying" || status === "submitting";
    return (
      <form className="space-y-4" onSubmit={handleVerifyAndSubmit}>
        <p className="text-sm text-gray-600">
          We&apos;ve sent a 6-digit code to <strong>{form.email}</strong>. Enter it below to send your enquiry.
        </p>
        <input
          className={inputClassName}
          placeholder="Enter 6-digit code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          required
        />
        {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
        <button className={buttonClassName} type="submit" disabled={verifying || otp.length !== 6}>
          {status === "verifying" && "Verifying..."}
          {status === "submitting" && "Sending Enquiry..."}
          {status !== "verifying" && status !== "submitting" && "Verify & Send Enquiry"}
        </button>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <button type="button" className="underline hover:text-gray-700" onClick={handleChangeEmail} disabled={verifying}>
            Change email
          </button>
          <button
            type="button"
            className="underline hover:text-gray-700 disabled:no-underline disabled:opacity-60"
            onClick={handleResendOtp}
            disabled={cooldown > 0 || verifying}
          >
            {cooldown > 0 ? `Resend code (${cooldown}s)` : "Resend code"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSendOtp}>
      <input
        className={inputClassName}
        placeholder="Your Name"
        type="text"
        value={form.name}
        onChange={handleChange("name")}
        required
      />
      <input
        className={inputClassName}
        placeholder="Phone Number"
        type="tel"
        value={form.phone}
        onChange={handleChange("phone")}
        required
      />
      <input
        className={inputClassName}
        placeholder="Email Address"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        required
      />
      {interestOptions.length > 0 && (
        <select className={selectClassName} value={form.interestedIn} onChange={handleChange("interestedIn")}>
          <option value="">I'm interested in</option>
          {interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {showMessageField && (
        <textarea
          className={textareaClassName}
          placeholder="Message"
          rows={3}
          value={form.message}
          onChange={handleChange("message")}
        />
      )}
      {status === "error" && <p className="text-xs text-red-600">{errorMsg}</p>}
      <button className={buttonClassName} type="submit" disabled={status === "sending-otp"}>
        {status === "idle" && "Send Enquiry"}
        {status === "sending-otp" && "Sending Code..."}
        {status === "sent" && "Enquiry Sent!"}
        {status === "error" && "Try Again"}
      </button>
      {footNote && <p className={footNoteClassName}>{footNote}</p>}
    </form>
  );
}