import React, { useState } from 'react';
import UserProfile from '../../../components/UserProfile';
import { Pipeline } from '../../../types/globals';
import { getPipelines } from '../../../api/PipelineAPI';

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

    const userName = 'Jane Doe';
    const userRole = 'Developer';

    return (
        <>
            <div className={`modal fade bd-example-modal-lg rounded-lg mt-12 ${props.isOpen ? 'show': ''}`} 
                tabIndex={-1} role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true"
                style={{ display: props.isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className='modal-header'>
                            <div>
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
                                <div className='mr-6 w-1/4'>
                                    <div className=" flex items-center bg-white p-5 shadow rounded mb-10">
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

                                    <div className='bg-white p-3 shadow rounded'>
                                    <UserProfile name={userName} role={userRole} />
                                    </div>
                                </div>

                                

                                {/* Form */}
                                <div className=''>
                                    <form className='flex-1 mt-0 bg-white p-5 shadow rounded'>
                                        <div className='flex flex-col'>
                                            <fieldset disabled>
                                                <div className='grid grid-cols-3 gap-4'>

                                                    <div className='mb-3'>
                                                        <label>Name</label>
                                                        <input type="text" 
                                                            id="disabledTextInput" 
                                                            placeholder="Disabled input" 
                                                            value={pipeline ? pipeline.candidateInformation.personInformation.name : ''}
                                                            className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                                            readOnly/>

                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="font-bold sm:text-l ">
                                                            Email
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.email : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                                        readOnly/>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="font-bold sm:text-l ">
                                                            Phone
                                                        </label>
                                                        
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.celphone : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                                        readOnly/>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Gender
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.gender : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                         readOnly/>
                                                    </div>
                                                    
                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Division
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.division : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>

                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Tech Stak
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.tech_stack : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Status
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.status : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>

                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Propose Action
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.propose_action : ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>

                                                    <div className='mb-3'>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Reson Current Status
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.reason_current_status: ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-4'>
                                                    <div>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Expected Salary
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.expectedSalary: ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>

                                                    <div>
                                                        <label className="font-bold sm:text-l pb-3">
                                                            Skills
                                                        </label>
                                                        <input type="text" id="disabledTextInput" placeholder="Disabled input"
                                                        value={pipeline ? pipeline.candidateInformation.personInformation.skills: ''}
                                                        className="w-full rounded-md border border-[#e0e0e0] form-control bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" readOnly/>
                                                    </div>

                                                    <div>

                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {props.isOpen && <div className="modal-backdrop fade show"></div>}
        </>);
};

export default ViewPipelineModal;

