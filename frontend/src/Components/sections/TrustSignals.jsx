import React from 'react';
import SectionHeader from '../ui/SectionHeader';

/**
 * TrustSignals Section
 * Builds credibility with key differentiators for hospitality clients
 */
const TrustSignals = () => {
    const signals = [
        {
            metric: 'Hospitality Focused',
            description: 'We exclusively work with wedding venues and hotels—we understand your industry inside out.'
        },
        {
            metric: 'Conversion Driven',
            description: 'Every design decision is made to turn visitors into inquiries and bookings.'
        },
        {
            metric: 'Premium Quality',
            description: 'Custom-built websites that match the luxury of your physical space—no templates.'
        },
        {
            metric: 'Long-Term Partnership',
            description: 'Ongoing support and updates to ensure your website grows with your business.'
        }
    ];

    return (
        <section className="section-spacing" style={{ background: 'var(--c-charcoal)' }}>
            <div className="container-luxury">
                <SectionHeader
                    title="Why Choose QEVORA"
                    subtitle="We're not a mass-market agency. We're a specialized studio that understands the unique needs of wedding venues and hotels."
                    align="center"
                />

                <div className="grid grid-cols-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {signals.map((signal, index) => (
                        <div
                            key={index}
                            className="text-center"
                            style={{ padding: '2rem 1rem' }}
                        >
                            <h4 className="text-gold" style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 500 }}>
                                {signal.metric}
                            </h4>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                {signal.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;
