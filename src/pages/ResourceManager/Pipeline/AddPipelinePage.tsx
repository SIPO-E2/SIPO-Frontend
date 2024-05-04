import React, { useState, useEffect } from 'react';
import { postPerson } from '../../../api/personAPI';
import { postCandidate } from '../../../api/candidateAPI';
import { postPipeline } from '../../../api/pipelineAPI';
import { Gender, Division, CandidateStatus, CandidateWorkStatus, ProposedAction, ReasonCurrentStatus } from '../../../types/enums';
import SkillsInput from '../../../components/SkillsInput';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../../../components/UserProfile';
import { id } from 'date-fns/locale';

interface Props {}

const AddPipelinePage = (props: Props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const userName = 'Jane Doe';
  const userRole = 'Developer';


  const [formData, setFormData] = useState({
      //Datos de la persona
      personName: '',
      personEmail: '',
      personCelphone: 0,
      personGender: Gender.Unknown,
      personDivision: Division.default,
      personTechStack: '',
      personSkills: [] as string[],

      //Datos del candidato
      candidateStatus: CandidateStatus.Other,
      candidateWorkStatus: CandidateWorkStatus.Pipeline,
      candidateReasonCurrentStatus: ReasonCurrentStatus.OtherRCS,
      candidateStatusDate: new Date(),
      candidateProposeAction: ProposedAction.OtherPA,

      //Datos del pipeline
      candidateId: 0,
      pipelineExpectedSalary: '',
      pipelineSince: new Date(),
  });

  //Alerta de exito
  const [showAlert, setShowAlert] = useState<boolean>(false);


  const handleInputChange = (e : any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleSkillsChange = (skills: string[]) => {
      setFormData({ ...formData, personSkills: skills });
  };

  const navegationAdd = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
          // Crear la persona
          const personData = {
              name: formData.personName,
              email: formData.personEmail,
              celphone: formData.personCelphone,
              image: 'https://randomuser',
              gender: formData.personGender,
              division: formData.personDivision,
              tech_stack: formData.personTechStack,
              skills: formData.personSkills,
          };
          const createdPerson = await postPerson(personData);
          console.log("Persona creada", personData);

          // Crear el candidato
          const candidateData = {
              personId: createdPerson?.id,
              status: formData.candidateStatus,
              workStatus: formData.candidateWorkStatus,
              reason_current_status: formData.candidateReasonCurrentStatus,
              status_date: formData.candidateStatusDate,
              propose_action: formData.candidateProposeAction,
          };
          const createdCandidate = await postCandidate(candidateData);

          // Update the expectedSalary property to be of type number
          const pipelineData = {
              candidateId: createdCandidate?.id,
              expectedSalary: Number(formData.pipelineExpectedSalary),
              pipelineSince: formData.pipelineSince,
              pipelineEndDate : new Date(),
          };
          console.log("Pipeline creado", pipelineData);
          const createdPipeline = await postPipeline(pipelineData);

          setShowAlert(true);
          setTimeout(() => {
            navegationAdd('/resourceManager/pipeline');
          },2000)
          // Limpiar los campos del formulario después de la creación exitosa
          setFormData({
              personName: '',
              personEmail: '',
              personCelphone: 0,
              personGender: Gender.Unknown,
              personDivision: Division.default,
              personTechStack: '',
              personSkills: [] as string[],
              candidateStatus: CandidateStatus.Other,
              candidateWorkStatus: CandidateWorkStatus.Pipeline,
              candidateReasonCurrentStatus: ReasonCurrentStatus.OtherRCS,
              candidateStatusDate: new Date(),
              candidateProposeAction: ProposedAction.OtherPA,
              candidateId: 0,
              pipelineExpectedSalary: '',
              pipelineSince: new Date(),
          });
        
      } catch (error) {
          // Manejar el error
          console.error("Error updating pipeline:", error);
      }
  };

    return (
    <>
      <div className="flex h-screen">
        
        {/* Main content */}
        <div className="flex-grow">
          <div className="text-left px-5 pt-4 mb-5">
            <h1>New Pipeline</h1>
          </div>

          {showAlert && ( // Mostrar el mensaje de alerta si showAlert es true
            <div className="alert alert-success" role="alert">
              Pipeline created successfully!
            </div>
          )}

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
                    <input type="text" name="personName" value={formData.personName} onChange={handleInputChange} placeholder="Work Force's Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                  </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Email
                    </label>
                    <input type="text" name="personEmail" value={formData.personEmail} onChange={handleInputChange} placeholder="Work Force's Email"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                  </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Phone
                    </label>
                    <input type="number" name="personCelphone" value={formData.personCelphone} onChange={handleInputChange} placeholder="Work Force's Phone"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Gender
                    </label>
                    <select id="gender"
                      name='personGender'
                      value={formData.personGender}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
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
                          name='personDivision'
                          value={formData.personDivision}
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
                        name="personTechStack"
                        value={formData.personTechStack}
                        onChange={handleInputChange}
                        placeholder="Work Force's Tech Stack"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Status
                    </label>
                    <select name="candidateStatus"
                        value={formData.candidateStatus} 
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                        <option value={CandidateStatus.Other}>Candidate Status</option>
                        <option value={CandidateStatus.StandBy}>Stand By</option>
                        <option value={CandidateStatus.Hired}>Hired</option>
                        <option value={CandidateStatus.Other}>Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Work Status
                    </label>
                    <select name="candidateWorkStatus"
                        value={formData.candidateWorkStatus} 
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                        <option value={CandidateWorkStatus.Other}>Candidate Work Status</option>
                        <option value={CandidateWorkStatus.Pipeline}>Pipeline</option>
                        <option value={CandidateWorkStatus.Employee}>Employee</option>
                    </select>
                    </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Propose Action
                    </label>
                    <select id="proposeAction"
                      name="candidateProposeAction"
                      value={formData.candidateProposeAction}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                      <option value={ProposedAction.OtherPA}>Propose Action</option>
                      <option value={ProposedAction.ProjectSearch}>Project search</option>
                      <option value={ProposedAction.InternProject}>Using in internal project</option>
                      <option value={ProposedAction.UpSkilling}>Upskilling/Cross training</option>
                      <option value={ProposedAction.Backup}>Backup/Shadow other projects</option>
                      <option value={ProposedAction.ResourcePool}>Resource pool</option>
                      <option value={ProposedAction.NoAction}>No action required</option>
                      <option value={ProposedAction.Attrition}>Attrition</option>
                      <option value={ProposedAction.OtherPA}>Others</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                          Status Date
                      </label>
                      <input type="date" name="candidateStatusDate" value={formData.candidateStatusDate.toString()} onChange={handleInputChange} placeholder="Status Date"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                  </div>
                  <div className="mb-3 ">
                      <label className="font-bold sm:text-l pb-3">
                          Reason Current Status
                      </label>
                      <select id="reasonCurrentStatus"
                          name="candidateReasonCurrentStatus"
                          value={formData.candidateReasonCurrentStatus}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                           <option value={ReasonCurrentStatus.OtherRCS}>Reason Current Status</option>
                          <option value={ReasonCurrentStatus.InTraining}>In training</option>
                          <option value={ReasonCurrentStatus.Induction}>Induction/Orientation</option>
                          <option value={ReasonCurrentStatus.Shadow}>Shadow resource</option>
                          <option value={ReasonCurrentStatus.AwaitingClient}>Awaiting client confirmation/joining</option>
                          <option value={ReasonCurrentStatus.Maternity}>Maternity leave</option>
                          <option value={ReasonCurrentStatus.Sabbatical}>Sabbatical/Other leave</option>
                          <option value={ReasonCurrentStatus.PrevCA}>Previous Client attrition</option>
                          <option value={ReasonCurrentStatus.PrevCHCr}>Previous Client HC reduction</option>
                          <option value={ReasonCurrentStatus.TranBP}>Transition between projects</option>
                          <option value={ReasonCurrentStatus.NoAvailableProjects}>No available projects</option>
                          <option value={ReasonCurrentStatus.InternalProject}>Internal project</option>
                          <option value={ReasonCurrentStatus.MovedBilling}>Moved to billing</option>
                          <option value={ReasonCurrentStatus.PerformanceIssue}>Performance issues/PIP</option>
                          <option value={ReasonCurrentStatus.Intern}>Intern</option>
                          <option value={ReasonCurrentStatus.OtherRCS}>Others</option>
                      </select>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                          Expected Salary
                      </label>
                      <input type="text" name="pipelineExpectedSalary" value={formData.pipelineExpectedSalary} onChange={handleInputChange} placeholder="Expected Salary"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-4'> 
                  <div className="mb-3">
                        <label className="font-bold sm:text-l pb-3">
                            Pipeline Since
                        </label>
                        <input type="date" name="pipelineSince" value={formData.pipelineSince.toString().split('T')[0]} onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                    </div>
                  <div className=" " >
                          <label className="font-bold sm:text-l pb-3">
                              Skills
                          </label>
                          <SkillsInput onSkillsChange={handleSkillsChange} />
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
  </>)
}

export default AddPipelinePage;