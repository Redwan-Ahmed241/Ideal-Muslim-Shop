/**
 * Authentication context for the application.
 * Uses React Context + useReducer for predictable state management.
 *
 * Architecture decisions:
 * - Sanctum API tokens (not SPA cookie auth) — simpler for decoupled SPA
 * - Token stored in localStorage (acceptable for this scope; consider httpOnly cookies for production)
 * - Context provides login / register / logout + loading states
 */
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

// ── State shape ──
const initialState = {
    user: null,
    token: null,
    loading: true,
    error: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };
        case 'LOGOUT':
            return { ...state, user: null, token: null, loading: false, error: null };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // ── Bootstrap: rehydrate from localStorage on mount ──
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('auth_user');
        if (token && user) {
            dispatch({ type: 'SET_USER', payload: { user: JSON.parse(user), token } });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const login = useCallback(async (email, password) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            dispatch({ type: 'SET_USER', payload: { user: data.user, token: data.token } });
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            dispatch({ type: 'SET_ERROR', payload: message });
            throw err;
        }
    }, []);

    const register = useCallback(async (name, email, password, password_confirmation) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const { data } = await api.post('/auth/register', { name, email, password, password_confirmation });
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            dispatch({ type: 'SET_USER', payload: { user: data.user, token: data.token } });
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            dispatch({ type: 'SET_ERROR', payload: message });
            throw err;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // Best-effort — even if API fails, clear local state
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        dispatch({ type: 'LOGOUT' });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
