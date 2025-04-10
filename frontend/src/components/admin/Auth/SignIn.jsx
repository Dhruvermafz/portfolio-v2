import React, { useState } from "react";
import axios from "axios";
import loti from "../../../assets/img/loti/loti-auth.svg";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

const Login = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to handle errors and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // For navigation after successful login
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    try {
      const response = await axios.post(`${API_URL}/user/login`, formData);

      if (response.data?.token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);

        // Set success message
        setSuccess("User logged in successfully!");

        // Redirect to the admin page
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6} className="text-center mb-4">
          <img src={loti} alt="loti" className="img-fluid" />
          <h3 className="mt-4">Welcome back!</h3>
          <p className="text-muted">
            Log in to access your account and continue where you left off.
          </p>
        </Col>

        <Col lg={6}>
          <div className="border p-4 rounded-3">
            <h3>Login</h3>
            <p className="text-muted">Please enter your credentials</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                Log In
              </Button>
            </Form>
            <div className="mt-3">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign Up
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
