// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Signup</Link>

        <li>
        </li>
        <li>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        </li>
        <li>
          <Link to="/AddStock" className={location.pathname === '/AddStock' ? 'active' : ''}>Add Stock</Link>
        </li>
        <li>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        </li>
        <li> 
          <Link to="/BusinessNews" className={location.pathname === '/BusinessNews' ? 'active' : ''}>Business News</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
