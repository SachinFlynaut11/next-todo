import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getAuthToken } from "@/lib/auth";
import { showError } from "@/lib/toast";
import { store } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());

      if (typeof window !== "undefined") {
        showError("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
