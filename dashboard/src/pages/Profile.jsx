import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../api/slices/authSlice";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../api/userApi";
import { Form, Button, Alert } from "react-bootstrap";
import Avatar from "react-avatar";
import { RiArrowDownSLine } from "react-icons/ri";
import "./profile.css"; // Import custom CSS

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch authenticated user data
  const token = localStorage.getItem("authToken");
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery("me", {
    skip: !token,
  });

  // State for form fields
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  // RTK Query mutation for updating user
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: "me", ...formData }).unwrap();
      setUpdateSuccess("Profile updated successfully!");
      setUpdateError(null);
    } catch (err) {
      setUpdateError(err?.data?.message || "Failed to update profile.");
      setUpdateSuccess(null);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(setCredentials({ user: null, token: null }));
    navigate("/login");
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div className="profile-page">
            <div className="profile-container">
              <div className="profile-header">
                <div className="media profile-media">
                  <Avatar
                    name={user?.name || "Guest"}
                    src={user?.avatar}
                    size="60"
                    round={true}
                    className="user-profile rounded-circle"
                    alt={user?.name || "User"}
                  />
                  <div className="user-name-hide media-body">
                    <span>
                      {isLoading
                        ? "Loading..."
                        : isError
                        ? "Guest"
                        : user?.name}
                    </span>
                    <p className="mb-0 font-roboto">
                      {isError || !user ? "Guest" : "Admin"}
                      <RiArrowDownSLine className="middle" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="profile-content">
                {isLoading && (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {isError && (
                  <Alert variant="danger">
                    {error?.data?.message || "Failed to load profile."}
                  </Alert>
                )}
                {updateError && <Alert variant="danger">{updateError}</Alert>}
                {updateSuccess && (
                  <Alert variant="success">{updateSuccess}</Alert>
                )}

                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      disabled={isLoading || isUpdating}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      disabled={isLoading || isUpdating}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="Enter avatar image URL"
                      disabled={isLoading || isUpdating}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading || isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </Form>

                <div className="profile-actions">
                  <Link to="/order-list" className="profile-link">
                    View Orders
                  </Link>
                  <Link to="/support-ticket" className="profile-link">
                    Support Tickets
                  </Link>
                  <Button variant="danger" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
