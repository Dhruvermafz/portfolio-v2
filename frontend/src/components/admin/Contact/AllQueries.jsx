import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaReply, FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";
import PaginationComponent from "./PaginationQueries";

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5;

  // Fetch queries from API
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${API_URL}/contact/`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setQueries(response.data.data);
          setFilteredQueries(response.data.data);
        } else {
          setQueries([]);
          setFilteredQueries([]);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setQueries([]);
        setFilteredQueries([]);
      }
    };
    fetchQueries();
  }, []);

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

  return (
    <section className="mt-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4">All Contact Queries</h2>
          <Form className="w-50">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>

        {currentQueries.length === 0 ? (
          <p className="text-muted">No queries found.</p>
        ) : (
          <Row className="g-4">
            {currentQueries.map((query) => (
              <Col md={6} lg={4} key={query._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{query.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {query.email}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(query.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => alert(`Message: \n\n${query.message}`)}
                    >
                      View Message
                    </Button>
                    <a
                      href={`mailto:${query.email}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <FaReply /> Reply
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="mt-4">
          <PaginationComponent
            totalQueries={filteredQueries.length}
            queriesPerPage={queriesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default AllQueries;
