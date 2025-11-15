// src/components/Header.jsx  (your original code – only tiny clean-up)
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Dropdown, Menu, Spin, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Avatar from "react-avatar";
import logo_light from "../../assets/images/logo/logo-new.png";
import logo from "../../assets/images/logo/logo-new.png";

const Header = ({
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  toggleMobileSidebar,
}) => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isLoading } = useAuth();

  const profileMenu = (
    <Menu className="header-profile-dropdown">
      <Menu.Divider />
      <div className="p-3">
        <div className="d-flex align-items-center gap-2">
          <div>
            {isLoading ? (
              <Spin size="small" />
            ) : (
              <Avatar
                name={user?.name || "Guest"}
                src={user?.avatar}
                size="32"
                round
              />
            )}
          </div>
          <div>
            <div className="fw-semibold">{user?.name || "Guest"}</div>
            <small className="text-muted">
              <a href={`mailto:${user?.email}`}>
                {user?.email || "guest@example.com"}
              </a>
            </small>
          </div>
        </div>
      </div>
      <Menu.Divider />
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
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="app-header sticky top-0 bg-white shadow-sm z-50">
      <div className="main-header-container container-fluid px-4">
        <div className="header-content-left d-flex align-items-center gap-3">
          {/* Mobile */}
          <Button
            type="text"
            icon={isMobileOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={toggleMobileSidebar}
            className="d-lg-none"
          />
          {/* Desktop */}
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            className="d-none d-lg-block"
          />
        </div>

        <div className="header-content-right d-flex align-items-center gap-3">
          {/* Avatar dropdown */}
          <Dropdown
            overlay={profileMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a
              href="#!"
              className="d-flex align-items-center"
              onClick={(e) => e.preventDefault()}
            >
              {isLoading ? (
                <Spin size="small" />
              ) : (
                <Avatar
                  name={user?.name || "G"}
                  src={user?.avatar}
                  size="36"
                  round
                  className="border border-2 border-white shadow-sm"
                />
              )}
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
