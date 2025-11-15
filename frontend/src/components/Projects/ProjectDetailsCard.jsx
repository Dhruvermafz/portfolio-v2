import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllProjectsQuery } from "../../api/projectApi";
import HireMeSlider from "../HireMeSlider";
import { FaLink, FaGithub } from "react-icons/fa6";
import Tags from "../Tags";
import { Link } from "react-router-dom";
const ProjectDetailsCard = () => {
  const { id: slug } = useParams(); // URL parameter is slug (e.g., "indus_education_world")
  const navigate = useNavigate();

  // Normalize slug: replace underscores with hyphens
  const normalizedSlug = slug.replace(/_/g, "-"); // e.g., "indus_education_world" -> "indus-education-world"

  // Fetch all projects
  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError,
    error,
    refetch,
  } = useGetAllProjectsQuery();

  // Find the project with the matching slug
  const project = projects.find((proj) => proj.slug === normalizedSlug);

  useEffect(() => {
    // Scroll to the top of the page when the slug changes
    window.scrollTo(0, 0);
  }, [slug, normalizedSlug, projects, project]);

  // Handle loading state
  if (isProjectsLoading) {
    return <div aria-live="polite">Loading project...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div aria-live="polite">
        Error loading project: {error?.data?.message || "Something went wrong"}
        <button onClick={() => refetch()} className="btn btn-primary mt-2">
          Retry
        </button>
      </div>
    );
  }

  // Handle project not found
  if (!project) {
    // Suggest similar slugs
    const similarSlugs = projects
      .filter((p) => p.slug.includes(slug.replace(/_/g, "")))
      .map((p) => p.slug);
    return (
      <div aria-live="polite">
        Project not found for slug: {slug}
        {similarSlugs.length > 0 && (
          <div>
            <p>Did you mean:</p>
            <ul>
              {similarSlugs.map((s) => (
                <li key={s}>
                  <Link to={`/project/${s}`}>{s}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Find the current project's index for navigation
  const projectIndex = projects.findIndex((proj) => proj.slug === project.slug);

  const handlePrevClick = () => {
    if (projectIndex > 0) {
      const prevProject = projects[projectIndex - 1];
      navigate(`/project/${prevProject.slug}`);
    }
  };

  const handleNextClick = () => {
    if (projectIndex < projects.length - 1) {
      const nextProject = projects[projectIndex + 1];
      navigate(`/project/${nextProject.slug}`);
    }
  };

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card">
          <div className="portfolio-details-area">
            <div className="main-image">
              <img
                src={project.mainImage}
                alt={project.title}
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${project.mainImage}`);
                  if (!project.mainImage.includes("Signature=")) {
                    console.warn(`Unsigned URL detected: ${project.mainImage}`);
                  }
                  e.target.src = "/assets/fallback-image.png";
                }}
              />
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
                  <a
                    href={project.website}
                    className="website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Link <FaLink /> {project.website}
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
                      />
                      <path
                        d="M4.66699 4.5835H9.91699V9.8335"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href={project.ghLink}
                    className="website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code <FaGithub /> {project.ghLink}
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
                      />
                      <path
                        d="M4.66699 4.5835H9.91699V9.8335"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                        loading="lazy"
                        onError={(e) => {
                          console.error(`Failed to load image: ${image}`);
                          if (!image.includes("Signature=")) {
                            console.warn(`Unsigned URL detected: ${image}`);
                          }
                          e.target.src = "/assets/fallback-image.png";
                        }}
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
              <Tags tags={project.tags} />
            </div>
            <div className="prev-and-next-btn">
              <button
                className="btn btn-prev"
                onClick={handlePrevClick}
                disabled={projectIndex === 0 || projectIndex === -1}
              >
                Previous
              </button>
              <button
                className="btn btn-next"
                onClick={handleNextClick}
                disabled={
                  projectIndex === projects.length - 1 || projectIndex === -1
                }
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
