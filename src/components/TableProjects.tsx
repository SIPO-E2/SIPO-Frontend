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

    return (

        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center"> Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status </th>
                        <th scope="col" className="px-6 py-3 text-center">Posting Date</th>
                        <th scope="col" className="px-6 py-3 text-center"> Owner</th>
                        <th scope="col" className="px-6 py-3 text-center">  Expected Closure Date </th>
                        <th scope="col" className="px-6 py-3 text-center">Revenue</th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
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
                                            <FontAwesomeIcon icon={faPencilAlt} className="hover:underline " />
                                        </button>
                                    </Link>
                                </td>

                                <td className=" pr-3 py-4">
                                    <Link to="deleteProjects">
                                        <button type="button" className="font-medium  text-black">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </Link>
                                </td>

                            </tr>

                        </React.Fragment>
                    ))}


                </tbody>
            </table>
        </div>

    )
}

export default TableProjects;



