import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Should match backend URL
});

export default api;
