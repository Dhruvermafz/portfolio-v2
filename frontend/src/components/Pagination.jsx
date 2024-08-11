import React, { useState } from "react";

const Pagination = ({ totalPages, initialPage = 1, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <ul className="list-unstyled">
        <li className="prev">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              ></path>
            </svg>
          </button>
        </li>
        {renderPageNumbers()}
        <li className="next">
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
