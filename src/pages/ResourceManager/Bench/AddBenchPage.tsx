import UserProfile from "../../../components/UserProfile";
import SkillsInput from "../../../components/SkillsInput";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Gender, Division, CandidateStatus, CandidateWorkStatus, ReasonCurrentStatus, ProposedAction, EmployeeStatus } from "../../../types/enums";
import { Bench, Candidate, Employee, Opening, Pipeline } from "../../../types/entities";
import { getPipeline, updatePipeline } from "../../../api/pipelineAPI";
import { postEmployee } from "../../../api/employeeAPI";
import { postBench } from "../../../api/benchAPI";

interface Props{
  pipeline: Pipeline;
  id: string;
};

const AddBenchPage = (props:any)=>{

  //Mensaje de exito al crear bench
  const { id } = useParams<{ id: string }>();
  const { pipeline } = props;

  const [formDataPipeline, setFormDataPipeline] = useState<Pipeline>({
    id: props.id,
    candidateId: 0,
    candidateInformation: {
      id: 0,
      personId: 0,
      personInformation: {
        id: 0,
        name: '',
        email: '',
        celphone: 0,
        gender: Gender.Unknown,
        image: "",
        division: Division.default,
        tech_stack: "",
        skills: [],
        candidateInformation: {} as Candidate,
        activeDB: false
      },
      status: CandidateStatus.Other,
      workStatus: CandidateWorkStatus.Other,
      reason_current_status: ReasonCurrentStatus.OtherRCS,
      status_date: new Date(),
      propose_action: ProposedAction.OtherPA,
      allocations: [],
      activeDB: false
    },
    expectedSalary: 0,
    pipelineSince: new Date(),
    pipelineEndDate: new Date(),
    activeDB: false,
  });

  //Alerta de exito
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    //Datos Persona
    id: formDataPipeline.id,
    name: formDataPipeline.candidateInformation.personInformation.name,
    email: formDataPipeline.candidateInformation.personInformation.email,
    celphone: formDataPipeline.candidateInformation.personInformation.celphone,
    gender: formDataPipeline.candidateInformation.personInformation.gender,
    division: formDataPipeline.candidateInformation.personInformation.division,
    tech_stack: formDataPipeline.candidateInformation.personInformation.tech_stack,
    skills: formDataPipeline.candidateInformation.personInformation.skills,

    //Datos Candidato
    candidateId: formDataPipeline.candidateId,
    candidateStatus: formDataPipeline.candidateInformation.status,
    candidateWorkStatus: formDataPipeline.candidateInformation.workStatus,
    candidateReasonCurrentStatus: formDataPipeline.candidateInformation.reason_current_status,
    candidateStatusDate: formDataPipeline.candidateInformation.status_date,
    candidateProposeAction: formDataPipeline.candidateInformation.propose_action,
    candidateAllocations: formDataPipeline.candidateInformation.allocations,
    candidateActiveDB: formDataPipeline.candidateInformation.activeDB,

    //Datos Pipeline
    //candidateId: 0,
    pipelineExpectedSalary: formDataPipeline.expectedSalary,
    pipelineSince: formDataPipeline.pipelineSince,
    pipelineEndDate: formDataPipeline.pipelineEndDate,
    pipelineActiveDB: formDataPipeline.activeDB,

    //Datos Empleado
    employeeStatus: EmployeeStatus.Bench,
    employeeReasonCurrentStatus: ReasonCurrentStatus.OtherRCS,
    employeeStatusDate: new Date(),
    employeeSalary: 0,
    employeeJobTitle: '',
    employeeJobGrade: '',
    employeeJoiningDate: new Date(),
    employeeOpenings: {} as Opening[],
    employeeActiveDB: false,

  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleSkillsChange = (skills: string[]) => {
    setFormData({ ...formData, skills: skills });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del pipeline desde la API
        const pipeline = await getPipeline(Number(id));
        console.log("Data from API:", pipeline); // Agregar esta línea para verificar los datos obtenidos de la API
        //Actualizar el estado local con los datos obtenidos de la API
        setFormData(prevState => ({
          ...prevState,
          ...pipeline.data,
          
          name: pipeline.data.candidateInformation.personInformation.name,
          email: pipeline.data.candidateInformation.personInformation.email,
          celphone: pipeline.data.candidateInformation.personInformation.celphone,
          gender: pipeline.data.candidateInformation.personInformation.gender,
          division: pipeline.data.candidateInformation.personInformation.division,
          tech_stack: pipeline.data.candidateInformation.personInformation.tech_stack,
          skills: pipeline.data.candidateInformation.personInformation.skills,
          
          candidateId: pipeline.data.candidateId,
          candidateStatus: pipeline.data.candidateInformation.status,
          candidateWorkStatus: pipeline.data.candidateInformation.workStatus,
          candidateReasonCurrentStatus: pipeline.data.candidateInformation.reason_current_status,
          candidateStatusDate: pipeline.data.candidateInformation.status_date,
          candidateProposeAction: pipeline.data.candidateInformation.propose_action,
          candidateAllocations: pipeline.data.candidateInformation.allocations,
          candidateActiveDB: pipeline.data.candidateInformation.activeDB,
          
          pipelineId: pipeline.data.id,
          pipelineExpectedSalary: pipeline.data.expectedSalary,
          pipelineSince: pipeline.data.pipelineSince,
          pipelineEndDate: pipeline.data.pipelineEndDate,
          pipelineActiveDB: pipeline.data.activeDB,

        }));
      } catch (error) {
        console.error("Error fetching pipeline data:", error);
        // Manejar errores aquí, como mostrar un mensaje de error al usuario
      }
    };
    fetchData();
  }, [id]);

  const navegationAdd = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{

      //Crear al Employee
      const employeeData: Employee ={
        id: 0,
        candidateId: formData.candidateId,
        candidateInformation: pipeline?.candidateInformation,
        status: formData.employeeStatus,
        reason_current_status: formData.employeeReasonCurrentStatus,
        status_date: formData.employeeStatusDate,
        salary: formData.employeeSalary, 
        job_title: formData.employeeJobTitle, 
        job_grade: formData.employeeJobGrade, 
        joining_date: formData.employeeJoiningDate,
        openings: formData.employeeOpenings, 
        activeDB: formData.employeeActiveDB 
      };
      // Realizar la llamada a la API para crear el empleado
      const createdEmployee = await postEmployee(employeeData);
      
      //Crear al Bench
      const benchData: Bench = {
        id: 0,
        employeeId: createdEmployee.id,
        employeeInformation: createdEmployee,
        benchSince: new Date(),
        billingStartDate: new Date(),
        activeDB: true // O ajusta según tus necesidades
      };
      // Realizar la llamada a la API para crear el bench
      const createdBench = await postBench(benchData);

      // Actualizar el estado activeDB en el objeto pipeline
      const pipelineData: Pipeline = {
        ...pipeline,
        activeDB: false,
      };
      // Realiza la llamada a la función de actualización del pipeline
      const updatedPipeline = await updatePipeline(Number(id), pipelineData); // Convert the id to a number

      //crear bench
      setShowAlert(true);
      setTimeout(() => {
        navegationAdd('/resourceManager/bench');
      },2000);
    }catch(error){
      // Manejar el error
      console.log("Error moving pipeline to bench:", error);
    }
  };

  
  const userName = 'Jane Doe';
  const userRole = 'Developer';


  return(
    <>
      <div className="flex h-screen">
  
        {/* Main Content */}
        <div className="flex-grow">
          <div className="text-left px-5 pt-4 mb-5">
            <h1> New Bench</h1>
          </div>

          {showAlert && ( // Mostrar el mensaje de alerta si showAlert es true
            <div className="alert alert-success" role="alert">
              Bench created successfully!
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
                      <input 
                        type="text" name="name" 
                        value={formData?.name || ''}
                        onChange={handleInputChange}
                        placeholder="Work Force's Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Email
                      </label>
                      <input 
                        type="text" 
                        name="email" 
                        value={formData?.email || ''}
                        onChange={handleInputChange}
                        placeholder="Work Force's Email"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Phone
                      </label>
                      <input type="text" 
                        name="celphone" 
                        value={formData?.celphone || ''}
                        placeholder="Work Force's Phone"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>
  
                <div className=" grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Gender
                      </label>
                      <select 
                        name='gender'
                        value={formData?.gender ||''}
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
                      name='division'
                      value={formData?.division || ''}
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
                      Job Title
                    </label>
                    <input type="text" id="Name" 
                    placeholder="Work Force's Job Title"
                    name='employeeJobTitle'
                    value={formData?.employeeJobTitle || ''}
                    onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Job Grade
                    </label>
                    <select name="employeeJobGrade" 
                      value={formData?.employeeJobGrade || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                      <option value="C">Work Force's Job Grade</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                      <option value="C3">C3</option>
                      <option value="C4">C4</option>
                      <option value="C5">C5</option>
                      <option value="C6">C6</option>
                    </select>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Tech Stack
                      </label>
                      <input type="text" 
                        placeholder="Work Force's Tech Stack"
                        name = 'tech_stack'
                        value={formData?.tech_stack || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Employee Status
                      </label>
                      <select name="employeeStatus"
                        value={formData?.employeeStatus || ''}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                        <option value={EmployeeStatus.Other}>Employee Status</option>
                        <option value={EmployeeStatus.Bench}>Bench</option>
                        <option value={EmployeeStatus.Billing}>Billing</option>
                        <option value={EmployeeStatus.Hired}>Hired</option>
                        <option value={EmployeeStatus.Resigned}>Resigned</option>
                        <option value={EmployeeStatus.Other}>Other</option>
                      </select>
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Propose Action
                      </label>
                      <select 
                        name='propose_action'
                        value={formData?.candidateProposeAction || ''}
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
                  <div className=" ">
                      <label className="font-bold sm:text-l pb-3">
                        Employee Reson Current State
                      </label>
                      <select 
                        name='employeeReasonCurrentStatus'
                        value={formData?.employeeReasonCurrentStatus || ''}
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
                  <div className="">
                      <label className="font-bold sm:text-l pb-3">
                        Salary
                      </label>
                      <input type="text" 
                        name='employeeSalary'
                        value={formData?.employeeSalary || ''}
                        onChange={handleInputChange}
                        placeholder="Work Force's Salary"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>

                {/* {formData.pipelineActiveDB===false} */}
  
                <div className="grid grid-cols-3 gap-4">
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
                    <button type="button" onClick={handleSubmit }
                    className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                  </div>
                </div>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </>);
};

export default AddBenchPage;