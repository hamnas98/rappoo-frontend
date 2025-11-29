import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // ← IMPORTANT: Send cookies
});

// Store for access token (will be set by AuthContext)
let accessToken = null;

// Function to set access token (called by AuthContext)
export const setAccessToken = (token) => {
  accessToken = token;
};

// Request interceptor to add access token
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for automatic token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh token
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (response.data.success) {
          const newAccessToken = response.data.data.accessToken;
          accessToken = newAccessToken;
          
          // Process queued requests
          processQueue(null, newAccessToken);
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        accessToken = null;
        
        // Redirect to login if on admin page
        if (typeof window !== 'undefined' && 
            window.location.pathname.startsWith('/admin') && 
            window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  refresh: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
  verify: () => api.get('/auth/verify'),
};

// Hero API
export const heroAPI = {
  get: () => api.get('/content/hero'),
  update: (data) => api.put('/content/hero', data),
};

// About API
export const aboutAPI = {
  get: () => api.get('/content/about'),
  update: (data) => api.put('/content/about', data),
};

// Testimonials API
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