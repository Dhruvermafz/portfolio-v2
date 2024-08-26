import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ItsABlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://social-api-w6xb.onrender.com/api/posts?trial123")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the entire response

        // Access the array of blog posts from the 'data' field
        if (data && Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!blogs.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="row">
      {blogs.map((blog) => (
        <div key={blog._id} className="col-xl-6 col-lg-4 col-md-6">
          <div className="article-publications-item">
            <div className="text">
              <Link to={`/blogs/${blog._id}`}>
                <a className="title">{blog.title}</a>
              </Link>

              <ul className="list-unstyled">
                <li>{new Date(blog.createdAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItsABlogCard;
