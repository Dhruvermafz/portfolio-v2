import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  totalQueries,
  queriesPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalQueries / queriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.First
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
