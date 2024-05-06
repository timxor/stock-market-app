import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS for styling

const HomePage = () => {
  return (
    <div className ="home-page-container">
      <h1>Welcome to TradeTrove!</h1>
      <div>
        {/* Button to navigate to the login page */}
        <Link to="/login">
          <button className='button'>Login</button>
        </Link>
        {/* Button to navigate to the signup page */}
        <Link to="/signup">
          <button className='button'>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
