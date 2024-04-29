import React from "react";

interface RolesPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const RolesPagination: React.FC<RolesPaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div>
      <p>Rows per page: {itemsPerPage}</p>
      <p>
        {currentPage * itemsPerPage - itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>
      <button onClick={handlePrevious}>Previous</button>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default RolesPagination;
