/**
 * Category Grid Section — uses translations for category labels.
 */
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryGridSection() {
    const { t } = useLanguage();

    const CATEGORIES = [
        { nameKey: 'thobes', image: '/cat-thobe.png', link: '/shop?category=thobes', size: 'tall' },
        { nameKey: 'dawahTshirt', image: '/cat-tshirt.png', link: '/shop?category=tshirt', size: 'normal' },
        { nameKey: 'fullSleeve', image: '/cat-polo.png', link: '/shop?category=shirt', size: 'normal' },
        { nameKey: 'winterCap', image: '/cat-cap.png', link: '/shop?category=cap', size: 'normal' },
        { nameKey: 'signaturePolo', image: '/cat-polo.png', link: '/shop?category=polo', size: 'normal' },
        { nameKey: 'pajama', image: '/cat-pant.png', link: '/shop?category=pajama', size: 'normal' },
        { nameKey: 'outdoorCap', image: '/cat-cap.png', link: '/shop?category=outdoor-cap', size: 'normal' },
        { nameKey: 'premiumPunjabi', image: '/cat-punjabi.png', link: '/shop?category=punjabi', size: 'normal' },
        { nameKey: 'regularTshirt', image: '/cat-tshirt.png', link: '/shop?category=regular-tshirt', size: 'wide' },
    ];

    return (
        <section className="py-10 bg-surface-50" id="categories">
            <div className="px-4 mx-auto max-w-7xl lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.nameKey}
                            to={cat.link}
                            className={`relative group overflow-hidden rounded-2xl ${
                                cat.size === 'tall'
                                    ? 'row-span-2'
                                    : cat.size === 'wide'
                                    ? 'col-span-2'
                                    : ''
                            }`}
                        >
                            <img
                                src={cat.image}
                                alt={t(cat.nameKey)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg">
                                    {t(cat.nameKey)}
                                </h3>
                            </div>
                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full grid place-items-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-2">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
