import React from 'react';

const Services = () => {
    const services = [
        {
            title: 'Wedding Venue Websites',
            description: 'Elegant, conversion-focused websites that showcase your venue and help couples envision their perfect day.',
            features: ['Virtual venue tours', 'Package & pricing displays', 'Inquiry & booking forms', 'Photo & video galleries']
        },
        {
            title: 'Hotel & Resort Websites',
            description: 'Premium digital experiences that reflect your brand and drive direct bookings.',
            features: ['Direct booking integration', 'Room showcase & amenities', 'Guest experience highlights', 'Special offers management']
        },
        {
            title: 'Custom Web Applications',
            description: 'Tailored solutions including booking systems, event management dashboards, and guest portals.',
            features: ['Booking management systems', 'Event calendars', 'Admin dashboards', 'CRM integration']
        },
        {
            title: 'Maintenance & Support',
            description: 'Ongoing support to keep your website secure, fast, and updated with fresh content.',
            features: ['Security updates', 'Content updates', 'SEO optimization', 'Technical support']
        }
    ];

    return (
        <section id="services" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Our Services</h2>
                    <p>
                        We build premium websites using modern technology, ensuring your digital
                        presence is as impressive as your physical space.
                    </p>
                </div>

                <div className="grid grid-2">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul>
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
