import React from 'react';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Home from './pages/Home';

/**
 * App Component
 * Main application wrapper with layout structure
 */
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;