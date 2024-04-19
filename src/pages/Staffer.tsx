import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


interface Candidate {
    id: string;
    name: string;
    experience: number;
    skills: string[];
}

const candidates: Candidate[] = [
    {
        id: "1",
        name: "John Doe",
        experience: 3,
        skills: ["Java", "Type"]
    },
    {
        id: "2",
        name: "Jane Smith",
        experience: 5,
        skills: ["Java", "Type"]
    },
];

interface JobPosition {
    id: string;
    name: string;
    client: string;
    status: string;
    division: string;
    billRate: string;
    postingType: string;
    demandCuration: string;
}

const jobPositions: JobPosition[] = [
    { id: '1079284V', name: 'SOW GOOGLE 01.24', client: 'Sasha Valdez', status: '70%', division: 'Brazil', billRate: '$78,000.00', postingType: 'New Headaccount', demandCuration: 'Strategic' },
    { id: '1079285V', name: 'SOW AMAZON 02.30', client: 'Michael Ruiz', status: '85%', division: 'USA', billRate: '$85,000.00', postingType: 'Recurring', demandCuration: 'Tactical' },
    { id: '1079286V', name: 'SOW FACEBOOK 03.15', client: 'Clara Oswald', status: '60%', division: 'UK', billRate: '$92,000.00', postingType: 'Ad-hoc', demandCuration: 'Operational' },
];

interface Allocation {
    jobPositionId: string;
    candidateId: string;
}

const Allocation: Allocation[] = [
    { jobPositionId: '1079284V', candidateId: '2' },
]

interface AccordionProps { };


const Staffer = (props: AccordionProps) => {

    const [open, setOpen] = useState<boolean[]>(new Array(jobPositions.length).fill(false));

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
                                                    <div className="dropdown">
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
                                                                                <div className="input-group-append">
                                                                                    <button type="button" className="btn btn-secondary">
                                                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                                                    </button>
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

                                                            {candidates.map(candidate => (
                                                                <li key={candidate.id}>
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <a className="dropdown-item" href="#">{candidate.name}</a>
                                                                            </div>
                                                                            <div className="col">
                                                                                {candidate.skills.map((skill, skillIndex) => (
                                                                                    <span key={skillIndex} className="badge rounded-pill text-bg-primary mr-2">{skill}</span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                                                <h1>Accordions info {`${position.name}`} </h1>
                                                <div className="pl-6 pr-6 border border-t-0 border-gray-200 dark:border-gray-700">
                                                    {/* Puedes expandir esto con más detalles como se proporcionó en el HTML de acordeón */}
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

export default Staffer;