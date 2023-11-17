import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`pagination-item ${currentPage === index + 1 ? "page-active" : ""}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
