<<<<<<< HEAD
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';



const TableProjects = () => {
=======
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


export interface Project {
    id: string;
    name: string;
    status: string;
    postingDate: string;
    owner: string;
    expectedClosureDate: string;
    revenue: string;
}

interface TableProjectsProps {
    projects: Project[];
}

const TableProjects = ({ projects }: TableProjectsProps) => {
>>>>>>> ef70cf07b86920d2a8a16563a262f044960047cc

    return (

        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
<<<<<<< HEAD
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3"> Name</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Posting Date </th>
                        <th scope="col" className="px-6 py-3"> Owner</th>
                        <th scope="col" className="px-6 py-3">Expected Closure Date </th>
                        <th scope="col" className="px-6 py-3">Revenue</th>
=======
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center"> Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status </th>
                        <th scope="col" className="px-6 py-3 text-center">Posting Date</th>
                        <th scope="col" className="px-6 py-3 text-center"> Owner</th>
                        <th scope="col" className="px-6 py-3 text-center">  Expected Closure Date </th>
                        <th scope="col" className="px-6 py-3 text-center">Revenue</th>
>>>>>>> ef70cf07b86920d2a8a16563a262f044960047cc
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
<<<<<<< HEAD
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079284V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </td>

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                       
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079285V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </td>

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>

                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079286V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3  py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </td>

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079287V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </td>

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079288V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </td>

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                    </tr>
=======
                    {projects.map((position, index) => (
                        <React.Fragment key={position.id}>
                            <tr className="border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{position.id}</th>
                                <td className="px-6 py-4 text-center">{position.name} </td>
                                <td className="px-6 py-4 text-center">{position.status}</td>
                                <td className="px-6 py-4 text-center">{position.postingDate}</td>
                                <td className="px-6 py-4 text-center">{position.owner}</td>
                                <td className="px-6 py-4 text-center">{position.expectedClosureDate}</td>
                                <td className="px-6 py-4 text-center">{position.revenue}</td>


                                <td className="pl-6 py-4">
                                    <button type="button" className="font-medium hover:underline text-black">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>


                                <td className="pl-3  py-4">
                                    <Link to="editProjects">
                                        <button type="button" className="font-medium text-black hover:underline ">
                                            <FontAwesomeIcon icon={faPencilAlt} className="hover:underline "/>
                                        </button>
                                    </Link>
                                </td>

                                <td className=" pr-3 py-4">
                                    <button type="button" className="font-medium  text-black">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>

                            </tr>

                        </React.Fragment>
                    ))}


>>>>>>> ef70cf07b86920d2a8a16563a262f044960047cc
                </tbody>
            </table>
        </div>

    )
}

<<<<<<< HEAD
export default TableProjects
=======
export default TableProjects;



>>>>>>> ef70cf07b86920d2a8a16563a262f044960047cc
