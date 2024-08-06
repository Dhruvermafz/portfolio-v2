import React from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import BlogsCard from "../components/Blogs/BlogsCard";
import Pagination from "../components/Pagination";
const Blogs = () => {
  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />
          <div class="col-xl-8">
            <div class="card content-box-card">
              <div class="card-body portfolio-card">
                <div class="top-info">
                  <div class="text">
                    <h1 class="main-title">
                      My Recent Article and Publications
                    </h1>
                    <p>
                      I'm here to help if you're searching for a product
                      designer to bring your idea to life or a design partner to
                      help take your business to the next level.
                    </p>
                  </div>
                </div>
                <div class="article-publications article-area">
                  <div class="article-publications-main">
                    <div class="row">
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
