import axios from "axios";

// ────────────────
// Configuration de base
// ────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";


const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ────────────────
// Intercepteur : injecte le JWT automatiquement
// ────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ────────────────
// Intercepteur : rafraîchit le token si expiré (401)
// ────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post(`${API_BASE}/api/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access_token", data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ────────────────
// PATHS
// ────────────────

export const getPaths = () => api.get("/admin-panel/api/paths/").then((r) => r.data);
export const getPathById = (id) => api.get(`/admin-panel/api/paths/${id}/`).then((r) => r.data);
export const updatePath = (id, payload) => api.put(`/admin-panel/api/paths/${id}/`, payload).then((r) => r.data);
export const deletePath = (id) => api.delete(`/admin-panel/api/paths/${id}/`).then((r) => r.data);
export const approvePath = (id) => api.post(`/admin-panel/api/paths/${id}/approve/`).then((r) => r.data);
export const rejectPath = (id) => api.post(`/admin-panel/api/paths/${id}/reject/`).then((r) => r.data);
export const getPublicPaths = () => api.get("/admin-panel/api/paths/public/").then((r) => r.data);

// ────────────────
// CREATE PATH
// ────────────────
export const createPath = (formData) =>
  api.post("/admin-panel/api/paths/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);

// ────────────────
// USERS
// ────────────────
export const getConnectedUsers = () => api.get("/admin-panel/api/users/connected/").then((r) => r.data);

export default api;
