import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS for styling

const HomePage = () => {
  return (
    <div className ="home-page-container">
      <h1>Welcome to TradeTrove!</h1>
      <p>Whether you're a seasoned investor or just starting out, TradeTrove offers a suite of tools and resources to streamline 
    your investment journey. From tracking your portfolio performance in real-time to accessing valuable market insights and analysis,
    TradeTrove equips you with the knowledge and tools needed to navigate the complexities of the stock market with confidence. With 
     TradeTrove, you can stay ahead of market trends, discover new investment opportunities, and take control of your financial future.
      </p>
    <h2>Get Started Today!</h2>
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