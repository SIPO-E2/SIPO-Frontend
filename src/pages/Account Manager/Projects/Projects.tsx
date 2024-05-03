import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import TableProjects from '../../../components/TableProjects';

interface Props {}

const Projects = (props: Props) => {
  // Estado para almacenar el valor del campo de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Manejador para actualizar el valor de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="w-full">
        <div className="px-5 pt-4 d-flex mb-3">
          <div className="p-2 me-auto">
            <h1>Project</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-2 flex items-center justify-center">
              <Link to="newProjects">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Project</button>
              </Link>
            </div>
            <div className="flex items-center border rounded-lg overflow-hidden w-64">
              <span className="pl-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"></path></svg>
              </span>
              <input type="search" id="default-search" className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
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
      <div className="relative overflow-x-auto sm:rounded-lg p-4 text-center">
        <TableProjects searchTerm={searchTerm}/>
      </div>
    </>
  );
};

export default Projects;
