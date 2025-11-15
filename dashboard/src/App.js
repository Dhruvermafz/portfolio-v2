// src/App.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/Common/Header";
import Sidebar from "./components/Common/Sidebar";
import Footer from "./components/Common/Footer";
import AppRoutes from "./Router/Router";

import "antd/dist/reset.css";
import "./index.css";

function App() {
  const location = useLocation();

  /* ────── Sidebar state ────── */
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed((p) => !p);
  const toggleMobileSidebar = () => setMobileOpen((p) => !p);

  /* ────── Close mobile sidebar on route change ────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ────── Auth / public pages (no header/sidebar) ────── */
  const authPaths = [
    "/login",
    "/signup",
    "/404",
    "/reset-password",
    "/forgot-password",
    "/under-maintenance",
    "/coming-soon",
    "/no-access",
    "/verify-account",
  ];

  const isAuthPage = authPaths.some((p) =>
    location.pathname.startsWith(p.replace(/:\w+/g, ""))
  );

  /* ────── Render ────── */
  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="page min-h-screen flex flex-col">
      <Header
        isCollapsed={collapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={mobileOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      <Sidebar
        isCollapsed={collapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={mobileOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      <main
        className={`
          app-content flex-1 transition-all duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
          ${mobileOpen ? "overflow-hidden" : ""}
        `}
      >
        <div className="content-wrapper p-4 lg:p-6">
          <AppRoutes />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
