import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter,faEye, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { createPipeline, getPipelines } from '../../../api/pipelineAPI';
import { useApisStore } from '../../../store';

interface Props {}

const PipelinePage = (props: Props)=>{

  const{pipelines, fetchPipelines} = useApisStore();

  useEffect(() =>{
    fetchPipelines();
  },[])


  // Función para agregar un nuevo pipeline
  const addNewPipeline = async (newPipeline: Pipeline) => {
    try {
      // Llama a la función de API para crear el pipeline
      await createPipeline(newPipeline);
      // Actualiza el estado de los pipelines después de agregar uno nuevo
      const updatedPipelines = await getPipelines();
      fetchPipelines();
    } catch (error) {
      console.error('Error creating pipeline:', error);
    }
  };
  
  // const [dropdownOpen, setDropdownOpen] = useState([false, false, false, false]);

  // const toggleDropdown = (index: number) => {
  //   const newDropdownState = [...dropdownOpen];
  //   newDropdownState[index] = !newDropdownState[index];
  //   setDropdownOpen(newDropdownState);
  // };

  return(
  <>
    <div className="w-full">

      <div className='px-5 pt-4 d-flex mb-3'>

        <div className="p-2 me-auto">
          <h1> Work Force </h1>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center space-x-4">

          <Link to={'/resourceManager/pipeline/addNewPipeline'}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Pipeline
            </button>
          </Link>

          <div className="flex items-center border rounded-lg overflow-hidden w-64 ">

            <span className="pl-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m2-5a6.65 6.65 0 11-14 0 6.65 6.65 0 0113.3 0z"></path></svg>
            </span>

            <input type="search" id="default-search" className="p-2 pl-0 w-full text-sm bg-transparent focus:outline-none" placeholder="Search " />

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>
        </div>

        <div className="p-2 flex items-center justify-center">
          <button className="pl-5" type="button" >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>

      <hr className="border-2 ml-10 mr-10 border-black-900" />

      {/* Selection Bar  (3 views)*/}
      <div className='ml-10 mr-10 p-4 d-flex justify-content-between'>
        <div className='d-flex flex-row'>
          <div className='mr-20'>
            <Link to="/resourceManager/pipeline">
              <button className='btn btn-dark btn-lg rounded'>Pipeline</button>
            </Link>
          </div>
          <div className='mr-20'>
            <Link to="/resourceManager/bench">
              <button className='btn btn-dark btn-lg rounded'>Bench</button>
            </Link>
          </div>
          <div className='mr-20'>
              <Link to="/resourceManager/billing">
                  <button className='btn btn-dark btn-lg rounded'>Billing</button>
              </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg p-4">
        <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">ID</th>
              <th scope="col" className="px-6 py-3 text-center">Name</th>
              <th scope="col" className="px-6 py-3 text-center">Candidate Work Status </th>
              <th scope="col" className="px-6 py-3 text-center">Candidate Status </th>
              <th scope="col" className="px-6 py-3 text-center">Division</th>
              <th scope="col" className="px-6 py-3 text-center">Tech Stack</th>
              <th scope="col" className="px-6 py-3 text-center">Date of Joining </th>
              <th scope="col" className="px-6 py-3 text-center">Move To</th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
              <th scope="col" className="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((pipeline) => (
              <tr className="border-b dark:border-gray-700" key={pipeline.id}>
                <th scope="row"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {pipeline.id}
                </th>
                <td className="px-6 py-4 text-center">
                  {pipeline.candidateInformation.personInformation.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {pipeline.candidateInformation.workStatus}
                </td>
                <td className="px-6 py-4 text-center">
                  {pipeline.candidateInformation.status}
                </td>
                <td className="px-6 py-4 text-center">
                  {pipeline.candidateInformation.personInformation.division}
                </td>
                <td className="px-6 py-4 text-center">
                  {pipeline.candidateInformation.personInformation.tech_stack}
                </td>
                <td className="px-6 py-4 text-center">
                  19/04/24
                  {/* {pipeline.pipelineSince.toString()} */}
                </td>

                <td className="px-6 py-4">
                  {/* <div className="dropdown mr-1">
                    <button type="button" className="btn btn-info dropdown-toggle" onClick={() => toggleDropdown(index)} aria-haspopup="true" aria-expanded={dropdownOpen[index] ? "true" : "false"}>
                      Move To
                    </button>
                    
                    <div className={`dropdown-menu ${dropdownOpen[index] ? 'show' : ''}`}>
                      <a className="dropdown-item" href="#">Bench</a>
                      <a className="dropdown-item" href="#">Billing</a>
                    </div>
                  </div> */}
                </td>

                <td className="pl-6 py-4">
                  <button type="button" className="font-medium hover:underline">
                      <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>

                <td className="pl-3  py-4">
                  <Link to={"/resourceManager/pipeline/editPipeline"}>
                    <button type="button" className="font-medium hover:underline">
                       <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </Link>
                </td>

                <td className=" pr-6 py-4">
                    <button type="button" className="font-medium hover:underline">
                        <FontAwesomeIcon icon={faTrash} /> 
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

export default PipelinePage;