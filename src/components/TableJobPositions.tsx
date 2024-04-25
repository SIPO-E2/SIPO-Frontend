
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import TableOpenings from './TableOpenings';
import { getAllJobPositions } from '../api/jobPositionAPI';
import { deleteJobPosition } from '../api/jobPositionAPI';
import DeleteModal from './DeleteModal';
import React from 'react';
import { JobPosition } from '../types/globals';

interface Props{}

const TableJobPositions  = (_props: Props) => {

    const[jobPositions, setJobPositions] = useState<JobPosition[]>([]);
    const [open, setOpen] = useState<boolean[]>([]);
    
    const [deleteActive, setDeleteActive] =  useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(-1);


    useEffect(() => {
        const fetchJobPositions = async() => {
            try{
                const fetchedJobPositions = await getAllJobPositions();
                setJobPositions(fetchedJobPositions);
            } catch(error){
                console.error('Failed to fetch job positions', error);
            }
        };

        fetchJobPositions();
    },[]);

    

    useEffect(() => {
        setOpen(new Array(jobPositions.length).fill(false));
    }, [jobPositions.length]);


    const toggleAccordion = (index:number) => {
   
        setOpen(open.map((state,i) => i === index ? !state:state));
    };

    const handleDeleteJobPosition = async (jobPositionId: number) => {
        try {
            await deleteJobPosition(jobPositionId);
            setJobPositions(jobPositions.filter(jobPosition => jobPosition.id !== jobPositionId));
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
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{jobPosition.id}</th>
                        <td className="px-6 py-4 text-center">{jobPosition.name} </td>
                        <td className="px-6 py-4 text-center">{jobPosition.status}</td>
                        <td className="px-6 py-4 text-center">{jobPosition.owner_project.owner_client.owner_user.name}</td>
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
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
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