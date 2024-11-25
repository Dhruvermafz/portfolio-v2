import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  MdContacts,
  MdDarkMode,
  MdHome,
  MdWorkOutline,
  MdOutlineLightMode,
} from "react-icons/md";
import { FaRegCircleUser, FaArrowTrendUp } from "react-icons/fa6";
import {
  FaBars,
  FaBlog,
  FaAppStoreIos,
  FaProjectDiagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/img/logo/logo@transparent.png";
const navItems = [
  { path: "/", label: "Home", icon: <MdHome /> },
  { path: "/about", label: "About", icon: <FaRegCircleUser /> },
  { path: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
  { path: "/blogs", label: "Blog", icon: <FaBlog /> },
  { path: "/contact", label: "Contact", icon: <MdContacts /> },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-area">
      <nav className="navbar">
        <div className="container">
          <div className="menu-container ">
            <div className="logo">
              <Link className="navbar-brand me-0" to="/">
                {/* <FaAppStoreIos color="yellow" /> */}
                {/* <img src={logo} style={{ width: "10%" }} alt="" /> */}
                <span>
                  Dhruv<span className="primary"> Verma</span>
                </span>
              </Link>
            </div>
            <div
              className={`navbar-main d-flex flex-grow-1 ${
                isMobileMenuOpen ? "open" : ""
              }`}
            >
              <div class="logo inner-logo d-block d-xl-none">
                <a class="navbar-brand me-0" href="/">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0L9 0C9.39782 0 9.77936 0.158035 10.0607 0.43934C10.342 0.720644 10.5 1.10218 10.5 1.5V22.5C10.5 22.8978 10.342 23.2794 10.0607 23.5607C9.77936 23.842 9.39782 24 9 24H1.5C1.10218 24 0.720644 23.842 0.43934 23.5607C0.158035 23.2794 0 22.8978 0 22.5V1.5ZM13.5 1.5C13.5 1.10218 13.658 0.720644 13.9393 0.43934C14.2206 0.158035 14.6022 0 15 0L22.5 0C22.8978 0 23.2794 0.158035 23.5607 0.43934C23.842 0.720644 24 1.10218 24 1.5V9C24 9.39782 23.842 9.77936 23.5607 10.0607C23.2794 10.342 22.8978 10.5 22.5 10.5H15C14.6022 10.5 14.2206 10.342 13.9393 10.0607C13.658 9.77936 13.5 9.39782 13.5 9V1.5ZM13.5 15C13.5 14.6022 13.658 14.2206 13.9393 13.9393C14.2206 13.658 14.6022 13.5 15 13.5H22.5C22.8978 13.5 23.2794 13.658 23.5607 13.9393C23.842 14.2206 24 14.6022 24 15V22.5C24 22.8978 23.842 23.2794 23.5607 23.5607C23.2794 23.842 22.8978 24 22.5 24H15C14.6022 24 14.2206 23.842 13.9393 23.5607C13.658 23.2794 13.5 22.8978 13.5 22.5V15Z"
                      class="logo-icon"
                    />
                  </svg>
                  <span>
                    Dhruv <span class="primary">Verma</span>
                  </span>
                </a>
              </div>
              <ul className="navbar-info mx-auto">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <Link className="nav-link" to={item.path}>
                      <a class="nav-icon"> {item.icon}</a>

                      <span> {item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div class="header-right-info d-flex align-items-center">
                <button className="theme-control-btn" onClick={toggleTheme}>
                  {isDarkMode ? (
                    <MdOutlineLightMode
                      title="Switch to Light Mode"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <MdDarkMode
                      title="Switch to Dark Mode"
                      style={{ color: "white" }}
                    />
                  )}
                </button>

                <a href="/contact" class="lets-talk-btn">
                  Let's Talk
                  <svg
                    class="icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 11.6665V6.6665H12.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div
              className={`mobile-menu ${
                isMobileMenuOpen ? "open" : ""
              } d-xl-none`}
            >
              <ul className="navbar-info mx-auto">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <Link
                      className="nav-link"
                      to={item.path}
                      onClick={toggleMobileMenu}
                    >
                      {item.icon}
                      <span> {item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div class="mobile-menu-overlay d-block d-lg-none"></div>
            <div class="mobile-menu-control-bar d-block d-xl-none">
              <button
                className="mobile-menu-control-bar d-block d-xl-none"
                onClick={toggleMobileMenu}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
