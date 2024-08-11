import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import ProjectsCard from "../components/Projects/ProjectsCard";
const Projects = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <ProjectsCard />
        </div>
      </div>
    </section>
  );
};

export default Projects;
