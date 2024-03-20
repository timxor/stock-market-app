import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import SignOutButton from './components/SignOut';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddStock from './components/AddStock';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <header> 
          <SignOutButton />
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addstock" element={<AddStock />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add a Route for handling 404 errors or unknown routes */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
