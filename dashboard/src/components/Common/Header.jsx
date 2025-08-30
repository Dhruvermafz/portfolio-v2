import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserByIdQuery } from "../../api/userApi";
import { setCredentials } from "../../api/slices/authSlice";
import { Form, Image } from "react-bootstrap";
import {
  RiSearchLine,
  RiNotificationLine,
  RiMoonLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import logo_light from "../../assets/images/logo/logo-white.png";
import logo from "../../assets/images/logo/1.png";
import Avatar from "react-avatar";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch authenticated user data
  const token = localStorage.getItem("authToken");
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery("me", {
    skip: !token,
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(setCredentials({ user: null, token: null }));
    navigate("/login");
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement global search logic, e.g., navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
  };

  // Sidebar toggle stub
  const initSidebar = () => {
    console.log("Sidebar toggle clicked");
    // Add sidebar toggle logic if defined
  };

  return (
    <div className="page-header">
      <div className="header-wrapper m-0">
        {/* Logo and Sidebar Toggle */}
        <div className="header-logo-wrapper p-0">
          <div className="logo-wrapper">
            <Link to="/">
              <Image className="img-fluid main-logo" src={logo} alt="logo" />
              <Image
                className="img-fluid white-logo"
                src={logo_light}
                alt="logo"
              />
            </Link>
          </div>
          <div className="toggle-sidebar">
            <BiMenu
              className="status_toggle middle sidebar-toggle"
              onClick={initSidebar}
            />
            <Link to="/">
              <Image src={logo} className="img-fluid" alt="logo" />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <Form
          className="form-inline search-full"
          action="javascript:void(0)"
          method="get"
        >
          <div className="form-group w-100">
            <div className="Typeahead Typeahead--twitterUsers">
              <div className="u-posRelative">
                <Form.Control
                  className="demo-input Typeahead-input form-control-plaintext w-100"
                  type="text"
                  placeholder="Search Fastkart .."
                  name="q"
                  value={searchQuery}
                  onChange={handleSearch}
                  autoFocus
                />
                <i
                  className="close-search ri-close-line"
                  onClick={() => setSearchQuery("")}
                />
                {isLoading && (
                  <div
                    className="spinner-border Typeahead-spinner"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
              <div className="Typeahead-menu"></div>
            </div>
          </div>
        </Form>

        {/* Right Navigation */}
        <div className="nav-right col-6 pull-right right-header p-0">
          <ul className="nav-menus">
            {/* Search Icon */}
            <li>
              <span className="header-search">
                <RiSearchLine />
              </span>
            </li>

            {/* Profile Dropdown */}
            <li className="profile-nav onhover-dropdown pe-0 me-0">
              <div className="media profile-media">
                <Avatar
                  name={user?.name || "Guest"} // Fallback to "Guest" if no user
                  src={user?.avatar} // Use user avatar if available
                  size="40"
                  round={true}
                  className="user-profile rounded-circle"
                  alt={user?.name || "User"}
                />
                <div className="user-name-hide media-body">
                  <span>
                    {isLoading
                      ? "Loading..."
                      : isError || !user
                      ? "Guest"
                      : user.name}
                  </span>
                  <p className="mb-0 font-roboto">
                    {isError || !user ? "Guest" : "Admin"}
                    <RiArrowDownSLine className="middle" />
                  </p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <a href="https://dhruvermafz.in" target="_blank">
                    <i data-feather="users"></i>
                    <span>Portfolio</span>
                  </a>
                </li>
                <li>
                  <Link to="/order-list">
                    <i data-feather="archive"></i>
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/support-ticket">
                    <i data-feather="phone"></i>
                    <span>Support Tickets</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile-setting">
                    <i data-feather="settings"></i>
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={handleLogout}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <i data-feather="log-out"></i>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
