import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { BiChevronLeft, BiChevronRight, BiGrid } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa";
import masterRoutes from "../../Router/routes";
import logo_white from "../../assets/images/logo/full-white.png";
import logo_icon_white from "../../assets/images/logo/1-white.png";
import logo_icon_dark from "../../assets/images/logo/logo-white.png";
import { BiListUl } from "react-icons/bi";
const Sidebar = () => {
  // Sidebar toggle stub
  const initSidebar = () => {
    console.log("Sidebar toggle clicked");
    // Add sidebar toggle logic if defined
  };

  return (
    <div className="sidebar-wrapper">
      <div id="sidebarEffect"></div>
      <div>
        {/* Logo Section */}
        <div className="logo-wrapper logo-wrapper-center">
          <Link to="/">
            <Image
              className="img-fluid for-white"
              src={logo_white}
              alt="logo"
            />
          </Link>
          <div className="back-btn">
            <FaAngleLeft />
          </div>
          <div className="toggle-sidebar">
            <BiGrid
              className="ri-apps-line status_toggle middle sidebar-toggle"
              onClick={initSidebar}
            />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to="/">
            <Image
              className="img-fluid main-logo main-white"
              src={logo_icon_white}
              alt="logo"
            />
            <Image
              className="img-fluid main-logo main-dark"
              src={logo_icon_dark}
              alt="logo"
            />
          </Link>
        </div>

        {/* Sidebar Menu */}
        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <BiChevronLeft />
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
                        href="javascript:void(0)"
                        data-bs-toggle="collapse"
                        data-bs-target={`#submenu-${index}`}
                        aria-expanded="false"
                        role="button"
                      >
                        {route.icon || <BiListUl />}
                        <span>{route.name}</span>
                      </a>
                    ) : (
                      // Single link for routes without submenus
                      <Link
                        className="sidebar-link sidebar-title link-nav"
                        to={route.path}
                      >
                        {route.icon || <BiListUl />}
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
            <BiChevronRight />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
