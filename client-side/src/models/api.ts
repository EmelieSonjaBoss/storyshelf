/**
 * @module models/api
 * @description Axios instance configured with the base API URL and credentials.
 * Used throughout the application to make HTTP requests to the backend.
 */

import axios from "axios";

// Create an Axios instance with base configuration for API requests
const api = axios.create({
  // Base URL for all API requests, loaded from environment variable
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Include credentials (cookies, HTTP auth) with requests
  withCredentials: true
});

// Export the configured Axios instance for use throughout the app
export default api;
