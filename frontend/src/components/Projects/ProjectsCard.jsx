import React from "react";
import { Link } from "react-router-dom";
import projects from "../../assets/data/projectsData";
import Pagination from "../Pagination";
import HireMeSlider from "../HireMeSlider";

const ProjectsCard = () => {
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
                I'm here to help if you're searching for a product designer to
                bring your idea to life or a design partner to help take your
                business to the next level.
              </p>
            </div>
          </div>
          <div className="portfolio-area">
            <div className="row g-4 parent-container">
              {projects.map((project) => (
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
                        <p className="subtitle">{project.services}</p>
                      </div>
                      <div className="visite-btn">
                        <Link to={`/project/${project.id}`}>
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
            <Pagination />
          </div>

          <HireMeSlider />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
