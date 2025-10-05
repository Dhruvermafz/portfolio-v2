import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Form, Image, Input, Dropdown, Menu, Spin } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  DownOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo_light from "../../assets/images/logo/logo-new.png";
import logo from "../../assets/images/logo/logo-new.png";
import Avatar from "react-avatar";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isLoading, isError } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic
  };

  // Sidebar toggle stub
  const initSidebar = () => {
    console.log("Sidebar toggle clicked");
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
        <Link to={`/u/${user?.id || "me"}`}>Account</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
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
                  {isLoading ? (
                    <Spin size="small" />
                  ) : (
                    <Avatar
                      name={user?.name || "Guest"}
                      src={
                        user?.avatar || "https://example.com/default-avatar.png"
                      }
                      size="40"
                      round={true}
                      className="user-profile"
                      alt={user?.name || "User"}
                    />
                  )}
                  <div className="user-name-hide media-body">
                    <span>
                      {isLoading ? "Loading..." : user?.name || "Guest"}
                    </span>
                    <p className="mb-0 font-roboto">
                      {isError ? "Error" : user?.role || "Guest"}{" "}
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
