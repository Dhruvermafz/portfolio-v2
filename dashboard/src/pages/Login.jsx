// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/userApi";
import { useAuth } from "../context/auth";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Card,
  Row,
  Col,
  Space,
  Typography,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setError("");
    setSuccess("");
    try {
      const response = await loginUser(values).unwrap();
      if (response?.token) {
        login(response.token, {
          id: response.id,
          username: response.username,
          photo: response.photo || "https://via.placeholder.com/80",
          role: response.role || "user",
        });
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={22} sm={18} md={12} lg={10} xl={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: 32 }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Title level={3} style={{ margin: 0, color: "#262626" }}>
                Login
              </Title>
            </div>

            {/* Alerts */}
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: 16 }}
            >
              {error && <Alert message={error} type="error" showIcon />}
              {success && <Alert message={success} type="success" showIcon />}
            </Space>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email address"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Row justify="space-between" style={{ marginBottom: 16 }}>
                <Form.Item name="rememberme" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Row>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                style={{ height: 44 }}
              >
                {isLoading ? <LoadingOutlined /> : "Sign In"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
