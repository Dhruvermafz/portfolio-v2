import React from "react";

const BlogsCard = () => {
  return (
    <div className="article-publications">
      <h2 className="main-common-title">Recent Blogs</h2>
      <div className="article-publications-main">
        <div className="row article-publications-slider">
          <div className="col-lg-6">
            <div className="article-publications-item">
              <div className="image">
                <a href="article.html" className="d-block w-100">
                  <img
                    src="assets/img/blog/blog-img-1.jpg"
                    alt="blog-img-1"
                    className="img-fluid w-100"
                  />
                </a>
                <a href="article.html" className="tags">
                  Development
                </a>
              </div>
              <div className="text">
                <a href="article.html" className="title">
                  Want To Upgrade Your Brain? Stop Doing These 7 Things
                </a>
                <ul className="list-unstyled">
                  <li>15 min read</li>
                  <li>Nov 6, 2023</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
