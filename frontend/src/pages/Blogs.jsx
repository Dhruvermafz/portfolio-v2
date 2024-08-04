import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import BlogsCard from "../components/Blogs/BlogsCard";
const Blogs = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <BlogsCard />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
