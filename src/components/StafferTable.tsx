import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';
import { AllocationStatus, createAllocation, deleteAllocation } from '../api/allocationAPI';

import CandidateProfileStaffer from '../components/CandidateProfileStaffer';



interface Allocation {
    jobPositionId: number;
    candidateId: number;
}

interface StafferTableProps {
    selectedSkills: string[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};


const StafferTable = ({ selectedSkills, searchQuery }: StafferTableProps) => {
    const { candidates, fetchCandidates, jobPositions, fetchJobPositions, allocations, fetchAllocations } = useApisStore();

    useEffect(() => {
        fetchCandidates();
        fetchJobPositions();
        fetchAllocations();
    }, []);
    
    useEffect(() => {
        if (allocations.length > 0) {
            const activeAllocations = allocations.filter(allocation => allocation.activeDB);            const allocatedCandidatesFromDatabase: Allocation[] = [];
            activeAllocations.forEach(allocation => {
                allocatedCandidatesFromDatabase.push({
                    jobPositionId: allocation.jobPositionId,
                    candidateId: allocation.candidateId
                });
            });
            setAllocatedCandidates(allocatedCandidatesFromDatabase);
        }
    }, [allocations]);
    
    const logActiveEntities = () => {
        console.log("Active Candidates:", candidates.filter(candidate => candidate.activeDB));
        console.log("Active Job Positions:", jobPositions.filter(position => position.activeDB));
        console.log("Active Allocations:", allocations.filter(allocation => allocation.activeDB));
    };

    if (candidates.length > 0 && jobPositions.length > 0 && allocations.length > 0) {
        logActiveEntities();
    }

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
                const allocation: AllocationCreationAttributes = {
                    status: AllocationStatus.Allocated,
                    reason_current_status: 'Recently Allocated',
                    jobPositionId,
                    jobPosition,
                    candidate,
                    candidateId,
                    client: jobPosition.owner_project.owner_client,
                    client_id: jobPosition.owner_project.owner_client.id,

                };



                console.log(allocation);
                console.log(await createAllocation(allocation));

                setAllocatedCandidates(prevAllocatedCandidates => [
                    ...prevAllocatedCandidates,
                    { jobPositionId, candidateId }
                ]);
                console.log(`Allocated candidate ${candidateId} to job position ${jobPositionId}`);

            } catch (error) {
                console.error(`Error allocating candidate ${candidateId} to job position ${jobPositionId}:`, error);
            }
        } else {
            console.log(`Candidate ${candidateId} is already allocated to job position ${jobPositionId}`);
        }
    };



    const removeCandidate = async (candidateId: number, jobPositionId: number) => {
        setAllocatedCandidates(prevAllocatedCandidates =>
            prevAllocatedCandidates.filter(allocation => !(allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId))
        );

        try {
            await deleteAllocation(candidateId, jobPositionId);
            console.log(`Allocation for candidate ${candidateId} in job position ${jobPositionId} deleted successfully.`);
            console.log("Active Allocations:", allocations.filter(allocation => allocation.activeDB));
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

    console.log("Allocated candidates:", allocatedCandidates)

    return (
        <>
            <div className="relative sm:rounded-lg p-4 z-3">
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
                        {jobPositions
                            .filter(position => selectedSkills.length === 0 || selectedSkills.every(skill => position.skills_position.includes(skill)))
                            .filter(position => position.name.toLowerCase().includes(searchQuery.toLowerCase()) || position.owner_project.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((position, index) => (
                                <React.Fragment key={position.id}>
                                    <tr className="border-b dark:border-gray-700">
                                        <td className="px-6 py-4 text-center">{position.owner_project.owner_client.name}</td>
                                        <td className="px-6 py-4 text-center">{position.owner_project.name}</td>
                                        <td className="px-6 py-4 text-center">{position.name}</td>

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
                                                                                status={candidate.status}
                                                                                onRemove={() => removeCandidate(allocation.candidateId, allocation.jobPositionId)}
                                                                            />
                                                                        );
                                                                    } else {
                                                                        return null; // Skip inactive candidates
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
            </div >

        </>
    );
};

export default StafferTable;