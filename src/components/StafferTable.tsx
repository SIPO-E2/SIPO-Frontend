import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useApisStore } from '../store';

import UserProfile from '../components/CandidateProfileStaffer';


interface Allocation {
    jobPositionId: string;
    candidateId: string;
}

const Allocation: Allocation[] = [
    { jobPositionId: '1079284V', candidateId: '1' },
]

interface AccordionProps { };


const StafferTable = (props: AccordionProps) => {
    const {candidates,fetchCandidates, jobPositions, fetchJobPositions} = useApisStore();

    useEffect(() => {
        fetchCandidates();
        fetchJobPositions();


    },[]);

    console.log(candidates);
    console.log(jobPositions);


    
    

    const [open, setOpen] = useState<boolean[]>(new Array(jobPositions.length).fill(false));

    const allocateCandidate = (candidateId: string, jobPositionId: string) => {
        // Check if the candidate is already allocated to the job position
        if (!Allocation.some(allocation => allocation.candidateId === candidateId && allocation.jobPositionId === jobPositionId)) {
            // If not allocated, allocate the candidate
            Allocation.push({ jobPositionId, candidateId });
            // Update state or perform any other necessary actions
            console.log(`Allocated candidate ${candidateId} to job position ${jobPositionId}`);
        } else {
            console.log(`Candidate ${candidateId} is already allocated to job position ${jobPositionId}`);
        }
    };

    const toggleAccordion = (index: number) => {
        setOpen(open.map((state, i) => i === index ? !state : state));
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
                                    <td className="px-6 py-4 text-center">Client</td>
                                    <td className="px-6 py-4 text-center">Project's name</td>
                                    <td className="px-6 py-4 text-center">Job position</td>

                                    <td className="px-6 py-4 flex justify-center">
                                        <div className="p-2 row-4">
                                            <span className="badge rounded-pill text-bg-dark mr-2">Dark</span>
                                            <span className="badge rounded-pill text-bg-dark mr-2">Dark</span>
                                            <span className="badge rounded-pill text-bg-dark mr-2">Dark</span>
                                            <span className="badge rounded-pill text-bg-dark mr-2">Dark</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="p-2 row-4 ">
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-3 fa-lg" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-3 fa-lg" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-3 fa-lg" />
                                            <FontAwesomeIcon icon={faCircleUser} className="mr-3 fa-lg" />
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
                                                                            <div className="input-group">
                                                                                <div className="form-outline bg-gray-100 rounded-md" data-mdb-input-init>
                                                                                    <input type="search" id="form1" className="form-control" placeholder="Search" style={{ border: 'none', backgroundColor: '#CCCCCC' }} />
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
                                                                .filter(candidate => !Allocation.some(allocation => allocation.candidateId === candidate.id && allocation.jobPositionId === position.id))
                                                                .map(candidate => (
                                                                    <li key={candidate.id}>
                                                                        <a className="dropdown-item" href="#" onClick={() => allocateCandidate(candidate.id, position.id)}>
                                                                            <div className="container">
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
                                                    {candidates
                                                        .filter(candidate => Allocation.some(allocation => allocation.candidateId === candidate.id && allocation.jobPositionId === position.id))
                                                        .map(candidate => (
                                                            <UserProfile key={candidate.id} name={candidate.name} role={candidate.role} status={candidate.status} />
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