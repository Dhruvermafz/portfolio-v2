import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
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
      <Container className="admin-header py-4">
        <Card className="admin-card shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                <h2 className="admin-title">
                  Welcome, {username}
                  <span className="time-text">
                    {" "}
                    | {time.toLocaleTimeString()}
                  </span>
                </h2>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={8} className="text-center text-md-start mb-3 mb-md-0">
                <div className="admin-nav d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                  <Button
                    as={Link}
                    to="/projects-list"
                    variant="outline-primary"
                    className="admin-nav-btn"
                  >
                    <FaProjectDiagram className="me-2" /> Projects
                  </Button>
                  <Button
                    as={Link}
                    to="/admin/category"
                    variant="outline-primary"
                    className="admin-nav-btn"
                  >
                    <FaTags className="me-2" /> Category
                  </Button>
                  <Button
                    as={Link}
                    to="/admin/blogs"
                    variant="outline-primary"
                    className="admin-nav-btn"
                  >
                    <FaBlog className="me-2" /> Blogs
                  </Button>
                  <Button
                    as={Link}
                    to="/admin/contact"
                    variant="outline-primary"
                    className="admin-nav-btn"
                  >
                    <FaPhone className="me-2" /> Contact
                  </Button>
                  <Button
                    as={Link}
                    to="/admin/achievements"
                    variant="outline-primary"
                    className="admin-nav-btn"
                  >
                    <GiAchievement className="me-2" /> Achievements
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="admin-nav-btn logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Admin;
