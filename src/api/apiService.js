import axios from "axios";

// 🔥 URL de base de ton backend Django
const BASE_URL = "http://localhost:8000/api";

// ===== AUTHENTIFICATION ADMIN =====
export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/jwt/create/`, {
    email,
    password
  });
  return response.data; // { access, refresh }
};

// ===== PARCOURS (Chemins) =====
export const getPaths = async () => {
  const response = await axios.get(`${BASE_URL}/paths/`);
  return response.data;
};

export const createPath = async (formData, token) => {
  const response = await axios.post(`${BASE_URL}/paths/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const approvePath = async (id, token) => {
  const response = await axios.post(
    `${BASE_URL}/paths/${id}/approve/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const rejectPath = async (id, token) => {
  const response = await axios.post(
    `${BASE_URL}/paths/${id}/reject/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deletePath = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/paths/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
