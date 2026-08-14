import { useState } from "react";
import { api } from "../../lib/api.js";

const CONTACT_CARDS = [
  {
    icon: "location_on",
    title: "Visit Our Office",
    lines: ["SCO 16, 1st Floor, Sector 82-A, JLPL, SAS Nagar, Mohali, Punjab  140306 India"],
  },
  
  {
    icon: "mail",
    title: "Email Us",
    lines: ["aurainfraadmin@gmail.com"],
  },
  
];

const PHONE_NUMBER = "9670000093";
const PHONE_NUMBER_INTL = "91" + PHONE_NUMBER;

const SOCIAL_ICONS = ["public", "photo_camera", "work", "smart_display"];

const SUBJECTS = ["Property Inquiry", "Business Partnership", "Legal Support", "Other"];

const EMPTY_FORM = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ConnectSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitContactMessage(form);
      setStatus("sent");
      setForm(EMPTY_FORM);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Left: Contact cards */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="text-[32px] font-bold text-[#151c27] mb-4">
                Let's <span className="text-[#1a6b32]">Connect</span>
              </h2>
              <p className="text-[#45464e] text-base mb-8">
                Reach out to us through any of the following channels or send us a message.
              </p>
            </div>

            {CONTACT_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white p-4 rounded-xl border border-[#c5c6cf] flex items-start gap-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#1a6b32]/10 flex items-center justify-center text-[#1a6b32]">
                  <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-0.5 text-[#151c27]">{card.title}</h4>
                  {card.lines.map((line) => (
                    <p key={line} className="text-[#45464e] text-xs leading-relaxed">
                      {line}
                    </p>
                  ))}
                  {card.note && <p className="text-[#75777f] text-[11px] mt-0.5">{card.note}</p>}
                </div>
              </div>
            ))}

            <div className="bg-white p-4 rounded-xl border border-[#c5c6cf] flex items-start gap-3 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-[#1a6b32]/10 flex items-center justify-center text-[#1a6b32]">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold mb-0.5 text-[#151c27]">Call or WhatsApp Us</h4>
                <p className="text-[#45464e] text-xs leading-relaxed mb-2">+91 {PHONE_NUMBER}</p>
                <div className="flex gap-2">
                  <a
                    href={`tel:+${PHONE_NUMBER_INTL}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a6b32] text-white text-[11px] font-semibold hover:bg-[#154f26] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${PHONE_NUMBER_INTL}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold hover:bg-[#1ebe5b] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[18px] font-bold mb-4 text-[#151c27]">Follow Us</p>
              <div className="flex gap-4">
                {SOCIAL_ICONS.map((icon) => (
                  <a
                    key={icon}
                    className="w-10 h-10 rounded-full bg-white border border-[#c5c6cf] flex items-center justify-center text-[#071837] hover:bg-[#071837] hover:text-white transition-all"
                    href="#"
                    aria-label={icon}
                  >
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#c5c6cf]">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1 text-[#151c27]">Send Us a Message</h3>
              <p className="text-[#45464e] text-sm">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#151c27]">
                    Full Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-[#c5c6cf] bg-[#f9f9ff] focus:ring-2 focus:ring-[#005ac1]/20 focus:border-[#005ac1] outline-none transition-all placeholder:text-[#75777f] text-sm"
                    placeholder="Enter your full name"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#151c27]">
                    Phone Number <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-[#c5c6cf] bg-[#f9f9ff] focus:ring-2 focus:ring-[#005ac1]/20 focus:border-[#005ac1] outline-none transition-all placeholder:text-[#75777f] text-sm"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#151c27]">
                    Email Address <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-[#c5c6cf] bg-[#f9f9ff] focus:ring-2 focus:ring-[#005ac1]/20 focus:border-[#005ac1] outline-none transition-all placeholder:text-[#75777f] text-sm"
                    placeholder="Enter your email address"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#151c27]">
                    Subject <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-[#c5c6cf] bg-[#f9f9ff] focus:ring-2 focus:ring-[#005ac1]/20 focus:border-[#005ac1] outline-none transition-all text-sm"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    required
                  >
                    <option disabled value="">
                      Select a subject
                    </option>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-[#151c27]">
                  Message <span className="text-[#ba1a1a]">*</span>
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-[#c5c6cf] bg-[#f9f9ff] focus:ring-2 focus:ring-[#005ac1]/20 focus:border-[#005ac1] outline-none transition-all placeholder:text-[#75777f] text-sm resize-none"
                  placeholder="Type your message here..."
                  rows={4}
                  value={form.message}
                  onChange={handleChange("message")}
                  required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  className="mt-1 w-4 h-4 rounded border-[#c5c6cf] text-[#1a6b32] focus:ring-[#1a6b32]"
                  id="terms"
                  type="checkbox"
                  required
                />
                <label className="text-sm text-[#45464e] leading-tight" htmlFor="terms">
                  I agree to the{" "}
                  <a className="text-[#1a6b32] font-semibold hover:underline" href="#">
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a className="text-[#1a6b32] font-semibold hover:underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {status === "error" && <p className="text-sm text-[#ba1a1a]">{errorMsg}</p>}

              <div className="flex justify-end">
                <button
                  className="bg-[#1e2d4d] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#071837] transition-all shadow-md active:scale-95 disabled:opacity-70"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "idle" && (
                    <>
                      Send Message
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                      Sending...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      Sent!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      Try Again
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}