// src/utils/axiosClient.js
import axios from "axios";
import store from "../app/store"; // we'll export store default? or import getState via function
import { updateAccessToken, clearCredentials } from "../features/auth/authSlice";

// If you exported store as named, import { store } and use store.dispatch/store.getState
import { store as appStore } from "../app/store";

const baseURL = process.env.REACT_APP_API_URL || "";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Attach access token to headers
axiosClient.interceptors.request.use((config) => {
  const state = appStore.getState();
  const token = state.auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  })
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    // only handle 401 responses and not retry loop
    if (err.response?.status === 401 && !originalReq._retry) {
      const state = appStore.getState();
      const refreshToken = state.auth.refreshToken;
      if (!refreshToken) {
        appStore.dispatch(clearCredentials());
        return Promise.reject(err);
      }

      if (isRefreshing) {
        // queue the request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalReq.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalReq);
          })
          .catch((e) => Promise.reject(e));
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${baseURL}/api/auth/refresh`, {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        appStore.dispatch(updateAccessToken(newAccessToken));
        processQueue(null, newAccessToken);
        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalReq);
      } catch (e) {
        processQueue(e, null);
        appStore.dispatch(clearCredentials());
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
