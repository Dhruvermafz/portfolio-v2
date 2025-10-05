import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/userApi";
import { useAuth } from "../context/auth"; // Import AuthContext
import {
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Card,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { login } = useAuth(); // Get login function from AuthContext

  const onFinish = async (values) => {
    setError("");
    setSuccess("");
    try {
      const response = await loginUser(values).unwrap();
      if (response?.token) {
        // Call AuthContext login with user details
        login(response.token, {
          id: response.id,
          username: response.username,
          photo: response.photo || "https://example.com/default-avatar.png",
          role: response.role || "user",
        });
        setSuccess("User logged in successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      setError(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 135px)",
        background: "#f5f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          <Card
            style={{ borderRadius: 12 }}
            className="adminuiux-card"
            bodyStyle={{ padding: 32 }}
            bordered={false}
            shadow="sm"
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <Title level={2} style={{ marginBottom: 4, color: "#1890ff" }}>
                Login
              </Title>
              <Text type="secondary">
                Take a deep dive into the new modern era
              </Text>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
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
            </Space>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
              initialValues={{
                email: "",
                password: "",
                rememberme: false,
              }}
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  placeholder="Enter email address"
                  size="large"
                  autoComplete="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 16 }}
                gutter={16}
              >
                <Col>
                  <Form.Item name="rememberme" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    type="link"
                    href="adminux-forgot-password.html"
                    style={{ padding: 0 }}
                  >
                    Forgot Password?
                  </Button>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isLoading}
                  >
                    {isLoading ? <LoadingOutlined /> : "Login"}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="link"
                    href="adminux-signup.html"
                    block
                    size="large"
                  >
                    Signup <i className="bi bi-chevron-right"></i>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
