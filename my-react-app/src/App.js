import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter import
import { AuthProvider } from './components/AuthContext';
import SignOutButton from './components/SignOut';
import HomePage from './components/HomePage';
import Login from './components/Login'; // Import login component
import SignUp from './components/SignUp';
import AddStock from './components/AddStock';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import BusinessNews from './components/NewsPage';
import anime from 'animejs/lib/anime.es.js';

import './App.css';

function App() {
  useEffect(() => {
    anime.timeline({
      complete: function() {
        document.querySelector('.ml15').classList.add('move-closer');
      }
    })
    .add({
      targets: '.ml15 .word',
      scale: [14, 1],
      opacity: [0, 1],
      easing: "easeOutCirc",
      duration: 800,
      delay: (el, i) => 800 * i
    });
    // Define the scroll event handler
    const handleScroll = () => {
      // Check if the user has scrolled to a certain position (e.g., 500 pixels from the top)
      if (window.scrollY > 500) {
        // Dynamically load the login component
        import('./components/Login').then(LoginComponent => {
          // Do something with LoginComponent (e.g., render it or navigate to it)
          console.log('Login component loaded:', LoginComponent);
        });
        
        // Remove the scroll event listener to prevent loading the login component multiple times
        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up by removing the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Run this effect only once on component mount

  return (
    <AuthProvider>
      <div className="app-container">
        <header className="header">
          <Navbar />
        </header>
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> {/* Render login component */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addstock" element={<AddStock />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<BusinessNews />} />
          </Routes>
        </main>
        <footer className="footer bg-dark text-white text-center py-3">
          <div className="container">
            &copy; 2024 Stock App
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
