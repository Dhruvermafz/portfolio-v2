import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import AboutCard from "../components/About/AboutCard";
const About = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <AboutCard />
        </div>
      </div>
    </section>
  );
};

export default About;
