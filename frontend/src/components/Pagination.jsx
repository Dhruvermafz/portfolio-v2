import ReactPaginate from "react-paginate";
import React, { useEffect } from "react";

const Pagination = ({ totalPages, initialPage = 1, onPageChange }) => {
  useEffect(() => {
    // Optionally reset or sync page from parent if needed
  }, [initialPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // react-paginate is 0-indexed
    onPageChange(selectedPage);
  };

  return (
    <div className="pagination mt-4 flex justify-center">
      <ReactPaginate
        previousLabel="← Prev"
        nextLabel="Next →"
        breakLabel="..."
        breakClassName="px-3 py-1"
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex list-none"
        pageClassName="mx-1"
        pageLinkClassName="px-3 py-1 rounded bg-gray-200"
        previousClassName="mx-1"
        nextClassName="mx-1"
        previousLinkClassName="px-3 py-1 rounded bg-gray-200"
        nextLinkClassName="px-3 py-1 rounded bg-gray-200"
        activeLinkClassName="bg-black text-white"
        forcePage={initialPage - 1}
      />
    </div>
  );
};

export default Pagination;
