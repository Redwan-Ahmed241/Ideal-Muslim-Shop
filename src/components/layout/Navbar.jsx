/**
 * Main navigation bar — e-commerce layout with language switcher.
 * Two-row navbar:
 *   Row 1: Search | Logo | Cart/User/Language
 *   Row 2: Category navigation links (translated)
 */
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import BrandLogo from '../ui/BrandLogo';

const NAV_LINKS = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'shopCollections', path: '/shop', highlight: true },
    { key: 'dawah', path: '/community', accent: true },
    { key: 'community', path: '/community' },
];

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const { lang, switchLanguage, t } = useLanguage();
    const location = useLocation();
    const langRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setMenuOpen(false), [location.pathname]);

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-surface-900/5'
                    : 'bg-white'
            }`}
        >
            {/* ── Top Row: Search | Logo | Actions ── */}
            <div className="border-b border-surface-100">
                <nav className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl lg:px-8">
                    {/* Left: Search */}
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative hidden sm:block">
                            <div className="flex items-center gap-2 px-4 py-2 bg-surface-50 rounded-full border border-surface-200 hover:border-primary-300 transition-colors min-w-[220px] lg:min-w-[280px]">
                                <Search size={16} className="text-surface-400" />
                                <input
                                    type="text"
                                    placeholder={t('searchPlaceholder')}
                                    className="bg-transparent outline-none text-sm text-surface-700 placeholder:text-surface-400 w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="sm:hidden p-2 rounded-full text-surface-600 hover:bg-surface-100"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <BrandLogo
                            logoClassName="h-10 w-auto group-hover:scale-105 transition-transform"
                            textClassName="text-lg font-bold font-[family-name:var(--font-heading)] text-surface-900 hidden sm:block"
                            highlightClassName="text-emerald-600"
                            className="flex items-center gap-2"
                        />
                    </Link>

                    {/* Right: Icons + Language Switcher */}
                    <div className="flex items-center gap-1 flex-1 justify-end">
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 rounded-full text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 grid w-5 h-5 text-[10px] font-bold text-white rounded-full bg-emerald-500 place-items-center tracking-tighter shadow-sm border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Language Switcher Dropdown */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 rounded-full transition-colors"
                                aria-label="Switch language"
                            >
                                <Globe size={16} />
                                <span className="hidden sm:inline text-xs font-semibold">
                                    {currentLang.flag} {currentLang.code.toUpperCase()}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${
                                        langDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-surface-100 overflow-hidden z-50 animate-fade-in">
                                    {LANGUAGES.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => {
                                                switchLanguage(l.code);
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                                                lang === l.code
                                                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                                    : 'text-surface-600 hover:bg-surface-50'
                                            }`}
                                        >
                                            <span className="text-lg">{l.flag}</span>
                                            <span>{l.label}</span>
                                            {lang === l.code && (
                                                <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Auth */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-50 rounded-full">
                                    <User size={16} className="text-surface-500" />
                                    <span className="text-sm font-medium text-surface-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1.5 text-sm font-medium text-surface-500 hover:text-red-500 transition-colors"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors shadow-sm"
                            >
                                <User size={16} />
                                <span className="hidden sm:inline">{t('login')}</span>
                            </Link>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            className="p-2 rounded-lg md:hidden text-surface-600 hover:bg-surface-100 ml-1"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile search bar */}
                {searchOpen && (
                    <div className="px-4 pb-3 sm:hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-surface-50 rounded-full border border-surface-200">
                            <Search size={16} className="text-surface-400" />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                className="bg-transparent outline-none text-sm text-surface-700 placeholder:text-surface-400 w-full"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Bottom Row: Navigation Links ── */}
            <div className="hidden md:block bg-white border-b border-surface-100">
                <div className="px-4 mx-auto max-w-7xl lg:px-8">
                    <ul className="flex items-center justify-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <li key={link.path + link.key}>
                                <Link
                                    to={link.path}
                                    className={`inline-flex items-center px-4 py-3 text-sm font-semibold tracking-wide transition-colors relative ${
                                        location.pathname === link.path
                                            ? 'text-emerald-600'
                                            : link.accent
                                            ? 'text-red-500 hover:text-red-600'
                                            : link.highlight
                                            ? 'text-emerald-600 hover:text-emerald-700'
                                            : 'text-surface-700 hover:text-emerald-600'
                                    }`}
                                >
                                    {t(link.key)}
                                    {location.pathname === link.path && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-surface-100">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path + link.key}
                            to={link.path}
                            className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                                location.pathname === link.path
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : link.accent
                                    ? 'text-red-500'
                                    : 'text-surface-600 hover:bg-surface-50'
                            }`}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
