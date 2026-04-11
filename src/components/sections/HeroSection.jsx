/**
 * Hero section for the homepage.
 * Compact deep-blue gradient background with Islamic geometric overlay.
 * Reduced height (~65vh) for better above-the-fold visibility.
 */
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="relative flex items-center min-h-[65vh] overflow-hidden">
            {/* ── Background layers ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
            <div className="absolute inset-0 islamic-pattern opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent-400/8 rounded-full blur-3xl" />

            {/* ── Content ── */}
            <div className="relative z-10 px-6 py-20 mx-auto max-w-7xl lg:px-8">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium border rounded-full text-primary-200 border-primary-400/30 bg-primary-400/10 animate-fade-in">
                        <Star size={14} className="text-accent-300" />
                        Your Islamic Lifestyle Companion
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-6xl font-[family-name:var(--font-heading)] animate-slide-up">
                        Enrich Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-200 to-accent-400">
                            Faith
                        </span>{' '}
                        <br />
                        Every Day
                    </h1>

                    {/* Tagline */}
                    <p className="max-w-xl mb-8 text-base leading-relaxed md:text-lg text-primary-100/80 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                        Discover curated Islamic products, daily spiritual reminders,
                        accurate prayer times, and a thriving community — all in one place.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link to="/shop">
                            <Button size="lg">
                                Explore Shop
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                        <Link to="/articles">
                            <Button variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
                                Read Articles
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 pt-10 mt-10 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.45s' }}>
                        {[
                            { value: '500+', label: 'Products' },
                            { value: '10K+', label: 'Community Members' },
                            { value: '100+', label: 'Articles' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl font-bold text-white md:text-3xl font-[family-name:var(--font-heading)]">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-primary-200/60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Scroll hint ── */}
            <div className="absolute z-10 -translate-x-1/2 bottom-6 left-1/2 animate-float">
                <div className="w-6 h-10 border-2 rounded-full border-white/30">
                    <div className="w-1.5 h-3 mx-auto mt-2 bg-white/60 rounded-full" />
                </div>
            </div>
        </section>
    );
}
