import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';



const TableProjects = () => {

    return (

        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3"> Name</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Posting Date </th>
                        <th scope="col" className="px-6 py-3"> Owner</th>
                        <th scope="col" className="px-6 py-3">Expected Closure Date </th>
                        <th scope="col" className="px-6 py-3">Revenue</th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>

    )
}

export default TableProjects