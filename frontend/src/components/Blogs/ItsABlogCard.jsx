import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_API_URL } from "../../config";
const ItsABlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  console.log("Fetching from:", `${BLOG_API_URL}/posts?trial123`);

  useEffect(() => {
    fetch(`${BLOG_API_URL}/posts?trial123`)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.text();
      })
      .then((text) => {
        console.log("Raw response:", text);
        return JSON.parse(text); // This will throw an error if it's HTML
      })
      .then((data) => setBlogs(data.data))
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
              <Link to={`/blogsOfItsABlog/${blog._id}`}>
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
