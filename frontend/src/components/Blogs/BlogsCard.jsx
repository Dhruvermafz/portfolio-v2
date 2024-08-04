import React from "react";
import Pagination from "../Pagination";

const BlogsCard = () => {
  return (
    <div class="col-xl-8">
      <div class="card content-box-card">
        <div class="card-body portfolio-card">
          <div class="top-info">
            <div class="text">
              <h1 class="main-title">My Recent Article and Publications</h1>
              <p>
                I'm here to help if you're searching for a product designer to
                bring your idea to life or a design partner to help take your
                business to the next level.
              </p>
            </div>
          </div>
          <div class="article-publications article-area">
            <div class="article-publications-main">
              <div class="row">
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-1.jpg"
                          alt="blog-img-1"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-2.jpg"
                          alt="blog-img-2"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-3.jpg"
                          alt="blog-img-3"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-4.jpg"
                          alt="blog-img-4"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-5.jpg"
                          alt="blog-img-5"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6">
                  <div class="article-publications-item">
                    <div class="image">
                      <a href="article.html" class="d-block w-100">
                        <img
                          src="assets/img/blog/blog-img-6.jpg"
                          alt="blog-img-6"
                          class="img-fluid w-100"
                        />
                      </a>
                      <a href="article.html" class="tags">
                        Development
                      </a>
                    </div>
                    <div class="text">
                      <a href="article.html" class="title">
                        Want To Upgrade Your Brain? Stop Doing These 7 Things
                      </a>
                      <ul class="list-unstyled">
                        <li>15 min read</li>
                        <li>Nov 6, 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
