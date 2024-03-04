import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/SignIn.jsx';
import Stocks from './components/Stocks';
import Profile from './components/Profile.js';
import SignUp from './components/auth/SignUp.jsx';
import AuthDetails from './components/AuthDetails.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Stocks" element={<Stocks />} />
        <Route path="/Profile" element={<AuthDetails />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
