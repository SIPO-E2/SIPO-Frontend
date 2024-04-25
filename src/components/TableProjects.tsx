import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../api/projectAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import DeleteModal from './DeleteModal';
import { Project } from '../types/globals';
import { format, parseISO } from 'date-fns';  

interface Props {}

const TableProjects = (_props: Props) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [deleteActive, setDeleteActive] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(-1);

    useEffect(() => {
    const fetchProjects = async () => {
        try {
            const fetchedProjects = await getProjects();
            console.log("Proyectos obtenidos:", fetchedProjects); 
            const activeProjects = fetchedProjects.filter(project => project.activeDB);
            console.log("Proyectos activos:", activeProjects); 
            setProjects(activeProjects);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    fetchProjects();
}, []);

    const handleDeleteProject = async (projectId: number) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Posting Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Owner</th>
                        <th scope="col" className="px-6 py-3 text-center">Expected Closure Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Revenue</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} className="border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{project.id}</th>
                            <td className="px-6 py-4 text-center">{project.name}</td>
                            <td className="px-6 py-4 text-center">{project.status}</td>
                            <td className="px-6 py-4 text-center">{project.posting_date ? format(parseISO(project.posting_date), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td className="px-6 py-4 text-center">{project.owner_user?.name || 'No Owner'}</td>
                            <td className="px-6 py-4 text-center">{project.exp_closure_date ? format(parseISO(project.exp_closure_date), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td className="px-6 py-4 text-center">{project.revenue}</td>
                            <td className="pl-6 py-4">
                                <button type="button" className="font-medium hover:underline text-black">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </td>
                            <td className="pl-3 py-4">
                                <Link to={`/editProjects/${project.id}`}>
                                    <button type="button" className="font-medium text-black hover:underline">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                </Link>
                            </td>
                            <td className="pr-3 py-4">
                                <button onClick={() => { setDeleteActive(true); setSelectedId(project.id); }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteActive && <DeleteModal isActive={deleteActive} selectedId={selectedId} setDeleteActive={setDeleteActive} onDeleteConfirm={handleDeleteProject} />}
        </div>
    );
}

export default TableProjects;
