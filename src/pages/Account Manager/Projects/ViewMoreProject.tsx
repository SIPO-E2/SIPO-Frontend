import React from 'react';
import { format, parseISO } from 'date-fns';
import SmallTableJP from '../../../components/SmallTableJP';

interface ProjectDetailsModalProps {
    isActive: boolean;
    project: {
        name: string;
        status: string;
        posting_date?: Date;
        owner_user?: {
            name?: string;
        };
        exp_closure_date?: Date;
        revenue?: number;
    } | null;
    setActive: (isActive: boolean) => void;
}


const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isActive, project, setActive }) => {
    if (!isActive || !project) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ">
            <div className="relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white">
                <div className=" text-center">

                    <div className="flex gap-5 flex-row items-center mb-5">
                        <img className=" flex w-12 h-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/013/948/549/non_2x/google-logo-on-transparent-white-background-free-vector.jpg" alt="Rounded avatar" />
                        <h3 className="flex ">{project.name}</h3>
                    </div>

                    <div className="flex flex-wrap mt-4 mb-7 py-3">

                        <div className="flex flex-wrap gap-4 w-1/2">

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


                    <div className="flex items-center gap-4 justify-end pt-14">
                        <button onClick={() => setActive(false)} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Edit
                        </button>
                        <button onClick={() => setActive(false)} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;
