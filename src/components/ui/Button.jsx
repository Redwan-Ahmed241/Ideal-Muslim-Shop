/**
 * Reusable Button component with variant support.
 * Variants: primary, secondary, outline, ghost
 * Sizes: sm, md, lg
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const base =
        'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
        primary:
            'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40',
        secondary:
            'bg-accent-500 text-surface-900 hover:bg-accent-400 focus:ring-accent-400 shadow-lg shadow-accent-500/20',
        outline:
            'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
        ghost:
            'text-surface-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-400',
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
