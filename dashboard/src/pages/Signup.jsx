import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/userApi";
import { Link } from "react-router-dom";
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
  const navigate = useNavigate();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <main className="flex-shrink-0 pt-0 h-100">
      <div className="container-fluid">
        <div className="auth-wrapper">
          <div className="coverimg h-100 w-100 top-0 start-0 position-absolute z-index-0">
            <img
              src="assets/img/background-image/backgorund-image-13.jpg"
              alt=""
            />
          </div>

          <div
            className="row justify-content-center minheight-dynamic"
            style={{ "--mih-dynamic": "calc(100vh - 135px)" }}
          >
            <div className="col-12 col-md-8 col-xl-6">
              <div className="h-100 py-3 px-md-3">
                <div className="row h-100 align-items-center justify-content-center mt-md-3">
                  <div className="col-12 col-sm-8 col-md-11 col-xl-11 col-xxl-10 login-box">
                    <div className="card adminuiux-card shadow-sm mb-2">
                      <div className="card-body">
                        <div className="text-center mb-3 mb-lg-4">
                          <h1 className="mb-1 text-theme-1">
                            Let's get started&#128077;
                          </h1>
                          <p className="text-secondary">
                            Provide your few details
                          </p>
                        </div>

                        {/* Display error or success message */}
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                        {success && (
                          <div className="alert alert-success" role="alert">
                            {success}
                          </div>
                        )}

                        <form onSubmit={handleSubmit}>
                          <div className="row gx-3 gx-lg-4">
                            <div className="col">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  placeholder="Enter first name"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  required
                                />
                                <label htmlFor="firstName">First Name</label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  placeholder="Enter last name"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  required
                                />
                                <label htmlFor="lastName">Last Name</label>
                              </div>
                            </div>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                              value={formData.username}
                              onChange={handleChange}
                              required
                            />
                            <label htmlFor="username">Username</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter email address"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <label htmlFor="email">Email Address</label>
                          </div>

                          <div className="input-group mb-3">
                            <div className="form-floating maxwidth-100">
                              <select
                                className="form-select"
                                id="phoneCode"
                                value={formData.phoneCode}
                                onChange={handleChange}
                              >
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+66">+66</option>
                                <option value="+91">+91</option>
                              </select>
                              <label htmlFor="phoneCode">Code</label>
                            </div>
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="phoneNumber">Phone Number</label>
                            </div>
                          </div>

                          <div className="position-relative">
                            <div className="form-floating mb-2 mb-lg-3">
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="password">Password</label>
                            </div>
                            <button
                              type="button"
                              className="btn btn-square btn-link text-theme-1 position-absolute end-0 top-0 mt-2 me-2"
                              onClick={(e) => {
                                const input =
                                  document.getElementById("password");
                                input.type =
                                  input.type === "password"
                                    ? "text"
                                    : "password";
                              }}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          </div>
                          <div className="feedback mb-2 mb-lg-3">
                            <div className="row gx-3 gx-lg-4">
                              <div className="col">
                                <div
                                  className="check-strength"
                                  id="checksterngthdisplay"
                                >
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <span
                                  className="small"
                                  id="textpassword"
                                ></span>
                                <i
                                  className="bi bi-info-circle text-theme-1 ms-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Password should contain at least 1 capital, 1 alphanumeric & min. 8 characters"
                                ></i>
                              </div>
                            </div>
                          </div>

                          <div className="position-relative">
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                              />
                              <label htmlFor="confirmPassword">
                                Confirm Password
                              </label>
                            </div>
                            <button
                              type="button"
                              className="btn btn-square btn-link text-theme-1 position-absolute end-0 top-0 mt-2 me-2"
                              onClick={(e) => {
                                const input =
                                  document.getElementById("confirmPassword");
                                input.type =
                                  input.type === "password"
                                    ? "text"
                                    : "password";
                              }}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-lg btn-theme w-100 mb-4"
                            disabled={isRegistering}
                          >
                            {isRegistering ? "Signing up..." : "Sign up"}
                          </button>
                        </form>

                        <div className="text-center">
                          Already have an account?{" "}
                          <Link to="/login" className="text-theme-1">
                            Login
                          </Link>{" "}
                          here.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
