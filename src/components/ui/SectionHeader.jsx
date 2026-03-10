/**
 * Section header component for consistent heading treatment.
 * - subtitle: small eyebrow text above the title
 * - title: main heading
 * - description: optional paragraph below
 * - align: 'center' | 'left'
 */
export default function SectionHeader({
    subtitle,
    title,
    description,
    align = 'center',
    className = '',
}) {
    const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

    return (
        <div className={`max-w-2xl mb-12 ${alignment} ${className}`}>
            {subtitle && (
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider uppercase rounded-full bg-primary-50 text-primary-600">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl font-bold md:text-4xl text-surface-900 font-[family-name:var(--font-heading)]">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-lg leading-relaxed text-surface-500">
                    {description}
                </p>
            )}
        </div>
    );
}
