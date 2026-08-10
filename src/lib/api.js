import { supabase } from "./supabaseClient.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false, isFormData = false } = {}) {
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  if (auth) Object.assign(headers, await authHeaders());

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

// ---------- Public ----------

export const api = {
  // Public reads — used by listing/detail pages
  listProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/projects${query ? `?${query}` : ""}`);
  },
  getProject: (category, slug) => request(`/api/projects/${category}/${slug}`),
  listSectors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/projects/sectors${query ? `?${query}` : ""}`);
  },
  listCities: () => request("/api/projects/cities"),

  // "Enquire About This Project" forms — public, no auth required.
  submitEnquiry: (payload) => request("/api/enquiries", { method: "POST", body: payload }),

  // Email OTP verification, used by the enquiry form before submission.
  sendEnquiryOtp: (email) => request("/api/otp/send", { method: "POST", body: { email } }),
  verifyEnquiryOtp: (email, otp) => request("/api/otp/verify", { method: "POST", body: { email, otp } }),

  // "Send Us a Message" contact page form — public, no auth required.
  submitContactMessage: (payload) => request("/api/contact", { method: "POST", body: payload }),

  // Footer "Stay Updated" newsletter signup — public, no auth required.
  subscribeNewsletter: (email) => request("/api/newsletter", { method: "POST", body: { email } }),

  // Admin — all require an authenticated admin session
  adminListProjects: (category) =>
    request(`/api/admin/projects${category ? `?category=${category}` : ""}`, { auth: true }),
  adminGetProject: (id) => request(`/api/admin/projects/${id}`, { auth: true }),
  adminCreateProject: (payload) => request("/api/admin/projects", { method: "POST", body: payload, auth: true }),
  adminUpdateProject: (id, payload) =>
    request(`/api/admin/projects/${id}`, { method: "PUT", body: payload, auth: true }),
  adminDeleteProject: (id) => request(`/api/admin/projects/${id}`, { method: "DELETE", auth: true }),

  async adminUploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    return request("/api/admin/upload", { method: "POST", body: formData, auth: true, isFormData: true });
  },

  // Same endpoint — the backend now accepts PDFs too (brochures) alongside images.
  async adminUploadFile(file) {
    const formData = new FormData();
    formData.append("image", file);
    return request("/api/admin/upload", { method: "POST", body: formData, auth: true, isFormData: true });
  },
};