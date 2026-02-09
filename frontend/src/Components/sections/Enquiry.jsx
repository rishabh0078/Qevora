import React, { useState } from 'react';

const Enquiry = () => {
    const [formData, setFormData] = useState({
        name: '',
        venueName: '',
        phone: '',
        message: ''
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
        alert('Thank you! We will contact you shortly.');
        setFormData({ name: '', venueName: '', phone: '', message: '' });
    };

    return (
        <section id="enquiry" className="section enquiry-section">
            <div className="container">
                <div className="enquiry-grid reveal-on-scroll">
                    <div className="enquiry-info">
                        <h2>Let's Build Something Beautiful</h2>
                        <p>
                            Ready to create a premium website for your wedding venue or hotel?
                            Let's discuss your vision.
                        </p>

                        <div className="contact-item">
                            <span></span>
                            <a href="https://wa.me/1234567890">WhatsApp Us</a>
                        </div>
                        <div className="contact-item">
                            <span></span>
                            <a href="tel:+1234567890">+91 6396784178</a>
                        </div>
                        <div className="contact-item">
                            <span></span>
                            <a href="mailto:hello@qevora.com">rishabhchoudhary004@gmail.com</a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="enquiry-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
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

                        <div className="form-group">
                            <label htmlFor="venueName" className="form-label">Venue / Hotel Name</label>
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

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
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

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Tell us about your project</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="form-input"
                            />
                        </div>

                        <button type="submit" className="btn-gold" style={{ width: '100%' }}>
                            Send Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Enquiry;
