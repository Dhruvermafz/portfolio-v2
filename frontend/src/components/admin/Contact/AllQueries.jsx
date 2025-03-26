import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaReply } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";
import PaginationComponent from "./PaginationQueries"; // Import pagination component

const AllQueries = () => {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5; // Change this number as needed

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${API_URL}/contact/`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setQueries(response.data.data);
        } else {
          setQueries([]);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setQueries([]);
      }
    };
    fetchQueries();
  }, []);

  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);

  return (
    <section className="mt-4">
      <div className="container">
        <div className="table-responsive">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentQueries.map((query) => (
                <tr key={query._id}>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>{new Date(query.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button variant="info" size="sm">
                      View Message
                    </Button>
                  </td>
                  <td>
                    <a
                      href={`mailto:${query.email}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <FaReply /> Reply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <PaginationComponent
          totalQueries={queries.length}
          queriesPerPage={queriesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default AllQueries;
