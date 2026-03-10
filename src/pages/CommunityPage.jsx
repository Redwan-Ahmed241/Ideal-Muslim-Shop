/**
 * Community placeholder page.
 * Shows a coming soon UI for the Community section.
 */
import { Users, MessageCircle, Heart } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

export default function CommunityPage() {
    const features = [
        {
            icon: <MessageCircle size={28} className="text-primary-500" />,
            title: 'Discussion Forums',
            description: 'Engage in meaningful conversations with fellow Muslims around the world.',
        },
        {
            icon: <Users size={28} className="text-primary-500" />,
            title: 'Study Circles',
            description: 'Join virtual halaqahs and group study sessions on various Islamic topics.',
        },
        {
            icon: <Heart size={28} className="text-primary-500" />,
            title: 'Support Network',
            description: 'Find support, share experiences, and build lasting brotherhood & sisterhood.',
        },
    ];

    return (
        <main className="pt-24 pb-16">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Coming Soon"
                    title="Community"
                    description="We're building a vibrant community space for the Ummah. Stay tuned!"
                />

                <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-8 text-center transition-all border bg-white rounded-2xl border-surface-100 hover:border-primary-200 hover:shadow-lg"
                        >
                            <div className="grid w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary-50 place-items-center">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-surface-900">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-surface-500">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-surface-400">
                        Want to be notified when Community launches? Sign up for updates!
                    </p>
                </div>
            </div>
        </main>
    );
}
