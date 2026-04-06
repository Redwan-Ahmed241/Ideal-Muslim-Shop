/**
 * Reusable brand mark + wordmark component.
 * Use `showText={false}` when only the icon is needed.
 */
export default function BrandLogo({
    showText = true,
    logoClassName = 'h-10 w-auto',
    textClassName = 'text-xl font-bold font-[family-name:var(--font-heading)]',
    highlightClassName = 'text-primary-500',
    className = 'flex items-center gap-2',
}) {
    return (
        <div className={className}>
            <img
                src="/logo-clean.svg"
                alt="Ideal Muslim Shop Logo"
                className={logoClassName}
            />

            {showText && (
                <span className={textClassName}>
                    Ideal Muslim <span className={highlightClassName}>Shop</span>
                </span>
            )}
        </div>
    );
}