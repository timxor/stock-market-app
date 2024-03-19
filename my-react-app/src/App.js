import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider from the correct path
import AddStock from "./components/AddStock";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/login" element={<Login />} /> 
              <Route path="/signup" element={<SignUp />} />
              <Route path="/addstock" element={<AddStock />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  );
}

export default App;
