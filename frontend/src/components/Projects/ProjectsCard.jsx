import React, { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../../assets/data/projectsData";
import Pagination from "../Pagination";
import HireMeSlider from "../HireMeSlider";

const ProjectsCard = () => {
  const projectsPerPage = 6; // Number of projects per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the projects to display for the current page
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
                Check Out My Latest <span>Projects</span>
              </h1>
              <p>
                These are the projects I worked on for learning or in my
                organization as a Full Stack Developer.
              </p>
            </div>
          </div>
          <div className="portfolio-area">
            <div className="row g-4 parent-container">
              {currentProjects.map((project) => (
                <div className="col-lg-6" key={project.id}>
                  <div className="portfolio-item">
                    <div className="image">
                      <img
                        src={project.mainImage}
                        alt={`project-${project.id}`}
                        className="img-fluid w-100"
                      />
                      <a
                        href={project.mainImage}
                        className="gallery-popup full-image-preview parent-container"
                      >
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        >
                          <path d="M10 4.167v11.666M4.167 10h11.666"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="text">
                      <div className="info">
                        <Link to={`/project/${project.id}`} className="title">
                          {project.title}
                        </Link>
                        <p className="subtitle">{project.services}</p>
                      </div>
                      <div className="visite-btn">
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit Site
                          <svg
                            className="arrow-up"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.91634 4.5835L4.08301 10.4168"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.66699 4.5835H9.91699V9.8335"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              totalPages={Math.ceil(projects.length / projectsPerPage)}
              initialPage={currentPage - 1}
              onPageChange={handlePageChange}
            />
          </div>
          <HireMeSlider />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
