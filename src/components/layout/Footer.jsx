/**
 * Footer component.
 * Multi‑column layout with links and attribution.
 */
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

const COLUMNS = [
    {
        title: 'Platform',
        links: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Dawah', href: '/articles' },
            { label: 'Blood Donation', href: '/community' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Prayer Times', href: '/#prayer-times' },
            { label: 'Daily Ayah', href: '/#ayah' },
            { label: 'Articles', href: '/articles' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'About Us', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'FAQ', href: '#' },
            { label: 'Privacy Policy', href: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="border-t bg-surface-900 border-surface-700">
            <div className="px-6 py-16 mx-auto max-w-7xl lg:px-8">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <BrandLogo
                                logoClassName="h-10 w-auto"
                                textClassName="text-xl font-bold text-white font-[family-name:var(--font-heading)]"
                                highlightClassName="text-primary-400"
                                className="flex items-center gap-2"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-surface-400">
                            Your gateway to an enriched Islamic lifestyle. Shop, learn, pray, and connect.
                        </p>
                    </div>

                    {/* Columns */}
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-surface-300">
                                {col.title}
                            </h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            className="text-sm transition-colors text-surface-400 hover:text-primary-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-4 pt-10 mt-12 border-t border-surface-700 md:flex-row">
                    <p className="text-sm text-surface-500">
                        © {new Date().getFullYear()} Ideal Muslim Shop. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1 text-sm text-surface-500">
                        Made with <Heart size={14} className="text-red-400" /> for the Ummah
                    </p>
                </div>
            </div>
        </footer>
    );
}
