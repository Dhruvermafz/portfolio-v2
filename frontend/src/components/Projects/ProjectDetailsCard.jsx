import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projects from "../../assets/data/projectsData";
import HireMeSlider from "../HireMeSlider";
import { FaLink } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import Tags from "../Tags";
const ProjectDetailsCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex((proj) => proj.id === id);
  const project = projects[projectIndex];

  useEffect(() => {
    // Scroll to the top of the page when the project changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handlePrevClick = () => {
    if (projectIndex > 0) {
      const prevProject = projects[projectIndex - 1];
      navigate(`/project/${prevProject.id}`);
    }
  };

  const handleNextClick = () => {
    if (projectIndex < projects.length - 1) {
      const nextProject = projects[projectIndex + 1];
      navigate(`/project/${nextProject.id}`);
    }
  };

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card">
          <div className="portfolio-details-area">
            <div className="main-image">
              <img src={project.mainImage} alt={project.title} />
            </div>
            <div className="portfolio-details-text">
              <div className="short-info">
                <div className="info-item">
                  <p className="subtitle">Client For:</p>
                  <h4 className="card-title">{project.client}</h4>
                </div>
                <div className="info-item">
                  <p className="subtitle">Services:</p>
                  <h4 className="card-title">{project.services}</h4>
                  <Tags tagName={project.tags} />
                  <a
                    href={project.website}
                    className="website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Check out the website <FaLink> {project.website}</FaLink>
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
                  <a
                    href={project.ghLink}
                    className="website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Check out the source code{" "}
                    <FaGithub> {project.ghLink}</FaGithub>
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
              <div className="overview">
                <h4 className="card-title">Overview</h4>
                <p>{project.overview}</p>
              </div>
            </div>
            <div className="inner-images">
              <div className="row g-3">
                {project.images.map((image, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="image-item">
                      <img
                        src={image}
                        alt={`project-details-${index + 2}`}
                        className="img-fluid w-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="more-info-block">
              <h3 className="more-info-title">Challenges</h3>
              {project.challenges.map((challenge, index) => (
                <div key={index}>
                  <h5 className="more-info-subtitle">{challenge.title}:</h5>
                  <ul className="list-unstyled">
                    <li>
                      <b>Challenge:</b> {challenge.challenge}
                    </li>
                    <li>
                      <b>Solution:</b> {challenge.solution}
                    </li>
                  </ul>
                </div>
              ))}
              <h3 className="more-info-title">Results/Conclusion:</h3>
              <p>{project.results}</p>
            </div>
            <div className="prev-and-next-btn">
              <button
                className="btn btn-prev"
                onClick={handlePrevClick}
                disabled={projectIndex === 0}
              >
                Previous
              </button>
              <button
                className="btn btn-next"
                onClick={handleNextClick}
                disabled={projectIndex === projects.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          <HireMeSlider />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
