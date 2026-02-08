import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-split">
                    {/* Left - Content */}
                    <div className="hero-content">
                        <h1>Premium Websites for Wedding Venues & Hotels</h1>
                        <p>
                            We craft elegant digital experiences for banquet halls, wedding
                            destinations, hotels, and resorts that convert visitors into bookings.
                        </p>
                        <div className="hero-cta">
                            <a href="https://wa.me/1234567890" className="btn-gold">
                                Start a Conversation
                            </a>
                            <a href="#services" className="btn-outline">
                                View Services
                            </a>
                        </div>
                    </div>

                    {/* Right - Stacked Cards */}
                    <div className="hero-cards">
                        <div className="card-stack">
                            <div className="stack-card stack-card-1">
                                <div className="stack-card-inner has-image">
                                    <img
                                        src="/images/luxury_resort.png"
                                        alt="Premium Resort Website"
                                        className="stack-image"
                                    />
                                    <span className="stack-label-overlay">Premium Resort</span>
                                </div>
                            </div>
                            <div className="stack-card stack-card-2">
                                <div className="stack-card-inner has-image">
                                    <img
                                        src="/images/luxury_hotel.png"
                                        alt="Luxury Hotel Website"
                                        className="stack-image"
                                    />
                                    <span className="stack-label-overlay">Luxury Hotel</span>
                                </div>
                            </div>
                            <div className="stack-card stack-card-3">
                                <div className="stack-card-inner has-image">
                                    <img
                                        src="/images/wedding-venue.jpg?v=3"
                                        alt="Wedding Venue Website"
                                        className="stack-image"
                                    />
                                    <span className="stack-label-overlay">Wedding Venue</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
