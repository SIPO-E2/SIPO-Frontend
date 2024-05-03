import Props from "./EditBenchPage";
import SkillsInput from "../../../components/SkillsInput";
import UserProfile from "../../../components/UserProfile";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";
import { CandidateStatus, CandidateWorkStatus, Division, EmployeeStatus, Gender, ProposedAction, ReasonCurrentStatus } from "../../../types/enums";
import { Bench, Candidate } from "../../../types/entities";
import { getBench, updateBench } from "../../../api/benchAPI";
import { updatePerson } from "../../../api/personAPI";
import { updateCandidate } from "../../../api/candidateAPI";
import { updateEmployee } from "../../../api/EmployeeAPI";

interface Props {
  id: string;
}

const EditBenchPage = (props: Props)=>{

  const{id} = useParams<{id:string}>();

  //Alert state 
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const[formData, setFormData] = useState<Bench>({
    id: 0,
    employeeId: 0,
    employeeInformation: {
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
          image: '',
          division: Division.default,
          tech_stack: '',
          skills: [],
          candidateInformation: {} as Candidate,
          activeDB: false,
        },
        status: CandidateStatus.Other,
        workStatus: CandidateWorkStatus.Other,
        reason_current_status: ReasonCurrentStatus.OtherRCS,
        status_date: new Date(),
        propose_action: ProposedAction.OtherPA,
        allocations: [],
        activeDB: false,
       
      },
      status: EmployeeStatus.Billing,
      reason_current_status: ReasonCurrentStatus.OtherRCS,
      status_date: new Date(),
      salary: 0,
      job_title: '',
      job_grade: '',
      joining_date: new Date(),
      openings: [],
      activeDB: false,
    },
    benchSince: new Date(),
    billingStartDate: new Date(),
    activeDB: false,
  })

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      employeeInformation: {
        ...prevState.employeeInformation,
        [name]: value,
        candidateInformation: {
          ...prevState.employeeInformation.candidateInformation,
          [name]: value,
          personInformation: {
            ...prevState.employeeInformation.candidateInformation.personInformation,
            [name]: value
          }
        }
      }
    }));
  };

  
  // ...(bench.data || {}),
  // employeeInformation: {
  //   ...(bench.data?.employeeInformation || {}), // Si bench.data.employeeInformation es nulo o indefinido, usa un objeto vacío
  //   candidateInformation: {
  //     ...(bench.data?.employeeInformation?.candidateInformation || {}), // Si bench.data.employeeInformation.candidateInformation es nulo o indefinido, usa un objeto vacío
  //     personInformation: bench.data?.employeeInformation?.candidateInformation?.personInformation || {} // Asegura que personInformation no sea nulo o indefinido
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bench = await getBench(id || '');
        console.log("Data from API:", bench);
        setFormData({
          ...bench.data,
          employeeInformation: {
            ...bench.data.employeeInformation,
            candidateInformation: {
              ...bench.data.employeeInformation.candidateInformation,
              personInformation: {
                ...bench.data.employeeInformation.candidateInformation?.personInformation,
              }
            }
          }
        });
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching bench data:",error);
      }
    };
    fetchData();
  }, [id]);


  const navegationEdit = useNavigate();
  // Manejar la presentación del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    console.log("Form data:",formData)
    console.log("Submit button clicked"); // Agregar este console.log para verificar si handleSubmit se está llamando
    event.preventDefault();
    if(formData){
      try{
        await updateBench(id || '', formData);
        await updatePerson(formData.employeeInformation.candidateInformation.personInformation.id, formData.employeeInformation.candidateInformation.personInformation);
        await updateCandidate(formData.employeeInformation.candidateInformation.id, formData.employeeInformation.candidateInformation); 
        await updateEmployee(String(formData.employeeInformation.id || ''), formData.employeeInformation);

        //Mostrae alerta
        setShowAlert(true);
        setTimeout(() =>{
          navegationEdit('/resourceManager/bench');
        },2000)
      }catch(error){
        console.error("Error updating bench:", error);
      
      }
    }
  };


  const{id} = useParams<{id:string}>();

  //Alert state 
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const[formData, setFormData] = useState<Bench>({
    id: 0,
    employeeId: 0,
    employeeInformation: {
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
          image: '',
          division: Division.default,
          tech_stack: '',
          skills: [],
          candidateInformation: {} as Candidate,
          activeDB: false,
        },
        status: CandidateStatus.Other,
        workStatus: CandidateWorkStatus.Other,
        reason_current_status: ReasonCurrentStatus.OtherRCS,
        status_date: new Date(),
        propose_action: ProposedAction.OtherPA,
        allocations: [],
        activeDB: false,
       
      },
      status: EmployeeStatus.Billing,
      reason_current_status: ReasonCurrentStatus.OtherRCS,
      status_date: new Date(),
      salary: 0,
      job_title: '',
      job_grade: '',
      joining_date: new Date(),
      openings: [],
      activeDB: false,
    },
    benchSince: new Date(),
    billingStartDate: new Date(),
    activeDB: false,
  })

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      employeeInformation: {
        ...prevState.employeeInformation,
        [name]: value,
        candidateInformation: {
          ...prevState.employeeInformation.candidateInformation,
          [name]: value,
          personInformation: {
            ...prevState.employeeInformation.candidateInformation.personInformation,
            [name]: value
          }
        }
      }
    }));
  };

  
  // ...(bench.data || {}),
  // employeeInformation: {
  //   ...(bench.data?.employeeInformation || {}), // Si bench.data.employeeInformation es nulo o indefinido, usa un objeto vacío
  //   candidateInformation: {
  //     ...(bench.data?.employeeInformation?.candidateInformation || {}), // Si bench.data.employeeInformation.candidateInformation es nulo o indefinido, usa un objeto vacío
  //     personInformation: bench.data?.employeeInformation?.candidateInformation?.personInformation || {} // Asegura que personInformation no sea nulo o indefinido
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bench = await getBench(id || '');
        console.log("Data from API:", bench);
        setFormData({
          ...bench.data,
          employeeInformation: {
            ...bench.data.employeeInformation,
            candidateInformation: {
              ...bench.data.employeeInformation.candidateInformation,
              personInformation: {
                ...bench.data.employeeInformation.candidateInformation?.personInformation,
              }
            }
          }
        });
        //setLoading(false);
      } catch (error) {
        console.error("Error fetching bench data:",error);
      }
    };
    fetchData();
  }, [id]);


  const navegationEdit = useNavigate();
  // Manejar la presentación del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    console.log("Form data:",formData)
    console.log("Submit button clicked"); // Agregar este console.log para verificar si handleSubmit se está llamando
    event.preventDefault();
    if(formData){
      try{
        await updateBench(id || '', formData);
        await updatePerson(formData.employeeInformation.candidateInformation.personInformation.id, formData.employeeInformation.candidateInformation.personInformation);
        await updateCandidate(formData.employeeInformation.candidateInformation.id, formData.employeeInformation.candidateInformation); 
        await updateEmployee(String(formData.employeeInformation.id || ''), formData.employeeInformation);

        //Mostrae alerta
        setShowAlert(true);
        setTimeout(() =>{
          navegationEdit('/resourceManager/bench');
        },2000)
      }catch(error){
        console.error("Error updating bench:", error);
      
      }
    }
  };


  const userName = 'Jane Doe';
  const userRole = 'Developer'; 

  return (
    <>
      <div className="flex h-screen">

        {/* Main Content */}
        <div className="flex-grow ">

          <div className="text-left px-5 pt-4 mb-5">
            <h1> Edit Bench </h1>
          </div>

          {showAlert && ( // Mostrar el mensaje de alerta si showAlert es true
            <div className="alert alert-success" role="alert">
              Information updated!
            </div>
          )}

          <div className="flex p-10 gap-4 ml-10 mr-10 border-top border-dark">
            <div className=" w-1/4">
              <div className=" flex items-center bg-white p-5 shadow rounded mb-6">
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
              {/* <UserProfile name={userName} role={userRole} /> */}

              <div className=" flex items-center bg-white p-5 shadow rounded">
                <div className="grid grid-cols-3 gap-4">
                  <div className="">
                    <label> 
                      On Bench since
                    </label>
                    <p>12/04/23</p>
                  </div>
                  <div>
                    <label>
                      Last update
                    </label>
                    <p>12/04/23</p>
                  </div>
                  <div>
                    <label>
                      Updated by
                    </label>
                    <p>Mariana</p>
                  </div>
                </div>
              </div>

              <UserProfile name={userName} role={userRole} />

            </div>

            <form className="flex-1 mt-0 bg-white p-5 shadow rounded"  onSubmit={handleSubmit}>

              <div className="flex flex-col ">

                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.employeeInformation.candidateInformation.personInformation.name || ''}
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
                      name="emai"  
                      //value={formData.employeeInformation.candidateInformation.personInformation.emai || ''}
                      onChange={handleInputChange}
                      placeholder="Work Force's Email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Phone
                    </label>
                    <input type="number" 
                      name="celp"  
                     // value={formData.employeeInformation.candidateInformation.personInformation.celp || ''}
                      onChange={handleInputChange}
                      placeholder="Work Force's Phone"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">

                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Gender
                    </label>
                    <select 
                      name='gend'
                      onChange={handleInputChange}
                      //value={formData?.employeeInformation.candidateInformation.personInformation.gend || ''}
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
                    <select id="client" 
                    name="divi"
                    //value={formData.employeeInformation.candidateInformation.personInformation.divi || ''}
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
                    <input type="text" 
                      name="job_title"
                      value={formData.employeeInformation.job_title || ''}
                      onChange={handleInputChange}
                      placeholder="Work Force's Job Title"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Job Grade
                    </label>
                    <select name="job_grade" 
                      value={formData.employeeInformation.job_grade || ''}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
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
                    <input type="text" name="tech"
                    //value={formData.employeeInformation.candidateInformation.personInformation.tech || ''}
                    onChange={handleInputChange}
                    placeholder="Work Force's Tech Stack"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>

                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Propose Action
                    </label>
                    <select id="client" 
                    name="propose_action"
                      value={formData.employeeInformation.candidateInformation.propose_action || ''}
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

                <div className="mb-3 ">
                    <label className="font-bold sm:text-l pb-3">
                      Reson Current Status
                    </label>
                    <select id="client" 
                    value={formData.employeeInformation.candidateInformation.reason_current_status || ''}
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
                      Salary
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.employeeInformation.salary || ''}
                      onChange={handleInputChange}
                      placeholder="Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>

                  <div className="mb-3 " >
                    <label className="font-bold sm:text-l pb-3">
                      Skills
                    </label>
                    {/* <SkillsInput onChange={function (skills: string[]): void {
                      throw new Error("Function not implemented.");
                    } } /> */}
                  </div>

                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Last Client ID
                    </label>
                    <input type="text" name="expectedSalary"  placeholder="Expected Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div className="">
                    <label className="font-bold sm:text-l pb-3">
                      Actual Client ID
                    </label>
                    <input type="text" name="expectedSalary"  placeholder="Expected Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div className="">
                    <label className="font-bold sm:text-l pb-3">
                      Work Hours
                    </label>
                    <input type="text" name="expectedSalary"  
                      //value={formData}
                      placeholder="Expected Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold sm:text-l pb-3">
                      Move To
                    </label>
                    <div>
                      <button className="btn btn-primary mr-6 btn-lg">
                        Billing
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex px-10 pt-4 w-full justify-end">
                    <div className="px-3">
                      <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                    </div>
                    <div className=" ">
                      <button type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Update </button>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBenchPage;

