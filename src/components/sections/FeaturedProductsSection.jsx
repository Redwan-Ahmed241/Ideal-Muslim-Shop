/**
 * Featured products section for the homepage.
 * Fetches products from API and displays in a responsive grid.
 *
 * Efficiency improvements:
 * - AbortController cancels API request if component unmounts mid-fetch
 * - Proper error state instead of silent catch
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import api from '../../lib/api';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function FeaturedProductsSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <section className="py-24 bg-white">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Marketplace"
                    title="Featured Products"
                    description="Hand-picked Islamic essentials — from books and prayer mats to modest fashion."
                />

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-primary-500" />
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
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <Card key={product.id} className="group">
                                {/* Image */}
                                <div className="relative overflow-hidden bg-surface-100 aspect-square">
                                    <img
                                        src={product.image_url || '/placeholder-product.svg'}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {product.category && (
                                        <span className="absolute px-3 py-1 text-xs font-semibold rounded-full top-3 left-3 bg-white/90 text-primary-600 backdrop-blur-sm">
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <h3 className="font-semibold truncate text-surface-900 group-hover:text-primary-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-surface-500 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-lg font-bold text-primary-600">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </span>
                                        <button className="p-2 transition-colors rounded-full text-surface-400 hover:text-white hover:bg-primary-500">
                                            <ShoppingBag size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* View all CTA */}
                <div className="flex justify-center mt-12">
                    <Link to="/shop">
                        <Button variant="outline">
                            View All Products
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
