import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../api/userApi";
import { useAuth } from "../context/auth";
import {
  Card,
  Avatar,
  Upload,
  Button,
  Input,
  Form,
  message,
  Space,
  Typography,
  Divider,
  Tag,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  PhoneOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, logout, isLoggedIn } = useAuth();
  const [form] = Form.useForm();

  const { data: userData, isLoading } = useGetUserByIdQuery("me", {
    skip: !token || !isLoggedIn,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [editing, setEditing] = useState(false);

  // Initialize form
  useEffect(() => {
    if (userData) {
      setPhotoPreview(userData.photo || "");
      form.setFieldsValue({
        username: userData.username || "",
        email: userData.email || "",
      });
    }
  }, [userData, form]);

  // Handle photo change
  const handlePhotoChange = ({ file }) => {
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit update
  const handleUpdate = async (values) => {
    try {
      const updateData = new FormData();
      updateData.append("username", values.username);
      updateData.append("email", values.email);
      if (values.password) updateData.append("password", values.password);
      if (photoFile) updateData.append("photo", photoFile);

      await updateUser({ id: "me", ...updateData }).unwrap();
      message.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading)
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header Card */}
        <Card
          bodyStyle={{ padding: "32px" }}
          style={{ borderRadius: 16, marginBottom: 24 }}
        >
          <Space
            direction="vertical"
            size={24}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={handlePhotoChange}
              showUploadList={false}
            >
              <Avatar
                size={120}
                src={photoPreview}
                icon={<UserOutlined />}
                style={{
                  cursor: "pointer",
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <div style={{ marginTop: 8, color: "#1890ff", fontSize: 12 }}>
                Click to change
              </div>
            </Upload>

            <div>
              <Title level={3} style={{ margin: 0 }}>
                {userData?.username || "User"}
              </Title>
              <Text type="secondary">{userData?.email}</Text>
            </div>

            <Space>
              <Button
                icon={editing ? <EditFilled /> : <EditOutlined />}
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
              <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </Space>
        </Card>

        {/* Edit Form */}
        {editing && (
          <Card
            title="Edit Profile"
            style={{ borderRadius: 16, marginBottom: 24 }}
          >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Required" },
                  { type: "email", message: "Invalid email" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter email" />
              </Form.Item>

              <Form.Item name="password" label="New Password (optional)">
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Leave blank to keep current"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords don't match"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm new password"
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={isUpdating}>
                    Save Changes
                  </Button>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        )}

        {/* Addresses */}
        <Card title="Saved Addresses" style={{ borderRadius: 16 }}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* Mock Address */}
            <Card
              size="small"
              style={{ borderRadius: 12 }}
              actions={[
                <Button type="text" icon={<EditFilled />} size="small">
                  Edit
                </Button>,
                <Button type="text" danger icon={<DeleteFilled />} size="small">
                  Remove
                </Button>,
              ]}
            >
              <Space direction="vertical" size={4}>
                <Space>
                  <Tag icon={<HomeOutlined />} color="blue">
                    Home
                  </Tag>
                  <Text strong>Mark Jugal</Text>
                </Space>
                <Text type="secondary">
                  549 Sulphur Springs Road
                  <br />
                  Downers Grove, IL 60515
                </Text>
                <Text>
                  <PhoneOutlined /> +1-123-456-7890
                </Text>
              </Space>
            </Card>

            <Button type="dashed" block icon={<HomeOutlined />}>
              + Add New Address
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
