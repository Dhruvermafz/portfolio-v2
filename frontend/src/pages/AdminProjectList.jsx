import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Form,
  Pagination,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FaUser, FaBriefcase, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./adminproject.css";
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../api/projectApi";
const AdminProjectList = () => {
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching projects from the Redux store using RTK Query
  const { data: projects = [], isLoading, error } = useGetAllProjectsQuery();

  const projectsPerPage = 10;

  const totalProjects = projects.length;
  const clients = [...new Set(projects.map((p) => p.client))];
  const totalClients = clients.length;

  // Filter and Search
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesClient =
      clientFilter === "All" || project.client === clientFilter;
    return matchesSearch && matchesClient;
  });

  // Pagination Logic
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete Project with RTK Query Mutation
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  return (
    <Container fluid className="admin-project-list py-5">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="dashboard-title">Project Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage your projects and clients efficiently
          </p>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            as={Link}
            to="/project-add"
            className="add-project-btn"
          >
            <FaBriefcase className="me-2" /> Add New Project
          </Button>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-5">
        <Col md={6} lg={3} className="mb-4">
          <Card className="summary-card clients-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaUser className="summary-icon" />
              <div>
                <Card.Title className="summary-value">
                  {totalClients}
                </Card.Title>
                <Card.Text className="summary-label">Clients</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="summary-card projects-card shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaBriefcase className="summary-icon" />
              <div>
                <Card.Title className="summary-value">
                  {totalProjects}
                </Card.Title>
                <Card.Text className="summary-label">Projects</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-5">
        <Col md={6} lg={4} className="mb-3">
          <InputGroup>
            <InputGroup.Text className="filter-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by project title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-input"
            />
          </InputGroup>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Form.Select
            value={clientFilter}
            onChange={(e) => {
              setClientFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="All">All Clients</option>
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Project Cards */}
      <Row>
        {isLoading ? (
          <Col className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading projects...</p>
          </Col>
        ) : currentProjects.length === 0 ? (
          <Col>
            <Card className="no-results-card shadow-sm">
              <Card.Body className="text-center">
                No matching projects found.
              </Card.Body>
            </Card>
          </Col>
        ) : (
          currentProjects.map((project) => (
            <Col key={project._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="project-card shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="project-title">
                    {project.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-3">
                    <Badge bg="info" className="client-badge">
                      {project.client}
                    </Badge>
                  </Card.Subtitle>
                  <Card.Text className="project-info">
                    <strong>Services:</strong> {project.services}
                  </Card.Text>
                  <Card.Text className="project-info">
                    <strong>Website:</strong>{" "}
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      Visit Site
                    </a>
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="action-btn"
                      as={Link}
                      to={`/project-edit/${project._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="action-btn"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-5">
          <Col>
            <Pagination className="custom-pagination justify-content-center">
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminProjectList;
