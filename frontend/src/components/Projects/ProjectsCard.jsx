import React from "react";
import Pagination from "../Pagination";
import HireMeSlider from "../HireMeSlider";

const ProjectsCard = () => {
  return (
    <div class="col-xl-8">
      <div class="card content-box-card">
        <div class="card-body portfolio-card">
          <div class="top-info">
            <div class="text">
              <h1 class="main-title">
                Check Out My Latest <span>Projects</span>
              </h1>
              <p>
                I'm here to help if you're searching for a product designer to
                bring your idea to life or a design partner to help take your
                business to the next level.
              </p>
            </div>
          </div>
          <div class="portfolio-area">
            <div class="row g-4 parent-container">
              <div class="col-lg-12">
                <div class="portfolio-item">
                  <div class="image">
                    <img
                      src="assets/img/projects/project-1.png"
                      alt="project-1"
                      class="img-fluid w-100"
                    />
                    <a
                      href="assets/img/projects/project-1.png"
                      class="gallery-popup full-image-preview parent-container"
                    >
                      <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M10 4.167v11.666M4.167 10h11.666"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="text">
                    <div class="info">
                      <a href="portfolio-details.html" class="title">
                        FlowSaaS - SaaS Application Tools
                      </a>
                      <p class="subtitle">SaaS App | UI UX Design</p>
                    </div>
                    <div class="visite-btn">
                      <a href="portfolio-details.html">
                        Visit Site
                        <svg
                          class="arrow-up"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.91634 4.5835L4.08301 10.4168"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.66699 4.5835H9.91699V9.8335"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="portfolio-item">
                  <div class="image">
                    <img
                      src="assets/img/projects/project-2.png"
                      alt="project-2"
                      class="img-fluid w-100"
                    />
                    <a
                      href="assets/img/projects/project-2.png"
                      class="gallery-popup full-image-preview parent-container"
                    >
                      <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M10 4.167v11.666M4.167 10h11.666"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="text">
                    <div class="info">
                      <a href="portfolio-details.html" class="title">
                        AIMug - AI Writing Application Tools
                      </a>
                      <p class="subtitle">Product Design | Application</p>
                    </div>
                    <div class="visite-btn">
                      <a href="portfolio-details.html">
                        Visit Site
                        <svg
                          class="arrow-up"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.91634 4.5835L4.08301 10.4168"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.66699 4.5835H9.91699V9.8335"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="portfolio-item">
                  <div class="image">
                    <img
                      src="assets/img/projects/project-3.png"
                      alt="project-3"
                      class="img-fluid w-100"
                    />
                    <a
                      href="assets/img/projects/project-3.png"
                      class="gallery-popup full-image-preview parent-container"
                    >
                      <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      >
                        <path d="M10 4.167v11.666M4.167 10h11.666"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="text">
                    <div class="info">
                      <a href="portfolio-details.html" class="title">
                        FlowArch - Architecture Service Website
                      </a>
                      <p class="subtitle">UI UX Design | Development</p>
                    </div>
                    <div class="visite-btn">
                      <a href="portfolio-details.html">
                        Visit Site
                        <svg
                          class="arrow-up"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.91634 4.5835L4.08301 10.4168"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M4.66699 4.5835H9.91699V9.8335"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
