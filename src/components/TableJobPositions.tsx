
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


interface AccordionProps{}


interface JobPosition {
    id: string;
    name: string;
    client: string;
    status: string;
    division: string;
    billRate: string;
    postingType: string;
    demandCuration: string;
}

const jobPositions: JobPosition[] = [
    { id: '1079284V', name: 'SOW GOOGLE 01.24', client: 'Sasha Valdez', status: '70%', division: 'Brazil', billRate: '$78,000.00', postingType: 'New Headaccount', demandCuration: 'Strategic' },
    { id: '1079285V', name: 'SOW AMAZON 02.30', client: 'Michael Ruiz', status: '85%', division: 'USA', billRate: '$85,000.00', postingType: 'Recurring', demandCuration: 'Tactical' },
    { id: '1079286V', name: 'SOW FACEBOOK 03.15', client: 'Clara Oswald', status: '60%', division: 'UK', billRate: '$92,000.00', postingType: 'Ad-hoc', demandCuration: 'Operational' },
    // Add more rows as needed
];

const TableJobPositions  = (props: AccordionProps) => {

    const [open,setOpen] = useState<boolean[]>(new Array(jobPositions.length).fill(false));


    const toggleAccordion = (index:number) => {
        setOpen(open.map((state,i) => i === index ? !state:state));
    };
    return (

        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3"> Name</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Client</th>
                        <th scope="col" className="px-6 py-3"> Division</th>
                        <th scope="col" className="px-6 py-3">  Bill Rate </th>
                        <th scope="col" className="px-6 py-3">Posting Type</th>
                        <th scope="col" className="px-6 py-3"> Demand Curation </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
                    {jobPositions.map((position, index) => (
                        <React.Fragment key={position.id}>
                            <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{position.id}</th>
                        <td className="px-6 py-4">{position.name} </td>
                        <td className="px-6 py-4">{position.status}</td>
                        <td className="px-6 py-4">{position.client}</td>
                        <td className="px-6 py-4">{position.division}</td>
                        <td className="px-6 py-4">{position.billRate}</td>
                        <td className="px-6 py-4">{position.postingType}</td>
                        <td className="px-6 py-4">{position.demandCuration} </td>

                        <td className="pl-12 py-4">
                            <button 
                            type="button" 
                            className="font-medium hover:underline"
                            onClick={()=> toggleAccordion(index)}
                            >
                                <FontAwesomeIcon icon={faCircleChevronDown} />
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

                        <td className=" pl-3 pr-6 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </td>
                       
                    </tr>
                    {open[index] && (
                <tr className="border-b dark:border-gray-700">
                  <td colSpan={12}>
                    <div id={`accordion-color-body-${index}`} className={!open[index] ? "hidden" : ""}>
                      {/* Aquí va el contenido del acordeón adaptado del HTML que proporcionaste */}
                      <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                        <p>Información adicional para {position.name}</p>
                        {/* Puedes expandir esto con más detalles como se proporcionó en el HTML de acordeón */}
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