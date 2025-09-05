import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { RiAppsLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import masterRoutes from "../../Router/routes";
import logo_white from "../../assets/images/logo/logo@transparent.png";
import logo_icon_white from "../../assets/images/logo/logo@transparent.png";
import logo_icon_dark from "../../assets/images/logo/logo@transparent.png";
import "./sidebar.css";

const Sidebar = () => {
  // State to track the currently open submenu
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Toggle sidebar (optional, add your logic here)
  const initSidebar = () => {
    console.log("Sidebar toggle clicked");
    // Add sidebar toggle logic here (e.g., toggle sidebar visibility)
  };

  // Handle submenu toggle
  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="sidebar-wrapper">
      <div id="sidebarEffect"></div>

      {/* Logo Section */}
      <div className="logo-wrapper logo-wrapper-center">
        <a href="index.html" data-bs-original-title="" title="">
          <img className="img-fluid for-white" src={logo_white} alt="logo" />
        </a>
        <div className="back-btn">
          <FaAngleLeft />
        </div>
        <div className="toggle-sidebar" onClick={initSidebar}>
          <RiAppsLine className="status_toggle middle sidebar-toggle" />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <a href="index.html">
          <img
            className="img-fluid main-logo main-white"
            src={logo_icon_white}
            alt="logo"
          />
          <img
            className="img-fluid main-logo main-dark"
            src={logo_icon_dark}
            alt="logo"
          />
        </a>
      </div>

      {/* Sidebar Menu */}
      <nav className="sidebar-main">
        <div className="left-arrow" id="left-arrow">
          <RiArrowLeftLine />
        </div>
        <div id="sidebar-menu">
          <ul className="sidebar-links" id="simple-bar">
            <li className="back-btn"></li>
            {masterRoutes
              .filter((route) => route.isSidebarActive)
              .map((route, index) => (
                <li className="sidebar-list" key={index}>
                  {route.submenu.length > 0 ? (
                    // Dropdown for routes with submenus
                    <a
                      className={`linear-icon-link sidebar-link sidebar-title ${
                        openSubmenu === index ? "active" : ""
                      }`}
                      href="#"
                      onClick={() => handleSubmenuToggle(index)}
                      role="button"
                    >
                      {route.icon}
                      <span>{route.name}</span>
                    </a>
                  ) : (
                    // Single link for routes without submenus
                    <Link
                      className="sidebar-link sidebar-title link-nav"
                      to={route.path}
                    >
                      {route.icon}
                      <span>{route.name}</span>
                    </Link>
                  )}
                  {route.submenu.length > 0 && (
                    <ul
                      className={`sidebar-submenu ${
                        openSubmenu === index ? "show" : ""
                      }`}
                      id={`submenu-${index}`}
                    >
                      {route.submenu
                        .filter((subRoute) => subRoute.isSidebarActive) // Filter submenu items
                        .map((subRoute, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subRoute.path}>{subRoute.name}</Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className="right-arrow" id="right-arrow">
          <RiArrowRightLine />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
