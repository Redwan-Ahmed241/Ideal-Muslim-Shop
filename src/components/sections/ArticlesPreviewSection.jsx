/**
 * Articles / Islamic Resources preview section for the homepage.
 * Shows the latest 3 articles with navigation to full listing.
 *
 * Efficiency improvements:
 * - React.memo on ArticlePreviewCard prevents unnecessary re-renders
 * - useMemo caches formatted dates
 * - AbortController cancels stale requests
 * - Proper error handling instead of silent catch
 */
import { useEffect, useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import api from '../../lib/api';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import Button from '../ui/Button';

// ── Memoized card — skips re-render if article data hasn't changed ──
const ArticlePreviewCard = memo(function ArticlePreviewCard({ article }) {
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
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-surface-100 aspect-video">
                    <img
                        src={article.image_url || '/placeholder-article.svg'}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
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

export default function ArticlesPreviewSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        api.get('/articles', { params: { limit: 3 }, signal: controller.signal })
            .then((res) => setArticles(res.data.data || []))
            .catch((err) => {
                if (err.name !== 'CanceledError') {
                    setError('Could not load articles');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return (
        <section className="py-24 bg-surface-50 islamic-pattern">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Knowledge"
                    title="Islamic Resources"
                    description="Deepen your understanding with curated articles and guides from scholars."
                />

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-primary-500" />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <BookOpen size={48} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-surface-500">{error}</p>
                        <p className="mt-2 text-sm text-surface-400">
                            Make sure the API server is running and articles are seeded.
                        </p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="py-12 text-center">
                        <BookOpen size={48} className="mx-auto mb-4 text-surface-300" />
                        <p className="text-surface-500">No articles yet. Seed the database to see content here.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {articles.map((article) => (
                            <ArticlePreviewCard key={article.id} article={article} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <Link to="/articles">
                        <Button variant="outline">
                            Browse All Articles
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
