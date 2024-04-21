import React from "react";
import { useEffect, useState} from "react";
import { getOpenings } from "../api/openingAPI";

interface Props{
    jobPositionId: number;
}


const TableOpenings = ({ jobPositionId }:Props) =>{

    const [openings, setOpenings] = useState<Opening[]>([]); 

    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await fetch(`/api/openings?jobPositionId=${jobPositionId}`);
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                const jsonResponse = await response.json();
                const data: Opening[] = jsonResponse.data;
                console.log(data);

                setOpenings(data);
                

            } catch (error) {
                console.error('Failed to fetch openings:', error);
            }
        };

        fetchOpenings();
    }, [jobPositionId]); 

    return(
        
        
        <div className=" relative sm:rounded-lg pt-4  pr-8 max-h-60 overflow-y-auto">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">Opening ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Status </th>
                        <th scope="col" className="px-6 py-3 text-center">Open Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Close Date</th>
                        <th scope="col" className="px-6 py-3 text-center">  Close Reason </th>
                        <th scope="col" className="px-6 py-3 text-center"> Owner </th>

                    </tr>
                </thead>

                <tbody>
                    {openings.map((position) => (
                
                        <React.Fragment key= {position.id}>
                            <tr className="border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{position.id}</th>
                              <td className="px-6 py-4 text-center">{position.status} </td>
                              <td className="px-6 py-4 text-center">hola </td>
                              <td className="px-6 py-4 text-center">hola </td>
                              <td className="px-6 py-4 text-center">{position.close_reason} </td>
                              <td className="px-6 py-4 text-center">{position.owner_jobPosition.name} </td>
                            </tr>
                        </React.Fragment>
                    ))}

                    
                </tbody>
            </table>
        </div>

      
    )
}

export default TableOpenings;

