import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';

function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleSignIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    handleClose();
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <hr />
        <Button variant="danger" onClick={handleGoogleSignIn}>
          Sign in with Google
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;