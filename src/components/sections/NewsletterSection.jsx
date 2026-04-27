/**
 * Newsletter subscription section — uses translations.
 */
import { useState } from 'react';
import { Send, Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { t } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="relative py-14 bg-surface-800 overflow-hidden" id="newsletter">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 px-4 mx-auto max-w-3xl lg:px-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-emerald-500/10 rounded-2xl">
                    <Mail size={24} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {t('subscribeTitle')}
                </h2>
                <p className="mt-2 text-sm text-surface-400 max-w-md mx-auto">
                    {t('subscribeDesc')}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-5 py-3 text-sm bg-white/10 border border-white/10 rounded-full text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required
                    />
                    <button
                        type="submit"
                        disabled={submitted}
                        className="px-8 py-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {submitted ? (
                            <><CheckCircle size={16} />{t('subscribedMsg')}</>
                        ) : (
                            <>{t('subscribeBtn')}<Send size={14} /></>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
