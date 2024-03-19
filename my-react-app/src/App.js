import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider
import SignOutButton from "./components/SignOut"; // Import the SignOutButton
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddStock from "./components/AddStock";

function App() {
  const location = useLocation();

  // Function to check if the current route is login or sign-up
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <AuthProvider>
      <div className="app-container">
        {/* Conditionally render the signout button */}
        {!isLoginPage && !isSignUpPage && (
          <header>
            <SignOutButton /> {/* Include the SignOutButton component in the header */}
          </header>
        )}
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/addstock" element={<AddStock />} />
                {/* Add more routes as needed */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
