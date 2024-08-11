import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import ResumeCard from "../components/ResumeCard";
const Resume = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <ResumeCard />
        </div>
      </div>
    </section>
  );
};

export default Resume;
