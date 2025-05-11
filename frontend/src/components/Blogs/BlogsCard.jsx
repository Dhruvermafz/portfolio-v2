import React from "react";
import placeholder from "../../assets/img/blog/placeholder.png";
import { useGetAllBlogsQuery } from "../../api/blogApi";
const BlogsCard = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery();

  if (isLoading) return <p>Loading articles...</p>;
  if (isError || !data?.docs) return <p>Failed to load articles.</p>;

  const posts = data?.docs;

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <>
      {posts.map(({ _id, title, content, published }) => {
        const readingTime = calculateReadingTime(content);
        const formattedDate = new Date(published).toLocaleDateString();

        return (
          <div key={_id} className="col-xl-6 col-lg-4 col-md-6">
            <div className="article-publications-item">
              <div className="image position-relative">
                <a href={`/blogs/${_id}`} className="d-block w-100">
                  <img
                    src={placeholder}
                    alt="blog-img-placeholder"
                    className="img-fluid w-100"
                  />
                </a>
              </div>
              <div className="text">
                <a href={`/blogs/${_id}`} className="title">
                  {title}
                </a>
                <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
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
