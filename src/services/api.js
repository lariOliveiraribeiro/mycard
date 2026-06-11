import axios from "axios";

const api = axios.create({
  baseURL: "https://mycard-backend.onrender.com",
});

export default api;