import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/userApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await loginUser(formData).unwrap();
      if (response?.token) {
        localStorage.setItem("authToken", response.token);
        setSuccess("User logged in successfully!");
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        setError("Login failed. Token not received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="container-fluid">
      <div className="row" style={{ "--mih-dynamic": "calc(100vh - 135px)" }}>
        <div className="col-12 col-md-8 col-xl-6">
          <div className="h-100 py-4 px-md-3">
            <div className="row h-100 align-items-center justify-content-center mt-md-3">
              <div className="col-12 col-sm-8 col-md-11 col-xl-11 col-xxl-10 login-box">
                <div className="card adminuiux-card shadow-sm mb-2">
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <h2 className="mb-1 text-theme-1">Login</h2>
                      <p className="text-secondary">
                        Take a deep dive into the new modern era
                      </p>
                    </div>
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
                      <div className="position-relative">
                        <div className="form-floating mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
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
                          onClick={togglePasswordVisibility}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                      <div className="row gx-3 align-items-center mb-3">
                        <div className="col">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="rememberme"
                              id="rememberme"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rememberme"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <a
                            href="adminux-forgot-password.html"
                            className="btn btn-link"
                          >
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <div className="row gx-3 align-items-center mb-4">
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-lg btn-theme w-100"
                            disabled={isLoading}
                          >
                            {isLoading ? "Logging in..." : "Login"}
                          </button>
                        </div>
                        <div className="col">
                          <a
                            href="adminux-signup.html"
                            className="btn btn-lg btn-link w-100"
                          >
                            Signup <i className="bi bi-chevron-right"></i>
                          </a>
                        </div>
                      </div>
                    </form>
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

export default Login;
