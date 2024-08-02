import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import WorkExperience from "../components/Cards/WorkExperience";

const Home = () => {
  return (
    <section class="home-area">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <WorkExperience />
        </div>
      </div>
    </section>
  );
};

export default Home;
