import React, { useState } from "react";
import { FaUser, FaBriefcase, FaSearch } from "react-icons/fa";
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

  // Handle Edit (Assuming a route like /projects/edit/:id)
  const handleEdit = (projectId) => {
    window.location.href = `/projects/edit/${projectId}`;
  };

  // Handle Move (Placeholder for move functionality)
  const handleMove = (projectId) => {
    alert(`Move functionality for project ${projectId} not implemented yet.`);
  };

  return (
    <main className="adminuiux-content has-sidebar" onClick={() => {}}>
      <PageTitle />

      <div className="container mt-3" id="main-content">
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
                      {projects.reduce((sum, p) => sum + (p.effort || 0), 0)}{" "}
                      hrs
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
                    <p className="small text-secondary mb-1">
                      Tasks in Progress
                    </p>
                    <h5>
                      {
                        projects.filter((p) => p.status === "In Progress")
                          .length
                      }
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="row gx-3">
          <div className="col-12 col-md-12 position-relative">
            <div className="card adminuiux-card shadow-sm mb-3 mb-lg-4">
              <div className="card-header">
                <div className="row gx-3">
                  <div className="col-auto">
                    <i className="bi bi-clock h5 avatar avatar-40 bg-theme-1-subtle text-theme-1 rounded"></i>
                  </div>
                  <div className="col-auto align-self-center">
                    <h6 className="mb-0">Projects</h6>
                    <p className="text-secondary small">Manage your projects</p>
                  </div>
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
              </div>
              <div className="card-body py-0">
                {isLoading && <p>Loading projects...</p>}
                {error && (
                  <p className="text-danger">
                    Error loading projects: {error.message}
                  </p>
                )}
                {!isLoading && !error && currentProjects.length === 0 && (
                  <p>No projects found.</p>
                )}
                {!isLoading && !error && currentProjects.length > 0 && (
                  <table className="table" id="dataTable">
                    <thead>
                      <tr className="text-muted">
                        <th className="all">Project</th>
                        <th className="desktop">Date/Time</th>
                        <th className="tablet desktop">Effort</th>
                        <th className="desktop">Approved by</th>
                        <th className="desktop">Approved Date</th>
                        <th className="tablet desktop">Status</th>
                        <th className="all">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <div className="row gx-3 align-items-center">
                              <div className="col-auto">
                                <figure className="avatar avatar-50 border mb-0 coverimg rounded">
                                  <img
                                    src={
                                      project.image ||
                                      "assets/img/modern-ai-image/pet-1.jpg"
                                    }
                                    alt={project.title}
                                    className="w-100"
                                  />
                                </figure>
                              </div>
                              <div className="col">
                                <p className="mb-0">{project.title}</p>
                                <p className="text-secondary small mb-1">
                                  {project.description || "No description"}
                                </p>
                                <p className="text-secondary small">
                                  By{" "}
                                  <Link to={`/users/${project.createdBy?.id}`}>
                                    {project.createdBy?.name || "Unknown"}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-secondary small">
                              {new Date(project.createdAt).toLocaleTimeString()}
                            </p>
                          </td>
                          <td>
                            <p className="mb-0">{project.effort || 0}</p>
                            <p className="text-secondary small">hours</p>
                          </td>
                          <td>
                            <p className="mb-0">
                              {project.approvedBy?.name || "N/A"}
                            </p>
                            <p className="text-secondary small">
                              {project.approvedBy?.email || "N/A"}
                            </p>
                          </td>
                          <td>
                            <p className="mb-0">
                              {project.approvedAt
                                ? new Date(
                                    project.approvedAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p className="text-secondary small">
                              {project.approvedAt
                                ? new Date(
                                    project.approvedAt
                                  ).toLocaleTimeString()
                                : "N/A"}
                            </p>
                          </td>
                          <td>
                            <span
                              className={`badge badge-sm ${
                                project.status === "Completed"
                                  ? "bg-green"
                                  : project.status === "In Progress"
                                  ? "bg-yellow"
                                  : "bg-red"
                              }`}
                            >
                              {project.status || "Unknown"}
                            </span>
                          </td>
                          <td>
                            <div className="dropdown d-inline-block">
                              <a
                                className="text-secondary no-caret"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                                role="button"
                              >
                                <i className="bi bi-three-dots"></i>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleEdit(project.id)}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleMove(project.id)}
                                  >
                                    Move
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDelete(project.id)}
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer">
                  <nav aria-label="Page navigation">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
