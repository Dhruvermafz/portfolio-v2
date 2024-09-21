import React from "react";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import AppBar from "../AppBar/Appbar";
const BlogPage = () => {
  // Handler for the search input
  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    // Implement search logic here
    console.log(searchQuery);
  };

  // Handler for "Add Blog" button click

  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-12">
            <div className="card content-box-card">
              <div className="card-body portfolio-card">
                <div className="top-info d-flex justify-content-between align-items-center">
                  <div className="text">
                    <h1 className="main-title">Blogs Manage</h1>
                    <p></p>
                  </div>
                  <div className="search-and-add d-flex">
                    <a href="#" className="d-block w-100">
                      <div className="awards-item">
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Search blogs..."
                          onChange={handleSearchChange}
                        />
                      </div>
                    </a>
                    <div className="project-btn">
                      <Link to="/admin/blogs/create">
                        <button
                          className="btn b-outline btn-secondary-outline"
                          style={{
                            backgroundColor: "rgba(118, 212, 102, 0.2)", // Corrected inline style
                            color:
                              "rgba(118, 212, 102, var(--tw-text-opacity))", // Moved to inline style
                          }}
                        >
                          <span>
                            Add Blog
                            <svg
                              className="arrow-up"
                              width="14"
                              height="15"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.91634 4.5835L4.08301 10.4168"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.66699 4.5835H9.91699V9.8335"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="article-publications article-area">
                  <div className="article-publications-main">
                    <div className="row"></div>
                  </div>
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
