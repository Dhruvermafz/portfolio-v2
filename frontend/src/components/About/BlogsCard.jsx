import React from "react";
import placeholder from "../../assets/img/blog/placeholder.png";
import { useGetAllBlogsQuery } from "../../api/blogApi";
const BlogsCard = () => {
  const { data: posts = [], isLoading, isError } = useGetAllBlogsQuery();

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Failed to load blogs.</p>;

  return (
    <>
      <h2 className="main-common-title">Recent Blogs</h2>
      <div className="article-publications-main">
        <div className="row article-publications-slider">
          {posts?.docs.map(({ _id, title, content, published }) => {
            const readingTime = Math.ceil(
              (content?.split(/\s+/).length || 0) / 200
            );
            const formattedDate = new Date(published).toLocaleDateString();

            return (
              <div key={_id} className="col-lg-6">
                <div className="article-publications-item">
                  <div className="image">
                    <a href={`/blogs/${_id}`} className="d-block w-100">
                      <img
                        src={placeholder}
                        alt="blog-img"
                        className="img-fluid w-100"
                      />
                    </a>
                    <a href={`/category/${_id}`} className="tags">
                      Development
                    </a>
                  </div>
                  <div className="text">
                    <a href={`/blogs/${_id}`} className="title">
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
        </div>
      </div>
    </>
  );
};

export default BlogsCard;
