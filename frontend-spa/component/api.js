// component/api.js

const API_BASE = 'https://elibrary-api.fwh.is';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Untuk PUT request — paksa data jadi JSON string
    if (config.method === 'put' && config.data) {
      if (typeof config.data !== 'string') {
        config.data = JSON.stringify(config.data);
      }
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      alert('Sesi Anda telah berakhir. Silakan login kembali.');
      if (window.__router__) {
        window.__router__.push('/login');
      }
    }
    return Promise.reject(error);
  }
);