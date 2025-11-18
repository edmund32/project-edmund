import axios from "axios";

export const api = axios.create({
  baseURL: "https://6906018eee3d0d14c13464ed.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // kamu bisa ganti sesuai storage kamu

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
