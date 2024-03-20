import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Stock Market App</h1>
      <div>
        {/* Button to navigate to the login page */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        {/* Button to navigate to the signup page */}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
