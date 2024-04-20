import { Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import { createPipeline, getPipelines } from '../../../api/PipelineAPI'; // Importa la función de API necesaria
import { getCandidates, createCandidate } from "../../../api/candidateAPI";
import { getPersons, createPerson} from "../../../api/PersonAPI";
import { act } from "react-dom/test-utils";


interface Props{
  //addNewPipeline: (newPipeline: Pipeline) => void;
};

const AddPipelinegPage = (props:Props)=>{

 
  //const [division, setDivision] = useState<Division[]>([]);
  const [person, setPerson] = useState<Person>({
    id: 0,
    name: "",
    email: "",
    celphone: 0,
    gender: {} as Gender,
    image: "",
    division: {} as Division,
    tech_stack: "",
    skills: [],
    candidateInformation: {} as Candidate,
    activeDB: false
  });

  const [candidate, setCandidate] = useState<Candidate>({
    id: 0,
    personId: 0,
    personInformation: {} as Person,
    status: {} as CandidateStatus,
    workStatus: {} as CandidateWorkStatus,
    reason_current_status: "",
    status_date: new Date(),
    propose_action: "",
    allocations: [],
    activeDB: false
  });

  const [pipeline, setPipeline] = useState<Pipeline>({
    id: 0,
    candidateId: 0,
    candidateInformation: {} as Candidate,
    expectedSalary: 0,
    pipelineSince: new Date(),
    pipelineEndDate: new Date(),
    activeDB: false
  
  });

  useEffect(() => {
    getPipelines().then((data: any) => setPipeline(data));
    getCandidates().then((data: any) => setCandidate(data));
    getPersons().then((data: any) => setPerson(data));
  }, []);

  // Maneja el cambio de los campos del formulario

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Actualizar el estado de acuerdo al nombre del campo
    if (name === 'name') {
      setPerson(prevState => ({
        ...prevState,
        name: value,
      }));
    } else if (name === 'phone') {
      // Parsea el valor del teléfono a un número
      const phoneNumber = parseInt(value);
      setPerson(prevState => ({
        ...prevState,
        celphone: phoneNumber,
      }));
    }
  };
  
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setPipeline(prevState => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = () => {
  //   createPipeline(pipeline).then((response: any) => {
  //     // Handle the response from the API
  //   });
  //   createPerson(person).then((response: any) => {
  //     // Handle the response from the API
  //   });
  //   createCandidate(candidate).then((response: any) => {
  //     // Handle the response from the API
  //   });
  // };

  const handleSubmit = () => {
    // Guardar la nueva persona
    createPerson(person)
      .then((personResponse: any) => {
        // Verificar si la persona se creó correctamente
        if (personResponse.success) {
          // Actualizar el estado de la persona con el ID asignado por la base de datos
          setPerson({ ...person, id: personResponse.id });
  
          // Crear un nuevo candidato asociado a la persona
          const newCandidate: Candidate = {
            ...candidate,
            personId: personResponse.id, // Asignar el ID de la persona recién creada
          };
          return createCandidate(newCandidate);
        } else {
          // Manejar el caso en que la creación de la persona falle
          console.error('Error creating person:', personResponse.error);
          throw new Error('Failed to create person');
        }
      })
      .then((candidateResponse: any) => {
        // Verificar si el candidato se creó correctamente
        if (candidateResponse.success) {
          // Actualizar el estado del candidato con el ID asignado por la base de datos
          setCandidate({ ...candidate, id: candidateResponse.id });
  
          // Crear un nuevo pipeline asociado al candidato
          const newPipeline: Pipeline = {
            ...pipeline,
            candidateId: candidateResponse.id, // Asignar el ID del candidato recién creado
          };
          return createPipeline(newPipeline);
        } else {
          // Manejar el caso en que la creación del candidato falle
          console.error('Error creating candidate:', candidateResponse.error);
          throw new Error('Failed to create candidate');
        }
      })
      .then((pipelineResponse: any) => {
        // Verificar si el pipeline se creó correctamente
        if (pipelineResponse.success) {
          // Actualizar el estado del pipeline con el ID asignado por la base de datos
          setPipeline({ ...pipeline, id: pipelineResponse.id });
  
          // Mensaje de éxito o cualquier otra acción necesaria después de guardar los datos
          console.log('Data saved successfully:', person, candidate, pipeline);
        } else {
          // Manejar el caso en que la creación del pipeline falle
          console.error('Error creating pipeline:', pipelineResponse.error);
          throw new Error('Failed to create pipeline');
        }
      })
      .catch((error: Error) => {
        // Manejar cualquier error que ocurra durante el proceso de creación y guardado de datos
        console.error('Error:', error.message);
      });
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
          <div className="w-1/4">
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
            
            <div className="flex flex-col mt-6">
              <div className="flex flex-row mb-3">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Id</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>A01253056</p>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="container bg-blue-300 rounded text-left">
                  <p>Joining Date</p>
                </div>

                <div className="container bg-gray-200 rounded text-left">
                  <p>12/12/2023</p>
                </div>
              </div>
            </div>
          </div>

            <form className="flex-1 mt-0 bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
            <div className="flex flex-col ">

              <div className="grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Name
                    </label>
                    <input type="text" name="name" value={person.name} onChange={handleInputChange} placeholder="Work Force's Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Email
                    </label>
                    <input type="text" name="email" value={person.email} onChange={handleInputChange} placeholder="Work Force's Email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Phone
                    </label>
                    <input type="number" name="phone" value={person.celphone} onChange={handleInputChange} placeholder="Work Force's Phone"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
              </div>

              <div className=" grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Gender
                    </label>
                    <input type="text" name="gender" value={person.gender} onChange={handleInputChange} placeholder="Work Force's Gender"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Division
                    </label>
                    <input type="text" name="division" value={person.division} onChange={handleInputChange} placeholder="Work Force's Division"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Job Grade/
                    </label>
                    <input type="text" id="Name" placeholder="Work Force's Job Grande"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Job Title/
                    </label>
                    <input type="text" id="Name" placeholder="Work Force's Job Title"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Tech Stack
                    </label>
                    <input type="text" name="techStack" value={person.tech_stack} onChange={handleInputChange} placeholder="Work Force's Tech Stack"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Status
                    </label>
                    <input type="text" name="status" value={candidate.status} onChange={handleInputChange} placeholder="Work Force's Status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="mb-3">
                    <label className="font-bold sm:text-l pb-3">
                      Propose Action
                    </label>
                    <input type="text" name="proposeAction" value={candidate.propose_action} onChange={handleInputChange} placeholder="Work Force's Propose Action"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className=" ">
                    <label className="font-bold sm:text-l pb-3">
                      Reson Current State
                    </label>
                    <input type="text" name="reasonCurrentState" value={candidate.reason_current_status} onChange={handleInputChange} placeholder="Work Force's Reason Current Status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
                <div className="">
                    <label className="font-bold sm:text-l pb-3">
                      Expected Salary
                    </label>
                    <input type="text" name="expectedSalary" value={pipeline.expectedSalary} onChange={handleInputChange} placeholder="Expected Salary"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className=" ">
                    <label className="font-bold sm:text-l pb-3">
                      Skills
                    </label>
                    <input type="text" name="skills" value={person.skills} onChange={handleInputChange} placeholder="Work Force's Skills"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
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
  </>);
};

export default AddPipelinegPage;


