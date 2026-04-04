/**
 * Axios instance configured for the Laravel API.
 * All API calls go through this centralized client.
 *
 * Architecture note:
 * - baseURL is empty because Vite's proxy handles /api/* → localhost:8000
 * - Sanctum token is read from localStorage and injected via interceptor
 * - Response interceptor handles 401 → auto-logout
 */
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// ── Request Interceptor: Attach Bearer token ──
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Response Interceptor: Handle auth failures ──
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            // Optionally redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
