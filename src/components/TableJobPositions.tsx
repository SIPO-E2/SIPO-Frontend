
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import TableOpenings from './TableOpenings';
import { getAllJobPositions } from '../api/jobPositionAPI';
import { useApisStore } from '../store';
import React from 'react';

interface Props{}

const TableJobPositions  = (props: Props) => {

    const[jobPositions, setJobPositions] = useState<JobPosition[]>([]);

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

    const [open, setOpen] = useState<boolean[]>([]);

    useEffect(() => {
        setOpen(new Array(jobPositions.length).fill(false));
    }, [jobPositions.length]);


    const toggleAccordion = (index:number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpen(open.map((state,i) => i === index ? !state:state));
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
                    {jobPositions.map((position, index) => (
                        <React.Fragment key={position.id}>

                              {(function() {
                              console.log(position.owner_project);
                              return null;  // Return a valid React child
                           })()}
                            <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{position.id}</th>
                        <td className="px-6 py-4 text-center">{position.name} </td>
                        <td className="px-6 py-4 text-center">{position.status}</td>
                        <td className="px-6 py-4 text-center">{position.owner_project.owner_client.owner_user.name}</td>
                        <td className="px-6 py-4 text-center">{position.division}</td>
                        <td className="px-6 py-4 text-center">{position.bill_rate}</td>
                        <td className="px-6 py-4 text-center">{position.posting_type}</td>
                        <td className="px-6 py-4 text-center">{position.demand_curation} </td>

                        <td className="pl-12 py-4">
                            <button 
                            type="button" 
                            className="font-medium hover:underline"
                            onClick={(e)=> toggleAccordion(index,e)}
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
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                       
                    </tr>
                    {open[index] && (
                <tr className="border-b dark:border-gray-700">
                  <td colSpan={12}>
                    <div id={`accordion-arrow-icon-${index}`} className={!open[index] ? "hidden" : ""}>
                   
                      <div className="pl-6 pr-6 border border-t-0 border-gray-200 dark:border-gray-700">
                        <TableOpenings openings = {position.openings_list}/>
                       
                      </div>
                    </div>
                  </td>
                </tr>
              )}

                        </React.Fragment>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>

    )
}

export default TableJobPositions