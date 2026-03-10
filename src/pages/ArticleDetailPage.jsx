/**
 * Article detail page — fetches a single article by ID.
 *
 * Security improvement:
 * - DOMPurify sanitizes HTML before rendering with dangerouslySetInnerHTML
 * - Prevents XSS (Cross-Site Scripting) attacks from malicious article content
 *
 * Efficiency improvement:
 * - useMemo caches sanitized HTML and formatted date
 * - AbortController cancels stale requests on rapid navigation
 */
import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import api from '../lib/api';

export default function ArticleDetailPage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        api.get(`/articles/${id}`, { signal: controller.signal })
            .then((res) => setArticle(res.data.data))
            .catch((err) => {
                if (err.name !== 'CanceledError') {
                    setError('Article not found');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [id]);

    // ── useMemo: sanitize HTML only when article changes, not every render ──
    const sanitizedBody = useMemo(() => {
        if (!article?.body) return '';
        // DOMPurify strips malicious scripts, iframes, event handlers etc.
        // Input:  <p>Hello</p><script>alert('hacked')</script>
        // Output: <p>Hello</p>  (script tag removed!)
        return DOMPurify.sanitize(article.body);
    }, [article?.body]);

    // Cache formatted date
    const formattedDate = useMemo(() => {
        if (!article) return '';
        return new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }, [article?.published_at, article?.created_at]);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <Loader2 size={36} className="animate-spin text-primary-500" />
            </main>
        );
    }

    if (error || !article) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-lg text-surface-600">{error || 'Article not found'}</p>
                <Link to="/articles" className="text-sm font-medium text-primary-600 hover:underline">
                    ← Back to articles
                </Link>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16">
            <article className="px-6 mx-auto max-w-3xl lg:px-8">
                {/* Back link */}
                <Link
                    to="/articles"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Articles
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl text-surface-900 font-[family-name:var(--font-heading)]">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-surface-400">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formattedDate}
                        </span>
                        {article.author && (
                            <span className="flex items-center gap-1">
                                <User size={14} />
                                {article.author}
                            </span>
                        )}
                    </div>
                </header>

                {/* Featured image */}
                {article.image_url && (
                    <div className="mb-10 overflow-hidden rounded-2xl">
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="object-cover w-full"
                        />
                    </div>
                )}

                {/* Body — sanitized with DOMPurify to prevent XSS */}
                <div
                    className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-primary-600 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: sanitizedBody }}
                />
            </article>
        </main>
    );
}
