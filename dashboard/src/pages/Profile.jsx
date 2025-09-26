import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../api/userApi";
import { Form, Input, Button, Alert, Upload, Avatar } from "antd";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "../context/auth";
import "./profile.css"; // Import custom CSS

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, logout, isLoggedIn } = useAuth(); // Use AuthContext
  const [form] = Form.useForm();

  // Fetch authenticated user data
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery("me", {
    skip: !token || !isLoggedIn,
  });

  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState(null); // For file upload
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  // RTK Query mutation for updating user
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Populate form with user data when fetched
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
        photo: userData.photo || "",
      });
      form.setFieldsValue({
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userData, form]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = ({ file }) => {
    setPhotoFile(file);
    // Optionally preview the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update submission
  const handleUpdate = async () => {
    try {
      // Validate form
      await form.validateFields();

      // Validate passwords
      if (formData.password && formData.password !== formData.confirmPassword) {
        setUpdateError("Passwords do not match!");
        setUpdateSuccess(null);
        return;
      }

      // Prepare form data for submission
      const updateData = {
        username: formData.username,
        email: formData.email,
        photo: formData.photo,
      };
      if (formData.password) {
        updateData.password = formData.password;
      }

      // If a file is selected, upload it
      if (photoFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("username", updateData.username);
        formDataToSend.append("email", updateData.email);
        if (updateData.password) {
          formDataToSend.append("password", updateData.password);
        }
        formDataToSend.append("photo", photoFile);

        await updateUser({ id: "me", ...formDataToSend }).unwrap();
      } else {
        await updateUser({ id: "me", ...updateData }).unwrap();
      }

      setUpdateSuccess("Profile updated successfully!");
      setUpdateError(null);
    } catch (err) {
      setUpdateError(err?.data?.message || "Failed to update profile.");
      setUpdateSuccess(null);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Use AuthContext logout
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12">
              {/* Details Start */}
              <div className="card">
                <div className="card-body">
                  <div className="title-header option-title">
                    <h5>Profile Setting</h5>
                    <Button danger onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>

                  {isLoading && <p>Loading...</p>}
                  {isError && (
                    <Alert
                      message={
                        error?.data?.message || "Failed to load profile."
                      }
                      type="error"
                      showIcon
                    />
                  )}
                  {updateSuccess && (
                    <Alert message={updateSuccess} type="success" showIcon />
                  )}
                  {updateError && (
                    <Alert message={updateError} type="error" showIcon />
                  )}

                  <Form
                    form={form}
                    layout="horizontal"
                    onFinish={handleUpdate}
                    className="theme-form theme-form-2 mega-form"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                  >
                    <div className="row">
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your username",
                          },
                        ]}
                      >
                        <Input
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter Your Username"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Your Email Address"
                        />
                      </Form.Item>

                      <Form.Item label="Photo" name="photo">
                        <div className="d-flex align-items-center">
                          {formData.photo && (
                            <Avatar
                              src={formData.photo}
                              size={50}
                              round={true}
                              style={{ marginRight: 16 }}
                            />
                          )}
                          <Upload
                            accept="image/*"
                            beforeUpload={() => false} // Prevent auto-upload
                            onChange={handleFileChange}
                            showUploadList={false}
                          >
                            <Button icon={<UploadOutlined />}>
                              Choose Image
                            </Button>
                          </Upload>
                        </div>
                      </Form.Item>

                      <Form.Item label="Password" name="password">
                        <Input.Password
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter New Password (optional)"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                      >
                        <Input.Password
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm New Password"
                        />
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
              {/* Details End */}

              {/* Address Start */}
              <div className="card">
                <div className="card-body">
                  <div className="card-header-2 mb-3">
                    <h5>Address</h5>
                  </div>

                  <div className="save-details-box">
                    <div className="row g-4">
                      {/* Mocked address data */}
                      <div className="col-xl-4 col-md-6">
                        <div className="save-details">
                          <div className="save-name">
                            <h5>Mark Jugal</h5>
                          </div>
                          <div className="save-position">
                            <h6>Home</h6>
                          </div>
                          <div className="save-address">
                            <p>549 Sulphur Springs Road</p>
                            <p>Downers Grove, IL</p>
                            <p>60515</p>
                          </div>
                          <div className="mobile">
                            <p className="mobile">Mobile No. +1-123-456-7890</p>
                          </div>
                          <div className="button">
                            <Link
                              to="/profile/edit-address"
                              className="btn btn-sm"
                            >
                              Edit
                            </Link>
                            <Button size="small">Remove</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Address End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
