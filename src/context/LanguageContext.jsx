/**
 * Language context — lightweight i18n for switching between English and Bangla.
 * Persists user preference in localStorage.
 */
import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

const TRANSLATIONS = {
    en: {
        // Navbar links
        home: 'Home',
        about: 'About',
        shopCollections: 'Shop Collections',
        blog: 'Blog',
        dawah: 'Dawah',
        community: 'Community',
        bloodDonation: 'Blood Donation',
        searchPlaceholder: 'Search products...',
        login: 'Login',
        logout: 'Logout',

        // Sections
        newArrival: 'New Arrival',
        seeAll: 'See All',
        orderNow: 'Order Now',
        addCart: 'Add Cart',
        featuredArticles: 'Featured Articles',
        viewAll: 'View All',
        readMore: 'Read More',
        dailyInspiration: 'YOUR DAILY INSPIRATION',
        dailyAyah: 'Daily Ayah',
        quranVerse: 'Quran Verse',
        duaOfTheDay: 'Dua of the Day',
        saveALife: 'SAVE A LIFE',
        bloodDonationTitle: 'Blood Donation',
        bloodDonationDesc: 'Register as a blood donor and help save lives in your community. Your donation can be the difference for someone in need.',
        registerNow: 'Register Now',
        subscribeTitle: 'Subscribe Our Newsletter',
        subscribeDesc: 'Get notification about discounts, product updates and good tips.',
        subscribeBtn: 'SUBSCRIBE',
        subscribedMsg: 'Subscribed!',
        emailPlaceholder: 'Enter your email address',
        articlesSubtext: 'Curated articles and resources about Islamic life',

        // Footer
        quickLinks: 'Quick Links',
        categories: 'Categories',
        support: 'Support',
        thobes: 'Thobes',
        tshirts: 'T-Shirts',
        punjabi: 'Punjabi',
        caps: 'Caps',
        aboutUs: 'About Us',
        contact: 'Contact',
        faq: 'FAQ',
        privacyPolicy: 'Privacy Policy',
        footerDesc: 'Your gateway to an enriched Islamic lifestyle. Shop premium Islamic clothing, read inspiring articles, and connect with the community.',
        madeWith: 'Made with',
        forUmmah: 'for the Ummah',
        allRights: 'All rights reserved.',

        // Hero
        limitedOffer: '✨ Limited Time Offer',
        eidSpecial: 'Eid Special',
        collection: 'Collection',
        eidSubtitle: 'Discover the finest Islamic clothing for this blessed occasion',
        shopNow: 'Shop Now',
        newArrivals2026: 'New Arrivals',
        year2026: '2026',
        newArrivalsSubtitle: 'Premium thobes, punjabis & modest fashion for the modern Muslim',
        explore: 'Explore',

        // Categories
        dawahTshirt: 'Dawah T-Shirt (Premium)',
        fullSleeve: 'Full Sleeve Casual Shirt',
        winterCap: 'Winter Cap',
        signaturePolo: 'Signature Edition Polo',
        pajama: 'Pajama',
        outdoorCap: 'Outdoor Cap',
        premiumPunjabi: 'Premium Punjabi',
        regularTshirt: 'Regular T-Shirt (Premium)',
    },
    bn: {
        // Navbar links
        home: 'হোম',
        about: 'পরিচিতি',
        shopCollections: 'শপ কালেকশন',
        blog: 'ব্লগ',
        dawah: 'দাওয়াহ',
        community: 'কমিউনিটি',
        bloodDonation: 'রক্তদান',
        searchPlaceholder: 'প্রোডাক্ট খুঁজুন...',
        login: 'লগইন',
        logout: 'লগআউট',

        // Sections
        newArrival: 'নতুন আগমন',
        seeAll: 'সব দেখুন',
        orderNow: 'অর্ডার করুন',
        addCart: 'কার্ট',
        featuredArticles: 'ফিচার্ড লেখা',
        viewAll: 'সব দেখুন',
        readMore: 'আরও পড়ুন',
        dailyInspiration: 'দৈনিক অনুপ্রেরণা',
        dailyAyah: 'আজকের আয়াত',
        quranVerse: 'কুরআনের আয়াত',
        duaOfTheDay: 'আজকের দোয়া',
        saveALife: 'একটি জীবন বাঁচান',
        bloodDonationTitle: 'রক্তদান',
        bloodDonationDesc: 'রক্তদাতা হিসেবে নিবন্ধন করুন এবং আপনার সম্প্রদায়ের জীবন বাঁচাতে সাহায্য করুন।',
        registerNow: 'নিবন্ধন করুন',
        subscribeTitle: 'আমাদের নিউজলেটারে সাবস্ক্রাইব করুন',
        subscribeDesc: 'ডিসকাউন্ট, প্রোডাক্ট আপডেট এবং ভালো টিপস সম্পর্কে জানুন।',
        subscribeBtn: 'সাবস্ক্রাইব',
        subscribedMsg: 'সাবস্ক্রাইব হয়েছে!',
        emailPlaceholder: 'আপনার ইমেইল লিখুন',
        articlesSubtext: 'মুসলিম জীবন সম্পর্কিত বাছাই করা লেখালেখি এবং রিসোর্স',

        // Footer
        quickLinks: 'দ্রুত লিংক',
        categories: 'ক্যাটেগরি',
        support: 'সাপোর্ট',
        thobes: 'থোব',
        tshirts: 'টি-শার্ট',
        punjabi: 'পাঞ্জাবি',
        caps: 'টুপি',
        aboutUs: 'আমাদের সম্পর্কে',
        contact: 'যোগাযোগ',
        faq: 'প্রশ্নোত্তর',
        privacyPolicy: 'গোপনীয়তা নীতি',
        footerDesc: 'ইসলামিক লাইফস্টাইলের জন্য আপনার গন্তব্য। প্রিমিয়াম ইসলামিক পোশাক কিনুন, অনুপ্রেরণামূলক আর্টিকেল পড়ুন।',
        madeWith: '',
        forUmmah: 'উম্মাহর জন্য ভালোবাসায় তৈরি',
        allRights: 'সর্বস্বত্ব সংরক্ষিত।',

        // Hero
        limitedOffer: '✨ সীমিত সময়ের অফার',
        eidSpecial: 'ঈদ স্পেশাল',
        collection: 'কালেকশন',
        eidSubtitle: 'এই বরকতময় উপলক্ষে সেরা ইসলামিক পোশাক আবিষ্কার করুন',
        shopNow: 'শপ করুন',
        newArrivals2026: 'নতুন আগমন',
        year2026: '২০২৬',
        newArrivalsSubtitle: 'আধুনিক মুসলিমদের জন্য প্রিমিয়াম থোব, পাঞ্জাবি ও শালীন ফ্যাশন',
        explore: 'এক্সপ্লোর',

        // Categories
        dawahTshirt: 'দাওয়াহ টি-শার্ট (প্রিমিয়াম)',
        fullSleeve: 'ফুল স্লিভ ক্যাজুয়াল শার্ট',
        winterCap: 'শীতকালীন টুপি',
        signaturePolo: 'সিগনেচার এডিশন পোলো',
        pajama: 'পায়জামা',
        outdoorCap: 'আউটডোর টুপি',
        premiumPunjabi: 'প্রিমিয়াম পাঞ্জাবি',
        regularTshirt: 'রেগুলার টি-শার্ট (প্রিমিয়াম)',
    },
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('im_lang') || 'en';
        } catch {
            return 'en';
        }
    });

    const switchLanguage = useCallback((newLang) => {
        setLang(newLang);
        localStorage.setItem('im_lang', newLang);
    }, []);

    const t = useCallback(
        (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key,
        [lang]
    );

    return (
        <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};
