import axios from "axios";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// initializing the axios instance with custom configs
const api = axios.create({
  withCredentials: false,
  headers: {
    "Custom-Language": "en",
  },
});

export default api;
