import React from 'react';
import { useNavigate } from 'react-router-dom';
import SmallTableJP from '../../../components/SmallTableJP';
import { format } from 'date-fns';
import { Project } from '../../../types';

interface ProjectDetailsModalProps {
    isActive: boolean;
    project: Project,
    setActive: (isActive: boolean) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isActive, project, setActive }) => {
    console.log(project);
    
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/accountManager/projects/editProjects/${project?.id}`);
    };

    if (!isActive || !project) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-4 py-4">
                    <div className="flex flex-col w-full">
                        <h3 className="text-xl font-semibold mb-4 text-left">{project.name}</h3> {/* Adjusted alignment to left */}
                        <div className="w-full h-1 bg-gray-300 mb-4"></div>

                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div className="flex-1 p-4 bg-white shadow-lg rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <InformationField label="Status" value={project.status} />
                                    <InformationField label="Posting Date" value={project.posting_date ? format(project.posting_date, 'dd/MM/yyyy') : 'N/A'} />
                                    <InformationField label="Expected Closure Date" value={project.exp_closure_date ? format(project.exp_closure_date, 'dd/MM/yyyy') : 'N/A'} />
                                    <InformationField label="Owner" value={project.owner_user?.name || 'No Owner'} />
                                    <InformationField label="Region" value={project.region} />
                                    <InformationField label="Revenue" value={project.revenue?.toString() || 'N/A'} />
                                </div>
                            </div>

                            <div className="flex-1 p-4 bg-white shadow-lg rounded-lg">
                                <h4 className="text-base font-bold bg-blue-200 px-3 py-1 rounded text-center">Job Positions</h4>
                                <div className="overflow-x-auto mt-4">
                                    <SmallTableJP project={project} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                            <button onClick={() => setActive(false)} className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InformationField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
        <label className="font-bold bg-blue-200 px-3 py-1 rounded-t-lg text-center">
            {label}
        </label>
        <p className='font-medium text-center py-1'>
            {value}
        </p>
    </div>
);

export default ProjectDetailsModal;
