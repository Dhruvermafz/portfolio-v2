import React from "react";

const BlogsCard = () => {
  return (
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
  );
};

export default BlogsCard;
