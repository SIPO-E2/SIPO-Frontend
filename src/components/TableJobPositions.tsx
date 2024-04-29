
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import TableOpenings from './TableOpenings';
import { useApisStore } from '../store';
import { deleteJobPosition } from '../api/jobPositionAPI';
import DeleteModal from './DeleteModal';
import React from 'react';
import { JobPosition } from '../types';
import { Link } from 'react-router-dom';

interface Props{
    filters: {
        division: string[];
        skills: string[];
        demandCuration: string[];
        exclusivity: string[];
      };
}

const TableJobPositions  = ({filters}: Props) => {

    const {jobPositions, fetchJobPositions} = useApisStore();

    const [open, setOpen] = useState<boolean[]>([]);
    
    const [deleteActive, setDeleteActive] =  useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(-1);


    useEffect(() => {
        fetchJobPositions();
    },[]);

    useEffect(() => {
        setOpen(new Array(jobPositions.length).fill(false));
    }, [jobPositions.length]);


    const toggleAccordion = (index:number) => {
   
        setOpen(open.map((state,i) => i === index ? !state:state));
    };

    console.log(jobPositions);
    
    const handleDeleteJobPosition = async (jobPositionId: number) => {
        try {
            await deleteJobPosition(jobPositionId);
        } catch(error){
            console.error('Error deleting project: ', error);
            alert('Failed to delete project');
        }
    };

    return (

        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center"> Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status </th>
                        <th scope="col" className="px-6 py-3 text-center">Owner</th>
                        <th scope="col" className="px-6 py-3 text-center"> Division</th>
                        <th scope="col" className="px-6 py-3 text-center"> Bill Rate </th>
                        <th scope="col" className="px-6 py-3 text-center">Posting Type</th>
                        <th scope="col" className="px-6 py-3 text-center"> Demand Curation </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
                    {jobPositions.map((jobPosition, index) => (
                        <React.Fragment key={jobPosition.id}>

                              {(function() {
                              console.log(jobPosition.owner_project);
                              return null;  // Return a valid React child
                           })()}
                            <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium ">{jobPosition.id}</th>
                        <td className="px-6 py-4 text-center">{jobPosition.name} </td>
                        <td className="px-6 py-4 text-center">{jobPosition.status}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.owner_project.owner_user.name}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.division}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.bill_rate}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.posting_type}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.demand_curation} </td>

                        <td className="pl-12 py-4">
                            <button 
                            type="button" 
                            className="font-medium hover:underline"
                            onClick={()=> toggleAccordion(index)}
                            >
                                <FontAwesomeIcon icon={faCircleChevronDown} className={`transition-transform ${open[index] ? 'rotate-180': 'rotate-0'}`} />
                            </button>
                        </td>

                        <td className="pl-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3  py-4">
                          <Link to={`/accountManager/jobPositions/editJobPosition/${jobPosition.id}`}>
                             <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                             </button>
                          </Link>
                        </td>

                        <td className=" pr-6 py-4">
                            <button 
                            onClick={() => {setDeleteActive(true); setSelectedId(jobPosition.id)}}
                            type="button" 
                            className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                       
                    </tr>
                    {open[index] && (
                <tr className="border-b dark:border-gray-700">
                  <td colSpan={12}>
                    <div id={`accordion-arrow-icon-${index}`} className={!open[index] ? "hidden" : ""}>
                   
                      <div className="pl-6 pr-6 border border-t-0 border-gray-200 dark:border-gray-700">
                        <TableOpenings openings = {jobPosition.openings_list}/>
                       
                      </div>
                    </div>
                  </td>
                </tr>
              )}

                        </React.Fragment>
                    ))}
                    
                    
                </tbody>
            </table>
            <DeleteModal isActive = {deleteActive} selectedId={selectedId} setDeleteActive={setDeleteActive} onDeleteConfirm={handleDeleteJobPosition}/>
        </div>

    )
}

export default TableJobPositions