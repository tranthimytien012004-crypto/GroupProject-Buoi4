// dùng axiosClient
import axiosClient from "../../utils/axiosClient";

export const loginApi = (email, password) => {
  return axiosClient.post("/api/auth/login", { email, password });
};

export const refreshApi = (refreshToken) => {
  return axiosClient.post("/api/auth/refresh", { refreshToken });
};

export const logoutApi = () => axiosClient.post("/api/auth/logout");
