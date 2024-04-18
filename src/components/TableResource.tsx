import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';



const TableResource = () => {
    return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3"> Name</th>
                    <th scope="col" className="px-6 py-3">Tech Stack</th>
                    <th scope="col" className="px-6 py-3">Region</th>
                    <th scope="col" className="px-6 py-3">Division</th>
                    <th scope="col" className="px-6 py-3">Date of Joining </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </th>
                    <td className="px-6 py-4">
                        Mariana García Gómez
                    </td>
                    <td className="px-6 py-4">
                        JavaScript
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        IT
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
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
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2
                    </th>
                    <td className="px-6 py-4">
                        Guillermo Valdez Contreras
                    </td>
                    <td className="px-6 py-4">
                        C++
                    </td>
                    <td className="px-6 py-4">
                        Brazil
                    </td>
                    <td className="px-6 py-4">
                        HR
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
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
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        3
                    </th>
                    <td className="px-6 py-4">
                        Uma Umaña
                    </td>
                    <td className="px-6 py-4">
                        TypeScript
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                    Finance
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
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
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        4
                    </th>
                    <td className="px-6 py-4">
                        Alejandra García Gómez
                    </td>
                    <td className="px-6 py-4">
                        JavaScript
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        IT
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
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
            </tbody>
        </table>
    </div>

    )
}

export default TableResource;