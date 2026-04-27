/**
 * Footer component — uses translations.
 */
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    const COLUMNS = [
        {
            title: t('quickLinks'),
            links: [
                { label: t('home'), href: '/' },
                { label: t('shopCollections'), href: '/shop' },
                { label: t('bloodDonation'), href: '/community' },
            ],
        },
        {
            title: t('categories'),
            links: [
                { label: t('thobes'), href: '/shop?category=thobes' },
                { label: t('tshirts'), href: '/shop?category=tshirt' },
                { label: t('punjabi'), href: '/shop?category=punjabi' },
                { label: t('caps'), href: '/shop?category=cap' },
            ],
        },
        {
            title: t('support'),
            links: [
                { label: t('aboutUs'), href: '#' },
                { label: t('contact'), href: '#' },
                { label: t('faq'), href: '#' },
                { label: t('privacyPolicy'), href: '#' },
            ],
        },
    ];

    return (
        <footer className="bg-surface-900 border-t border-surface-800">
            <div className="px-4 py-12 mx-auto max-w-7xl lg:px-8">
                <div className="grid gap-10 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <BrandLogo
                                logoClassName="h-10 w-auto"
                                textClassName="text-lg font-bold text-white font-[family-name:var(--font-heading)]"
                                highlightClassName="text-emerald-400"
                                className="flex items-center gap-2"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-surface-400 mb-4 max-w-xs">
                            {t('footerDesc')}
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-surface-400">
                                <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                                Dhaka, Bangladesh
                            </div>
                            <div className="flex items-center gap-2 text-xs text-surface-400">
                                <Phone size={14} className="text-emerald-500 flex-shrink-0" />
                                +880 1XXX-XXXXXX
                            </div>
                            <div className="flex items-center gap-2 text-xs text-surface-400">
                                <Mail size={14} className="text-emerald-500 flex-shrink-0" />
                                info@idealmuslimshop.com
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full bg-surface-800 text-surface-400 hover:bg-emerald-500 hover:text-white transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-sm font-bold tracking-wider uppercase text-surface-300">{col.title}</h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.href} className="text-sm transition-colors text-surface-400 hover:text-emerald-400">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-10 border-t border-surface-800 md:flex-row">
                    <p className="text-xs text-surface-500">
                        © {new Date().getFullYear()} Ideal Muslim Shop. {t('allRights')}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-surface-500">
                        {t('madeWith')} <Heart size={12} className="text-red-400" /> {t('forUmmah')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
