import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>QEVORA</h3>
                        <p>
                            Premium websites for wedding venues and hotels that convert
                            visitors into bookings.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <a href="#home">Home</a>
                        <a href="#services">Services</a>
                        <a href="#portfolio">Portfolio</a>
                        <a href="#enquiry">Contact</a>
                    </div>

                    <div className="footer-links">
                        <h4>Get in Touch</h4>
                        <a href="https://wa.me/1234567890">WhatsApp</a>
                        <a href="tel:+1234567890">+1 (234) 567-890</a>
                        <a href="mailto:hello@qevora.com">hello@qevora.com</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} QEVORA. Crafting premium digital experiences.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
