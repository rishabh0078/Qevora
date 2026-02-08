import React, { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

/**
 * Contact Section
 * Primary CTA for wedding venue and hotel inquiries
 */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        venueName: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you! We will contact you shortly to discuss your project.');
        setFormData({ name: '', venueName: '', phone: '' });
    };

    return (
        <section id="contact" className="section-spacing" style={{ background: 'var(--c-charcoal)' }}>
            <div className="container-luxury">
                <SectionHeader
                    title="Let's Build Something Beautiful"
                    subtitle="Ready to create a premium website for your wedding venue or hotel? Let's discuss your vision."
                    align="center"
                />

                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Primary CTAs */}
                    <div className="grid grid-cols-2 gap-6" style={{ marginBottom: '4rem' }}>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-luxury text-center"
                            style={{ display: 'block', textDecoration: 'none' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                            <h4 style={{ marginBottom: '0.5rem' }}>WhatsApp</h4>
                            <p style={{ fontSize: '0.9rem' }}>
                                Message us for quick responses
                            </p>
                        </a>

                        <a
                            href="tel:+1234567890"
                            className="card-luxury text-center"
                            style={{ display: 'block', textDecoration: 'none' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                            <h4 style={{ marginBottom: '0.5rem' }}>Call Us</h4>
                            <p style={{ fontSize: '0.9rem' }}>
                                +1 (234) 567-890
                            </p>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="card-luxury" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h4 className="text-center" style={{ marginBottom: '2rem' }}>Or Send an Enquiry</h4>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" className="text-uppercase" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--c-text-secondary)'
                                }}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label htmlFor="venueName" className="text-uppercase" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--c-text-secondary)'
                                }}>
                                    Venue/Hotel Name
                                </label>
                                <input
                                    type="text"
                                    id="venueName"
                                    name="venueName"
                                    value={formData.venueName}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="text-uppercase" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--c-text-secondary)'
                                }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="text-center">
                                <Button variant="primary">
                                    Submit Enquiry
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
