import React from 'react';

/**
 * Button Component
 * Reusable button with primary and secondary variants
 * @param {string} variant - 'primary' or 'secondary'
 * @param {string} children - Button text
 * @param {function} onClick - Click handler
 * @param {string} href - Optional link URL
 */
const Button = ({
    variant = 'primary',
    children,
    onClick,
    href,
    className = ''
}) => {
    const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    const combinedClass = `${baseClass} ${className}`;

    // If href is provided, render as anchor tag
    if (href) {
        return (
            <a
                href={href}
                className={combinedClass}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
            >
                {children}
            </a>
        );
    }

    // Otherwise render as button
    return (
        <button
            className={combinedClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
