import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor to add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login if on admin page
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

// hero API
export const heroAPI = {
  get: () => api.get('/content/hero'),
  update: (data) => api.put('/content/hero', data),
};

// about API
export const aboutAPI = {
  get: () => api.get('/content/about'),
  update: (data) => api.put('/content/about', data),
};

// testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/content/testimonials'),
  getById: (id) => api.get(`/content/testimonials/${id}`),
  create: (data) => api.post('/content/testimonials', data),
  update: (id, data) => api.put(`/content/testimonials/${id}`, data),
  delete: (id) => api.delete(`/content/testimonials/${id}`),
};

// FAQ API
export const faqAPI = {
  getAll: () => api.get('/content/faq'),
  getById: (id) => api.get(`/content/faq/${id}`),
  create: (data) => api.post('/content/faq', data),
  update: (id, data) => api.put(`/content/faq/${id}`, data),
  delete: (id) => api.delete(`/content/faq/${id}`),
};

export default api;