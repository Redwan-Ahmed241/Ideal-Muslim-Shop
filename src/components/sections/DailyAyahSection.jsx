/**
 * Daily Inspiration section — uses translations.
 */
import { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';

export default function DailyAyahSection() {
    const { t } = useLanguage();
    const [ayah, setAyah] = useState({
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
        reference: 'Surah Al-Fatiha (1:1)',
        dua: 'O Allah, open for me the doors of Your mercy.',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get('/daily-ayah');
                if (data.data) setAyah(data.data);
            } catch (e) {
                console.error('Failed to fetch Daily Ayah:', e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section id="daily-inspiration" className="py-12 bg-white">
            <div className="px-4 mx-auto max-w-7xl lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-surface-900 font-[family-name:var(--font-heading)] tracking-tight">
                        {t('dailyInspiration')}
                    </h2>
                    <div className="w-16 h-1 mx-auto mt-3 bg-emerald-500 rounded-full" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-800 to-surface-900 p-6 md:p-8">
                        <div className="absolute inset-0 islamic-pattern opacity-10" />
                        {loading && (
                            <div className="absolute inset-0 grid bg-surface-900/60 backdrop-blur-sm place-items-center rounded-2xl z-20">
                                <RefreshCw className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="grid w-10 h-10 rounded-xl bg-emerald-500/20 place-items-center">
                                    <BookOpen size={18} className="text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">{t('dailyAyah')}</h3>
                                    <p className="text-xs text-surface-400">{ayah.reference}</p>
                                </div>
                            </div>
                            <p className="mb-4 text-2xl md:text-3xl leading-loose text-right text-white font-[family-name:var(--font-arabic)]">
                                {ayah.arabic}
                            </p>
                            <p className="text-sm italic leading-relaxed text-surface-300 border-l-2 border-emerald-500 pl-4">
                                "{ayah.translation}"
                            </p>
                            <div className="pt-5 mt-5 border-t border-white/10">
                                <p className="mb-1 text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                                    {t('duaOfTheDay')}
                                </p>
                                <p className="text-xs leading-relaxed text-surface-300">{ayah.dua}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 md:p-8">
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <span className="inline-flex items-center gap-1 px-3 py-1 mb-4 text-[10px] font-bold tracking-wider uppercase bg-white/20 text-white rounded-full">
                                    {t('saveALife')}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)] mb-3">
                                    {t('bloodDonationTitle')}
                                </h3>
                                <p className="text-sm text-red-100 leading-relaxed max-w-md">
                                    {t('bloodDonationDesc')}
                                </p>
                            </div>
                            <div className="mt-6">
                                <Link to="/community" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 font-semibold rounded-full hover:bg-red-50 transition-colors text-sm">
                                    {t('registerNow')}
                                    <ExternalLink size={14} />
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                        <div className="absolute top-5 right-5"><Heart size={80} className="text-white/10" /></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
