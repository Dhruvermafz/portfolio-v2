import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FaReply } from "react-icons/fa";
import AppBar from "../AppBar/Appbar";
import ViewMessage from "./ViewMessage";
import DeleteModal from "./DeleteModal";
import axios from "axios";

const AllQueries = () => {
  const [showViewMessageModal, setShowViewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);
  const [queries, setQueries] = useState([]);

  // Fetch queries from the API when the component mounts
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:4000/contact/");
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

  const handleViewMessageClick = (message) => {
    setSelectedMessage(message);
    setShowViewMessageModal(true);
  };

  const handleCloseViewMessageModal = () => {
    setShowViewMessageModal(false);
    setSelectedMessage("");
  };

  const handleDeleteClick = (query) => {
    setQueryToDelete(query);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Make an API call to delete the query
      await axios.delete(`http://localhost:4000/contact/${queryToDelete._id}`);
      // Update the state to remove the deleted query
      setQueries(queries.filter((query) => query._id !== queryToDelete._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setQueryToDelete(null);
  };

  return (
    <section className="mt-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h1 className="h4">Queries List</h1>
                    <p>All Queries Here</p>
                  </div>
                </div>

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
                      {queries.map((query) => (
                        <tr key={query._id}>
                          <td>{query.name}</td>
                          <td>{query.email}</td>
                          <td>{query.date}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                handleViewMessageClick(query.message)
                              }
                            >
                              View Message
                            </Button>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <a href="#">
                                <FaReply /> Reply
                              </a>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(query)}
                              >
                                <i className="ri-delete-bin-line"></i> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to view message */}
      <ViewMessage
        show={showViewMessageModal}
        handleClose={handleCloseViewMessageModal}
        message={selectedMessage}
      />

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleConfirmDelete}
      />
    </section>
  );
};

export default AllQueries;
