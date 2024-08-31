import React, { useState } from "react";
import { Button, Table } from "react-bootstrap"; // Import Bootstrap components
import { Link } from "react-router-dom";
import ViewMessage from "./ViewMessage";
import DeleteModal from "./DeleteModal";
import { FaReply } from "react-icons/fa";
const AllQueries = () => {
  const [showViewMessageModal, setShowViewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [queries, setQueries] = useState([
    {
      name: "Math",
      date: "21/12/2002",
      email: "dfsf@gmail.com",
      message: "Math category message",
    },
    {
      name: "Science",
      date: "21/12/2002",
      email: "dfsf@gmail.com",
      message: "Science category message",
    },
    // Add more queries as needed
  ]);

  const handleViewMessageClick = (message) => {
    setSelectedMessage(message);
    setShowViewMessageModal(true);
  };

  const handleCloseViewMessageModal = () => {
    setShowViewMessageModal(false);
    setSelectedMessage("");
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setQueries(queries.filter((cat) => cat !== categoryToDelete));
    setShowDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleStatusChange = (index) => {
    const updatedQueries = [...queries];
    updatedQueries[index].status = !updatedQueries[index].status;
    setQueries(updatedQueries);
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
                      {queries.map((category, index) => (
                        <tr key={index}>
                          <td>{category.name}</td>

                          <td>{category.email}</td>
                          <td>{category.date}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                handleViewMessageClick(category.message)
                              }
                            >
                              View Message
                            </Button>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <a href="">
                                <FaReply /> Reply
                              </a>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(category)}
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
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
    </section>
  );
};

export default AllQueries;
