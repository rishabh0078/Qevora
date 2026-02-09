import React, { useState, useEffect } from 'react';

const Pricing = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await fetch('/api/packages');
            const data = await res.json();
            console.log('Packages fetched:', data);
            setPackages(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching packages:', err);
            setLoading(false);
        }
    };

    // Trigger scroll reveal animation after packages load
    useEffect(() => {
        if (!loading && packages.length > 0) {
            setTimeout(() => {
                const pricingElements = document.querySelectorAll('#pricing .reveal-on-scroll');
                pricingElements.forEach(el => {
                    el.classList.add('is-visible');
                });
            }, 100);
        }
    }, [loading, packages]);

    if (loading) {
        return (
            <section id="pricing" className="section bg-white">
                <div className="container">
                    <div className="section-header reveal-on-scroll">
                        <span className="section-eyebrow">Investment</span>
                        <h2>Engagement Tiers</h2>
                        <p>Loading pricing...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="pricing" className="section bg-white">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <span className="section-eyebrow">Investment</span>
                    <h2>Engagement Tiers</h2>
                    <p>Transparent pricing for premium value.</p>
                </div>

                {packages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <p>No pricing packages available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-3 pricing-grid reveal-on-scroll">
                        {packages.map((pkg, index) => (
                            <div
                                key={pkg.id || index}
                                className={`pricing-card stagger-child ${pkg.featured ? 'featured' : ''}`}
                            >
                                <div className="pricing-header">
                                    <h3>{pkg.name}</h3>
                                    <p className="price">{pkg.price}</p>
                                    <p className="desc">{pkg.description}</p>
                                </div>
                                {pkg.features && pkg.features.length > 0 && (
                                    <ul className="pricing-features">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <span className="check-icon">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="pricing-footer">
                                    <a href="#enquiry" className={`btn ${pkg.featured ? 'btn-gold' : 'btn-outline'}`}>
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Pricing;
