/**
 * Prayer Times widget — fetches times from the database via API.
 * Displays all 5 daily prayers + Sunrise.
 *
 * DSA improvement:
 * - PRAYER_ORDER array guarantees display order (Object key order is unreliable)
 * - O(1) HashMap lookup from times.prayers[name] for each prayer
 * - AbortController cancels stale requests
 */
import { useEffect, useState } from 'react';
import { Clock, MapPin, Loader2 } from 'lucide-react';
import api from '../../lib/api';
import SectionHeader from '../ui/SectionHeader';

const PRAYER_ICONS = {
    Fajr: '🌅',
    Sunrise: '☀️',
    Dhuhr: '🌞',
    'Asr (Shafi)': '🌤️',
    'Asr (Hanafi)': '🌤️',
    Maghrib: '🌇',
    Isha: '🌙',
};

// ── Ordered array guarantees prayer display order ──
// Using Object.entries() doesn't guarantee order in all JS engines.
// This array + O(1) object lookup = correct order + fast access.
const PRAYER_ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr (Shafi)', 'Asr (Hanafi)', 'Maghrib', 'Isha'];

export default function PrayerTimesSection() {
    const [times, setTimes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        api.get('/prayer-times', { signal: controller.signal })
            .then((res) => setTimes(res.data.data))
            .catch((err) => {
                if (err.name !== 'CanceledError') {
                    setError('Could not load prayer times');
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return (
        <section id="prayer-times" className="py-24 bg-surface-50">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Salah"
                    title="Prayer Times"
                    description="Stay connected with your daily prayers. Times are updated from our database."
                />

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 size={32} className="animate-spin text-primary-500" />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <p className="text-surface-500">{error}</p>
                        <p className="mt-2 text-sm text-surface-400">
                            Make sure the API server is running and prayer times are seeded.
                        </p>
                    </div>
                ) : times ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Location badge */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <MapPin size={16} className="text-primary-500" />
                            <span className="text-sm font-medium text-surface-600">
                                {times.city || 'Your City'}, {times.date || 'Today'}
                            </span>
                        </div>

                        {/* Prayer cards grid — ordered by PRAYER_ORDER array */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                            {times.prayers &&
                                PRAYER_ORDER
                                    .filter((name) => times.prayers[name] !== undefined)
                                    .map((name) => (
                                        <div
                                            key={name}
                                            className="p-5 text-center transition-all bg-white border group rounded-2xl border-surface-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5"
                                        >
                                            <span className="text-2xl">{PRAYER_ICONS[name] || '🕌'}</span>
                                            <h4 className="mt-3 text-sm font-semibold text-surface-500 group-hover:text-primary-600">
                                                {name}
                                            </h4>
                                            <p className="mt-1 text-xl font-bold text-surface-900 font-[family-name:var(--font-heading)]">
                                                {times.prayers[name]}
                                            </p>
                                        </div>
                                    ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
