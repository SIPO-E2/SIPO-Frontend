import React, { useState } from 'react';
import UserProfile from '../../../components/UserProfile';
import { Pipeline } from '../../../types/entities';
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
        navegationMoveBilling(`/resourceManager/billing/addNewBilling/${pipeline.id}`);
    }
    

    const userName = 'Jane Doe';
    const userRole = 'Developer';

    return (
        <>
            <div className={` modal fade mt-4 ${props.isOpen ? 'show' : ''}`}
                tabIndex={-1} role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true"
                style={{ display: props.isOpen ? 'block' : 'none', overflowY: 'auto'  }}>
               <div className="modal-dialog modal-xl" style={{
                    maxWidth: '75%',
                    minHeight: '75%',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 48px)'
                }}>
                    <div className="modal-content">
                        <div className='flex flex-column p-6 '>
                            <div className='text-xl font-semibold mb-4 text-left'>
                                <h3>View Pipeline</h3>
                            </div>
                            <div className="w-full h-1 bg-gray-300 shadow-md mb-2"></div>
                        </div>

                        <div className='m-12'>

                            {/* Image and form */}
                            <div className='flex'>

                                {/* Image */}
                                <div className='mr-6 w-1/4 flex flex-col gap-3'>

                                    <div className='bg-white shadow rounded'>
                                        <div className='m-3 flex flex-row justify-between bg-gray-100'>
                                            <label className='font-bold sm:text-l '>ID:</label>
                                            <p className='font-medium'>
                                                {pipeline ? pipeline.id : ''}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='bg-white shadow rounded'>
                                        <UserProfile name={userName} role={userRole} />
                                    </div>
                                </div>

                                {/* Form */}
                                <div className='text-center'>
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
                                                            Work Status
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.workStatus : ''}
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
                                                            Propose Action
                                                        </label>
                                                        <p className='font-medium pl-3'>
                                                            {pipeline ? pipeline.candidateInformation.propose_action : ''}
                                                        </p>
                                                    </div>

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
                                                        <div className="flex flex-wrap pl-3 pt-2">
                                                            {pipeline ? pipeline.candidateInformation.personInformation.skills.map((skill, index) => (
                                                            <span key={index} className="badge rounded-pill bg-gray-500 text-white text-lg mr-2 mb-2">
                                                                {skill}
                                                            </span>
                                                            )) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className=" flex justify-end p-6">
                            <div className='mr-3'>
                                <button type="button" className="btn btn-primary"
                                onClick={() => pipeline && handleMoveBench(pipeline)}>
                                     Move to Bench
                                </button>
                            </div>
        
                            <div className='mr-3'>
                                <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* <div className="modal-footer flex justify-end">
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
                        </div> */}
                    </div>
                </div>
            </div>
            {props.isOpen && <div className="modal-backdrop fade show"></div>}
        </>);
};

export default ViewPipelineModal;

