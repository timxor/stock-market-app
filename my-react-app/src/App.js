// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import SignOutButton from './components/SignOut';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddStock from './components/AddStock';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import BusinessNews from './components/NewsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <header className="header">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="logo text-white">Stock App</h1>
            <Navbar />
            <div>
              <SignOutButton />
            </div>
          </div>
        </header>
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addstock" element={<AddStock />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
