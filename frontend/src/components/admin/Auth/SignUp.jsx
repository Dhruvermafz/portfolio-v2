import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Image,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loti from "../../../assets/img/loti/loti-auth.svg";
import "./auth.css";
import { useRegisterUserMutation } from "../../../api/userApi";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await registerUser(formData).unwrap();
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <section className="signup-section py-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <Image
              src={loti}
              alt="Sign Up Illustration"
              className="signup-image"
              fluid
            />
            <h3 className="signup-welcome mt-3">Join Us!</h3>
            <p className="signup-subtitle text-muted">
              Create an account to manage your projects, blogs, and
              achievements.
            </p>
          </Col>

          <Col lg={6}>
            <Card className="signup-card shadow-sm">
              <Card.Body className="p-4">
                <h3 className="signup-title">Sign Up</h3>
                <p className="signup-subtitle text-muted">
                  Create your account to get started
                </p>
                {error && (
                  <Alert variant="danger" className="signup-alert">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="signup-alert">
                    {success}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Debra Holt"
                      className="signup-input"
                      required
                      aria-label="Username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="debra.holt@example.com"
                      className="signup-input"
                      required
                      aria-label="Email address"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="signup-input"
                      required
                      aria-label="Password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="rememberMe">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      className="signup-checkbox"
                      aria-label="Remember me checkbox"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="signup-btn w-100"
                    disabled={isRegistering}
                  >
                    {isRegistering ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Signing Up...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </Form>
                <div className="mt-3 text-center">
                  Already have an account?{" "}
                  <a href="/login" className="signup-login-link">
                    Login
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
