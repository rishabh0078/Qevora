import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const heroImages = [
        { src: '/images/wedding_venue.png', label: 'Wedding Venues' },
        { src: '/images/luxury_hotel.png', label: 'Luxury Hotels' },
        { src: '/images/luxury_resort.png', label: 'Premium Resorts' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="hero">
            {/* Background Image Slider */}
            <div className="hero-background">
                {heroImages.map((img, index) => (
                    <div
                        key={index}
                        className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img.src})` }}
                    />
                ))}
                <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="hero-content-wrapper">
                    <div className="hero-content">
                        <span className="hero-eyebrow animate-fade-up">
                            Premium Digital Experiences
                        </span>
                        <h1 className="animate-fade-up delay-100">
                            Websites That Convert
                            <span className="hero-highlight">Visitors Into Bookings</span>
                        </h1>
                        <p className="hero-description animate-fade-up delay-200">
                            Elegant, conversion-focused websites for wedding venues, banquet halls,
                            hotels, and resorts. We blend luxury design with powerful technology.
                        </p>

                        <div className="hero-cta animate-fade-up delay-300">
                            <a href="https://wa.me/1234567890" className="btn-gold">
                                <span>Start a Conversation</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="#services" className="btn-outline-white">
                                View Our Services
                            </a>
                        </div>

                        {/* Image Indicators */}
                        <div className="hero-indicators animate-fade-up delay-400">
                            {heroImages.map((img, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentImage ? 'active' : ''}`}
                                    onClick={() => setCurrentImage(index)}
                                    aria-label={`View ${img.label}`}
                                >
                                    <span className="indicator-label">{img.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
