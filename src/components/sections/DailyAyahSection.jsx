import { useState, useEffect } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import api from '../../lib/api';

export default function DailyAyahSection() {
    const [ayah, setAyah] = useState({
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
        reference: 'Surah Al-Fatiha (1:1)',
        dua: 'O Allah, open for me the doors of Your mercy.',
    });
    const [loading, setLoading] = useState(true);

    const fetchDailyAyah = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/daily-ayah');
            if (data.data) {
                setAyah(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch Daily Ayah:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyAyah();
    }, []);

    return (
        <section id="ayah" className="relative py-24 overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800">
            {/* Decorative patterns */}
            <div className="absolute inset-0 islamic-pattern opacity-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-400/5 rounded-full blur-3xl" />

            <div className="relative z-10 px-6 mx-auto max-w-4xl lg:px-8">
                <SectionHeader
                    subtitle="Daily Inspiration"
                    title="Ayah & Dua of the Day"
                    className="[&_h2]:text-white [&_span]:bg-primary-700 [&_span]:text-primary-200"
                />

                {/* Ayah Card */}
                <div className="relative p-8 mt-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 md:p-12">
                    {loading && (
                        <div className="absolute inset-0 grid bg-primary-900/50 backdrop-blur-sm place-items-center rounded-3xl z-20">
                            <RefreshCw className="w-8 h-8 text-white animate-spin" />
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-3 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="grid w-12 h-12 rounded-2xl bg-accent-400/20 place-items-center">
                                <BookOpen size={22} className="text-accent-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Quran Verse</h3>
                                <p className="text-sm text-primary-200">{ayah.reference}</p>
                            </div>
                        </div>
                    </div>

                    {/* Arabic text */}
                    <p className="mb-6 text-3xl leading-loose text-right text-white md:text-4xl font-[family-name:var(--font-arabic)]">
                        {ayah.arabic}
                    </p>

                    {/* Translation */}
                    <p className="text-lg italic leading-relaxed text-primary-100">
                        "{ayah.translation}"
                    </p>

                    {/* Dua */}
                    <div className="pt-8 mt-8 border-t border-white/10">
                        <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-accent-400">
                            Dua of the Day
                        </p>
                        <p className="text-base leading-relaxed text-primary-100">
                            {ayah.dua}
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
