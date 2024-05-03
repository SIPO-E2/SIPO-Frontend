import React from 'react';
import { useNavigate } from 'react-router-dom';
import TableOpenings from '../../../components/TableOpenings';
import { JobPosition } from '../../../types';

interface JobPositionDetailsModalProps {
    isActive: boolean;
    jobPosition: JobPosition | null;
    setActive: (isActive: boolean) => void;
}

const JobPositionDetailsModal: React.FC<JobPositionDetailsModalProps> = ({ isActive, jobPosition, setActive }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/accountManager/jobPositions/editJobPosition/${jobPosition?.id}`);
    };

    if (!isActive || !jobPosition) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-5">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-4">{jobPosition.name}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'ID', value: jobPosition.id },
                                    { label: 'Status', value: jobPosition.status },
                                    { label: 'Bill Rate', value: jobPosition.bill_rate },
                                    { label: 'Posting Type', value: jobPosition.posting_type },
                                    { label: 'Division', value: jobPosition.division },
                                    { label: 'Demand Curation', value: jobPosition.demand_curation },
                                    { label: 'Owner', value: jobPosition.owner_project.owner_user.name },
                                    { label: 'Exclusivity', value: jobPosition.exclusivity }
                                ].map((field, index) => (
                                    <div key={index} className="w-56" style={{ minHeight: '80px' }}> {/* Fixed width */}
                                        <div className="w-full text-center bg-blue-200 rounded-t-lg py-1">
                                            <h4 className="text-sm font-bold">{field.label}</h4>
                                        </div>
                                        <div className="w-full text-center bg-gray-200 rounded-b-lg py-1">
                                            <p>{field.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-1 ml-5">
                            <div className="w-full">
                                <div className="text-center bg-blue-200 rounded-t-lg py-1">
                                    <h4 className="text-sm font-bold">Openings</h4>
                                </div>
                                <TableOpenings openings={jobPosition.openings_list} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Edit</button>
                        <button className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => setActive(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPositionDetailsModal;
