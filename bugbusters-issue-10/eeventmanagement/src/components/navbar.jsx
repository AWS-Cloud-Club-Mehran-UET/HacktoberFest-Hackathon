import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginModal from './LoginModal'; // Import the LoginModal component
import RegisterModal from './RegisterModal'; // Import the RegisterModal component
import { useAuth } from '../context/AuthContext';

function CustomNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleLoginModalShow = () => setShowLoginModal(true);

  const handleRegisterModalClose = () => setShowRegisterModal(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  const handleEventManagerDashboard = () => {
    navigate('/eventmanager');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">EventManager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/community">Community</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} />}
                id="navbarScrollingDropdown"
                align="end" // Align the dropdown to the end of the navbar
              >
                <NavDropdown.Item onClick={handleLoginModalShow}>Login</NavDropdown.Item> {/* Add login button */}
                <NavDropdown.Item onClick={handleRegisterModalShow}>Register</NavDropdown.Item> {/* Add register button */}
                {role === 'admin' && (
                  <NavDropdown.Item onClick={handleAdminDashboard}>Admin Dashboard</NavDropdown.Item>
                )}
                {role === 'eventmanager' && (
                  <NavDropdown.Item onClick={handleEventManagerDashboard}>Event Manager Dashboard</NavDropdown.Item>
                )}
                <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> {/* Add logout button */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} /> {/* Add the LoginModal component */}
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} /> {/* Add the RegisterModal component */}
    </>
  );
}

export default CustomNavbar;