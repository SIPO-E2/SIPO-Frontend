import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown, faCircleUser, faMagnifyingGlass, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
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

                            <td className="px-6 py-4 flex justify-center">
                                {/* <div className="dropdown">
                                    <button className="btn dropdown-toggle bg-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">Select candidates</button>
                                    <ul className="dropdown-menu">
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

                                    </ul>
                                </div> */}

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
                                                    <li>
                                                        {/* <div className="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenuButton"> */}
                                                        <a className="dropdown-item" href="#">Foo</a>
                                                        <a className="dropdown-item" href="#">Thing</a>
                                                        <a className="dropdown-item" href="#">Something</a>
                                                        <a className="dropdown-item" href="#">Dudes</a>
                                                        <a className="dropdown-item" href="#">Birds</a>
                                                        <a className="dropdown-item" href="#">Nikes</a>
                                                        <a className="dropdown-item" href="#">Marsh mellows</a>
                                                        <a className="dropdown-item" href="#">Foo</a>
                                                        <a className="dropdown-item" href="#">Thing</a>
                                                        <a className="dropdown-item" href="#">Something</a>
                                                        <a className="dropdown-item" href="#">Dudes</a>
                                                        <a className="dropdown-item" href="#">Birds</a>
                                                        <a className="dropdown-item" href="#">Nikes</a>
                                                        <a className="dropdown-item" href="#">Marsh mellows</a>
                                                        {/* </div> */}
                                                    </li>
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
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
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