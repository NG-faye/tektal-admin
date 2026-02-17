import axios from "axios";

// ─────────────────────────────────────────
// Configuration de base
// ─────────────────────────────────────────
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────────
// Intercepteur : injecte le JWT automatiquement
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// Intercepteur : rafraîchit le token si expiré (401)
// ─────────────────────────────────────────
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
        // Refresh échoué → déconnexion
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────
// PATHS
// ─────────────────────────────────────────

/** GET /api/paths/ — Liste de tous les paths */
export const getPaths = () => api.get("/api/paths/").then((r) => r.data);

/** GET /api/paths/:id/ — Détail d'un path */
export const getPathById = (id) =>
  api.get(`/api/paths/${id}/`).then((r) => r.data);

/** PUT /api/paths/:id/ — Modifier un path */
export const updatePath = (id, payload) =>
  api.put(`/api/paths/${id}/`, payload).then((r) => r.data);

/** DELETE /api/paths/:id/ — Supprimer un path */
export const deletePath = (id) =>
  api.delete(`/api/paths/${id}/`).then((r) => r.data);

/** POST /api/paths/approve/:id/ — Approuver un path */
export const approvePath = (id) =>
  api.post(`/api/paths/approve/${id}/`).then((r) => r.data);

/** POST /api/paths/reject/:id/ — Rejeter un path */
export const rejectPath = (id) =>
  api.post(`/api/paths/reject/${id}/`).then((r) => r.data);

/** GET /api/paths/public/ — Paths publics (sans auth) */
export const getPublicPaths = () =>
  api.get("/api/paths/public/").then((r) => r.data);

// ─────────────────────────────────────────
// USERS
// ─────────────────────────────────────────

/** GET /api/users/connected/ — Utilisateurs connectés */
export const getConnectedUsers = () =>
  api.get("/api/users/connected/").then((r) => r.data);

export default api;