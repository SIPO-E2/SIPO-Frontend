import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


interface Candidate {
    name: string;
    experience: number;
    qualifications: string[];
}

const candidates: Candidate[] = [
    {
        name: "John Doe",
        experience: 3,
        qualifications: ["Bachelor's Degree", "Certification in XYZ"]
    },
    {
        name: "Jane Smith",
        experience: 5,
        qualifications: ["Master's Degree", "Certification in ABC"]
    },
    // Add more candidates as needed
];


interface Props {
    clientName: string,
    projectName: string,
    jobPosition: string,
    skills: string,
    vacancies: number,
    candidates: Candidate[]
};

const props: Props[] = [
    {
        clientName: "ABC Company",
        projectName: "Project XYZ",
        jobPosition: "Software Engineer",
        skills: "JavaScript, React, Node.js",
        vacancies: 2,
        candidates: candidates
    }
];

const Staffer = (props: Props) => {

    const [open, setOpen] = useState<boolean[]>(new Array(candidates.length).fill(false));

    const toggleAccordion = (index: number) => {
        setOpen(open.map((state, i) => i === index ? !state : state));
    };

    return (
        <>
            <div className="relative sm:rounded-lg p-4 z-3">
                <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
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

                            <td className="px-6 py-4 d-flex justify-content-end">
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">

                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">uma</a></li>
                                        <li><a className="dropdown-item" href="#">uma</a></li>
                                        <li><a className="dropdown-item" href="#">uma</a></li>
                                    </ul>
                                </div>
                                
                            </td>

                            <td className="pl-12 py-4">
                                <button
                                    type="button"
                                    className="font-medium hover:underline"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <FontAwesomeIcon icon={faCircleChevronDown} />
                                </button>
                            </td>
                        </tr>

                    </tbody >
                </table >
            </div >

        </>
    );
};

export default Staffer;