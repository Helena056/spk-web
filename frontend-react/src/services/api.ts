import axios from "axios";

const api = axios.create({
  baseURL: "https://spk-web-production.up.railway.app",
});

export default api;
