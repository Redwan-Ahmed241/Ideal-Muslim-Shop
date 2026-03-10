/**
 * Homepage — composes all sections in order.
 */
import HeroSection from '../components/sections/HeroSection';
import DailyAyahSection from '../components/sections/DailyAyahSection';
import PrayerTimesSection from '../components/sections/PrayerTimesSection';
import FeaturedProductsSection from '../components/sections/FeaturedProductsSection';
import ArticlesPreviewSection from '../components/sections/ArticlesPreviewSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <DailyAyahSection />
            <PrayerTimesSection />
            <FeaturedProductsSection />
            <ArticlesPreviewSection />
        </>
    );
}
