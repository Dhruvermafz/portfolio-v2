import React, { useState } from "react";
import { useAddUserMutation } from "../api/userApi";
const AddNewUser = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    role: "user", // Default role
  });

  // State for feedback messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // RTK Query mutation hook
  const [addUser, { isLoading }] = useAddUserMutation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Prepare data for the API (exclude confirmPassword)
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        photo: formData.photo,
        role: formData.role,
      };

      // Call the RTK Query mutation
      const response = await addUser(userData).unwrap();
      setMessage(response.message || "User added successfully");
      // Reset form on success
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        photo: "",
        role: "user",
      });
    } catch (err) {
      setError(err.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-8 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="title-header option-title">
                    <h5>Add New User</h5>
                  </div>
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                      >
                        Account
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                    >
                      <form
                        className="theme-form theme-form-2 mega-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="card-header-1">
                          <h5>User Information</h5>
                        </div>

                        <div className="row">
                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Username
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <input
                                className="form-control"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Email Address
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Password
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Confirm Password
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <input
                                className="form-control"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Photo URL
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <input
                                className="form-control"
                                type="text"
                                name="photo"
                                value={formData.photo}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-4 row align-items-center">
                            <label className="form-label-title col-lg-2 col-md-3 mb-0">
                              Role
                            </label>
                            <div className="col-md-9 col-lg-10">
                              <select
                                className="form-control"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-9 col-lg-10 offset-lg-2 offset-md-3">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                              >
                                {isLoading ? "Adding..." : "Add User"}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Messages */}
                        {message && (
                          <div className="alert alert-success mt-3">
                            {message}
                          </div>
                        )}
                        {error && (
                          <div className="alert alert-danger mt-3">{error}</div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
