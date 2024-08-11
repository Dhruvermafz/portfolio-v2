import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import BlogsCard from "../components/Blogs/BlogsCard";
import Pagination from "../components/Pagination";
const Blogs = () => {
  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />
          <div className="col-xl-8">
            <div className="card content-box-card">
              <div className="card-body portfolio-card">
                <div className="top-info">
                  <div className="text">
                    <h1 className="main-title">
                      My Recent Article and Publications
                    </h1>
                    <p>
                      I'm here to help if you're searching for a product
                      designer to bring your idea to life or a design partner to
                      help take your business to the next level.
                    </p>
                  </div>
                </div>
                <div className="article-publications article-area">
                  <div className="article-publications-main">
                    <div className="row">
                      <BlogsCard />
                    </div>
                  </div>
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
