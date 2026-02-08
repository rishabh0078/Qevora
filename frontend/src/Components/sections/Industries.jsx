import React from 'react';
import SectionHeader from '../ui/SectionHeader';

/**
 * Industries Section
 * Showcases wedding venues and hotels - the actual QEVORA portfolio
 */
const Industries = () => {
    const industries = [
        {
            title: 'Wedding Venues',
            description: 'Elegant websites for banquet halls and wedding destinations that showcase your space and convert inquiries into bookings.',
            icon: '💍'
        },
        {
            title: 'Hotels & Resorts',
            description: 'Premium digital experiences for hotels and resorts that reflect luxury, drive direct bookings, and enhance guest experience.',
            icon: '🏨'
        }
    ];

    return (
        <section className="section-spacing" style={{ background: 'var(--c-charcoal)' }}>
            <div className="container-luxury">
                <SectionHeader
                    title="What We Build"
                    subtitle="We specialize in creating stunning digital experiences for wedding venues and hospitality brands that need to stand out and convert visitors into guests."
                    align="center"
                />

                <div className="grid grid-cols-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="card-luxury text-center"
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{industry.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{industry.title}</h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                {industry.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
