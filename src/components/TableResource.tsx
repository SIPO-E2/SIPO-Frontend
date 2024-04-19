import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Candidate } from '../types';
import { useState, useEffect } from 'react';
import { getAllCandidates } from '../api/Resource Manager/CandidateApi';


const TableResource = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() =>{
    getAllCandidates().then((data: any) => setCandidates(data.data));
  },[])

    return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3"> Name</th>
                    <th scope="col" className="px-6 py-3">Tech Stack</th>
                    <th scope="col" className="px-6 py-3">Division</th>
                    <th scope="col" className="px-6 py-3">Date of Joining </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {candidates.map((candidate) =>(
                <tr className="border-b dark:border-gray-700" key = {candidate.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {candidate.id}
                    </th>
                    <td className="px-6 py-4">
                        {candidate.personInformation.name}
                    </td>
                    <td className="px-6 py-4">
                        {candidate.personInformation.tech_stack}
                    </td>
                    <td className="px-6 py-4">
                        {candidate.personInformation.division}
                    </td>
                    <td className="px-6 py-4">
                        {candidate.createdAt.toString()}
                    </td>
                    <td className='px-6 py-4 flex flex-row'>
                        <div className='pl-6 py-4 mr-6'>
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>

                        <div className='pl-3 py-4 mr-6'>
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </div>
                        
                        <div className='pl-3 py-4'>
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </button>
                        </div>
                    </td>
                </tr>

                ))}

            </tbody>
        </table>
    </div>

    )
}

export default TableResource;