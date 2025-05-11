import React from "react";
import { useParams } from "react-router-dom";
import ItsABlogCommetBox from "./ItsABlogCommetBox";
import "./blogdetail.css";
import { useGetSingleBlogQuery } from "../../api/blogApi";
const BlogDetailsPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useGetSingleBlogQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Blog post not found.</p>;

  const {
    title = "Untitled",
    content = "No content available.",
    published,
    updated,
    userId = {},
  } = blog;

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
