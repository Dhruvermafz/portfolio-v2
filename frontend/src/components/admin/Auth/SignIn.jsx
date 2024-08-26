import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons from react-icons
import axios from "axios"; // Importing axios

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/path-to-authentication-endpoint", {
        email,
        password,
      });
      // Handle success, e.g., redirect to another page or show a success message
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card contact-card">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
                Welcome Back! <span>Sign In</span>
              </h1>
              <p>Please enter your credentials to access your account.</p>
            </div>
          </div>
          <div className="contact-area">
            <div className="leave-comments-area">
              <div className="comments-box">
                <form id="sign-in-form" onSubmit={handleSubmit}>
                  <div className="row gx-3">
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-control shadow-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label className="form-label">Password</label>
                        <div className="relative">
                          <input
                            name="password"
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control shadow-none"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="flex items-center justify-between mt-3 mb-7">
                        <div className="flex items-center gap-1 select-none">
                          <input
                            type="checkbox"
                            name="remember-me"
                            id="rememberMe"
                          />
                          <label
                            htmlFor="rememberMe"
                            className="font-spline_sans text-sm leading-none text-gray-900 dark:text-dark-text cursor-pointer"
                          >
                            Remember Me
                          </label>
                        </div>
                        <a
                          href="forgot-password.html"
                          className="text-xs leading-none text-primary-500 font-semibold"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button className="submit-btn w-full" type="submit">
                        Sign In
                        <svg
                          className="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <p className="ajax-response mb-0 mt-5">
                  Don't have an account yet?{" "}
                  <a
                    href="sign-up.html"
                    className="text-primary-500 font-semibold"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
