import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';


const TableResource = () => {
    const{candidates, fetchCandidates} = useApisStore();

    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(() =>{
        fetchCandidates();
    },[])

    const candidatesPerPage = 2;
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full h-auto text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Tech Stack</th>
                        <th scope="col" className="px-6 py-3">Division</th>
                        <th scope="col" className="px-6 py-3">Date of Joining</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentCandidates.map((candidate) => (
                        <tr className="border-b dark:border-gray-700" key={candidate.id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {candidate.id}
                            </th>
                            <td className="px-6 py-4">
                                {candidate.personInformation.name}
                            </td>
                            <td className="px-6 py-4">
                                {candidate.personInformation.tech_stack}
                            </td>
                            <td className="px-6 py-4">
                                {candidate.personInformation.division}  
                            </td>
                            <td className="px-6 py-4">
                                14/04/24
                                {/* {candidate.createdAt.toString()} */}
                            </td>
                            <td className='px-6 py-4 flex flex-row'>
                                <div className='pl-6 py-4 mr-6'>
                                    <button type="button" className="font-medium hover:underline">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </div>
                                <div className='pl-3 py-4 mr-6'>
                                    <button type="button" className="font-medium hover:underline">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                </div>
                                <div className='pl-3 py-4'>
                                    <button type="button" className="font-medium hover:underline">
                                        <FontAwesomeIcon icon={faTrash} /> 
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end  m-6">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 font-medium hover:underline"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastCandidate >= candidates.length}
                    className="font-medium hover:underline"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}

export default TableResource;
