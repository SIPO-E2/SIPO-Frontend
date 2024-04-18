import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


interface Props { };

const Projects = (props: Props) => {
  return (
    <>
      <div className="w-full">

        <div className="px-5 pt-4 d-flex mb-3">

          <div className="p-2 me-auto">
            <h1> Project </h1>
          </div>

          <div className="flex items-center space-x-4">

            <div className="p-2 flex items-center justify-center ">
              <Link to="newProjects">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add Project </button>
              </Link>
            </div>

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
            <button type="button" className="pl-5">
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
        <hr className="border-2 ml-6 mr-6 border-black-900" />
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg p-4 text-center">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3"> Name</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Posting Date </th>
                        <th scope="col" className="px-6 py-3"> Owner</th>
                        <th scope="col" className="px-6 py-3">Expected Closure Date </th>
                        <th scope="col" className="px-6 py-3">Revenue</th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>
                        <th scope="col" className="px-6 py-3"> </th>

                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079284V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
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
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079285V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
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
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079286V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
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
                    <tr className="border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079287V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
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
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1079288V
                        </th>
                        <td className="px-6 py-4">
                            SOW GOOGLE 01.24
                        </td>
                        <td className="px-6 py-4">
                            70%
                        </td>
                        <td className="px-6 py-4">
                            1/12/2024
                        </td>
                        <td className="px-6 py-4">
                            Sasha Valdes
                        </td>
                        <td className="px-6 py-4">
                            2/26/2024
                        </td>
                        <td className="px-6 py-4">
                            $78,000.00
                        </td>

                        <td className="pl-12 py-4">
                            <button type="button" className="font-medium hover:underline">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </td>

                        <td className="pl-3 py-4">
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
                </tbody>
            </table>
        </div>
    </>
  )
};

export default Projects;