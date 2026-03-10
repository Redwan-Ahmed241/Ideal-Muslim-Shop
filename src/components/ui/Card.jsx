/**
 * Generic Card component with hover effects.
 * Used as base for product cards, article cards, etc.
 */
export default function Card({
    children,
    className = '',
    hoverable = true,
    ...props
}) {
    return (
        <div
            className={`
        bg-white rounded-2xl overflow-hidden card-shadow
        ${hoverable ? 'card-hover' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
}
