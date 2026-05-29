import axios from "axios";

const api = axios.create({
  baseURL: "https://spk-web-production-b69a.up.railway.app/",
});

export default api;
