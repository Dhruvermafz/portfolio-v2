import React from "react";
import {
  FaTachometerAlt,
  FaBlog,
  FaTags,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa"; // Importing icons
import { Link, useNavigate } from "react-router-dom";
import "./AppBar.css";

const AppBar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const handleLogout = () => {
    // Remove the token from localStorage/sessionStorage
    localStorage.removeItem("authToken"); // or sessionStorage.removeItem("token");

    // Optionally, clear any other user-related state (e.g., Redux or Context)

    // Redirect to login or home page
    navigate("/login"); // Update to the path of your login page
  };

  return (
    <div className="navbar-container">
      <h3 className="card-title">Welcome Boss</h3>
      <div className="card-main">
        {/* Each card represents a link */}
        <div className="card-item">
          <div className="icon">
            <FaTachometerAlt />
          </div>
          <div className="text">
            <h3 className="title">
              <Link to="/admin">Admin Dashboard</Link>
            </h3>
          </div>
        </div>
        <div className="card-item">
          <div className="icon">
            <FaTags />
          </div>
          <div className="text">
            <h3 className="title">
              <Link to="/admin/category">Category</Link>
            </h3>
          </div>
        </div>
        <div className="card-item">
          <div className="icon">
            <FaBlog />
          </div>
          <div className="text">
            <h3 className="title">
              <Link to="/admin/blogs">Blogs</Link>
            </h3>
          </div>
        </div>
        <div className="card-item">
          <div className="icon">
            <FaPhone />
          </div>
          <div className="text">
            <h3 className="title">
              <Link to="/admin/contact">Contact</Link>
            </h3>
          </div>
        </div>
        <div
          className="card-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div className="text">
            <h3 className="title">Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
