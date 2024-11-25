import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";

import BlogDetailsPage from "../components/Blogs/BlogDetailsPage";
const BlogDetails = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <BlogDetailsPage />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
