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

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/accountManager/projects/editProjects/${project?.id}`);
    };


    if (!isActive || !project) return null;

    return (
        <div className="flex fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="flex relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white">
                <div className="flex flex-col w-full bg-white">
                    <h3 className="text-xl font-semibold mb-4 text-left">{project.name}</h3>
                    <div className="w-full h-1 bg-gray-300 shadow-md mb-2"></div>
    
                    <div className="flex justify-between space-x-4">
                        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Status
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project ? project.status : 'N/A'}
                                    </p>
                                </div>
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Posting Date
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project.posting_date ? format(project.posting_date, 'dd/MM/yyyy') : 'N/A'}
                                    </p>
                                </div>
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Expected Closure Date
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project.exp_closure_date ? format(project.exp_closure_date, 'dd/MM/yyyy') : 'N/A'}
                                    </p>
                                </div>
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Owner
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project.owner_user?.name || 'No Owner'}
                                    </p>
                                </div>
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Region
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project ? project.region : ''}
                                    </p>
                                </div>
                                <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                    <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
                                        Revenue
                                    </label>
                                    <p className='font-medium text-center'>
                                        {project ? project.revenue : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
    
                        <div className="flex-1 bg-white shadow-lg rounded-lg p-4 w-1/2">
                            <h4 className="text-sm font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">Job Positions</h4>
                            <div className="overflow-x-auto mt-4">
                                <SmallTableJP project={undefined} />
                            </div>
                        </div>
                    </div>
    
                    <div className="flex justify-end gap-4 mt-6">
                        <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button onClick={() => setActive(false)} className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default ProjectDetailsModal;
