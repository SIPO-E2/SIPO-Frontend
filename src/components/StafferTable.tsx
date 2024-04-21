import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';

import CandidateProfileStaffer from '../components/CandidateProfileStaffer';



interface Allocation {
    jobPositionId: number;
    candidateId: number;
}

interface AccordionProps { };


const StafferTable = (props: AccordionProps) => {
    const { candidates, fetchCandidates, setCandidates, jobPositions, fetchJobPositions, allocations, fetchAllocations } = useApisStore();

    useEffect(() => {
        fetchCandidates();
        fetchJobPositions();
        fetchAllocations();


    }, []);

    console.log(candidates);
    console.log(jobPositions);
    console.log(allocations);

    const [open, setOpen] = useState<boolean[]>(new Array(jobPositions.length).fill(false));

    const [allocatedCandidates, setAllocatedCandidates] = useState<Allocation[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>('');


    const allocateCandidate = (candidateId: number, jobPositionId: number) => {

        if (!allocatedCandidates.some(allocation => allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId)) {

            setAllocatedCandidates(prevAllocatedCandidates =>
                [...prevAllocatedCandidates, { jobPositionId, candidateId }]
            );
            console.log(`Allocated candidate ${candidateId} to job position ${jobPositionId}`);
        } else {
            console.log(`Candidate ${candidateId} is already allocated to job position ${jobPositionId}`);
        }
    };



    const removeCandidate = (candidateId: number, jobPositionId: number) => {
        setAllocatedCandidates(prevAllocatedCandidates =>
            prevAllocatedCandidates.filter(allocation => !(allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId))
        );
    };

    const toggleAccordion = (index: number) => {
        setOpen(open.map((state, i) => i === index ? !state : state));
        console.log("Open state after toggle:", open);
    };


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

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
                        {jobPositions.map((position, index) => (
                            <React.Fragment key={position.id}>
                                <tr className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">{position.owner_project.owner_client}</td>
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
                                        <div className="p-2 row-4 ">
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-2 fa-2x" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-2 fa-2x" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-2 fa-2x" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-2 fa-2x" />
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
                                                                                    <input type="search" id="form1" className="form-control" placeholder="Search" style={{ border: 'none', backgroundColor: '#CCCCCC' }} onChange={handleSearch} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <button type="button" className="btn">
                                                                                <FontAwesomeIcon icon={faFilter} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            {candidates
                                                                .filter(candidate => !allocatedCandidates.some(allocation => allocation.candidateId === candidate.id && allocation.jobPositionId === position.id))
                                                                .filter(candidate => candidate.personInformation.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
                                {open[index] && (
                                    <tr className="border-b dark:border-gray-700">
                                        <td colSpan={12}>
                                            <div id={`accordion-arrow-icon-${index}`} className={!open[index] ? "hidden" : ""}>
                                                <div className="grid grid-cols-6">
                                                    {allocatedCandidates
                                                        .filter(allocation => allocation.jobPositionId === position.id)
                                                        .map(allocation => (
                                                            <CandidateProfileStaffer
                                                                key={allocation.candidateId}
                                                                name={candidates.find(candidate => candidate.id === allocation.candidateId)!.personInformation.name}
                                                                status={candidates.find(candidate => candidate.id === allocation.candidateId)!.status}
                                                                onRemove={() => removeCandidate(allocation.candidateId, allocation.jobPositionId)}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </React.Fragment>
                        ))}
                    </tbody >
                </table >
            </div >

        </>
    );
};

export default StafferTable;