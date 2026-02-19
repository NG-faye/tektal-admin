import axios from "axios";

const API_URL = "http://localhost:8000/admin-panel/api"; // 🔥 adapte si nécessaire

const getToken = () => {
  return localStorage.getItem("token"); // 🔥 JWT de l'utilisateur admin
};

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  }
};

// ── PATHS ──
export const getPaths = async () => {
  const res = await axios.get(`${API_URL}/paths/`, axiosConfig);
  return res.data;
};

export const approvePath = async (id) => {
  const res = await axios.post(`${API_URL}/paths/approve/${id}/`, null, axiosConfig);
  return res.data;
};

export const rejectPath = async (id) => {
  const res = await axios.post(`${API_URL}/paths/reject/${id}/`, null, axiosConfig);
  return res.data;
};

export const createPath = async (formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data"
    }
  };
  const res = await axios.post(`${API_URL}/paths/`, formData, config);
  return res.data;
};
