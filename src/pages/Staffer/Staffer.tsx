import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import StafferTable from "../../components/StafferTable";

const Staffer = () => {
  
  return (

    <>
      <div className="w-full">

        <div className="px-5 pt-4 d-flex mb-3">

          <div className="p-2 me-auto">
            <h1> Project Vacancies</h1>
          </div>

          <div className="flex items-center space-x-4">

            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-14 0 6.65 6.65 0 0113.3 0z"></path></svg>
              </span>
              <input
                type="search"
                id="default-search"
                className="pl-8 pr-2 py-2 w-full text-sm bg-gray-200 focus:outline-none rounded-lg"
                placeholder="Search"
              />
            </div>

          </div>


          <div className="p-2 flex items-center justify-center">
            <button type="button" className="pl-5">
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <hr className="border-2 ml-6 mr-6 border-black-900" />
      </div>
      <StafferTable />
    </>
  );
};

export default Staffer;