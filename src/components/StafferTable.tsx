import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';
import { createAllocation, deleteAllocation } from '../api/allocationAPI';
import { useNavigate } from 'react-router-dom';
import CandidateProfileStaffer from '../components/CandidateProfileStaffer';
import { AllocationCreation, AllocationStatus, CandidateStatus, JobPosition} from '../types';
import { updateCandidateStatus } from '../api/candidateAPI';
import JobPositionModal from './JobPositionModal';



interface Allocation {
    jobPositionId: number;
    candidateId: number;
    status: string;
}

interface StafferTableProps {
    selectedSkills: string[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};


const StafferTable = ({ selectedSkills, searchQuery }: StafferTableProps) => {
    const { candidates, fetchCandidates, jobPositions, fetchJobPositions, allocations, fetchAllocations } = useApisStore();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [selectedJobPosition, setSelectedJobPosition] = useState<JobPosition | null>(null); // State to track selected job position
    const navigate = useNavigate();

    useEffect(() => {
        fetchCandidates();
        fetchJobPositions();
        fetchAllocations();
    }, [searchQuery]);

    useEffect(() => {
        if (allocations.length > 0) {
            const activeAllocations = allocations.filter(allocation => allocation.activeDB); const allocatedCandidatesFromDatabase: Allocation[] = [];
            activeAllocations.forEach(allocation => {
                allocatedCandidatesFromDatabase.push({
                    jobPositionId: allocation.jobPositionId,
                    candidateId: allocation.candidateId,
                    status: allocation.status
                });
            });
            setAllocatedCandidates(allocatedCandidatesFromDatabase);
        }
    }, [allocations]);

    const openModal = (jobPosition: JobPosition) => {
        setActiveModal(true);
        setSelectedJobPosition(jobPosition);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const jobPositionsPerPage = 5;
    const indexOfLastJobposition = currentPage * jobPositionsPerPage;
    const indexOfFirstJobPosition = indexOfLastJobposition - jobPositionsPerPage;
    const currentJobPosition = jobPositions
        ?.filter(position => position.activeDB)
        .filter(position => position.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(position => !selectedSkills.length || position.skills_position.some(skill => selectedSkills.includes(skill)))
        .slice(indexOfFirstJobPosition, indexOfLastJobposition);

    const totalPages = Math.ceil(jobPositions.length / jobPositionsPerPage);

    const [open, setOpen] = useState<boolean[]>(new Array(jobPositions.length).fill(false));

    const [allocatedCandidates, setAllocatedCandidates] = useState<Allocation[]>([]);

    const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>('');

    const allocateCandidate = async (candidateId: number, jobPositionId: number) => {
        const jobPosition = jobPositions.find(position => position.id === jobPositionId);
        const candidate = candidates.find(candidate => candidate.id === candidateId);

        if (!jobPosition) {
            console.error(`Job position with ID ${jobPositionId} not found.`);
            return;
        }

        if (!candidate) {
            console.error(`Candidate with ID ${candidateId} not found.`);
            return;
        }

        if (!allocatedCandidates.some(allocation => allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId)) {
            try {
                const allocation: AllocationCreation = {
                    status: AllocationStatus.Allocated,
                    reason_current_status: 'Recently Allocated',
                    jobPositionId,
                    jobPosition,
                    candidate,
                    candidateId,
                    client: jobPosition.owner_project.owner_client,
                    client_id: jobPosition.owner_project.owner_client.id,
                    details: `${candidate.personInformation.name} allocated in job position ${jobPosition.name}`
                };

                await createAllocation(allocation);
                await updateCandidateStatus(candidateId, CandidateStatus.StandBy)


                setAllocatedCandidates(prevAllocatedCandidates => [
                    ...prevAllocatedCandidates,
                    { jobPositionId, candidateId, status: AllocationStatus.Allocated }
                ]);

            } catch (error) {
                console.error(`Error allocating candidate ${candidateId} to job position ${jobPositionId}:`, error);
            }
        }
    };



    const removeCandidate = async (candidateId: number, jobPositionId: number) => {
        setAllocatedCandidates(prevAllocatedCandidates =>
            prevAllocatedCandidates.filter(allocation => !(allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId))
        );

        try {
            await deleteAllocation(candidateId, jobPositionId);
        } catch (error) {
            console.error(`Error deleting allocation for candidate ${candidateId} in job position ${jobPositionId}:`, error);
        }

    };


    const toggleAccordion = (index: number) => {
        setOpen(prevOpen => {
            const updatedOpen = [...prevOpen];
            updatedOpen[index] = !updatedOpen[index];
            return updatedOpen;
        });
    };


    const handleCandidateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCandidateSearchQuery(event.target.value);
    };

    const [isCandidateFilterEnabled, setIsCandidateFilterEnabled] = useState(false);

    const handleToggle = () => {
        setIsCandidateFilterEnabled(!isCandidateFilterEnabled);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <div className="relative sm:rounded-lg p-4 ">
                <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">Client</th>
                            <th scope="col" className="px-6 py-3 text-center">Project’s name</th>
                            <th scope="col" className="px-6 py-3 text-center">Job position </th>
                            <th scope="col" className="px-6 py-3 text-center">Skills</th>
                            <th scope="col" className="px-6 py-3 text-center">Vacancies</th>
                            <th scope="col" className="px-6 py-3 text-center">Candidates</th>
                            <th scope="col" className="px-6 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobPosition.map((position, index) => (
                            <React.Fragment key={position.id}>
                                <tr className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">{position.owner_project.owner_client.name}</td>
                                    <td className="px-6 py-4 text-center">{position.owner_project.name}</td>
                                    <td className="px-6 py-4 text-center"  onClick={() => openModal(position)}>{position.name}</td>

                                    {activeModal && selectedJobPosition && (
                                        <JobPositionModal
                                            isActive={true}
                                            jobPosition={selectedJobPosition}
                                            setActive={setActiveModal}
                                        />
                                    )}

                                    <td className="px-6 py-4 flex justify-center">
                                        <div className="p-2 row-4">
                                            {position.skills_position.map((skill, skillIndex) => (
                                                <span key={skillIndex} className="badge rounded-pill text-bg-primary mr-2">{skill}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="p-2 row-4">
                                            {allocatedCandidates
                                                .filter(allocation => allocation.jobPositionId === position.id)
                                                .map((allocation, index) => (
                                                    <FontAwesomeIcon key={index} icon={faCircleUser} className="mr-2 fa-2x" />
                                                ))}
                                        </div>
                                    </td>


                                    <td className="px-6 py-4 flex justify-center">
                                        <div className="container">
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <div className="dropdown flex justify-center">
                                                        <button className="btn dropdown-toggle bg-white" type="button" data-bs-toggle="dropdown" aria-expanded="true" id="form1">
                                                            Select candidates
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="form1" style={{ maxHeight: `${5 * 40}px`, overflowY: 'auto' }}>
                                                            <li>
                                                                <div className="container text-center">
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="input-group p-2 pb-3">
                                                                                <div className="form-outline bg-gray-100 rounded-md" data-mdb-input-init>
                                                                                    <input type="search" id="form1" className="form-control" placeholder="Search" style={{ border: 'none', backgroundColor: '#CCCCCC' }} onChange={handleCandidateSearch} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <button
                                                                                className={`btn`}
                                                                                style={{ backgroundColor: isCandidateFilterEnabled ? '#E5E5E5' : '#FFFFFF', color: isCandidateFilterEnabled ? '#4B5563' : '#4B5563' }}
                                                                                type="button"
                                                                                onClick={handleToggle}
                                                                            >
                                                                                <FontAwesomeIcon icon={faFilter} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            {candidates
                                                                .filter(candidate => candidate.activeDB)
                                                                .filter(candidate => !allocatedCandidates.some(allocation => allocation.candidateId === candidate.id && allocation.jobPositionId === position.id))
                                                                .filter(candidate => candidate.personInformation.name.toLowerCase().includes(candidateSearchQuery.toLowerCase()))
                                                                .filter(candidate => !isCandidateFilterEnabled || selectedSkills.length === 0 || selectedSkills.every(skill => candidate.personInformation.skills.includes(skill)))
                                                                .map(candidate => (
                                                                    <li key={candidate.id}>
                                                                        <a className="dropdown-item" href="#" onClick={() => allocateCandidate(candidate.id, position.id)}>
                                                                            <div className="container  p-2">
                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        {candidate.personInformation.name}
                                                                                    </div>
                                                                                    <div className="col">
                                                                                        {candidate.personInformation.skills.map((skill, skillIndex) => (
                                                                                            <span key={skillIndex} className="badge rounded-pill text-bg-primary mr-2">{skill}</span>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="pl-12 py-4">
                                        <button
                                            type="button"
                                            className="font-medium hover:underline"
                                            onClick={() => toggleAccordion(index)}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </button>
                                    </td>
                                </tr>
                                {
                                    open[index] && (
                                        <tr className="border-b dark:border-gray-700">
                                            <td colSpan={12}>
                                                <div id={`accordion-arrow-icon-${index}`} className={!open[index] ? "hidden" : ""}>
                                                    <div className="grid grid-cols-6">
                                                        {allocatedCandidates
                                                            .filter(allocation => allocation.jobPositionId === position.id)
                                                            .map(allocation => {
                                                                const candidate = candidates.find(candidate => candidate.id === allocation.candidateId);
                                                                if (candidate && candidate.activeDB) {
                                                                    return (
                                                                        <CandidateProfileStaffer
                                                                            key={allocation.candidateId}
                                                                            name={candidate.personInformation.name}
                                                                            allocationStatus={allocation.status}
                                                                            status={candidate.status}
                                                                            onRemove={() => removeCandidate(allocation.candidateId, allocation.jobPositionId)}
                                                                        />
                                                                    );
                                                                } else {
                                                                    return null;
                                                                }
                                                            })}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </React.Fragment>
                        ))}
                    </tbody >
                </table >
                <div className="pagination flex justify-end mt-4 items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={indexOfLastJobposition >= jobPositions.length}
                        className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div >

        </>
    );
};

export default StafferTable;