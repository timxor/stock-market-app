import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddStock from "./components/AddStock";
//import StocksList from "./components/StocksList";
import "./App.css";

function App() {
  const [StockId, setStockId] = useState("");

  const getStockIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setStockId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddStock id={StockId} setStockId={setStockId} />
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <Row>
          <Col>
            <StocksList getStockId={getStockIdHandler} />
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default App;