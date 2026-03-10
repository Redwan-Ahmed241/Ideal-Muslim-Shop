/**
 * Daily Ayah & Dua Section
 *
 * ⚠️ IMPORTANT — INCOMPLETE BY DESIGN ⚠️
 * This component renders the UI shell for the "Daily Ayah & Dua" widget.
 * The auto-refresh logic (fetching a new ayah/dua daily) is intentionally
 * left as a TODO for the developer to implement.
 *
 * Implementation guidance:
 * ────────────────────────
 * 1. Backend: Complete the GET /api/daily-ayah endpoint in
 *    DailyAyahController.php. You could:
 *    a) Store ayahs in a database table and rotate via a scheduled command
 *    b) Call an external API (e.g., alquran.cloud) and cache the result
 *    c) Use a simple JSON seed file and pick one per day based on day-of-year
 *
 * 2. Frontend: Replace the hardcoded `ayah` state below with an API call:
 *    ```js
 *    useEffect(() => {
 *      api.get('/daily-ayah')
 *        .then(res => setAyah(res.data))
 *        .catch(console.error);
 *    }, []);
 *    ```
 *
 * 3. (Optional) Add a "refresh" button that fetches a random ayah.
 *
 * 4. (Optional) Add loading and error states.
 */
import { useState } from 'react';
import { BookOpen, RefreshCw } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

export default function DailyAyahSection() {
    // TODO: Replace with API call — see guidance in the file header
    const [ayah] = useState({
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation:
            'In the name of Allah, the Most Gracious, the Most Merciful.',
        reference: 'Surah Al-Fatiha (1:1)',
        dua: 'O Allah, open for me the doors of Your mercy.',
    });

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
                <div className="p-8 mt-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="grid w-12 h-12 rounded-2xl bg-accent-400/20 place-items-center">
                            <BookOpen size={22} className="text-accent-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Quran Verse</h3>
                            <p className="text-sm text-primary-200">{ayah.reference}</p>
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

                    {/* TODO: Add refresh button once API is connected
                        Create a button with onClick that calls api.get('/daily-ayah')
                        and updates the ayah state. See file header for details.
                    */}
                </div>
            </div>
        </section >
    );
}
