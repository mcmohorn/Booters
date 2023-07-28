import axios from "axios";

// initializing the axios instance with custom configs
const api = axios.create({
  withCredentials: true,
  headers: {
    "Custom-Language": "en",
  },
});

export default api;
