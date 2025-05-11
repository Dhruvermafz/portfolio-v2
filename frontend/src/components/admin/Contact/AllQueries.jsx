import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Spinner,
  Modal,
} from "react-bootstrap";
import { FaReply, FaSearch } from "react-icons/fa";
import { useGetAllContactsQuery } from "../../../api/contactApi";
import PaginationComponent from "./PaginationQueries";
import "./queries.css";

const AllQueries = () => {
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const queriesPerPage = 10;

  // Fetch queries using RTK Query
  const { data: queries = [], isLoading, isError } = useGetAllContactsQuery();

  // Handle search filter
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const results = queries.filter(
      (query) =>
        query.name.toLowerCase().includes(lowerSearch) ||
        query.email.toLowerCase().includes(lowerSearch)
    );
    setFilteredQueries(results);
    setCurrentPage(1);
  }, [searchTerm, queries]);

  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(
    indexOfFirstQuery,
    indexOfLastQuery
  );

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  return (
    <section className="queries-section py-5">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <h1 className="queries-title">Contact Queries</h1>
            <p className="queries-subtitle">Manage all contact queries</p>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Form className="queries-search-form">
              <InputGroup>
                <InputGroup.Text className="search-icon-bg">
                  <FaSearch className="search-icon" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search queries"
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading queries...</p>
          </div>
        ) : isError ? (
          <Card className="no-queries-card shadow-sm">
            <Card.Body className="text-center">
              <p className="mb-riff text-muted">Failed to load queries.</p>
            </Card.Body>
          </Card>
        ) : currentQueries.length === 0 ? (
          <Card className="no-queries-card shadow-sm">
            <Card.Body className="text-center">
              <p className="mb-0 text-muted">
                {searchTerm
                  ? "No queries match your search."
                  : "No queries found."}
              </p>
            </Card.Body>
          </Card>
        ) : (
          <Row xs={1} sm={2} md={3} className="g-4">
            {currentQueries.map((query) => (
              <Col key={query._id}>
                <Card className="query-card shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="query-name">{query.name}</Card.Title>
                    <Card.Subtitle className="mb-2 query-email">
                      {query.email}
                    </Card.Subtitle>
                    <Card.Text className="query-date">
                      <strong>Date:</strong>{" "}
                      {new Date(query.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleViewMessage(query.message)}
                      >
                        View Message
                      </Button>
                      <Button
                        as="a"
                        href={`mailto:${query.email}`}
                        variant="outline-secondary"
                        size="sm"
                        className="action-btn"
                      >
                        <FaReply className="me-1" /> Reply
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {filteredQueries.length > queriesPerPage && (
          <div className="mt-5 d-flex justify-content-center">
            <PaginationComponent
              totalQueries={filteredQueries.length}
              queriesPerPage={queriesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        <Modal
          show={showMessageModal}
          onHide={() => setShowMessageModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Query Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="query-message">{selectedMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowMessageModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default AllQueries;
