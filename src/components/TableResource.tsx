import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';
import DeletePipelineModal from '../pages/ResourceManager/Pipeline/DeletePipelineModal';
import { Link } from 'react-router-dom';
import { Candidate } from '../types/globals';
import ViewResourceModal from '../pages/ResourceManager/ViewResourceManager';

interface Props {
    searchValue: string;
}

const TableResource = (props:Props) => {

    //Fetch Candidates
    const{candidates, fetchCandidates} = useApisStore();
    useEffect(() =>{
        fetchCandidates();
    },[]);

    // COMPONENT STATE FOR DELETE MODAL
    const [deleteActive, setDeleteActive] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(-1);

    // Paginación de candidatos
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 8;
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const openModal = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setIsModalOpen(true);
    };

    // Filtrar candidatos basados en el valor de búsqueda
    const filteredCandidates = candidates.filter(candidate =>{
        // Convertir la búsqueda candidato a minúsculas para hacer la búsqueda insensible a mayúsculas y minúsculas
        const searchValueLower = props.searchValue.toLowerCase();
        
        // Verificar si el nombre del candidato incluye el valor de búsqueda O si el ID del candidato es igual al valor de búsqueda
        return (
            (candidate.personInformation?.name ?? '').toLowerCase().includes(searchValueLower) ||
            (candidate.id.toString()).toLowerCase().includes(searchValueLower) ||
            (candidate.personInformation?.division ?? '').toLowerCase().includes(searchValueLower) ||
            (candidate.personInformation?.tech_stack ?? '').toLowerCase().includes(searchValueLower)
        );
    });

    const displayCandidates = props.searchValue ? filteredCandidates : currentCandidates;


    return(
        <>
            <div className="relative overflow-x-auto sm:rounded-lg p-4">
                <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Tech Stack</th>
                            <th scope="col" className="px-6 py-3 text-center">Division</th>
                            <th scope="col" className="px-6 py-3 text-center">Date of Joining</th>
                            <th scope="col" className="px-6 py-3"> </th>
                            <th scope="col" className="px-6 py-3"> </th>
                            <th scope="col" className="px-6 py-3"> </th>
                            <th scope="col" className="px-6 py-3"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayCandidates.map((candidate) => (
                            <tr className="border-b dark:border-gray-700" key={candidate.id}>
                                <td className="px-6 py-4 text-center">
                                    {candidate.personInformation.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {candidate.personInformation.tech_stack}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {candidate.personInformation.division}  
                                </td>
                                <td className="px-6 py-4 text-center">
                                    14/04/24
                                    {/* {candidate.createdAt.toString()} */}
                                </td>

                                {/* <td className='px-6 py-4 text-center'>
                                    <Link to={"/resourceManager/bench/addNewBench"}>
                                        <button className='btn btn-primary'>
                                            Bench
                                        </button>
                                    </Link>
                                </td>

                                <td className='px-6 py-4 text-center'>
                                    <Link to={"/resourceManager/billing/addNewBilling"}>
                                        <button className='btn btn-primary'>
                                            Billing
                                        </button>
                                    </Link>
                                </td> */}

                                <td className="pl-6 py-4">
                                    <button type="button" className="font-medium hover:underline"
                                        onClick={() => openModal(candidate)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>

                                <Link to = "/resourceManager/pipeline/editPipeline">
                                    <td className="pl-3  py-4">
                                        <button type="button" className="font-medium hover:underline"
                                            >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                    </td>
                                </Link>

                                <td className=" pr-6 py-4">
                                    <button type="button" className="font-medium hover:underline" onClick={() => {
                                        setDeleteActive(true);
                                        setSelectedId(candidate.id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> 
                                    </button>
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
                <ViewResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} candidate={selectedCandidate} />
                {/* <DeletePipelineModal isActive={deleteActive} setDeleteActive={setDeleteActive} selectedId={selectedId} /> */}
            </div>
        </>
    )
}

export default TableResource;