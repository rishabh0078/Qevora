import React from 'react';

/**
 * SectionHeader Component
 * Consistent section header with optional accent line and subtitle
 * @param {string} title - Main heading text
 * @param {string} subtitle - Optional subtitle text
 * @param {boolean} showAccent - Show gold accent line
 * @param {string} align - Text alignment ('left', 'center')
 */
const SectionHeader = ({
    title,
    subtitle,
    showAccent = true,
    align = 'left'
}) => {
    const isCentered = align === 'center';
    const headerStyle = {
        textAlign: align,
        marginBottom: '4rem',
        maxWidth: '800px',
        marginLeft: isCentered ? 'auto' : 0,
        marginRight: isCentered ? 'auto' : 0
    };

    const accentStyle = {
        width: '60px',
        height: '1px',
        backgroundColor: 'var(--color-gold)',
        marginBottom: '1.5rem',
        marginLeft: isCentered ? 'auto' : 0,
        marginRight: isCentered ? 'auto' : 0
    };

    return (
        <div style={headerStyle}>
            {showAccent && (
                <div style={accentStyle} />
            )}
            <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{title}</h2>
            {subtitle && (
                <p style={{
                    color: 'var(--color-graphite-light)',
                    maxWidth: '600px',
                    margin: isCentered ? '0 auto' : '0'
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
