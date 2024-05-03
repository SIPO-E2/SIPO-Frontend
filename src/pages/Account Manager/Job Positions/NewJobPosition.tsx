import SkillsInput from "../../../components/SkillsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserProfile from "../../../components/UserProfile";
// import CreateOpening from "../../../components/CreateOpening";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { JobPositionCreation, Region, Status, PostingType, Division, Exclusivity} from "../../../types";
import {toast} from 'react-toastify';
import { createJobPosition } from "../../../api/jobPositionAPI";
import { useApisStore } from "../../../store";
import { useNavigate } from "react-router-dom";


const initialJobPositionData: JobPositionCreation = {
    owner_project_id: 0,
    name: "",
    bill_rate: 0,
    posting_type: PostingType.Backfill,
    division: Division.Mexico,
    skills_position: [],
    exclusivity: Exclusivity.NonCommitted,
    region: Region.Mexico,
    status: Status.Open,
    cross_division: false,
    reason_current_status: "Created",
    image: ""
};

const NewJobPosition = () => {
    const navigate = useNavigate();
    const {projects, fetchProjects} = useApisStore();
    useEffect(() => {
        fetchProjects();
    }, []);

    const[jobPositionData, setJobPositionData] = useState<JobPositionCreation>(initialJobPositionData);
    const [checkboxValue, setCheckboxValue] = useState('not-committed');

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        console.log(name, value);
        
        if(name === 'bill_rate') {
            setJobPositionData({ ...jobPositionData, [name]: parseInt(value) });
            return;
        }
        if (name === 'exclusivity') {
            // Utiliza la propiedad 'checked' para determinar si el checkbox está marcado o no
            const isCommitted = (event.target as HTMLInputElement).checked ? Exclusivity.Committed : Exclusivity.NonCommitted;
            setCheckboxValue(isCommitted);
            setJobPositionData({ ...jobPositionData, [name]: isCommitted });
            return;
        }
        setJobPositionData({ ...jobPositionData, [name]: value });
    };

    const handleSkillsChange = (skills: string[]) => {
        setJobPositionData({ ...jobPositionData, skills_position: skills });
     };

    const handleSubmit = async (event: FormEvent) => {
        try {

            // Prevent the form from refreshing the page
            event.preventDefault();
            jobPositionData.owner_project_id = parseInt(jobPositionData.owner_project_id.toString());
            console.log(await createJobPosition(jobPositionData));
            // reset form
            setJobPositionData({ ...initialJobPositionData });
            setCheckboxValue(initialJobPositionData.exclusivity as string);
            toast.success('Job Position created successfully');

            setTimeout(() => {
                // navigate(-1);
            }, 2000);

        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project');
        }
    };
   

    const userName = 'Jane Doe';
    const userRole = 'Developer';

    return (
        <>
            <div >
                <div className="text-left px-5 pt-4 mb-5">
                    <h1> New Job Position</h1>
                </div>


                <div className="flex p-10  gap-4 ">

                    <div className=" w-1/4">
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

                        <UserProfile name={userName} role={userRole} />
                    </div>

                    <form className="flex-1 mt-0 bg-white pl-[40px] pr-[40px] pt-5 pb-6 shadow rounded " onSubmit={handleSubmit}>


                        <div className=" flex flex-wrap ">

                             <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Project</label>
                                    <select name="owner_project_id" value={jobPositionData.owner_project_id} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="0">Select a project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">Name</label>
                                    <input type="text" name="name" value={jobPositionData.name} onChange={handleChange} placeholder="Enter project name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>


                    

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Bill Rate
                                    </label>
                                    <input type="number" id="Name" placeholder="Bill Rate" name="bill_rate" value={jobPositionData.bill_rate} onChange={handleChange}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Posting Type
                                    </label>
                                    <select id="client" name="posting_type" value={jobPositionData.posting_type} onChange={handleChange} className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        {Object.values(PostingType).map((posting_type) => (
                                            <option key={posting_type} value={posting_type}>
                                                {posting_type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Division
                                    </label>
                                    <select id="client" name="division" value={jobPositionData.division} onChange={handleChange} className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        {Object.values(Division).map((division) => (
                                            <option key={division} value={division}>
                                                {division}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            

                           
                              
                           

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Skills
                                    </label>
                                    <SkillsInput onSkillsChange={handleSkillsChange} />
                                </div>
                            </div>


                            

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <div className="flex items-center mb-4 ">
                                        <input id="default-checkbox" type="checkbox" name="exclusivity" checked={checkboxValue === Exclusivity.Committed} value={jobPositionData.exclusivity} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="default-checkbox" className="ms-2 font-bold sm:text-l font-bold text-black dark:text-gray-300">Exclusivity</label>
                                    </div>
                                </div>
                            </div>



                        </div>

                    
                        {/* <CreateOpening/> */}
                        <div className="flex px-10 pt-4 w-full justify-end">
                            <div className="px-3">
                                <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                            </div>

                            <div className=" ">
                                <button type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                            </div>
                        </div>
                    </form>

                </div >
            </div>
        </>
    )
}

export default NewJobPosition;

