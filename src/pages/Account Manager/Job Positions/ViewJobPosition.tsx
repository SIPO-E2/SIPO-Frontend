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
        <div className="flex fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="flex relative top-20 mx-auto p-5 border w-3/4 h-3/4 shadow-lg rounded-md bg-white">
                <div className=" text-center">

                    <div className="flex gap-5 flex-row items-center mb-5">
                        <img className=" flex w-12 h-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/013/948/549/non_2x/google-logo-on-transparent-white-background-free-vector.jpg" alt="Rounded avatar" />
                        <h3 className="flex ">{jobPosition.name}</h3>
                    </div>

                    <div className="flex flex-wrap mt-4 py-3">

                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className=" font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    ID
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.id : ''}
                                </p>
                            </div>


                        <div className="flex flex-wrap gap-4 w-1/2">

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className=" font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Status
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.status : ''}
                                </p>
                            </div>


                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Bill Rate
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.bill_rate : ''}
                                </p>
                            </div>
                            
                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Posting Type
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.posting_type : ''}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Division
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.division : ''}
                                </p>
                            </div>

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Demand Curation
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.demand_curation : ''}
                                </p>
                            </div>

                        

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Owner
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition.owner_project.owner_user.name || 'No Owner'}
                                </p>
                            </div>

                            

                            <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                <label className="font-bold sm:text-l bg-blue-200 px-3 pt-1 pb-1 rounded-t-lg">
                                    Exclusivity
                                </label>
                                <p className='font-medium px-3'>
                                    {jobPosition ? jobPosition.exclusivity : ''}
                                </p>
                            </div>

                        </div>

                    <div className="w-full lg:w-1/2">
                        <TableOpenings openings={jobPosition.openings_list} />
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-end p-3 mt-24">
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

export default JobPositionDetailsModal;
