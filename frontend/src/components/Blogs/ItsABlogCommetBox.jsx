import React from "react";
import { ITSABLOG_URL } from "../../config";

const ItsABlogCommetBox = ({ id }) => {
  return (
    <div className="leave-comments-area">
      <h2 className="main-common-title">To Leave a Comment, Visit ItsABlog</h2>
      <div className="comments-box">
        <div className="row gx-3">
          <a href={`${ITSABLOG_URL}/blog/${id}`} target="_blank">
            <div className="col-md-12">
              <button className="submit-btn">
                Visit ItsABlog
                <svg
                  className="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 11.6665V6.6665H12.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M17.5 6.6665L10 14.1665L2.5 6.6665"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItsABlogCommetBox;
