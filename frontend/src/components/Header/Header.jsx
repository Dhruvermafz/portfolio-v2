import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  MdContacts,
  MdDarkMode,
  MdHome,
  MdWork,
  MdWorkOutline,
} from "react-icons/md";
import { FaBars, FaBlog, FaRegCircleUser } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { MdEngineering } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";
const navItems = [
  { path: "/", label: "Home", icon: <MdHome /> },
  { path: "/about", label: "About", icon: <FaRegCircleUser /> },
  { path: "/resume", label: "Resume", icon: <MdEngineering /> },
  { path: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
  { path: "/blog", label: "Blog", icon: <FaBlog /> },
  { path: "/contact", label: "Contact", icon: <MdContacts /> },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header-area">
      <nav className="navbar">
        <div className="container">
          <div className="menu-container">
            <div className="logo">
              <Link className="navbar-brand me-0" to="/">
                <FaAppStoreIos color="yellow" />
                <span>
                  Dhruv<span className="primary"> Verma</span>
                </span>
              </Link>
            </div>
            <div className="navbar-main d-flex flex-grow-1">
              <div className="logo inner-logo d-block d-xl-none">
                <Link className="navbar-brand me-0" to="/">
                  <FaAppStoreIos color="yellow" />
                  <span>
                    Dhruv<span className="primary"> Verma</span>
                  </span>
                </Link>
              </div>
              <ul className="navbar-info mx-auto">
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
                <Link to="/contact" className="lets-talk-btn">
                  Let's Talk
                  <FaArrowTrendUp />
                </Link>
              </div>
            </div>
            <div className="mobile-menu-overlay d-block d-lg-none"></div>
            <div className="mobile-menu-control-bar d-block d-xl-none">
              <button className="mobile-menu-control-bar">
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
