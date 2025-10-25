import axios from "axios";

const refreshToken = localStorage.getItem('refreshToken');

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

if (refreshToken) {
  (async () => {
    const res = await api.post("/auth/refresh", {
      token: refreshToken,
    });

    const newAccess = res.data.accessToken;

    api.defaults.headers.Authorization = `bearer ${newAccess}`;
  })();
}
