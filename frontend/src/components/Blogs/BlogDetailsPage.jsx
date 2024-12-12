import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ItsABlogCommetBox from "./ItsABlogCommetBox";
import { API_URL } from "../../config";

const BlogDetailsPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/post/${id}`);
        const post = response.data; // Adjust based on API response
        setBlog(post);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  // Destructure the blog details
  const {
    title = "Untitled",
    content = "No content available.",
    published,
    updated,
    userId = {},
  } = blog;

  // Extract user information
  const authorName = userId.username || "Unknown Author";

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card article-details-card">
          <div className="article-details-area">
            <ul className="list-unstyled article-tags">
              <li>Published: {new Date(published).toLocaleDateString()}</li>
              <li>Updated: {new Date(updated).toLocaleDateString()}</li>
              <li>Author: {authorName}</li>
            </ul>
            <div className="article-details-text">
              <h3 className="main-title">{title}</h3>
              <p>{content}</p>
            </div>
            <ItsABlogCommetBox id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
