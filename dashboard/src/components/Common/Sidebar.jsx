import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Image, Button, Drawer } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import masterRoutes from "../../Router/routes";
import logo_white from "../../assets/images/logo/logo@transparent.png";
import logo_icon_white from "../../assets/images/logo/logo@transparent.png";
import logo_icon_dark from "../../assets/images/logo/logo@transparent.png";
import "./sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isMobile = window.innerWidth <= 768;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  // Responsive drawer for mobile
  const handleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  // Active path highlight
  const isActive = (path) => location.pathname === path;

  const sidebarContent = (
    <div className={`sidebar-inner ${collapsed ? "collapsed" : ""}`}>
      <div className="logo-section">
        <Link to="/">
          <Image
            className="logo-img"
            src={collapsed ? logo_icon_white : logo_white}
            alt="logo"
            preview={false}
          />
        </Link>
        <Button
          type="text"
          className="collapse-btn"
          onClick={toggleCollapse}
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: 22 }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 22 }} />
            )
          }
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        />
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-links">
          {masterRoutes
            .filter((route) => route.isSidebarActive)
            .map((route, index) => (
              <li
                className={`sidebar-list ${
                  isActive(route.path) ? "active" : ""
                }`}
                key={index}
              >
                {route.submenu.length > 0 ? (
                  <>
                    <a
                      className={`sidebar-link sidebar-title ${
                        openSubmenu === index ? "submenu-open" : ""
                      }`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmenuToggle(index);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="icon">{route.icon}</span>
                      {!collapsed && <span>{route.name}</span>}
                      <span className="submenu-arrow">
                        {openSubmenu === index ? (
                          <ArrowLeftOutlined />
                        ) : (
                          <ArrowRightOutlined />
                        )}
                      </span>
                    </a>
                    <ul
                      className={`sidebar-submenu ${
                        openSubmenu === index ? "show" : ""
                      }`}
                    >
                      {route.submenu
                        .filter((subRoute) => subRoute.isSidebarActive)
                        .map((subRoute, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subRoute.path}
                              className={
                                isActive(subRoute.path) ? "active" : ""
                              }
                            >
                              {subRoute.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    className={`sidebar-link sidebar-title link-nav ${
                      isActive(route.path) ? "active" : ""
                    }`}
                    to={route.path}
                  >
                    <span className="icon">{route.icon}</span>
                    {!collapsed && <span>{route.name}</span>}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Responsive overlay for mobile */}
      {isMobile ? (
        <>
          <Button
            type="primary"
            className="mobile-sidebar-trigger"
            onClick={handleDrawer}
            icon={<MenuUnfoldOutlined />}
          />
          <Drawer
            placement="left"
            closable={false}
            onClose={handleDrawer}
            open={mobileOpen}
            bodyStyle={{ padding: 0, background: "#141b2d" }}
            width={220}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <aside
          className={`sidebar-wrapper${collapsed ? " collapsed" : ""}`}
          aria-label="Sidebar Navigation"
        >
          {sidebarContent}
        </aside>
      )}
    </>
  );
};

export default Sidebar;
