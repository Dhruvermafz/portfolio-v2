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
import "./about.css";
const AboutCard = () => {
  // Calculate total experience
  const totalExperience = getTotalExperience();

  // Function to count the number of projects
  const countProjects = () => {
    return projects.length;
  };

  // Function to count unique clients
  const countClients = () => {
    // Extract all client names from the projects data
    const clientList = projects.map((project) => project.client);
    // Remove duplicates by converting the array into a Set
    const uniqueClients = new Set(clientList);
    // Return the number of unique clients
    return uniqueClients.size;
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
                <h3 className="number">{countClients()}</h3>{" "}
                {/* Displaying total unique clients */}
                <p className="subtitle">Worked With Clients</p>
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
                  <expertise.icon size={40} color="grey" />
                </div>
              ))}
            </div>
          </div>
          <h2 className="main-common-title">My Contributions</h2>
          <div className="github-stats">
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Dhruvermafz"
              alt="Dhruvermafz's GitHub Streak"
            />
            <img
              src="https://github-readme-stats.vercel.app/api?username=Dhruvermafz&show_icons=true&count_private=true"
              alt="Dhruvermafz's GitHub Stats"
            />
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
