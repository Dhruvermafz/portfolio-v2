import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Alert,
  Avatar,
  Space,
  Typography,
} from "antd";
import {
  UserAddOutlined,
  MailOutlined,
  LockOutlined,
  LinkOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useAddUserMutation } from "../api/userApi";

const { Title, Text } = Typography;
const { Option } = Select;

const AddNewUser = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (values) => {
    setMessage("");
    setError("");

    try {
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        photo: values.photo,
        role: values.role,
      };

      const response = await addUser(userData).unwrap();
      setMessage(response.message || "User added successfully!");
      form.resetFields();
      setPhotoUrl("");
    } catch (err) {
      setError(err.data?.message || "Failed to add user");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0" }}
        >
          <Space align="center">
            <Avatar
              size={40}
              icon={<UserAddOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            />
            <div>
              <Title level={4} style={{ margin: 0, fontSize: 18 }}>
                Add New User
              </Title>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Fill in the details below
              </Text>
            </div>
          </Space>
        </div>

        {/* Form Body */}
        <div style={{ padding: "20px 24px" }}>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            size="middle"
            initialValues={{ role: "user" }}
          >
            {/* Photo Preview */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <Avatar
                size={72}
                src={photoUrl}
                icon={<UserAddOutlined />}
                style={{
                  backgroundColor: photoUrl ? "transparent" : "#e6f7ff",
                  border: "2px dashed #d9d9d9",
                }}
              />
            </div>

            {/* Username */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Required" }]}
              style={{ marginBottom: 12 }}
            >
              <Input
                prefix={<UserAddOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="Username"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Invalid email" },
              ]}
              style={{ marginBottom: 12 }}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="Email"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Required" },
                { min: 6, message: "Min 6 chars" },
              ]}
              style={{ marginBottom: 12 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="Password"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
              style={{ marginBottom: 12 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            {/* Photo URL */}
            <Form.Item name="photo" style={{ marginBottom: 12 }}>
              <Input
                prefix={<LinkOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="Photo URL (optional)"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </Form.Item>

            {/* Role */}
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Select role" }]}
              style={{ marginBottom: 16 }}
            >
              <Select placeholder="Select role">
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            {/* Submit */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{
                  height: 40,
                  fontWeight: 600,
                  borderRadius: 6,
                }}
              >
                {isLoading ? "Adding..." : "Add User"}
              </Button>
            </Form.Item>
          </Form>

          {/* Feedback */}
          {message && (
            <Alert
              message={message}
              type="success"
              showIcon
              style={{ marginTop: 12, borderRadius: 6 }}
              closable
              onClose={() => setMessage("")}
            />
          )}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginTop: 12, borderRadius: 6 }}
              closable
              onClose={() => setError("")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
