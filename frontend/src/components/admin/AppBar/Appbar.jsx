import React from "react";
import {
  FaTachometerAlt,
  FaBlog,
  FaTags,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa"; // Importing icons
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="sidebar-container">
      {" "}
      {/* New container class */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="services-card">
            <div className="card-body">
              <h3 className="card-title">Welcome Boss</h3>
              <div className="services-main">
                <div className="services-item">
                  <div className="icon">
                    <FaTachometerAlt />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link to="/admin">Admin Dashboard</Link>
                    </h3>
                  </div>
                </div>
                <div className="services-item">
                  <div className="icon">
                    <FaTags />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link to="/admin/category">Category</Link>
                    </h3>
                  </div>
                </div>
                <div className="services-item">
                  <div className="icon">
                    <FaBlog />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link to="/admin/blogs">Blogs</Link>
                    </h3>
                  </div>
                </div>
                <div className="services-item">
                  <div className="icon">
                    <FaPhone />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link to="/admin/contact">Contact</Link>
                    </h3>
                  </div>
                </div>
                {/* Additional Sidebar Items can be added here */}
                <div className="services-item">
                  <div className="icon">
                    <FaSignOutAlt />
                  </div>
                  <div className="text">
                    <h3 className="title">Logout</h3>
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

export default AppBar;
