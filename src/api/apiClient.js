import axios from 'axios';
import {MMKVStorage} from '../services/storage/MMKVStorage';

const apiClient = axios.create({
  baseURL: 'https://localhost:3000/api', // Replace with your API base URL
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  async config => {
    const token = await MMKVStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export default apiClient;
