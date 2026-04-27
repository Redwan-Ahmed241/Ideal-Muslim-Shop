/**
 * Hero section — Full-width promotional banner slider.
 * Uses Swiper for smooth autoplay carousel. All text is translated.
 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSection() {
    const { t } = useLanguage();

    const BANNERS = [
        {
            id: 1,
            image: '/eid-hero-banner.png',
            title: t('eidSpecial'),
            highlight: t('collection'),
            subtitle: t('eidSubtitle'),
            cta: t('shopNow'),
            link: '/shop',
        },
        {
            id: 2,
            image: '/eid-hero-banner.png',
            title: t('newArrivals2026'),
            highlight: t('year2026'),
            subtitle: t('newArrivalsSubtitle'),
            cta: t('explore'),
            link: '/shop',
        },
    ];

    return (
        <section className="relative mt-[120px] md:mt-[130px]" id="hero-banner">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-emerald-500 !opacity-100',
                }}
                loop={true}
                className="w-full"
            >
                {BANNERS.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden bg-surface-100">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                            <div className="relative z-10 flex items-center h-full px-6 lg:px-16 max-w-7xl mx-auto">
                                <div className="max-w-lg">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-emerald-500/90 text-white rounded-full">
                                        {t('limitedOffer')}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-[family-name:var(--font-heading)]">
                                        {banner.title}{' '}
                                        <span className="text-emerald-400">{banner.highlight}</span>
                                    </h1>
                                    <p className="mt-3 text-sm sm:text-base text-white/80 max-w-md leading-relaxed">
                                        {banner.subtitle}
                                    </p>
                                    <Link
                                        to={banner.link}
                                        className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:gap-3"
                                    >
                                        {banner.cta}
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
