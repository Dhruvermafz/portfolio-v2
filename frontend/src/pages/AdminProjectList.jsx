import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Form,
  Pagination,
} from "react-bootstrap";
import { FaUser, FaBriefcase } from "react-icons/fa";
import { API_URL } from "../config";

const AdminProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

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

  return (
    <Container fluid className="py-4">
      {/* Summary */}
      <Row className="mb-4">
        <Col md={6} lg={3}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="fs-3">{totalClients}</Card.Title>
                <Card.Text>Clients</Card.Text>
              </div>
              <FaUser size={30} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="fs-3">{totalProjects}</Card.Title>
                <Card.Text>Projects</Card.Text>
              </div>
              <FaBriefcase size={30} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by project title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
        <Col md={6} lg={4}>
          <Form.Select
            value={clientFilter}
            onChange={(e) => {
              setClientFilter(e.target.value);
              setCurrentPage(1);
            }}
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
        {currentProjects.length === 0 ? (
          <Col>
            <Card className="text-center shadow-sm">
              <Card.Body>No matching projects found.</Card.Body>
            </Card>
          </Col>
        ) : (
          currentProjects.map((project) => (
            <Col key={project._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Badge bg="info">{project.client}</Badge>
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Services:</strong> {project.services}
                  </Card.Text>
                  <Card.Text>
                    <strong>Website:</strong>{" "}
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Site
                    </a>
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm">
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
        <Row className="mt-4">
          <Col>
            <Pagination className="justify-content-center">
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminProjectList;
