import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholder from "../../../assets/img/blog/placeholder.png";
import { API_URL, PORTFOLIO_URL } from "../../../config";

const AdminBlogCard = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/post`);
        // Access the first post from the `docs` array
        const firstPost = response.data.docs[0];
        setPost(firstPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, []);

  // Logic to calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = content?.split(/\s+/).length || 0; // Split by whitespace
    return Math.ceil(words / wordsPerMinute); // Calculate minutes
  };

  if (!post) {
    return <div>Loading...</div>; // Loader while fetching data
  }

  const { _id, title, content, published } = post;
  const readingTime = calculateReadingTime(content);
  const formattedDate = new Date(published).toLocaleDateString();

  return (
    <div className="col-xl-6 col-lg-4 col-md-6">
      <div className="article-publications-item">
        <div className="image position-relative">
          <a href={`${PORTFOLIO_URL}blogs/${_id}`} className="d-block w-100">
            <img
              src={placeholder}
              alt="blog-img-placeholder"
              className="img-fluid w-100"
            />
          </a>
          <div className="dropdown position-absolute top-0 end-0 m-2">
            <button
              className="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a className="dropdown-item" href="#edit">
                  Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#delete">
                  Delete
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#read">
                  Read
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text">
          <a href={`${PORTFOLIO_URL}blogs/${_id}`} className="title">
            {title}
          </a>
          <ul className="list-unstyled">
            <li>{readingTime} min read</li>
            <li>{formattedDate}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
