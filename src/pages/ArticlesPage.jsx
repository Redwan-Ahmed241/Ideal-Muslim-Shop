/**
 * Articles listing page — all articles with debounced search.
 *
 * Efficiency improvements:
 * - Debounced search prevents API spam
 * - AbortController cancels stale requests
 * - useCallback on handlers for stable references
 * - React.memo on ArticleCard to skip re-renders when data hasn't changed
 */
import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2, BookOpen, Search } from 'lucide-react';
import api from '../lib/api';
import useDebounce from '../hooks/useDebounce';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

// ── Memoized ArticleCard — only re-renders if its `article` prop changes ──
const ArticleCard = memo(function ArticleCard({ article }) {
    // useMemo: expensive Date parsing + formatting cached until article changes
    const formattedDate = useMemo(
        () =>
            new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        [article.published_at, article.created_at]
    );

    return (
        <Link to={`/articles/${article.id}`}>
            <Card className="h-full group">
                <div className="relative overflow-hidden bg-surface-100 aspect-video">
                    <img
                        src={article.image_url || '/placeholder-article.svg'}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs font-medium text-surface-400">
                        <Calendar size={12} />
                        {formattedDate}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-surface-500 line-clamp-3">
                        {article.excerpt || article.body?.substring(0, 150)}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                    </span>
                </div>
            </Card>
        </Link>
    );
});

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce search — 400ms delay before API call
    const debouncedSearch = useDebounce(searchQuery, 400);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        const params = {};
        if (debouncedSearch) params.search = debouncedSearch;

        api.get('/articles', { params, signal: controller.signal })
            .then((res) => setArticles(res.data.data || []))
            .catch((err) => {
                if (err.name !== 'CanceledError') {
                    setError('Could not load articles. Make sure the API server is running.');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [debouncedSearch]);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    return (
        <main className="pt-24 pb-16">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Dawah & Knowledge"
                    title="Islamic Articles"
                    description="Explore our library of Islamic knowledge — from fiqh to personal development."
                />

                {/* Search */}
                <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <Search size={18} className="absolute text-surface-400 left-4 top-3" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full py-2.5 pl-11 pr-4 text-sm border rounded-full border-surface-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={36} className="animate-spin text-primary-500" />
                    </div>
                ) : error ? (
                    <div className="py-20 text-center">
                        <BookOpen size={56} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-lg font-medium text-surface-600">{error}</p>
                        <p className="mt-2 text-sm text-surface-400">
                            Make sure the API server is running and articles are seeded.
                        </p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="py-20 text-center">
                        <BookOpen size={56} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-lg font-medium text-surface-600">No articles found</p>
                        <p className="mt-1 text-sm text-surface-400">
                            {searchQuery
                                ? 'Try a different search term.'
                                : 'Seed the database with articles to see them here.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
