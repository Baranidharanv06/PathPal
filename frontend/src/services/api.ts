import axios from 'axios';

// Make sure this URL and port number match your backend server's address
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  // ...
});

export default api;