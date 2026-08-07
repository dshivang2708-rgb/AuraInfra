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
  listSectors: () => request("/api/projects/sectors"),

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
};