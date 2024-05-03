import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TableOpenings from './TableOpenings';
import { Project, ProjectUpdate } from '../types';



const SmallTableJP = ({ project }: { project: Project | undefined }) => {

    const [open, setOpen] = useState<boolean[]>(new Array(project?.job_positions_list?.length).fill(false));


    const toggleAccordion = (index: number) => {
        setOpen(open.map((state, i) => i === index ? !state : state));
    };
    return (

        <div className="relative overflow-x-auto sm:rounded-lg ">
            <table className=" text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center"> Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status </th>
                        <th scope="col" className="px-6 py-3 text-center">Owner</th>
                        <th scope="col" className="px-6 py-3 text-center"> Division</th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
                    {project?.job_positions_list?.map((position, index) => (


                        position.activeDB && <React.Fragment key={position.id}>
                            {/* if active db is false not show */}
                            <tr className="border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium">{position.id}</th>
                                <td className="px-6 py-4 text-center">{position.name} </td>
                                <td className="px-6 py-4 text-center">{position.status}</td>
                                <td className="px-6 py-4 text-center">{project?.owner_user.name}</td>
                                <td className="px-6 py-4 text-center">{position.division}</td>

                                <td className="pl-12 py-4">
                                    <button
                                        type="button"
                                        className="font-medium hover:underline"
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <FontAwesomeIcon icon={faCircleChevronDown} className={`transition-transform ${open[index] ? 'rotate-180' : 'rotate-0'}`} />
                                    </button>
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

                                <td className=" pr-6 py-4">
                                    <button type="button" className="font-medium hover:underline">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>

                            </tr>
                            {open[index] && (
                                <tr className="border-b dark:border-gray-700">
                                    <td colSpan={12}>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>

                    ))}


                </tbody>
            </table>
        </div>

    )
}

export default SmallTableJP;