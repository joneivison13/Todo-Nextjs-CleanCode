import axios from "axios";
import { parseCookies, setCookie } from "nookies";

// const api = axios.create({ baseURL: "http://localhost:3333/api/v1.0" });
const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use(
  (config) => {
    const { "next-auth.session-token": sessionToken } = parseCookies();

    if (sessionToken) {
      const session = JSON.parse(sessionToken);
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { "next-auth.refresh-token": refreshToken } = parseCookies();

      try {
        const { data } = await axios.post("/refresh-token", {
          refresh_token: refreshToken,
        });

        setCookie(undefined, "next-auth.session-token", data.newSessionToken, {
          path: "/",
        });
        setCookie(undefined, "next-auth.refresh-token", data.newRefreshToken, {
          path: "/",
        });

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.newSessionToken}`;
        return api(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
