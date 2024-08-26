import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import BlogDetails from "../components/Blogs/BlogDetails";

const Article = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <BlogDetails />
        </div>
      </div>
    </section>
  );
};

export default Article;
