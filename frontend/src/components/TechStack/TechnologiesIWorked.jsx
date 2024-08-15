import React from "react";
import GitHubCalendar from "react-github-calendar";
import { FaArrowRight } from "react-icons/fa";
const TechnologiesIWorked = () => {
  return (
    <div class="services-area mt-24">
      <div class="row g-4">
        <div class="col-xl-8">
          <div class="card services-card">
            <div class="card-body">
              <h3 class="card-title">
                Technologies I worked on
                <a class="link-btn" href="services.html">
                  {" "}
                  See All Services
                  <FaArrowRight />
                </a>
              </h3>
              <div class="services-main mt-24">
                <div class="row g-4">
                  {/* <GitHubCalendar
                    username="Dhruvermafz"
                    blockSize={15}
                    blockMargin={5}
                    color="#c084f5"
                    fontSize={16}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="card lets-talk-together-card">
            <div class="card-body">
              <div class="scrolling-info">
                <div class="slider-item">
                  <p>
                    Available For Hire 🚀 Available For Hire 🚀 Available For
                    Hire 🚀
                  </p>
                </div>
              </div>
              <h3 class="card-title">Hire👋 Me</h3>
              <a class="link-btn" href="/contact">
                {" "}
                Let's Talk
                <svg
                  class="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 11.6665V6.6665H12.5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesIWorked;
