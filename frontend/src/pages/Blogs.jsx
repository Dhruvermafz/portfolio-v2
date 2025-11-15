import React, { useState, useEffect } from "react";
import ProfileCard from "../components/Cards/ProfileCard";
import BlogsCard from "../components/Blogs/BlogsCard";
import Pagination from "../components/Pagination";
import ItsABlogCard from "../components/Blogs/ItsABlogCard";

const Blogs = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate API load (use actual API calls in real usage)
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Replace with actual API loading time
  }, []);

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
                      My Recent Article which I write here and on ITSABLOG.
                    </h1>
                    <p>
                      These are the recent blog posts written for this website
                      and ITSABLOG.
                    </p>
                  </div>
                </div>
                <div className="article-publications article-area">
                  {loading ? (
                    <p>Loading articles...</p> // Replace with Skeleton Loader
                  ) : (
                    <div className="article-publications-main">
                      <div className="row">
                        <BlogsCard />
                      </div>
                      <div className="row">
                        <ItsABlogCard />
                      </div>
                    </div>
                  )}
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
