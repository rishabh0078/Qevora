import React, { useState, useEffect } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            console.log('Services fetched:', data);
            console.log('Number of services:', data.length);
            setServices(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching services:', err);
            setLoading(false);
        }
    };

    // Trigger scroll reveal animation after services load
    useEffect(() => {
        if (!loading && services.length > 0) {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                const serviceElements = document.querySelectorAll('#services .reveal-on-scroll');
                serviceElements.forEach(el => {
                    el.classList.add('is-visible');
                });
            }, 100);
        }
    }, [loading, services]);

    if (loading) {
        return (
            <section id="services" className="section">
                <div className="container">
                    <div className="section-header reveal-on-scroll">
                        <h2>Our Services</h2>
                        <p>Loading services...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="section">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <h2>Our Services</h2>
                    <p>
                        We build premium websites using modern technology, ensuring your digital
                        presence is as impressive as your physical space.
                    </p>
                </div>

                {services.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <p>No services available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-2 service-grid reveal-on-scroll">
                        {services.map((service, index) => {
                            console.log(`Rendering service ${index}:`, service);
                            return (
                                <div key={service.id || index} className="service-card stagger-child">
                                    <span className="service-number">0{index + 1}</span>
                                    {service.icon && (
                                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                                            {service.icon}
                                        </div>
                                    )}
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    {service.features && service.features.length > 0 && (
                                        <ul className="service-features">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx}>
                                                    <span className="check-icon">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
