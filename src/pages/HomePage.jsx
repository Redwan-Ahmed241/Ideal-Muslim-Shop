/**
 * Homepage — e-commerce landing page layout.
 * Section order:
 *   1. Hero Banner Slider
 *   2. New Arrival (Featured Products)
 *   3. Category Grid
 *   4. Daily Inspiration + Blood Donation
 *   5. Newsletter
 */
import HeroSection from '../components/sections/HeroSection';
import FeaturedProductsSection from '../components/sections/FeaturedProductsSection';
import CategoryGridSection from '../components/sections/CategoryGridSection';
import DailyAyahSection from '../components/sections/DailyAyahSection';
import NewsletterSection from '../components/sections/NewsletterSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturedProductsSection />
            <CategoryGridSection />
            <DailyAyahSection />
            <NewsletterSection />
        </>
    );
}
