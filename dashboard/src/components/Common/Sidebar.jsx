// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import masterRoutes from "../../Router/routes";
import logo from "../../assets/images/logo/logo-new.png";
import "./sidebar.css";

const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  toggleMobileSidebar,
}) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const toggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  const isActiveParent = (item) => {
    if (!item.submenu) return false;
    return item.submenu.some((sub) =>
      location.pathname.startsWith(sub.path.split("/:")[0])
    );
  };

  return (
    <>
      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`sidebar-wrapper fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50
          ${isCollapsed ? "w-20" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo Section */}
        <div className="logo-section p-4 border-b flex items-center justify-between">
          {/* <img
            src={logo}
            alt="logo"
            className={`transition-all ${isCollapsed ? "w-10" : "w-32"}`}
          /> */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-primary d-none d-lg-block"
          >
            <MenuOutlined />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav p-3 overflow-y-auto h-[calc(100vh-80px)]">
          <ul className="sidebar-links space-y-1">
            {masterRoutes
              .filter((item) => item.isSidebarActive)
              .map((item) => {
                const hasOpenSub = openSubmenu === item.path;
                const isParentActive = isActiveParent(item);
                const isActive = location.pathname === item.path;

                return (
                  <li
                    key={item.path}
                    className={`rounded-lg overflow-hidden ${
                      hasOpenSub ? "bg-gray-50" : ""
                    }`}
                  >
                    {item.submenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.path)}
                        className={`sidebar-link w-full flex items-center justify-between p-3 text-left rounded-lg transition-all
                          ${
                            isParentActive
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }
                          ${isCollapsed ? "justify-center" : ""}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className="icon text-lg">{item.icon}</span>
                          {!isCollapsed && (
                            <span className="sidebar-label font-medium">
                              {item.name}
                            </span>
                          )}
                        </div>
                        {!isCollapsed && item.submenu.length > 0 && (
                          <i
                            className={`ti ti-chevron-right transition-transform ${
                              hasOpenSub ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => isMobileOpen && toggleMobileSidebar()}
                        className={`sidebar-link flex items-center gap-3 p-3 rounded-lg transition-all
                          ${
                            isActive
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }
                          ${isCollapsed ? "justify-center" : ""}
                        `}
                      >
                        <span className="icon text-lg">{item.icon}</span>
                        {!isCollapsed && (
                          <span className="sidebar-label font-medium">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    )}

                    {/* Submenu */}
                    {item.submenu && !isCollapsed && (
                      <ul
                        className={`sidebar-submenu space-y-1 mt-1 pl-10 transition-all ${
                          hasOpenSub ? "block" : "hidden"
                        }`}
                      >
                        {item.submenu
                          .filter((sub) => sub.isSidebarActive)
                          .map((subItem) => {
                            const subPath = subItem.path.split("/:")[0];
                            const isSubActive =
                              location.pathname.startsWith(subPath);

                            return (
                              <li key={subItem.path}>
                                <Link
                                  to={subItem.path}
                                  onClick={() =>
                                    isMobileOpen && toggleMobileSidebar()
                                  }
                                  className={`block py-2 px-3 rounded-md text-sm transition-all
                                    ${
                                      isSubActive
                                        ? "text-primary font-semibold"
                                        : "text-gray-600 hover:text-primary"
                                    }
                                  `}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
