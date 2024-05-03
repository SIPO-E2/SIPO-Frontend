import React, { useState } from 'react';
import TableJobPositions from "../../../components/TableJobPositions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const JobPositions: React.FC = () => {
  
  // Estado para almacenar el valor del campo de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);

  // Manejador para actualizar el valor de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="w-full px-5 pt-4 mb-3 relative">
        <div className="flex justify-between items-center">
          <h1 className="p-2 me-auto">Job Positions</h1>
          <div className="flex items-center space-x-4">
            <Link to="newJobPosition">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Job Position
              </button>
            </Link>
            <div className="flex items-center border rounded-lg overflow-hidden w-64">
              <span className="pl-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"></path></svg>
              </span>
              <input type="search" id="default-search" className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" placeholder="Search" value={searchTerm} onChange={handleSearchChange}/>
            </div>
            {/* Other buttons or elements */}
            <button  type="button" className="p-2">
              <FontAwesomeIcon icon={faFilter} size="lg" />
            </button>
          </div>
        </div>

        

        {/* Horizontal rule might be placed here if it is part of the main layout */}
        <hr className="border-2 border-black-900" />
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg p-4 text-center ">
        {/* The TableJobPositions component will stay in place below */}
        <TableJobPositions searchTerm={searchTerm}/>
      </div>
    </>
  );
};

export default JobPositions;
