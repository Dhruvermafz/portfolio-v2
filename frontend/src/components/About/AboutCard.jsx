import React from "react";
import Github from "./Github";
import expertiseAreas from "../../assets/data/technologies";
import HireMeSlider from "../HireMeSlider";
import Certifications from "./Certifications";
import BlogsCard from "./BlogsCard";
import {
  getTotalExperience,
  workExperiences,
} from "../../assets/data/workExperiences";
import projects from "../../assets/data/projectsData"; // Importing the projects
import Achievement from "../Achievement/Achievement";
import ExperienceTimeline from "../Experience/ExperienceTimeline";
const AboutCard = () => {
  // Calculate total experience
  const totalExperience = getTotalExperience();

  // Function to count the number of projects
  const countProjects = () => {
    return projects.length;
  };

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
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
            <div className="available-btn">
              <span>
                <i className="fas fa-circle"></i> Available For Hire
              </span>
            </div>
          </div>
          <div className="counter-area">
            <div className="counter">
              <div className="counter-item">
                <h3 className="number">{totalExperience}</h3>
                <p className="subtitle">Years of Experience</p>
              </div>
              <div className="counter-item">
                <h3 className="number">{countProjects()}</h3>{" "}
                {/* Displaying total projects */}
                <p className="subtitle">Projects Completed</p>
              </div>
              <div className="counter-item">
                <h3 className="number">72+</h3>
                <p className="subtitle">Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="working-with-area">
            <h2 className="main-common-title">
              Working with technologies ✨ Worldwide
            </h2>
            <div className="working-with-main">
              {expertiseAreas.map((expertise, index) => (
                <div className="items" key={index}>
                  <expertise.icon size={40} color="white" />
                </div>
              ))}
            </div>
          </div>
          <ExperienceTimeline />
          <Achievement />
          <Certifications />
          <BlogsCard />
          <HireMeSlider />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
