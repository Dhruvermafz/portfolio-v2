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
          <div className="menu-container d-flex justify-content-between align-items-center">
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
              className={`navbar-main d-flex ${isMobileMenuOpen ? "open" : ""}`}
            >
              <ul className="navbar-info mx-auto d-none d-xl-flex">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <Link className="nav-link" to={item.path}>
                      {item.icon}
                      <span> {item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="header-right-info d-flex align-items-center">
                <button className="theme-control-btn" onClick={toggleTheme}>
                  {isDarkMode ? (
                    <span className="light">
                      <MdOutlineLightMode color="yellow" />
                      <small className="theme-text d-block d-xl-none">
                        Change appearance
                      </small>
                    </span>
                  ) : (
                    <span className="dark">
                      <MdDarkMode />
                      <small className="theme-text d-block d-xl-none">
                        Change appearance
                      </small>
                    </span>
                  )}
                </button>
                <Link
                  to="https://discord.gg/FBSB8ZWE"
                  target="_blank"
                  className="lets-talk-btn"
                >
                  Let's Talk
                  <FaArrowTrendUp />
                </Link>
              </div>
            </div>
            <button
              className="mobile-menu-control-bar d-block d-xl-none"
              onClick={toggleMobileMenu}
            >
              <FaBars />
            </button>
          </div>
        </div>
        <div
          className={`mobile-menu ${isMobileMenuOpen ? "open" : ""} d-xl-none`}
        >
          <ul className="mobile-nav">
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
      </nav>
    </header>
  );
};

export default Header;
