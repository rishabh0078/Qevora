import React, { useState } from 'react';

const Portfolio = () => {
    // State to track number of visible items
    const [visibleCount, setVisibleCount] = useState(3);

    // Placeholder portfolio items - adding more to demonstrate Load More
    const projects = [
        {
            title: 'Grand Palace Banquet',
            category: 'Wedding Venue',
            image: null
        },
        {
            title: 'Royal Heritage Hotel',
            category: 'Hotel',
            image: null
        },
        {
            title: 'Garden View Resort',
            category: 'Resort',
            image: null
        },
        {
            title: 'The Wedding Manor',
            category: 'Wedding Venue',
            image: null
        },
        {
            title: 'Emerald Bay Resort',
            category: 'Resort',
            image: null
        },
        {
            title: 'Sapphire Convention Center',
            category: 'Wedding Venue',
            image: null
        }
    ];

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <section id="portfolio" className="section bg-cream">
            <div className="container">
                <div className="section-header">
                    <h2>Our Portfolio</h2>
                    <p>
                        A selection of premium websites we have crafted for wedding venues
                        and hotels across the country.
                    </p>
                </div>

                {/* Changed to grid-3 for better layout with 3 items */}
                <div className="grid grid-3">
                    {projects.slice(0, visibleCount).map((project, index) => (
                        <div key={index} className="portfolio-card">
                            {/* Placeholder background */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '3rem', opacity: 0.3 }}>
                                    {project.category === 'Hotel' || project.category === 'Resort' ? '🏨' : '💒'}
                                </span>
                            </div>
                            <div className="portfolio-overlay">
                                <h4>{project.title}</h4>
                                <p>{project.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < projects.length && (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <button
                            onClick={handleLoadMore}
                            className="btn-outline"
                        >
                            Load More Projects
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
