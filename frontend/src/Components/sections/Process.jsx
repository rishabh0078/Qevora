import React from 'react';
import SectionHeader from '../ui/SectionHeader';

/**
 * Process Section
 * 4-step workflow for wedding venue and hotel clients
 */
const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Discovery & Strategy',
            description: 'We start by understanding your venue, target couples or guests, unique selling points, and business goals to create a strategic foundation.'
        },
        {
            number: '02',
            title: 'Design & Content',
            description: 'Our team creates custom designs that showcase your space beautifully, with professional photography guidance and compelling copy.'
        },
        {
            number: '03',
            title: 'Development & Integration',
            description: 'We build your website using modern technology, integrate booking systems, and ensure flawless performance across all devices.'
        },
        {
            number: '04',
            title: 'Launch & Growth',
            description: 'After thorough testing, we launch your website and provide ongoing support, updates, and optimization to maximize bookings.'
        }
    ];

    return (
        <section id="process" className="section-spacing" style={{ background: 'var(--c-dark)' }}>
            <div className="container-luxury">
                <SectionHeader
                    title="Our Process"
                    subtitle="A refined approach to creating websites that convert visitors into bookings."
                    align="center"
                />

                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="process-step"
                        >
                            {/* Step Number */}
                            <div className="step-number">
                                {step.number}
                            </div>

                            {/* Step Content */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                                <p style={{ lineHeight: '1.7' }}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
