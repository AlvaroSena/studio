import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await api.post("/auth/refresh");
      const newAccess = res.data.accessToken;
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
      originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
