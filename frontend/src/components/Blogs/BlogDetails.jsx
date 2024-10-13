import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);

  // Get the blogId from the URL
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `https://social-api-w6xb.onrender.com/api/posts/${blogId}` // Use the dynamic blogId
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    if (blogId) {
      fetchBlogDetails(); // Fetch details only if blogId exists
    }
  }, [blogId]); // Ensure the effect runs when blogId changes

  if (!blog) {
    return <p>Loading...</p>;
  }

  // Destructure the blog details with default values
  const {
    _id,
    imageUrl = "",
    title = "",
    readTime = "",
    createdAt = "",
    views = 0,
    content = [],
    tags = [],
    socialLinks = [],
    relatedPosts = [],
    username,
  } = blog;

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card article-details-card">
          <div className="article-details-area">
            <ul className="list-unstyled article-tags">
              <li>Written at: {new Date(createdAt).toLocaleDateString()}</li>
              <li> Author: Dhruv Verma</li>
            </ul>
            <div className="article-details-text">
              <h3 className="main-title">{title}</h3>
              <p>{content}</p>

              <div className="related-post">
                <h2 className="main-common-title">Related Post</h2>
                <div className="row g-4">
                  {relatedPosts.map((post, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="article-publications-item">
                        <div className="image">
                          <a href={post.url} className="d-block w-100">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="img-fluid w-100"
                            />
                          </a>
                          <a href={post.url} className="tags">
                            {post.tag}
                          </a>
                        </div>
                        <div className="text">
                          <a href={post.url} className="title">
                            {post.title}
                          </a>
                          <ul className="list-unstyled">
                            <li>{post.readTime} min read</li>
                            <li>
                              {new Date(
                                post.publishedDate
                              ).toLocaleDateString()}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="leave-comments-area">
                <h2 className="main-common-title">Leave a Comment</h2>
                <div className="comments-box">
                  <div className="row gx-3">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control shadow-none"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control shadow-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-4">
                        <label className="form-label">Comment</label>
                        <textarea
                          className="form-control shadow-none"
                          rows="4"
                          placeholder="Type details about your inquiry"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button className="submit-btn" type="submit">
                        Post Comment
                        <svg
                          className="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 11.6665V6.6665H12.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
