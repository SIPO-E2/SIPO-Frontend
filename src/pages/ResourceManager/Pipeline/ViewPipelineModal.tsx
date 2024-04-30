import React, { useState } from 'react';
import UserProfile from '../../../components/UserProfile';
import { Pipeline } from '../../../types/globals';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    pipeline: Pipeline | null;
}

const ViewPipelineModal = (props: Props) => {
    
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        props.onClose();
    };

    const { pipeline } = props;

    const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);

    //Move to Bench
    const navegationMoveBench = useNavigate();
    const handleMoveBench = (pipeline: Pipeline) => {
        setSelectedPipeline(pipeline);
        navegationMoveBench(`/resourceManager/bench/addNewBench/${pipeline.id}`);
    }
    

    //Move to Billing
    const navegationMoveBilling = useNavigate();
    const handleMoveBilling = (pipeline: Pipeline) => {
        setSelectedPipeline(pipeline);
        navegationMoveBilling(`/resourceManager/billing/addNewBilling`);
    }
    

    const userName = 'Jane Doe';
    const userRole = 'Developer';

    return (
        <>
            <div className={`modal fade bd-example-modal-lg mt-12 ${props.isOpen ? 'show': ''}`} 
                tabIndex={-1} role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true"
                style={{ display: props.isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <div className='pl-6 pt-3'>
                                <h3>View Pipeline</h3>
                            </div>
                            <div className=''>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div className='modal-body m-12'>

                            {/* Image and form */}
                            <div className='flex'>

                                {/* Image */}
                                <div className='mr-6 w-1/4 flex flex-col justify-between'>
                                    <div className=" flex items-center bg-white p-5 shadow rounded">
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                            </svg>
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                                        </div>
                                    </div>

                                    <div className='bg-white shadow rounded'>
                                        <div className='m-3 flex flex-row justify-between bg-gray-100'>
                                            <label className='font-bold sm:text-l bg-blue-200'>ID:</label>
                                            <p className='font-medium'>
                                                {pipeline ? pipeline.id: ''}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='bg-white shadow rounded'>
                                        <UserProfile name={userName} role={userRole} />
                                    </div>
                                </div>

                                {/* Form */}
                                <div className=''>
                                    <form className='flex-1 mt-0 bg-white p-4 shadow rounded'>
                                        <div className='flex flex-col'>
                                            <fieldset disabled>
                                                <div className='grid grid-cols-3 gap-4'>

                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className='font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg'>Name</label>
                                                        <p className='font-medium pl-3 pr-1'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.name : ''}
                                                        </p>
                                  
                                                    </div>

                                                    <div className="mb-3 flex flex-col bg-gray-100 rounded-lg">
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Email
                                                        </label >
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.email : ''}
                                                        </p>
                                                    </div>

                                                    <div className="mb-3 flex flex-col bg-gray-100 rounded-lg">
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Phone
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.celphone : ''}
                                                        </p>
                                                        
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Gender
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.gender : ''}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Division
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.division : ''}
                                                        </p>
                                                    </div>

                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Tech Stak
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.tech_stack : ''}
                                                        </p>
                                                     </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Status
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.status : ''}
                                                        </p>
                                                    </div>

                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Propose Action
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.propose_action : ''}
                                                        </p>
                                                    </div>

                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Reson Current Status
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.reason_current_status: ''}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Expected Salary
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.expectedSalary: ''}
                                                        </p>
                                                    </div>

                                                    <div className='mb-3 flex flex-col bg-gray-100 rounded-lg'>
                                                        <label className="font-bold sm:text-l bg-blue-200 pl-3 pt-1 pb-1 rounded-t-lg">
                                                            Skills
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.personInformation.skills: ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer flex justify-end">
                            <div className='mr-3'>
                                <button type="button" className="btn btn-primary"
                                onClick={() => pipeline && handleMoveBench(pipeline)}>
                                     Move to Bench
                                </button>
                            </div>
                            <div className='mr-3'>
                                <Link to={"/resourceManager/billing/addNewBilling"}>
                                    <button type="button" className="btn btn-primary">
                                        Move to Billing
                                    </button>
                                </Link>
                            </div>
                            
                            <div className='mr-3'>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {props.isOpen && <div className="modal-backdrop fade show"></div>}
        </>);
};

export default ViewPipelineModal;

