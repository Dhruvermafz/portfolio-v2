import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BLOG_API_URL } from "../../config";

const ItsABlogCard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${BLOG_API_URL}/posts?trial123`)
      .then((response) => {
        setBlogs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
              <Link to={`/blogsOfItsABlog/${blog._id}`} className="title">
                {blog.title}
              </Link>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItsABlogCard;
