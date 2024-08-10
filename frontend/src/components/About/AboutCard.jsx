import React from "react";
import Github from "./Github";
import expertiseAreas from "../../assets/data/technologies";
import HireMeSlider from "../HireMeSlider";
import Certifications from "./Certifications";
import BlogsCard from "./BlogsCard";
const AboutCard = () => {
  return (
    <div class="col-xl-8">
      <div class="card content-box-card">
        <div class="card-body">
          <div class="top-info">
            <div class="text">
              <h1 class="main-title">
                Hi, This Is <span>Dhruv Verma</span> 👋
              </h1>
              <p>
                {" "}
                I want to keep it simple here!
                <br /> I studied Computer Science, got intrigued by development
                side of it. Most of my work involves making inhouse softwares
                with JavaScript.
                <br /> I worked with different programming languages also:{" "}
                <b>Javascript & Python</b>.
                <br />
                Available for Full-Time positions as <b>
                  Full Stack Developer
                </b>{" "}
                🖥️ have worked in major
                <b> Web Technologies</b> and learning new technologies.
              </p>
            </div>
            <div class="available-btn">
              <span>
                <i class="fas fa-circle"></i> Available For Hire
              </span>
            </div>
          </div>
          {/* <div class="counter-area">
            <div class="counter">
              <div class="counter-item">
                <h3 class="number">1</h3>
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
          </div> */}
          <div class="working-with-area">
            <h2 class="main-common-title">
              Working with technologies ✨ Worldwide
            </h2>
            <div class="working-with-main">
              {expertiseAreas.map((expertise, index) => (
                <div class="items" key={index}>
                  <expertise.icon size={40} color="white" />
                </div>
              ))}
            </div>
          </div>
          {/* <div class="client-feedback">
            <h2 class="main-common-title">Trusted By 1200+ Clients</h2>
            <div class="row client-feedback-slider">
              <div class="col-lg-6"></div>
            </div>
          </div> */}
          <Certifications />
          <BlogsCard />
          <HireMeSlider />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
