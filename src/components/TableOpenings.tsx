import React from "react";
import { useEffect, useState} from "react";
import { getOpenings } from "../api/openingAPI";
import { Opening } from "../types/globals";

interface Props{
    openings: Opening[];
}


const TableOpenings = ({openings}:Props) =>{
console.log(openings)

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

                    </tr>
                </thead>

                <tbody>
                    {openings.map((opening) => (
                
                        <React.Fragment key= {opening.id}>
                            
                            <tr className="border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{opening.id}</th>
                              <td className="px-6 py-4 text-center">{opening.status} </td>
                              <td className="px-6 py-4 text-center">{opening.open_date.toString()} </td>
                              <td className="px-6 py-4 text-center">{opening.close_date.toString()} </td>
                              <td className="px-6 py-4 text-center">{opening.close_reason} </td>
                            </tr>
                        </React.Fragment>
                    ))}

    

                    
                </tbody>

     
               
            </table>
        </div>

      
    )
}

export default TableOpenings;

