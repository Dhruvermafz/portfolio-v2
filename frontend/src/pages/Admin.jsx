import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaTags,
  FaPhone,
  FaSignOutAlt,
  FaProjectDiagram,
} from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import "./admin.css";
import { RiTodoFill } from "react-icons/ri";

const Admin = ({ username = "Boss" }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <section className="admin-section">
      <Container className="admin-wrapper py-3">
        <div className="admin-header">
          <div className="admin-title">
            <h2>
              Welcome, {username} <span>| {time.toLocaleTimeString()}</span>
            </h2>
          </div>
          <nav className="admin-nav">
            <Link to="/projects-list" className="admin-nav-item">
              <FaProjectDiagram className="nav-icon" />
              <span>Projects</span>
            </Link>
            <Link to="/admin/category" className="admin-nav-item">
              <FaTags className="nav-icon" />
              <span>Category</span>
            </Link>
            <Link to="/admin/blogs" className="admin-nav-item">
              <FaBlog className="nav-icon" />
              <span>Blogs</span>
            </Link>
            <Link to="/todo-list" className="admin-nav-item">
              <RiTodoFill className="nav-icon" /> <span>Todo</span>
            </Link>
            <Link to="/admin/contact" className="admin-nav-item">
              <FaPhone className="nav-icon" />
              <span>Contact</span>
            </Link>
            <Link to="/admin/achievements" className="admin-nav-item">
              <GiAchievement className="nav-icon" />
              <span>Achievements</span>
            </Link>
            <Button
              variant="link"
              className="admin-nav-item logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="nav-icon" />
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      </Container>
    </section>
  );
};

export default Admin;
