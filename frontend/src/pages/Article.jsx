import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import ItsBlogDetails from "../components/Blogs/ItsABlogDetails";

const Article = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <ItsBlogDetails />
        </div>
      </div>
    </section>
  );
};

export default Article;
