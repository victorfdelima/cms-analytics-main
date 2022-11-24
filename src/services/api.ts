import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@DohlerCMS:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && error.response?.message === 'O token está inválido/expirado') {
      localStorage.removeItem('@DohlerCMS:token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
