/**
 * Login page — handles both login and register modes.
 *
 * Efficiency improvements:
 * - useCallback on handleChange prevents re-creating function every render
 * - useCallback on handleSubmit with proper dependencies
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import BrandLogo from '../components/ui/BrandLogo';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    // ── useCallback: stable reference, won't cause child input re-renders ──
    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (isRegister) {
                await register(formData.name, formData.email, formData.password, formData.password_confirmation);
            } else {
                await login(formData.email, formData.password);
            }
            navigate('/');
        } catch (err) {
            const message =
                err.response?.data?.message ||
                    err.response?.data?.errors
                    ? Object.values(err.response?.data?.errors || {}).flat().join('. ')
                    : 'Something went wrong';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }, [isRegister, formData, login, register, navigate]);

    const toggleMode = useCallback(() => {
        setIsRegister((prev) => !prev);
        setError(null);
    }, []);

    const togglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <main className="relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-surface-900 to-primary-800" />
            <div className="absolute inset-0 islamic-pattern opacity-20" />

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                {/* Card */}
                <div className="p-8 bg-white shadow-2xl rounded-3xl md:p-10">
                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4">
                            <BrandLogo
                                showText={false}
                                logoClassName="w-full h-full object-contain"
                                className="w-full h-full"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-surface-900 font-[family-name:var(--font-heading)]">
                            {isRegister ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="mt-2 text-sm text-surface-500">
                            {isRegister
                                ? 'Join the Ideal Muslim Shop community today.'
                                : 'Sign in to your Ideal Muslim Shop account.'}
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 mb-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isRegister && (
                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-surface-700">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm border rounded-xl border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-surface-700">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 text-sm border rounded-xl border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block mb-1.5 text-sm font-medium text-surface-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 pr-11 text-sm border rounded-xl border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute text-surface-400 right-3 top-2.5 hover:text-surface-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-surface-700">
                                    Confirm Password
                                </label>
                                <input
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 text-sm border rounded-xl border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={submitting}>
                            {submitting ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : isRegister ? (
                                <>
                                    <UserPlus size={18} className="mr-2" /> Create Account
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} className="mr-2" /> Sign In
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                            {isRegister
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Register"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
