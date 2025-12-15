import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: "https://full-stack-project-1pi6.onrender.com/api", // backend base URL
  withCredentials: true, // send cookies if your backend uses them
});

// Automatically attach JWT token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle responses globally (e.g., auto logout on 401)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("token"); // remove invalid token
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
