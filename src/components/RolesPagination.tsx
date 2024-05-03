import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../pages/Account Manager/Roles/Styles/RolesPagination.css";

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
    <div className="bottom-section-roles-list">
      <div className="row-per-page-container">
        <label htmlFor="itemsPerPage" className="footer-rows-text-roles-list">
          Rows per page:
        </label>
        <div className="select-container">
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="footer-select-roles-list"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>
      <p className="footer-total-items-roles-list">
        {currentPage * itemsPerPage - itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>

      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="footer-button-left-roles-list"
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={currentPage === 1 ? "icon-disabled" : "icon-active"}
        />
      </button>

      <button
        onClick={handleNext}
        disabled={currentPage === pageNumbers.length}
        className="footer-button-right-roles-list"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={
            currentPage === pageNumbers.length ? "icon-disabled" : "icon-active"
          }
        />
      </button>
    </div>
  );
};

export default RolesPagination;
