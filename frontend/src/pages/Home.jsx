import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import WorkExperience from "../components/Cards/WorkExperience";
import TechnologiesIWorked from "../components/TechStack/TechnologiesIWorked";
import Projects from "../components/Cards/Projects";
import Academia from "../components/Cards/Academia";
const Home = () => {
  return (
    <section class="home-area">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <WorkExperience />
          <Projects />

          <TechnologiesIWorked />
        </div>
      </div>
    </section>
  );
};

export default Home;
