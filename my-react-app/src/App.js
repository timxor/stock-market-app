import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddStock from "./components/AddStock";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Routes>
            {<Route path="/Login" element={<Login />} /> }
            { <Route path="/SignUp" element={<SignUp />} /> }
            <Route path="/AddStock" element={<AddStock />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;