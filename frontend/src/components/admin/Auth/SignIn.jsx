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
import { useLoginUserMutation } from "../../../api/userApi";
import loti from "../../../assets/img/loti/loti-auth.svg";
import "./auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation(); // ✅ use mutation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await loginUser(formData).unwrap(); // ✅ unwrap response

      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        setSuccess("User logged in successfully!");
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <section className="login-section py-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <Image
              src={loti}
              alt="Authentication Illustration"
              className="login-image"
              fluid
            />
            <h3 className="login-welcome mt-3">Welcome Back!</h3>
            <p className="login-subtitle text-muted">
              Log in to manage your projects, blogs, and achievements.
            </p>
          </Col>

          <Col lg={6}>
            <Card className="login-card shadow-sm">
              <Card.Body className="p-4">
                <h3 className="login-title">Login</h3>
                <p className="login-subtitle text-muted">
                  Enter your credentials to continue
                </p>
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

                  <Form.Group className="mb-4" controlId="rememberMe">
                    <Form.Check type="checkbox" label="Remember Me" />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  Don't have an account?{" "}
                  <a href="/signup" className="login-signup-link">
                    Sign Up
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

export default Login;
