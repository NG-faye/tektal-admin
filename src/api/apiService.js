import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

// Login admin
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}admin-panel/api/admin/login/`, {
    email,
    password,
  });
  return response.data;
};

// Liste des parcours admin
export const fetchPaths = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${API_URL}admin-panel/api/paths/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Approuver un parcours
export const approvePath = async (id) => {
  const token = localStorage.getItem("access_token");
  await axios.post(`${API_URL}admin-panel/api/paths/${id}/approve/`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Refuser un parcours
export const rejectPath = async (id) => {
  const token = localStorage.getItem("access_token");
  await axios.post(`${API_URL}admin-panel/api/paths/${id}/reject/`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Créer un parcours
export const createPath = async (formData) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(`${API_URL}admin-panel/api/paths/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Utilisateurs connectés
export const fetchConnectedUsers = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${API_URL}admin-panel/api/users/connected/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};