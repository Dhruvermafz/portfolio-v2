import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholder from "../../assets/img/blog/placeholder.png";
import { API_URL, PORTFOLIO_URL } from "../../config";

const BlogsCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post`);
        setPosts(response.data.docs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading articles...</p>; // Replace with Skeleton Loader
  }

  return (
    <>
      {posts.map((post) => {
        const { _id, title, content, published } = post;
        const calculateReadingTime = (content) => {
          const wordsPerMinute = 200;
          const words = content?.split(/\s+/).length || 0;
          return Math.ceil(words / wordsPerMinute);
        };
        const readingTime = calculateReadingTime(content);
        const formattedDate = new Date(published).toLocaleDateString();

        return (
          <div key={_id} className="col-xl-6 col-lg-4 col-md-6">
            <div className="article-publications-item">
              <div className="image position-relative">
                <a href={`blogs/${_id}`} className="d-block w-100">
                  <img
                    src={placeholder}
                    alt="blog-img-placeholder"
                    className="img-fluid w-100"
                  />
                </a>
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
      })}
    </>
  );
};

export default BlogsCard;
