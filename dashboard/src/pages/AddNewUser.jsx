import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Alert } from "antd";
import { useAddUserMutation } from "../api/userApi";

const { Option } = Select;

const AddNewUser = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // RTK Query mutation hook
  const [addUser, { isLoading }] = useAddUserMutation();

  // Handle form submission
  const handleSubmit = async (values) => {
    setMessage("");
    setError("");

    try {
      // Prepare data for the API (exclude confirmPassword)
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        photo: values.photo,
        role: values.role,
      };

      // Call the RTK Query mutation
      const response = await addUser(userData).unwrap();
      setMessage(response.message || "User added successfully");
      form.resetFields();
    } catch (err) {
      setError(err.data?.message || "Failed to add user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <div className="add-user-card">
            <h5 style={{ marginBottom: 24, fontSize: 20, fontWeight: "bold" }}>
              Add New User
            </h5>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{ role: "user" }}
            >
              <h6
                style={{ marginBottom: 16, fontSize: 16, fontWeight: "bold" }}
              >
                User Information
              </h6>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Username is required" },
                    ]}
                  >
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Enter a valid email" },
                    ]}
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm password" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Photo URL" name="photo">
                    <Input placeholder="Enter photo URL" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: "Role is required" }]}
                  >
                    <Select placeholder="Select role">
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      block
                    >
                      {isLoading ? "Adding..." : "Add User"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              {message && (
                <Alert
                  message={message}
                  type="success"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddNewUser;
