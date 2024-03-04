import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/SignIn.jsx';
import Stocks from './components/Stocks';
import Profile from './components/Profile.js';
import SignUp from './components/SignUp.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Stocks" element={<Stocks />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
