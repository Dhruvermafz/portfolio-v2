import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../api/slices/authSlice"; // Adjust path as needed
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
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        photo: user.photo || "",
      });
    }
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password && formData.password !== formData.confirmPassword) {
      setUpdateError("Passwords do not match!");
      setUpdateSuccess(null);
      return;
    }

    try {
      // Prepare form data for submission
      const updateData = {
        username: formData.username,
        email: formData.email,
        photo: formData.photo,
      };
      if (formData.password) {
        updateData.password = formData.password;
      }

      // If a file is selected, upload it (assuming backend supports file uploads)
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
    localStorage.removeItem("authToken");
    dispatch(setCredentials({ user: null, token: null }));
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
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>

                  {isLoading && <p>Loading...</p>}
                  {isError && (
                    <Alert variant="danger">
                      {error?.data?.message || "Failed to load profile."}
                    </Alert>
                  )}
                  {updateSuccess && (
                    <Alert variant="success">{updateSuccess}</Alert>
                  )}
                  {updateError && <Alert variant="danger">{updateError}</Alert>}

                  <form
                    className="theme-form theme-form-2 mega-form"
                    onSubmit={handleUpdate}
                  >
                    <div className="row">
                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-2 mb-0">
                          Username
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter Your Username"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-2 mb-0">
                          Email Address
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Your Email Address"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-2 mb-0">
                          Photo
                        </label>
                        <div className="col-sm-10">
                          <div className="d-flex align-items-center">
                            {formData.photo && (
                              <Avatar
                                src={formData.photo}
                                size="50"
                                round={true}
                                className="me-3"
                              />
                            )}
                            <input
                              className="form-control form-choose"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-2 mb-0">
                          Password
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter New Password (optional)"
                          />
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-2 mb-0">
                          Confirm Password
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm New Password"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-10 offset-sm-2">
                          <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Profile"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
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
                      {/* Mocked address data (since backend doesn't support addresses) */}
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
                            <button className="btn btn-sm">Remove</button>
                          </div>
                        </div>
                      </div>
                      {/* Add more address cards as needed */}
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
