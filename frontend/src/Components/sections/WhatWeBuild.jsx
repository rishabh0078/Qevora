import React from 'react';

const WhatWeBuild = () => {
    return (
        <section id="what-we-build" className="section bg-white">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Our Expertise</span>
                    <h2>What We Build</h2>
                    <p>
                        We specialize in creating stunning websites for wedding venues and
                        hospitality brands that need to stand out and convert visitors into guests.
                    </p>
                </div>

                <div className="grid grid-2">
                    {/* Wedding Venues Card */}
                    <div className="card premium-card">
                        <div className="card-icon-wrapper">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#b8965c"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 21h18" />
                                <path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
                                <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                            </svg>
                        </div>
                        <h3>Wedding Venues</h3>
                        <p>
                            Elegant websites for banquet halls and wedding destinations that
                            showcase your space and convert inquiries into bookings.
                        </p>
                        <div className="card-hover-line"></div>
                    </div>

                    {/* Hotels & Resorts Card */}
                    <div className="card premium-card">
                        <div className="card-icon-wrapper">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#b8965c"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3>Hotels & Resorts</h3>
                        <p>
                            Premium digital experiences for hotels and resorts that drive direct
                            bookings and reduce OTA dependency.
                        </p>
                        <div className="card-hover-line"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeBuild;
