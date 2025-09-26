import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/userApi";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Row,
  Col,
  Alert,
  Tooltip,
  Typography,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+44", // Default phone code
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const handleChange = (changedValues) => {
    setFormData((prev) => ({
      ...prev,
      ...changedValues,
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!formData.username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Prepare data for API call (exclude confirmPassword)
      const { confirmPassword, ...apiData } = formData;
      await registerUser(apiData).unwrap();
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
    <main style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div
        style={{
          background:
            "url('assets/img/background-image/backgorund-image-13.jpg') center/cover no-repeat",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.14,
        }}
      />
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
      >
        <Col xs={22} sm={16} md={12} lg={10} xl={8}>
          <Card
            className="login-box"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              borderRadius: 12,
            }}
            bodyStyle={{ padding: 32 }}
          >
            <div className="text-center" style={{ marginBottom: 32 }}>
              <Title level={2} style={{ color: "#5634cf", marginBottom: 0 }}>
                Let's get started
                <span role="img" aria-label="thumbs up">
                  👍
                </span>
              </Title>
              <Text type="secondary">Provide your few details</Text>
            </div>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            {success && (
              <Alert
                message={success}
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={formData}
              onValuesChange={(_, allValues) => handleChange(allValues)}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is required." },
                    ]}
                  >
                    <Input
                      placeholder="Enter first name"
                      autoComplete="given-name"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Last name is required." },
                    ]}
                  >
                    <Input
                      placeholder="Enter last name"
                      autoComplete="family-name"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username is required." }]}
              >
                <Input placeholder="Enter username" autoComplete="username" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email is required." },
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                ]}
              >
                <Input placeholder="Enter email address" autoComplete="email" />
              </Form.Item>

              <Input.Group
                compact
                style={{ display: "flex", marginBottom: 16 }}
              >
                <Form.Item
                  name="phoneCode"
                  style={{ flex: "0 0 110px", marginRight: 8, marginBottom: 0 }}
                >
                  <Select style={{ width: 110 }}>
                    <Option value="+1">+1</Option>
                    <Option value="+44">+44</Option>
                    <Option value="+66">+66</Option>
                    <Option value="+91">+91</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  style={{ flex: 1, marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Phone number is required." },
                  ]}
                >
                  <Input
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </Form.Item>
              </Input.Group>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required." },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters.",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle
                />
              </Form.Item>
              {/* Strength bar and info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div
                  id="checksterngthdisplay"
                  style={{ flex: 1, display: "flex", gap: 2 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: 4,
                        width: 22,
                        borderRadius: 2,
                        background: "#e0e0e0",
                      }}
                    />
                  ))}
                </div>
                <Tooltip
                  title="Password should contain at least 1 capital, 1 alphanumeric & min. 8 characters"
                  placement="top"
                >
                  <Text style={{ marginLeft: 10, fontSize: 13 }}>
                    <InfoCircleOutlined style={{ color: "#5634cf" }} />
                  </Text>
                </Tooltip>
              </div>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match.")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  visibilityToggle
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isRegistering}
                  style={{ background: "#5634cf", borderColor: "#5634cf" }}
                >
                  {isRegistering ? "Signing up..." : "Sign up"}
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#5634cf" }}>
                Login
              </Link>{" "}
              here.
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default Signup;
