/**
 * Shop page — full product listing with category filtering.
 * Fetches all products from the API with pagination support.
 *
 * Efficiency improvements:
 * - Debounced search (400ms) prevents API spam on every keystroke
 * - useCallback on handlers prevents unnecessary child re-renders
 * - AbortController cancels stale API requests on rapid filter changes
 */
import { useEffect, useState, useCallback } from 'react';
import { ShoppingBag, Filter, Loader2, Search } from 'lucide-react';
import api from '../lib/api';
import useDebounce from '../hooks/useDebounce';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // ── Debounce: waits 400ms after user stops typing before firing API call ──
    // Without this: "islamic book" = 12 API calls
    // With this:    "islamic book" = 1 API call ✅
    const debouncedSearch = useDebounce(searchQuery, 400);

    // Fetch categories on mount
    useEffect(() => {
        api.get('/categories')
            .then((res) => setCategories(res.data.data || []))
            .catch(() => setError('Could not load categories'));
    }, []);

    // Fetch products when category or debounced search changes
    // AbortController cancels stale requests if user changes filters rapidly
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        const params = {};
        if (activeCategory) params.category_id = activeCategory;
        if (debouncedSearch) params.search = debouncedSearch;

        api.get('/products', { params, signal: controller.signal })
            .then((res) => setProducts(res.data.data || []))
            .catch((err) => {
                // Don't show error for aborted requests
                if (err.name !== 'CanceledError') {
                    setError('Could not load products. Make sure the API server is running.');
                }
            })
            .finally(() => setLoading(false));

        // Cleanup: abort this request if dependencies change before it resolves
        return () => controller.abort();
    }, [activeCategory, debouncedSearch]);

    // ── useCallback: stable function reference, prevents re-renders ──
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleCategoryChange = useCallback((categoryId) => {
        setActiveCategory(categoryId);
    }, []);

    return (
        <main className="pt-24 pb-16">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Marketplace"
                    title="Islamic Shop"
                    description="Browse our curated collection of Islamic products."
                />

                {/* ── Filters bar ── */}
                <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
                    {/* Search */}
                    <div className="relative max-w-sm">
                        <Search size={18} className="absolute text-surface-400 left-4 top-3" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full py-2.5 pl-11 pr-4 text-sm border rounded-full border-surface-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleCategoryChange(null)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${!activeCategory
                                ? 'bg-primary-500 text-white'
                                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === cat.id
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Products Grid ── */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={36} className="animate-spin text-primary-500" />
                    </div>
                ) : error ? (
                    <div className="py-20 text-center">
                        <ShoppingBag size={56} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-lg font-medium text-surface-600">{error}</p>
                        <p className="mt-2 text-sm text-surface-400">
                            Make sure the API server is running and products are seeded.
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center">
                        <ShoppingBag size={56} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-lg font-medium text-surface-600">No products found</p>
                        <p className="mt-1 text-sm text-surface-400">
                            {searchQuery
                                ? 'Try a different search term.'
                                : 'Seed the database with products to see them here.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <Card key={product.id} className="group">
                                <div className="relative overflow-hidden bg-surface-100 aspect-square">
                                    <img
                                        src={product.image_url || '/placeholder-product.svg'}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {product.category && (
                                        <span className="absolute px-3 py-1 text-xs font-semibold rounded-full top-3 left-3 bg-white/90 text-primary-600">
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>
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
            </div>
        </main>
    );
}
