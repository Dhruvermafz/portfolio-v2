import React, { useEffect, useState } from "react";
import AppBar from "../components/admin/AppBar/Appbar";
import PopularCategories from "../components/admin/Dashboard/PopularCategories";
import ProgressCard from "../components/admin/Dashboard/ProgressCard";
import LatestBlogs from "../components/admin/Dashboard/LatestBlogs";
import {
  FaBlog,
  FaTags,
  FaPhone,
  FaSignOutAlt,
  FaRProject,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
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
    <div className="admin-container">
      {/* Include the AppBar component */}
      <div className="main-content">
        <section className="content-box-area mt-4 text-center">
          <div className="container">
            <div className="row g-4">
              <div
                className="card content-box-card p-4"
                style={{ width: "100%" }}
              >
                <div className="card-body">
                  {/* Main content will be added here */}
                  <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
                    <Container>
                      <Navbar.Brand>
                        Welcome, {username} | {time.toLocaleTimeString()}
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="main-navbar-nav" />
                      <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center gap-3">
                          <Nav.Link as={Link} to="/projects-list">
                            <FaRProject className="me-1" /> Projects
                          </Nav.Link>
                          <Nav.Link as={Link} to="/admin/category">
                            <FaTags className="me-1" /> Category
                          </Nav.Link>
                          <Nav.Link as={Link} to="/admin/blogs">
                            <FaBlog className="me-1" /> Blogs
                          </Nav.Link>
                          <Nav.Link as={Link} to="/admin/contact">
                            <FaPhone className="me-1" /> Contact
                          </Nav.Link>
                          <Nav.Link
                            onClick={handleLogout}
                            style={{ cursor: "pointer" }}
                          >
                            <FaSignOutAlt className="me-1" /> Logout
                          </Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
