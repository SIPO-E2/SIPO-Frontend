import React, { useState, useEffect} from 'react';
import { postPipeline, getPipelines } from '../../../api/PipelineAPI'; // Importa la función de API necesaria
import { getCandidates, postCandidate } from "../../../api/candidateAPI";
import { postPerson, getPersons } from "../../../api/PersonAPI";
import UserProfile from "../../../components/UserProfile";
import SkillsInput from "../../../components/SkillsInput";
import { useApisStore } from '../../../store';
import { CandidateWorkStatus, Division, Gender, ProposedAction, ReasonCurrentStatus,CandidateStatus } from '../../../types/globals.d';

interface Props{
  //addNewPipeline: (newPipeline: Pipeline) => void;
};

const AddPipelinegPage = (props:Props)=>{

  const userName = 'Jane Doe';
  const userRole = 'Developer';

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const [formData, setFormData] = useState({
    // Datos de la persona
    name: "",
    email: "",
    phone: "",
    gender: Gender.Unknown,
    imagen: "",
    division: Division.default,
    // Datos del candidato
    status: CandidateStatus.Other,
    workStatus: CandidateWorkStatus.Pipeline,
    reasonCurrentStatus: ReasonCurrentStatus.OtherRCS,
    proposeAction: ProposedAction.OtherPA,
    // Otros datos del candidato
    techStack: "",
    skills: [],
    expectedSalary: "",
    // Datos del pipeline
    pipelineSince: new Date(),
    // Otros datos del pipeline
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Crear la persona
      const personData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        division: formData.division,
        // Otros datos de la persona si es necesario
      };
      const createdPerson = await postPerson(personData);

      // Crear el candidato
      const candidateData = {
        status: formData.status,
        workStatus: formData.workStatus,
        reason_current_status: formData.reasonCurrentStatus,
        propose_action: formData.proposeAction,
        personId: createdPerson.id, // Add the personId property
        status_date: new Date(), // Add the status_date property
        // Otros datos del candidato si es necesario
      };
      const createdCandidate = await postCandidate(candidateData);

      // Crear el pipeline
      const pipelineData = {
        candidateId: createdCandidate.id,
        expectedSalary: formData.expectedSalary,
        pipelineSince: formData.pipelineSince,
        // Otros datos del pipeline si es necesario
      };
      await postPipeline(pipelineData);

      // Limpiar los campos del formulario después de la creación exitosa
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: Gender.Unknown,
        imagen: "",
        division: Division.default,
        status: CandidateStatus.Other,
        workStatus: CandidateWorkStatus.Pipeline,
        reasonCurrentStatus: ReasonCurrentStatus.OtherRCS,
        proposeAction: ProposedAction.OtherPA,
        techStack: "",
        skills: [],
        expectedSalary: "",
        pipelineSince: new Date(),
      });

      // Mostrar un mensaje de éxito
      alert("Pipeline created successfully");
    } catch (error) {
      // Manejar el error
      alert("Error creating pipeline");
    }
  };




  return(
  <>
    <div className="flex h-screen">

      {/* Main Content */}
      <div className="flex-grow">
        <div className="text-left px-5 pt-4 mb-5">
          <h1> New Pipeline</h1>
        </div>

        <div className="flex p-10 gap-4 ml-10 mr-10 border-top border-dark">
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

          <form className="flex-1 mt-0 bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
            <div className="flex flex-col ">

              <div className="grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Name
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Work Force's Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Email
                    </label>
                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Work Force's Email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">
                    Phone
                  </label>
                  <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Work Force's Phone"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                </div>
              </div>

              <div className=" grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Gender
                    </label>
                    <select id="gender" 
                      name='gender'
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                      <option value={Gender.Unknown}>Select Gender</option>
                      <option value={Gender.Female}>Female</option>
                      <option value={Gender.Male}>Male</option>
                    </select>
                  </div>
                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">
                    Division
                  </label>
                  <select 
                    id="division" 
                    name='division' 
                    value={formData.division}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                    <option value={Division.default}>Division</option>
                    <option value={Division.Mexico}>Encora Mexico</option>
                    <option value={Division.Brazil}>Encora Brazil</option>
                    <option value={Division.CSA}>Encora Central & South America</option>
                    <option value={Division.US}>Encora United States</option>
                  </select>
                </div>

                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Tech Stack
                    </label>
                    <input type="text" 
                    name="techStack" 
                    value={formData.techStack} 
                    onChange={handleInputChange} 
                    placeholder="Work Force's Tech Stack"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Status
                    </label>
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} placeholder="Work Force's Status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                </div>

                <div className="mb-3">
                  <label className="font-bold sm:text-l pb-3">
                    Propose Action
                  </label>
                  <select id="client" 
                    name="proposeAction" 
                    value={formData.proposeAction} 
                    onChange={handleInputChange} 
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                    <option value={ProposedAction.OtherPA}>Propose Action</option>
                    <option value={ProposedAction.ProjectSearch}>Project search</option>
                    <option value={ProposedAction.InternProject}>Using in internal project</option>
                    <option value={ProposedAction.UpSkilling}>Upskilling/Cross training</option>
                    <option value={ProposedAction.OtherPA}>Others</option>
                  </select>
                </div>

                <div className="mb-3 ">
                  <label className="font-bold sm:text-l pb-3">
                    Reson Current Status
                  </label>
                  <select id="client" 
                    name="reasonCurrentStatus" 
                    value={formData.reasonCurrentStatus} 
                    onChange={handleInputChange} 
                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                    <option value={ReasonCurrentStatus.OtherRCS}>Reason Current Status</option>
                    <option value={ReasonCurrentStatus.InTraining}>In training</option>
                    <option value={ReasonCurrentStatus.Induction}>Induction/Orientation</option>
                    <option value={ReasonCurrentStatus.Shadow}>Shadow resource</option>
                    <option value={ReasonCurrentStatus.OtherRCS}>Others</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="">
                    <label className="font-bold sm:text-l pb-3">
                      Expected Salary
                    </label>
                    <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} placeholder="Expected Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>

                <div className=" " >
                  <label className="font-bold sm:text-l pb-3">
                    Skills
                  </label>
                  <SkillsInput
                  />
                </div>
              </div>

              <div className="flex px-10 pt-4 w-full justify-end">
                <div className="px-3">
                  <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                </div>
                <div className=" ">
                  <button type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* Mensaje de éxito */}
    {showSuccessMessage && (
      <div className="alert alert-success" role="alert">
        Pipeline created successfully!
      </div>
    )}
  </>);
};

export default AddPipelinegPage;