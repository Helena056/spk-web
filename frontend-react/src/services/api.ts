import axios from "axios";

const api = axios.create({
  baseURL: "https://spk-web-production-4ed4.up.railway.app/",
});

export default api;
