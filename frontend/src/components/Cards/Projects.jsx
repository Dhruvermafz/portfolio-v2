import React from "react";

const Projects = () => {
  return (
    <div class="col-xl-4">
      <div class="card card-projects">
        <div class="card-body">
          <h3 class="card-title">
            Recent Projects{" "}
            <a class="link-btn" href="portfolio.html">
              All Projects
              <svg
                class="icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16699 10H15.8337"
                  stroke="#4770FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.833 15L15.833 10"
                  stroke="#4770FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.833 5L15.833 10"
                  stroke="#4770FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </h3>
          <div class="projects-main mt-24">
            <div class="row g-4 parent-container">
              <div class="col-lg-12">
                <div class="project-item">
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
                    <div class="info">
                      <span class="category">Product Design</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="project-item">
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
                    <div class="info">
                      <span class="category">Product Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
