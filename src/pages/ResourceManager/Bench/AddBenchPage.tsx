import UserProfile from "../../../components/UserProfile";
import SkillsInput from "../../../components/SkillsInput";
import { useParams } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Gender, Division, CandidateStatus, CandidateWorkStatus, ReasonCurrentStatus, ProposedAction, EmployeeStatus } from "../../../types/enums";
import { Bench, Candidate, Employee, Pipeline } from "../../../types/entities";
import { getPipeline } from "../../../api/pipelineAPI";
import { postEmployee } from "../../../api/employeeAPI";
import { postBench } from "../../../api/benchAPI";

interface Props{
  pipeline: Pipeline;
  id: string;
};

const AddBenchPage = (props:any)=>{
  //Mensaje de exito al crear bench
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { pipeline } = props;


  // const { pipelineId } = useParams(); // Obtener el ID del pipeline de la URL
  // const [pipelineData, setPipelineData] = useState<Pipeline | null>(null);

  const [formData, setFormData] = useState<Pipeline>({
    id: 0,
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



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value,
        candidateInformation: {
          ...prevState.candidateInformation,
          [name]: value, 
          personInformation: {
            ...prevState.candidateInformation.personInformation,
            [name]: value,
          },
        }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del pipeline desde la API
        const pipeline = await getPipeline(id || '');
        console.log("Data from API:", pipeline); // Agregar esta línea para verificar los datos obtenidos de la API
        
        //Actualizar el estado local con los datos obtenidos de la API
        setFormData({
          ...pipeline.data,
          candidateInformation: {
              ...pipeline.data.candidateInformation,
              personInformation: {
                ...pipeline.data.candidateInformation.personInformation,
              }
            }
        });
      } catch (error) {
        console.error("Error fetching pipeline data:", error);
        // Manejar errores aquí, como mostrar un mensaje de error al usuario
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{

      //Crear al Employee
      const employeeData: Employee ={
        id: 0,
        candidateId: pipeline?.candidateId,
        candidateInformation: pipeline?.candidateInformation,
        status: EmployeeStatus.Bench, // Ajusta el estado según tus necesidades
        reason_current_status: ReasonCurrentStatus.OtherRCS , // Ajusta la razón según tus necesidades
        status_date: new Date(),
        salary: 0, // Ajusta según tus necesidades
        job_title: '', // Ajusta según tus necesidades
        job_grade: '', // Ajusta según tus necesidades
        joining_date: new Date(),
        openings: [], // Ajusta según tus necesidades
        activeDB: true // O ajusta según tus necesidades
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

      //crear bench
      setShowAlert(true);
    }catch(error){
      // Manejar el error
      alert("Error moving pipeline to bench:" + error);
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
                        value={formData.candidateInformation.personInformation.name}
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
                        value={formData.candidateInformation.personInformation.email || ''}
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
                        value={formData.candidateInformation.personInformation.celphone}
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
                      onChange={handleInputChange}
                      value={formData?.candidateInformation.personInformation.gender || ''}
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
                      onChange={handleInputChange}
                      //value={formData?.candidateInformation.personInformation.division || ''}
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
                    <input type="text" id="Name" placeholder="Work Force's Job Title"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                        Job Grade
                      </label>
                      <select name="job_grade" 
                      //value={formData.employeeInformation.job_grade || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                        <option value="C3">C3</option>
                        <option value="C4">C4</option>
                        <option value="C5">C5</option>
                        <option value="C6">C6</option>
                      </select></div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Tech Stack
                      </label>
                      <input type="text" 
                        placeholder="Work Force's Tech Stack"
                        name = 'tech_stack'
                        value={formData.candidateInformation.personInformation.tech_stack}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Employee Status
                      </label>
                      <select name="employee_status"
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
                        onChange={handleInputChange}
                        //value={formData?.candidateInformation.propose_action || ''}
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
                        Reson Current State
                      </label>
                      <select 
                        name='reason_current_status'
                        onChange={handleInputChange}
                        //value={formData?.candidateInformation.reason_current_status || ''}
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
                      <input type="text" id="Name" placeholder="Work Force's Expected Salary"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className=" " >
                    <label className="font-bold sm:text-l pb-3">
                      Skills
                    </label>
                    {/* <SkillsInput /> */}
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