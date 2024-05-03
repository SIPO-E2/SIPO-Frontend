import React, { useState } from 'react';
import TableJobPositions from "../../../components/TableJobPositions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Define types for the FilterSection props
interface FilterSectionProps {
  title: string;
  options: string[];
}

// Define types for the selectedOptions state
interface SelectedOptions {
  [key: string]: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="mt-3 min-w-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
      >
        <span>{title}</span>
        <FontAwesomeIcon icon={faChevronUp} className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      {isOpen && (
        <div className="mt-2 flex flex-wrap">
          {options.map(option => (
            <button
              key={option}
              className={`mt-2 mr-2 px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${selectedOptions[option] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const JobPositions: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    division: [] as string[],
    skills: [] as string[],
    demandCuration: [] as string[],
    exclusivity: [] as string[],
  });

  const handleSelectionChange = (filterName: keyof typeof filters, selected: string[]) => {
    setFilters(prev => ({ ...prev, [filterName]: selected }));
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
              <input type="search" id="default-search" className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" placeholder="Search" />
            </div>
            {/* Other buttons or elements */}
            <button onClick={() => setShowFilters(!showFilters)} type="button" className="p-2">
              <FontAwesomeIcon icon={faFilter} size="lg" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="absolute right-10 top-16 mt-4 p-4 bg-white shadow-md rounded-lg z-10">
            <FilterSection title="Division" options={['USA', 'Brazil', 'Colombia', 'Mexico']} />
            <FilterSection title="Skills" options={['Java', 'SQL', 'HTML', 'CSS']} />
            <FilterSection title="Demand Curation" options={['Strategic', 'Committed', 'Open']} />
            <FilterSection title="Exclusivity" options={['Committed', 'Non-Committed']} />
          </div>
        )}

        {/* Horizontal rule might be placed here if it is part of the main layout */}
        <hr className="border-2 border-black-900" />
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg p-4 text-center ">
        {/* The TableJobPositions component will stay in place below */}
        <TableJobPositions filters={filters} />
      </div>
    </>
  );
};

export default JobPositions;
