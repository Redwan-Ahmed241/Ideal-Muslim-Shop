/**
 * New Arrival / Featured Products section — uses translations.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Loader2, ShoppingCart } from 'lucide-react';
import api from '../../lib/api';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function FeaturedProductsSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { t } = useLanguage();

    useEffect(() => {
        const controller = new AbortController();

        api.get('/products', { params: { featured: 1, limit: 8 }, signal: controller.signal })
            .then((res) => setProducts(res.data.data || []))
            .catch((err) => {
                if (err.name !== 'CanceledError') {
                    setError('Could not load featured products');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return (
        <section className="py-10 bg-white" id="new-arrivals">
            <div className="px-4 mx-auto max-w-7xl lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-surface-900 font-[family-name:var(--font-heading)]">
                            {t('newArrival')}
                        </h2>
                        <div className="w-12 h-1 mt-2 bg-emerald-500 rounded-full" />
                    </div>
                    <Link
                        to="/shop"
                        className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
                    >
                        {t('seeAll')}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Products */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-emerald-500" />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-surface-500">{error}</p>
                        <p className="mt-2 text-sm text-surface-400">
                            Make sure the API server is running and products are seeded.
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-12 text-center">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-surface-500">No products yet. Seed the database to see items here.</p>
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 w-[200px] sm:w-[220px] snap-start group"
                            >
                                <div className="relative overflow-hidden bg-surface-50 rounded-xl aspect-square border border-surface-100">
                                    <img
                                        src={product.image_url || '/placeholder-product.svg'}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {product.category && (
                                        <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500 text-white shadow-sm">
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-3 px-1">
                                    <h3 className="text-sm font-semibold text-surface-800 truncate group-hover:text-emerald-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-lg font-bold text-emerald-600">
                                        ৳ {parseFloat(product.price).toFixed(0)}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Link
                                            to="/shop"
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
                                        >
                                            {t('orderNow')}
                                        </Link>
                                        <button
                                            onClick={() => addToCart && addToCart(product)}
                                            className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-500 hover:bg-emerald-50 rounded-full transition-colors"
                                        >
                                            <ShoppingCart size={12} />
                                            {t('addCart')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
