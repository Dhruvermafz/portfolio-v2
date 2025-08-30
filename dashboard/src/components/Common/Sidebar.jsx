import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";
import { RiAppsLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import masterRoutes from "../../Router/routes";
import logo_white from "../../assets/images/logo/full-white.png";
import logo_icon_white from "../../assets/images/logo/logo.png";
import logo_icon_dark from "../../assets/images/logo/logo-white.png";
import "./sidebar.css";
const Sidebar = () => {
  const initSidebar = () => {
    console.log("Sidebar toggle clicked");
    // Add sidebar toggle logic here (e.g., toggle sidebar visibility)
  };

  return (
    <div className="sidebar-wrapper">
      <div id="sidebarEffect"></div>

      {/* Logo Section */}
      <div class="logo-wrapper logo-wrapper-center">
        <a href="index.html" data-bs-original-title="" title="">
          <img
            class="img-fluid for-white"
            src="assets/images/logo/full-white.png"
            alt="logo"
          />
        </a>
        <div class="back-btn">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="toggle-sidebar">
          <i class="ri-apps-line status_toggle middle sidebar-toggle"></i>
        </div>
      </div>
      <div class="logo-icon-wrapper">
        <a href="index.html">
          <img
            class="img-fluid main-logo main-white"
            src="assets/images/logo/logo.png"
            alt="logo"
          />
          <img
            class="img-fluid main-logo main-dark"
            src="assets/images/logo/logo-white.png"
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
                      className="linear-icon-link sidebar-link sidebar-title"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target={`#submenu-${index}`}
                      aria-expanded="false"
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
                      className="sidebar-submenu collapse"
                      id={`submenu-${index}`}
                    >
                      {route.submenu.map((subRoute, subIndex) => (
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
