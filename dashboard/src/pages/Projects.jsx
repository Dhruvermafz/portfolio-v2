import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageTitle from "../components/Common/PageTitle";
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../api/projectApi";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching projects using RTK Query
  const { data: projects = [], isLoading, error } = useGetAllProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const projectsPerPage = 10;
  const totalProjects = projects.length;
  const clients = [...new Set(projects.map((p) => p.client))];

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

  // Handle Delete
  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId).unwrap();
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  // Handle Edit
  const handleEdit = (projectId) => {
    window.location.href = `/projects/edit/${projectId}`;
  };

  // Handle Move (Placeholder)
  const handleMove = (projectId) => {
    alert(`Move functionality for project ${projectId} not implemented yet.`);
  };

  // Handle View (Placeholder for viewing project details)
  const handleView = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };

  return (
    <div className="container-fluid">
      {/* Stats Cards */}
      <div className="row gx-3 gx-lg-4">
        <div className="col-12 col-md-12 col-lg-6 col-xl-3">
          <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
            <div className="card-body">
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <div className="avatar avatar-50 rounded bg-theme-1">
                    <i className="bi bi-folder2-open h5"></i>
                  </div>
                </div>
                <div className="col">
                  <p className="small text-secondary mb-1">Projects</p>
                  <h5>{totalProjects}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 col-xl-3">
          <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
            <div className="card-body">
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <div className="avatar avatar-50 rounded bg-theme-1 theme-green">
                    <i className="bi bi-clock h5"></i>
                  </div>
                </div>
                <div className="col">
                  <p className="small text-secondary mb-1">Total Efforts</p>
                  <h5>
                    {projects.reduce((sum, p) => sum + (p.effort || 0), 0)} hrs
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 col-xl-3">
          <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
            <div className="card-body">
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <div className="avatar avatar-50 rounded bg-theme-1 theme-purple">
                    <i className="bi bi-people h5"></i>
                  </div>
                </div>
                <div className="col">
                  <p className="small text-secondary mb-1">Clients</p>
                  <h5>{clients.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 col-xl-3">
          <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
            <div className="card-body">
              <div className="row gx-3 align-items-center">
                <div className="col-auto">
                  <div className="avatar avatar-50 rounded bg-theme-1 theme-yellow">
                    <i className="bi bi-journal-check h5"></i>
                  </div>
                </div>
                <div className="col">
                  <p className="small text-secondary mb-1">Tasks in Progress</p>
                  <h5>
                    {projects.filter((p) => p.status === "In Progress").length}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>Project List</h5>
                <Link to="/projects/add" className="btn btn-solid">
                  Add New Project
                </Link>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-auto ms-auto">
                  <div className="input-group">
                    <span className="input-group-text text-theme-1">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search projects..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select"
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                  >
                    <option value="All">All Clients</option>
                    {clients.map((client) => (
                      <option key={client} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table
                    className="table all-package order-table theme-table"
                    id="table_id"
                  >
                    <thead>
                      <tr>
                        <th>Project Image</th>
                        <th>Project Title</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Effort</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && (
                        <tr>
                          <td colSpan="7">Loading projects...</td>
                        </tr>
                      )}
                      {error && (
                        <tr>
                          <td colSpan="7" className="text-danger">
                            Error loading projects: {error.message}
                          </td>
                        </tr>
                      )}
                      {!isLoading && !error && currentProjects.length === 0 && (
                        <tr>
                          <td colSpan="7">No projects found.</td>
                        </tr>
                      )}
                      {!isLoading &&
                        !error &&
                        currentProjects.map((project) => (
                          <tr
                            key={project.id}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#project-details"
                          >
                            <td>
                              <a className="d-block">
                                <span className="order-image">
                                  <img
                                    src={
                                      project.image ||
                                      "assets/img/modern-ai-image/pet-1.jpg"
                                    }
                                    className="img-fluid"
                                    alt={project.title}
                                  />
                                </span>
                              </a>
                            </td>
                            <td>
                              <p className="mb-0">{project.title}</p>
                              <p className="text-secondary small mb-1">
                                {project.description || "No description"}
                              </p>
                            </td>
                            <td>
                              {new Date(project.createdAt).toLocaleDateString()}
                            </td>
                            <td>{project.client || "N/A"}</td>
                            <td
                              className={
                                project.status === "Completed"
                                  ? "order-success"
                                  : project.status === "In Progress"
                                  ? "order-pending"
                                  : "order-cancle"
                              }
                            >
                              <span>{project.status || "Unknown"}</span>
                            </td>
                            <td>{project.effort || 0} hrs</td>
                            <td>
                              <ul>
                                <li>
                                  <a
                                    href={`/projects/${project.id}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleView(project.id);
                                    }}
                                  >
                                    <i className="ri-eye-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="javascript:void(0)"
                                    onClick={() => handleEdit(project.id)}
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="javascript:void(0)"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalToggle"
                                    onClick={() => handleDelete(project.id)}
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="btn btn-sm btn-solid text-white"
                                    href="javascript:void(0)"
                                    onClick={() => handleMove(project.id)}
                                  >
                                    Move
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
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="card-footer">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                  <button className="page-link" onClick={() => paginate(i + 1)}>
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
        </div>
      )}
    </div>
  );
};

export default Projects;
