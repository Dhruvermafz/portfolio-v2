import React, { useState, useEffect } from "react";
import { FaReply, FaSearch, FaStar, FaFlag, FaTrash } from "react-icons/fa";
import { useGetAllContactsQuery } from "../api/contactApi";

const Queries = () => {
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const queriesPerPage = 20;

  // Fetch queries using RTK Query
  const {
    data: queries = { data: [] },
    isLoading,
    isError,
  } = useGetAllContactsQuery();

  // Handle search filter
  useEffect(() => {
    if (queries.data) {
      const lowerSearch = searchTerm.toLowerCase();
      const results = queries.data.filter(
        (query) =>
          query.name.toLowerCase().includes(lowerSearch) ||
          query.email.toLowerCase().includes(lowerSearch)
      );
      setFilteredQueries(results);
      setCurrentPage(1);
    }
  }, [searchTerm, queries]);

  // Pagination
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(
    indexOfFirstQuery,
    indexOfLastQuery
  );
  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers
  const handleViewMessage = (query) => {
    setSelectedQuery(query);
    setShowMessageModal(true);
  };

  const handleReply = (query) => {
    const subject = encodeURIComponent(`Re: ${query.subject || "Your Query"}`);
    const body = encodeURIComponent(
      `Dear ${query.name},\n\nThank you for your query. [Your response here]\n\nRegards,\n[Your Name]`
    );
    window.location.href = `mailto:${query.email}?subject=${subject}&body=${body}`;
    setShowMessageModal(false);
    setSelectedQuery(null);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="title-header option-title">
                  <h5>Query List</h5>
                  <div className="right-options">
                    <ul>
                      <li>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaSearch />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search queries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    <table
                      className="table all-package coupon-list-table table-hover theme-table"
                      id="table_id"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Date</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && (
                          <tr>
                            <td colSpan="6">Loading queries...</td>
                          </tr>
                        )}
                        {isError && (
                          <tr>
                            <td colSpan="6" className="text-danger">
                              Error loading queries
                            </td>
                          </tr>
                        )}
                        {!isLoading &&
                          !isError &&
                          filteredQueries.length === 0 && (
                            <tr>
                              <td colSpan="6">No queries found.</td>
                            </tr>
                          )}
                        {!isLoading &&
                          !isError &&
                          currentQueries.map((query) => (
                            <tr key={query._id}>
                              <td>{query.name}</td>
                              <td>{query.email}</td>
                              <td>{query.subject || "No Subject"}</td>
                              <td>
                                {new Date(query.createdAt).toLocaleDateString()}{" "}
                                <span className="text-secondary">
                                  {new Date(
                                    query.createdAt
                                  ).toLocaleTimeString()}
                                </span>
                              </td>
                              <td>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => handleViewMessage(query)}
                                    >
                                      <i className="ri-eye-line"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => handleReply(query)}
                                    >
                                      <FaReply />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">
                                      <FaStar
                                        className={
                                          query.isStarred
                                            ? "text-yellow"
                                            : "text-secondary"
                                        }
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">
                                      <FaFlag
                                        className={
                                          query.isFlagged
                                            ? "text-yellow"
                                            : "text-secondary"
                                        }
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModalToggle"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {totalPages > 1 && (
                  <nav aria-label="Page navigation" className="mt-3">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedQuery && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <div className="w-100">
                  <ul className="nav w-100 mb-3">
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        onClick={() => setShowMessageModal(false)}
                        aria-label="Close"
                      >
                        <i className="bi bi-arrow-left"></i>
                      </button>
                    </li>
                    <li className="nav-item ms-auto">
                      <button className="nav-link">
                        <FaStar
                          className={
                            selectedQuery.isStarred
                              ? "text-yellow"
                              : "text-secondary"
                          }
                        />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link">
                        <FaFlag
                          className={
                            selectedQuery.isFlagged
                              ? "text-yellow"
                              : "text-secondary"
                          }
                        />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link theme-red">
                        <FaTrash />
                      </button>
                    </li>
                  </ul>
                  <div className="row gx-3">
                    <div className="col-3 col-sm-auto align-self-center">
                      <div className="avatar avatar-60 rounded-circle coverimg">
                        <img
                          src={
                            selectedQuery.avatar ||
                            "assets/img/modern-ai-image/user-2.jpg"
                          }
                          alt={selectedQuery.name}
                        />
                      </div>
                    </div>
                    <div className="col-9 col-sm">
                      <h6 className="mb-0">{selectedQuery.name}</h6>
                      <p className="text-truncate mb-0">
                        {selectedQuery.email}
                      </p>
                      <p className="text-secondary small">
                        {new Date(selectedQuery.createdAt).toLocaleDateString()}{" "}
                        <span>
                          {new Date(
                            selectedQuery.createdAt
                          ).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-body d-block">
                <p className="mb-1 text-secondary small">Subject</p>
                <h5>{selectedQuery.subject || "No Subject"}</h5>
                <hr />
                <div>
                  <p>{selectedQuery.message}</p>
                </div>
                <hr />
                <div className="row gx-3 mt-3">
                  <div className="col">
                    <button
                      className="btn btn-link theme-red"
                      onClick={() => setShowMessageModal(false)}
                    >
                      <i className="bi bi-trash h4 me-2"></i> Close
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-theme"
                      onClick={() => handleReply(selectedQuery)}
                    >
                      <FaReply className="me-2" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Queries;
