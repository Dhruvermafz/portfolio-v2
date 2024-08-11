import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import ProjectsCard from "../components/Projects/ProjectsCard";
import ProjectDetailsCard from "../components/Projects/ProjectDetailsCard";
const ProjectDetails = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <ProjectDetailsCard />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
