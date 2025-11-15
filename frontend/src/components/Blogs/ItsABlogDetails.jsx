import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ItsABlogCommetBox from "./ItsABlogCommetBox";
import { BLOG_API_URL } from "../../config";

const ItsBlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `${BLOG_API_URL}/posts/${id}` // Use the specific endpoint
        );

        setBlog(response.data); // Set the blog state directly
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);
  console.log(id);
  if (loading) {
    return <p>Loading...</p>; // Display loading state while fetching
  }

  if (!blog) {
    return <p>Blog post not found.</p>; // Display a message if blog is null
  }

  // Destructure the blog details with default values
  const {
    _id,
    content = "",
    title = "",
    createdAt = "",
    poster = {},
    likeCount = 0,
    commentCount = 0,
  } = blog;

  const { username = "Unknown Author" } = poster;

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card article-details-card">
          <div className="article-details-area">
            <ul className="list-unstyled article-tags">
              <li>Written at: {new Date(createdAt).toLocaleDateString()}</li>
              <li>Author: {username}</li>
              <li>Likes: {likeCount}</li>
              <li>Comments: {commentCount}</li>
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

export default ItsBlogDetails;
