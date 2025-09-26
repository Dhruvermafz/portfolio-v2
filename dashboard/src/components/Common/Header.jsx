import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserByIdQuery } from "../../api/userApi";
import { setCredentials } from "../../api/slices/authSlice";
import {
  Form,
  Image,
  Input,
  Dropdown,
  Menu,
  Spin,
  Avatar as AntDAvatar,
} from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  DownOutlined,
  UserOutlined,
  ShoppingOutlined,
  PhoneOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo_light from "../../assets/images/logo/logo-new.png";
import logo from "../../assets/images/logo/logo-new.png";
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

  // Profile dropdown menu
  const profileMenu = (
    <Menu>
      <Menu.Item key="portfolio" icon={<UserOutlined />}>
        <a
          href="https://dhruvermafz.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </a>
      </Menu.Item>
      <Menu.Item key="account" icon={<ShoppingOutlined />}>
        <Link to="/u/:userId">Account</Link>
      </Menu.Item>

      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="page-header">
      <div className="header-wrapper">
        {/* Logo and Sidebar Toggle */}
        <div className="header-logo-wrapper">
          <div className="logo-wrapper">
            <Link to="/">
              <Image
                src={logo}
                className="main-logo"
                alt="logo"
                preview={false}
              />
              <Image
                src={logo_light}
                className="white-logo"
                alt="logo"
                preview={false}
              />
            </Link>
          </div>
          <div className="toggle-sidebar">
            <MenuOutlined
              className="status_toggle sidebar-toggle"
              onClick={initSidebar}
            />
            <Link to="/">
              <Image src={logo} alt="logo" preview={false} />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <Form className="search-full">
          <Form.Item>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search in dashboard .."
              value={searchQuery}
              onChange={handleSearch}
              allowClear
            />
          </Form.Item>
        </Form>

        {/* Right Navigation */}
        <div className="nav-right">
          <ul className="nav-menus">
            {/* Profile Dropdown */}
            <li className="profile-nav">
              <Dropdown overlay={profileMenu} trigger={["click"]}>
                <div className="media profile-media">
                  <Avatar
                    name={user?.name || "Guest"}
                    src={user?.avatar}
                    size="40"
                    round={true}
                    className="user-profile"
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
                      <DownOutlined className="middle" />
                    </p>
                  </div>
                </div>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
