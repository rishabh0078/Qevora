import React from 'react';

const WhatWeBuild = () => {
    const items = [
        {
            icon: '💒',
            title: 'Wedding Venues',
            description: 'Elegant websites for banquet halls and wedding destinations that showcase your space and convert inquiries into bookings.'
        },
        {
            icon: '🏨',
            title: 'Hotels & Resorts',
            description: 'Premium digital experiences for hotels and resorts that drive direct bookings and reduce OTA dependency.'
        }
    ];

    return (
        <section id="what-we-build" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>What We Build</h2>
                    <p>
                        We specialize in creating stunning websites for wedding venues and
                        hospitality brands that need to stand out and convert visitors into guests.
                    </p>
                </div>

                <div className="grid grid-2">
                    {items.map((item, index) => (
                        <div key={index} className="card">
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeBuild;
