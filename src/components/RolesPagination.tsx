import React from "react";

interface RolesPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  setItemsPerPage?: (itemsPerPage: number) => void;
}
const RolesPagination: React.FC<RolesPaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
  setItemsPerPage,
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

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage && setItemsPerPage(newItemsPerPage);
    paginate(1); // Reset to the first page whenever items per page changes
  };

  return (
    <div>
      <div>
        <label htmlFor="itemsPerPage">Rows per page: </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
      <p>
        {currentPage * itemsPerPage - itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default RolesPagination;
