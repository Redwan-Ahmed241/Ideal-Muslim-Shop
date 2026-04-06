/**
 * Main navigation bar component.
 * Features:
 * - Sticky positioning with glassmorphism on scroll
 * - Responsive mobile menu
 * - Auth-aware (shows Login vs Profile)
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Dawah', path: '/articles' },
    { label: 'Community', path: '/community' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setMenuOpen(false), [location.pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-surface-900/5'
                : 'bg-transparent'
                }`}
        >
            <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl lg:px-8">
                {/* ── Logo ── */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img 
                        src="/logo.svg" 
                        alt="Ideal Muslim Shop Logo" 
                        className="h-10 w-auto group-hover:scale-105 transition-transform"
                        onError={(e) => {
                            // Fallback if logo.svg fails (maybe they used .png)
                            e.target.onerror = null; 
                            e.target.src = "/1000263973.png";
                        }}
                    />
                    <span className="text-xl font-bold font-[family-name:var(--font-heading)] text-surface-900 hidden sm:block">
                        <span className="text-primary-500">Ideal Muslim Shop</span>
                    </span>
                </Link>

                {/* ── Desktop Links ── */}
                <ul className="items-center hidden gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${location.pathname === link.path
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-surface-600 hover:text-primary-600 hover:bg-primary-50/60'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* ── Actions ── */}
                <div className="items-center hidden gap-3 md:flex">
                    <button className="p-2 transition-colors rounded-full text-surface-500 hover:text-primary-600 hover:bg-primary-50">
                        <ShoppingBag size={20} />
                    </button>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-surface-700">{user.name}</span>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                </div>

                {/* ── Mobile Toggle ── */}
                <button
                    className="grid p-2 rounded-lg md:hidden place-items-center text-surface-600 hover:bg-surface-100"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* ── Mobile Menu ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-6 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-xl border-t border-surface-100">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${location.pathname === link.path
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-surface-600 hover:bg-surface-50'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-surface-100">
                        {user ? (
                            <Button variant="outline" size="sm" onClick={logout} className="w-full">
                                Logout
                            </Button>
                        ) : (
                            <Link to="/login" className="block">
                                <Button className="w-full" size="sm">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
