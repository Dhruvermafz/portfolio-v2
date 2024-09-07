import React, { useState } from "react";
import axios from "axios";
import loti from "../../../assets/img/loti/loti-auth.svg";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // State to handle errors
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );
      // Handle successful response
      console.log("User registered successfully:", response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Handle error
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6} className="text-center mb-4">
          <img src={loti} alt="loti" className="img-fluid" />
          <h3 className="mt-4">Welcome back!</h3>
          <p className="text-muted">
            Whether you're launching a stunning online store optimizing your our
            object-oriented
          </p>
        </Col>

        <Col lg={6}>
          <div className="border p-4 rounded-3">
            <h3>Sign Up</h3>
            <p className="text-muted">Welcome! Create your account</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Debra Holt"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="debra.holt@example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="rememberMe">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
            <div className="mt-3">
              Have an account?{" "}
              <a href="/login" className="text-primary">
                Login
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
