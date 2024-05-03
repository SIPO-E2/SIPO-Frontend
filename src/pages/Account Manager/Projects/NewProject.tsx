import SmallTableJP from "../../../components/SmallTableJP";
import UserProfile from "../../../components/UserProfile";
import { createProject } from '../../../api/projectAPI';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Project, ProjectCreation, Region, Status } from '../../../types';
import {toast} from 'react-toastify';

const initialProjectData: ProjectCreation = {
    owner_user_id: 1,
    owner_client_id: 0,
    name: "",
    status: Status.Open,
    reason_current_status: "Created",
    region: Region.Mexico,
    posting_date: new Date(),
    exp_closure_date: new Date(),
    image: ""
};

const NewProjects: React.FC = () => {
    
    const[projectData, setProjectData] = useState<ProjectCreation>(initialProjectData);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        try {

            // Prevent the form from refreshing the page
            event.preventDefault();
            projectData.owner_client_id = parseInt(projectData.owner_client_id.toString());
            console.log(await createProject(projectData));
            // reset form
            setProjectData({ ...initialProjectData });
            toast.success('Project created successfully');
            // move to the projects page
            setTimeout(() => {
                window.location.href = '/accountManager/projects';
            }, 2000);

        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project');
        }
    };

    return (
        <>
            <div >
                <div className="text-left px-5 pt-4 mb-5">
                    <h1> New Project</h1>
                </div>
    
                <div className="flex p-10 gap-4">
    
                    <div className="w-1/4 ">
                        <div className="flex items-center bg-white p-5 shadow rounded">
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
                    </div>
    
                    <form className="flex-1 w-2/3 mt-0 bg-white p-5 shadow rounded " onSubmit={handleSubmit}>
                        <div className="flex flex-wrap">
                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Name</label>
                                    <input type="text" name="name" value={projectData.name} onChange={handleChange} placeholder="Enter project name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
    
                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Client</label>
                                    <select name="owner_client_id" value={projectData.owner_client_id} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value={0}>Select Client</option>
                                        <option value={1}>Microsoft</option>
                                        <option value={2}>Google</option>
                                        <option value={3}>Temu</option>
                                    </select>
                                </div>
                            </div>
    
                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Region</label>
                                    <select name="region" value={projectData.region} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        {Object.values(Region).map((region) => (
                                            <option key={region} value={region}>
                                            {region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
    
                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Expected Closure Date</label>
                                    <input type="date" name="exp_closure_date" value={projectData.exp_closure_date.toString()} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
    
                            {/*<div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Revenue</label>
                                    <input type="number" name="revenue" value={projectData.revenue.toString()} onChange={handleChange} placeholder="Enter revenue"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div> */}
    
                            {/*<div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Owner</label>
                                    <input type="text" name="" value={projectData.o} onChange={handleChange} placeholder="Enter owner's name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div> */}

                            {/*<div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Status</label>
                                    <select name="clientId" value={projectData.clientId} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="">Select Client</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">Pending</option>
                                        <option value="3">Closed</option>
                                    </select>
                                </div>
                            </div> */}
    
                            <div className="flex px-3 w-full justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
    
};

export default NewProjects;