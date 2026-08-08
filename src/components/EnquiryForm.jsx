import { useState } from "react";
import { api } from "../lib/api.js";

const EMPTY_FORM = { name: "", phone: "", email: "", interestedIn: "", message: "" };

/**
 * "Enquire About This Project" form. Shared across all four project-detail
 * pages (residential / commercial / agriculture / premium) — each page passes
 * its own class names so the existing visual style is preserved exactly.
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
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        interestedIn: form.interestedIn || undefined,
        message: form.message || undefined,
        projectName,
        projectSlug,
        category,
      });
      setStatus("sent");
      setForm(EMPTY_FORM);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
      <button className={buttonClassName} type="submit" disabled={status === "sending"}>
        {status === "idle" && "Send Enquiry"}
        {status === "sending" && "Sending..."}
        {status === "sent" && "Enquiry Sent!"}
        {status === "error" && "Try Again"}
      </button>
      {footNote && <p className={footNoteClassName}>{footNote}</p>}
    </form>
  );
}