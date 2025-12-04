import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Badge } from "react-bootstrap";

import Login from '../Customer/CustomerLogin';
import ReactDOM from 'react-dom/client';
import CustomerLogin from '../Customer/CustomerLogin';
import VenderLogin from '../vender/VenderLogin';
import AdminLogin from '../Admin/AdminLogin';
import Homepage from "../Customer/CStomerHome"


function BasicExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItemCount = 2;



  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginState === "true");
  }, []);

  const handleLogoutButton = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cid");
    localStorage.removeItem("cname");
    sessionStorage.removeItem("sessionauth");
    setIsLoggedIn(false);

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Login />);
  };

  const handleLoginButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Login />);
  };

  const handleAdminLogin = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<AdminLogin />);
  };

  const handleVenderButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VenderLogin />);
  };

  const handlecusLoginButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<CustomerLogin />);
  };

  const handleDashboard = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Homepage/>);
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: '#D9EAFD' }}
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Brand
          href="#home"
          className="mx-auto fw-bold"
          style={{
            background: 'linear-gradient(45deg, #ffc107, #f44336)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.8rem',
          }}
        >
          NexBuy
        </Navbar.Brand>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="align-items-center justify-content-between"
        >
          <Nav className="me-auto">
            <Nav.Link onClick={handleAdminLogin} className="text-dark">
              Admin
            </Nav.Link>
            <Nav.Link onClick={handleVenderButton} className="text-dark">
              Vendor
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-3 align-items-center">
          

            {isLoggedIn ? (
              <>
                <Button variant="primary" onClick={handleDashboard}>
                  Dashboard
                </Button>
                <Button variant="danger" onClick={handleLogoutButton}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="success" onClick={handleLoginButton}>
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
