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
        <li>
          <Link to="/AddStock" className={location.pathname === '/AddStock' ? 'active' : ''}>Add Stock</Link>
        </li>
        <li>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        </li>
        <li>
          <Link to="/advice" className={location.pathname === '/advice' ? 'active' : ''}>Advice</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
