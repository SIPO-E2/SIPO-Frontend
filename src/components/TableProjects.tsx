import React from 'react';
import { useEffect, useState } from 'react';
import { getProjects } from '../api/projectAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const TableProjects = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getProjects()
            .then((data) => {
                
                setProjects(data as Project[]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
                setError('No se pudo obtener los proyectos');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando proyectos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <tr className="border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{project.id}</th>
                                <td className="px-6 py-4 text-center">{project.name} </td>
                                <td className="px-6 py-4 text-center">{project.status}</td>
                                <td className="px-6 py-4 text-center">{project.posting_date.toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">{project.owner_user?.name || 'No Owner'}</td>
                                <td className="px-6 py-4 text-center">{project.exp_closure_date.toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">{project.revenue.toFixed(2)}</td>


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

                        </tr>
                    ))}


                </tbody>
            </table>
        </div>

    )
}

export default TableProjects;



