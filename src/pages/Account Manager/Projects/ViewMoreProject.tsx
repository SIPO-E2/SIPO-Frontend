import React from 'react';
import { format, parseISO } from 'date-fns';
import SmallTableJP from '../../../components/SmallTableJP';
import { useNavigate } from 'react-router-dom';

interface ProjectDetailsModalProps {
    isActive: boolean;
    project: {
        id: number;
        name: string;
        status: string;
        posting_date?: Date;
        owner_user?: {
            name?: string;
        };
        exp_closure_date?: Date;
        revenue?: number;
        region: string;
    } | null;
    setActive: (isActive: boolean) => void;
}


const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isActive, project, setActive }) => {

    const navigate = useNavigate(); // useNavigate en lugar de useHistory

    // Función para manejar la navegación a la página de edición
    const handleEdit = () => {
        navigate(`/accountManager/projects/editProjects/${project?.id}`);
    };


    if (!isActive || !project) return null;

    return (
        <div className="flex fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
            <div className="flex relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white">
                <div className=" text-center">

                    <div className="flex gap-5 flex-row items-center mb-5">
                        <h3 className="flex ">{project.name}</h3>
                    </div>

                    <div className="flex flex-wrap mt-4 py-3 ">

                        <div className="flex flex-wrap gap-4 w-1/2 ">

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className=" font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Status
                                </label>
                                <p className='font-medium px-3'>
                                    {project ? project.status : ''}
                                </p>
                            </div>


                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Posting Date
                                </label>
                                <p className='font-medium px-3'>
                                    {project.posting_date ? format(project.posting_date, 'dd/MM/yyyy') : 'N/A'}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Expected Closure Date
                                </label>
                                <p className='font-medium px-3'>
                                    {project.exp_closure_date ? format(project.exp_closure_date, 'dd/MM/yyyy') : 'N/A'}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Owner
                                </label>
                                <p className='font-medium px-3'>
                                    {project.owner_user?.name || 'No Owner'}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Region
                                </label>
                                <p className='font-medium px-3'>
                                    {project ? project.region : ''}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Revenue
                                </label>
                                <p className='font-medium px-3'>
                                    {project ? project.revenue : ''}
                                </p>
                            </div>

                        </div>

                        <div className="flex w-1/2">
                            <SmallTableJP project={undefined} />
                        </div>

                    </div>


                    <div className="flex items-center gap-4 justify-end p-3 mt-24">
                        <button onClick={handleEdit} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button onClick={() => setActive(false)} className=" bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
