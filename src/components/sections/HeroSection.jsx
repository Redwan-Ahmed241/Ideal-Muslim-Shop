/**
 * Hero section for the homepage.
 * Full-screen gradient background with Islamic geometric overlay.
 */
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="relative flex items-center min-h-screen overflow-hidden">
            {/* ── Background layers ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-primary-900 to-surface-900" />
            <div className="absolute inset-0 islamic-pattern opacity-30" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl" />

            {/* ── Content ── */}
            <div className="relative z-10 px-6 py-32 mx-auto max-w-7xl lg:px-8">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium border rounded-full text-primary-300 border-primary-500/30 bg-primary-500/10 animate-fade-in">
                        <Star size={14} className="text-accent-400" />
                        Your Islamic Lifestyle Companion
                    </div>

                    {/* Title */}
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-7xl font-[family-name:var(--font-heading)] animate-slide-up">
                        Enrich Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">
                            Faith
                        </span>{' '}
                        <br />
                        Every Day
                    </h1>

                    {/* Tagline */}
                    <p className="max-w-xl mb-10 text-lg leading-relaxed md:text-xl text-surface-300 animate-slide-up" style={{ animationDelay: '0.15s' }}>
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
                    <div className="grid grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.45s' }}>
                        {[
                            { value: '500+', label: 'Products' },
                            { value: '10K+', label: 'Community Members' },
                            { value: '100+', label: 'Articles' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold text-white md:text-4xl font-[family-name:var(--font-heading)]">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-surface-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Scroll hint ── */}
            <div className="absolute z-10 -translate-x-1/2 bottom-8 left-1/2 animate-float">
                <div className="w-6 h-10 border-2 rounded-full border-white/30">
                    <div className="w-1.5 h-3 mx-auto mt-2 bg-white/60 rounded-full" />
                </div>
            </div>
        </section>
    );
}
