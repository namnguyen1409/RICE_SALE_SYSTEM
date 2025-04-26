import axios from "axios";
import store from "../redux/store"; // Import store to dispatch actions
import { logout, updateToken } from "../redux/slices/authSlice";
import axiosPublic from "./axiosPublic";
import { jwtDecode } from "jwt-decode"; // Ensure this is installed and imported

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to track if a token refresh is in progress
let isRefreshing = false;
let refreshTokenPromise = null;

// Helper function to check if a token is still valid
const isTokenValid = (exp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
};

// Helper function to refresh the token
const getNewToken = async (oldToken) => {
  try {
    const response = await axiosPublic.post("/auth/refresh-token", {
      token: oldToken,
    });
    return response.data.data.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Helper function to decode and structure user data from the token
const decodeUserFromToken = (token) => {
  const decoded = jwtDecode(token);
  return {
    id: decoded.sub,
    roles: decoded.scope.split(" ").filter((s) => s.startsWith("ROLE_")),
    permissions: decoded.scope.split(" ").filter((s) => !s.startsWith("ROLE_")),
    exp: decoded.exp,
  };
};

// Axios request interceptor to handle token validation and refreshing
axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    // If auth is missing or invalid, log the user out and redirect to login page
    if (!auth || !auth.token || !auth.user) {
      store.dispatch(logout());
      window.location.href = "/login"; // Redirect user to login page if no auth found
      return Promise.reject(new Error("Authentication required"));
    }

    let { user, token } = auth;

    const isValid = isTokenValid(user.exp);

    if (!isValid) {
      // If a refresh is already in progress, wait for the previous refresh to finish
      if (isRefreshing) {
        return refreshTokenPromise.then(() => {
          // After the token is refreshed, retry the original request with the new token
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        });
      }

      // Start the token refresh process
      isRefreshing = true;

      // Create a promise to handle the token refresh and store it for other requests to use
      refreshTokenPromise = getNewToken(token)
        .then((newToken) => {
          if (newToken) {
            token = newToken;
            user = decodeUserFromToken(token);
            store.dispatch(updateToken({ user, token }));
            config.headers["Authorization"] = `Bearer ${token}`;
          } else {
            store.dispatch(logout());
            window.location.href = "/login"; // Redirect to login if refresh fails
            return Promise.reject(new axios.Cancel("Token expired and refresh failed"));
          }
        })
        .finally(() => {
          // Reset the flag after the refresh process is done
          isRefreshing = false;
        });

      // Return the original request after refreshing the token
      return refreshTokenPromise.then(() => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    }

    // Attach the token to the Authorization header if the token is valid
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
