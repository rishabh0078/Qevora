import React, { useState, useEffect } from 'react';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';

/**
 * App Component
 * Main application wrapper with layout structure
 */
const App = () => {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname === '/admin');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (isAdminRoute) {
    return <Admin />;
  }

  return (
    <div className="app">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;