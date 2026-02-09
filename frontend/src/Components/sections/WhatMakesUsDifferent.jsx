import React from 'react';

const WhatMakesUsDifferent = () => {
    const differentiators = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M5 21V7l8-4 8 4v14M8 11h.01M16 11h.01M8 15h.01M16 15h.01M12 11v4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Hospitality Focused',
            description: 'We exclusively work with wedding venues and hotels — we understand your industry inside out.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Conversion Driven',
            description: 'Every design decision is made to turn visitors into high-value inquiries and detailed bookings.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Premium Quality',
            description: 'Custom-built websites that match the luxury of your physical space — absolutely no templates.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 11V7a5 5 0 0 1 10 0v4M7 11h10m-10 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Secure & Scalable',
            description: 'Built on modern tech stacks that ensure speed, security, and the ability to grow with your business.'
        }
    ];

    return (
        <section id="difference" className="section bg-white">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <span className="section-eyebrow">Why Choose Us</span>
                    <h2>The QEVORA Standard</h2>
                    <p>
                        We are not a mass-market agency. We are a specialized studio that
                        bridges the gap between luxury hospitality and digital excellence.
                    </p>
                </div>

                <div className="grid grid-4 feature-grid reveal-on-scroll">
                    {differentiators.map((item, index) => (
                        <div key={index} className="feature-card stagger-child">
                            <div className="feature-icon-wrapper">
                                {item.icon}
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatMakesUsDifferent;
