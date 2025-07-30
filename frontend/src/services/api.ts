import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/api/auth/register', { email, password, username });
    return response.data;
  }
};

// Pool API functions  
export const poolAPI = {
  createPool: async (token: string, poolData: any) => {
    const response = await api.post('/api/user/create_pool/', poolData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  fetchPools: async (token: string) => {
    const response = await api.get('/api/user/fetch_pools/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  joinPool: async (token: string, poolId: string) => {
    const response = await api.post(`/api/user/${poolId}/request_to_join/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default api;