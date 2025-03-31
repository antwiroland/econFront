import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.mode === "development" ? "https://econbackend.onrender.com/api" : "/api",
  baseURL: import.meta.mode === "https://econbackend.onrender.com/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
