//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import TableResource from '../../components/TableResource';
import { getAllPipelines } from '../../api/Resource Manager/PipelineApi';
import { getAllBenches } from '../../api/Resource Manager/BenchApi';
import { getAllBillings } from '../../api/Resource Manager/BillingApi';
import { Pipeline } from '../../types';
import { getAllCandidates } from '../../api/Resource Manager/CandidateApi';
import { Candidate } from '../../types';
interface Props {}

const ResourcePage = (props: Props)=>{



  return(
  <>
  <div className="w-full">

    {/* Main Content */}
    <div className="flex-grow">
      <Outlet />
      
      <div className="px-5 pt-4 d-flex mb-3">

        <div className="p-2 me-auto">
          <h1> Work Force </h1>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center space-x-4">

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
            <Link to="resourceManager/pipeline">
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
      <TableResource /> 
    </div>
  </div>
  </>);}

export default ResourcePage;