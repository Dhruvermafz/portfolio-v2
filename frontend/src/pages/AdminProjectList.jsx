import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
const AdminProjectList = () => {
  const [projects, setProjects] = useState([]);

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
  const totalClients = new Set(projects.map((p) => p.client)).size;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mb-6">
        <div className="card-widget-separator-wrapper">
          <div className="card-body card-widget-separator">
            <div className="row gy-4 gy-sm-1">
              <div className="col-sm-6 col-lg-3">
                <div className="d-flex justify-content-between align-items-center card-widget-1 border-end pb-4 pb-sm-0">
                  <div>
                    <h4 className="mb-0">{totalClients}</h4>
                    <p className="mb-0">Clients</p>
                  </div>
                  <div className="avatar me-sm-6">
                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                      <i className="ti ti-user ti-26px"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="d-flex justify-content-between align-items-center card-widget-2 border-end pb-4 pb-sm-0">
                  <div>
                    <h4 className="mb-0">{totalProjects}</h4>
                    <p className="mb-0">Projects</p>
                  </div>
                  <div className="avatar me-lg-6">
                    <span className="avatar-initial rounded bg-label-secondary text-heading">
                      <i className="ti ti-briefcase ti-26px"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-datatable table-responsive">
          <table className="invoice-list-table table border-top">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Client</th>
                <th>Services</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td>{project.client}</td>
                  <td>{project.services}</td>
                  <td>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                  </td>
                  <td>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger ms-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectList;
