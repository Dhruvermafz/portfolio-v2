import React from "react";
import projects from "../../assets/data/projectsData";
import { Link } from "react-router-dom";

const Projects = () => {
  // Limit the projects array to the first 2 items
  const limitedProjects = projects.slice(0, 2);

  return (
    <div className="col-xl-4">
      <div className="card card-projects">
        <div className="card-body">
          <h3 className="card-title">
            Recent Projects{" "}
            <a className="link-btn" href="projects">
              All Projects
              <svg
                className="icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16699 10H15.8337"
                  stroke="#4770FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.833 15L15.833 10"
                  stroke="#4770FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.833 5L15.833 10"
                  stroke="#4770FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </h3>
          <div className="portfolio-area">
            <div className="row g-4 parent-container">
              {limitedProjects.map((project) => (
                <div className="col-lg-12" key={project.id}>
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
                      </div>
                      <div className="visite-btn">
                        <Link to={`${project.website}`}>
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
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
