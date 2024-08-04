import React from "react";
import Github from "./Github";

const AboutCard = () => {
  return (
    <div class="col-xl-8">
      <div class="card content-box-card">
        <div class="card-body">
          <div class="top-info">
            <div class="text">
              <h1 class="main-title">
                Hi, This Is <span>Cris Rayaan</span> 👋
              </h1>
              <p>
                A Passionate <b>Full Stack Developer</b> 🖥️ &{" "}
                <b>Product Designer</b> having
                <b>12 years</b> of Experiences over 24+ Country Worldwide.{" "}
              </p>
            </div>
            <div class="available-btn">
              <span>
                <i class="fas fa-circle"></i> Available For Hire
              </span>
            </div>
          </div>
          <div class="counter-area">
            <div class="counter">
              <div class="counter-item">
                <h3 class="number">40+</h3>
                <p class="subtitle">Year of Experience</p>
              </div>
              <div class="counter-item">
                <h3 class="number">86+</h3>
                <p class="subtitle">Project Completed</p>
              </div>
              <div class="counter-item">
                <h3 class="number">72+</h3>
                <p class="subtitle">Happy Client</p>
              </div>
            </div>
            <div class="circle-area">
              <div class="circle-text">
                <img
                  class="circle-image"
                  src="assets/img/about-us/circle-text.svg"
                  alt="circle-text"
                />
                <img
                  class="circle-image circle-image-light d-none"
                  src="assets/img/about-us/circle-text-light.svg"
                  alt="circle-text"
                />
                <span class="arrow-down">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 5V35"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 30L20 35L25 30"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="working-with-area">
            <h2 class="main-common-title">
              Working With 50+ Brands ✨ Worldwide
            </h2>
            <div class="working-with-main">
              <div class="items">
                <img src="assets/img/icons/notion.svg" alt="notion" />
              </div>
              <div class="items">
                <img src="assets/img/icons/webflow.svg" alt="webflow" />
              </div>
              <div class="items">
                <img src="assets/img/icons/mico.svg" alt="mico" />
              </div>
              <div class="items">
                <img src="assets/img/icons/framer.svg" alt="framer" />
              </div>
              <div class="items">
                <img src="assets/img/icons/zeplin.svg" alt="zeplin" />
              </div>
              <div class="items">
                <img src="assets/img/icons/figma.svg" alt="figma" />
              </div>
              <div class="items">
                <img src="assets/img/icons/notion.svg" alt="notion" />
              </div>
              <div class="items">
                <img src="assets/img/icons/webflow.svg" alt="webflow" />
              </div>
              <div class="items">
                <img src="assets/img/icons/mico.svg" alt="mico" />
              </div>
              <div class="items">
                <img src="assets/img/icons/framer.svg" alt="framer" />
              </div>
              <div class="items">
                <img src="assets/img/icons/zeplin.svg" alt="zeplin" />
              </div>
              <div class="items">
                <img src="assets/img/icons/figma.svg" alt="figma" />
              </div>
              <div class="items">
                <img src="assets/img/icons/notion.svg" alt="notion" />
              </div>
              <div class="items">
                <img src="assets/img/icons/webflow.svg" alt="webflow" />
              </div>
              <div class="items">
                <img src="assets/img/icons/mico.svg" alt="mico" />
              </div>
              <div class="items">
                <img src="assets/img/icons/framer.svg" alt="framer" />
              </div>
            </div>
          </div>
          <div class="client-feedback">
            <h2 class="main-common-title">Trusted By 1200+ Clients</h2>
            <div class="row client-feedback-slider">
              <div class="col-lg-6"></div>
            </div>
          </div>
          <div class="awards-recognitions">
            <h2 class="main-common-title">Awards and Recognitions</h2>
            <div class="awards-recognitions-main">
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="d-block w-100">
                    <div class="awards-item">
                      <div class="award-name">
                        <div class="icon">
                          <img src="assets/img/icons/adobe.svg" alt="adobe" />
                        </div>
                        <div class="text">
                          <h4 class="title">Adobe Design Contest</h4>
                          <p class="year">2022 - 2023</p>
                        </div>
                      </div>
                      <div class="winner-tag">
                        <h4 class="title">
                          <svg
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9Z"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 15L15.4 20.89L16.998 17.657L20.596 17.889L17.196 12"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.80234 12L3.40234 17.89L7.00034 17.657L8.59834 20.889L11.9983 15"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Runner Up
                        </h4>
                      </div>
                      <div class="project-btn">
                        <span>
                          View Project
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
                            />
                            <path
                              d="M4.66699 4.5835H9.91699V9.8335"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="d-block w-100">
                    <div class="awards-item">
                      <div class="award-name">
                        <div class="icon">
                          <img
                            src="assets/img/icons/dribbble.svg"
                            alt="dribbble"
                          />
                        </div>
                        <div class="text">
                          <h4 class="title">Dribbble Design Contest</h4>
                          <p class="year">2022 - 2023</p>
                        </div>
                      </div>
                      <div class="winner-tag">
                        <h4 class="title">
                          <svg
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9Z"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 15L15.4 20.89L16.998 17.657L20.596 17.889L17.196 12"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.80234 12L3.40234 17.89L7.00034 17.657L8.59834 20.889L11.9983 15"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Gold Winner
                        </h4>
                      </div>
                      <div class="project-btn">
                        <span>
                          View Project
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
                            />
                            <path
                              d="M4.66699 4.5835H9.91699V9.8335"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="d-block w-100">
                    <div class="awards-item">
                      <div class="award-name">
                        <div class="icon">
                          <img
                            src="assets/img/icons/awwwards.png"
                            alt="awwwards"
                          />
                        </div>
                        <div class="text">
                          <h4 class="title">Awwwards Nominee</h4>
                          <p class="year">2022 - 2023</p>
                        </div>
                      </div>
                      <div class="winner-tag">
                        <h4 class="title">
                          <svg
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9Z"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 15L15.4 20.89L16.998 17.657L20.596 17.889L17.196 12"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.80234 12L3.40234 17.89L7.00034 17.657L8.59834 20.889L11.9983 15"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Runner Up
                        </h4>
                      </div>
                      <div class="project-btn">
                        <span>
                          View Project
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
                            />
                            <path
                              d="M4.66699 4.5835H9.91699V9.8335"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="d-block w-100">
                    <div class="awards-item">
                      <div class="award-name">
                        <div class="icon">
                          <img
                            src="assets/img/icons/behance.svg"
                            alt="behance"
                          />
                        </div>
                        <div class="text">
                          <h4 class="title">Behance Design Contest</h4>
                          <p class="year">2022 - 2023</p>
                        </div>
                      </div>
                      <div class="winner-tag">
                        <h4 class="title">
                          <svg
                            class="icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9Z"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 15L15.4 20.89L16.998 17.657L20.596 17.889L17.196 12"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.80234 12L3.40234 17.89L7.00034 17.657L8.59834 20.889L11.9983 15"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Gold Winner
                        </h4>
                      </div>
                      <div class="project-btn">
                        <span>
                          View Project
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
                            />
                            <path
                              d="M4.66699 4.5835H9.91699V9.8335"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="article-publications">
            <h2 class="main-common-title">Article and Publications</h2>
            <div class="article-publications-main">
              <div class="row article-publications-slider">
                <div class="col-lg-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-1.jpg"
                          alt="blog-img-1"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-2.jpg"
                          alt="blog-img-2"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-3.jpg"
                          alt="blog-img-3"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="work-together-slider">
            <div class="slider-main d-flex gap-4 align-items-center">
              <div class="slider-item">
                <a href="contact.html">Let's 👋 Work Together</a>
                <a href="contact.html">Let's 👋 Work Together</a>
              </div>
              <div class="slider-item">
                <a href="contact.html">Let's 👋 Work Together</a>
                <a href="contact.html">Let's 👋 Work Together</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
