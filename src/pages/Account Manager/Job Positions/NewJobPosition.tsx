import SkillsInput from "../../../components/SkillsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserProfile from "../../../components/UserProfile";


interface Props { };

const NewJobPosition = (props: Props) => {

    const userName = 'Jane Doe';
    const userRole = 'Developer';

    return (
        <>
            <div >
                <div className="text-left px-5 pt-4 mb-5">
                    <h1> New Job Position</h1>
                </div>


                <div className="flex p-10  gap-4 ">

                    <div className=" w-1/4">
                        <div className=" flex items-center bg-white p-5 shadow rounded">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
                            </div>


                        </div>

                        <UserProfile name={userName} role={userRole} />
                    </div>

                    <form className="flex-1 mt-0 bg-white pl-[40px] pr-[40px] pt-5 pb-6 shadow rounded  ">


                        <div className=" flex flex-wrap ">

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Name
                                    </label>
                                    <input type="text" id="Name" placeholder="Job Position's Name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>


                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Owner
                                    </label>
                                    <input type="text" id="Name" placeholder="Bill Rate"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Bill Rate
                                    </label>
                                    <input type="text" id="Name" placeholder="Bill Rate"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Posting Type
                                    </label>
                                    <input type="text" id="Name" placeholder="Posting Type"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Division
                                    </label>
                                    <select id="client" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="central&south-america">Select Division</option>
                                        <option value="brazil">Central & South America</option>
                                        <option value="mexico">Brazil</option>
                                        <option value="Temu">Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Region
                                    </label>
                                    <select id="client" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="Select Region">Select Division</option>
                                        <option value="cr-heredia">CR - HEREDIA</option>
                                        <option value="cr-remote">CR - REMOTE</option>
                                        <option value="bz-campina">BZ - CAMPINA</option>
                                        <option value="cuu-hmo">CUU - HMO</option>
                                        <option value="cuu-hmo-remote">CUU - HMO - REMOTE</option>
                                        <option value="csa-colombia">CSA - COLOMBIA</option>
                                        <option value="bz-saopaulo-remote">BZ - SAO PAULO - REMOTE</option>
                                        <option value="cdmx">CDMX</option>
                                        <option value="cdmx-slp-mid">CDMX - SLP - MID</option>
                                        <option value="mx-mid">MX - MID</option>
                                        <option value="mx-cdmx-remote">MX - CDMX, REMOTE</option>

                                    </select>

                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Skills
                                    </label>
                                    <SkillsInput />
                                </div>
                            </div>

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Posting Type
                                    </label>
                                    <input type="text" id="Name" placeholder="Posting Type"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                            <div className="px-3 sm:w-1/2 align-center">


                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Owner
                                    </label>
                                    <input type="text" id="Name" placeholder="Posting Type"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>

                            </div>

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <div className="flex items-center mb-4 ">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="default-checkbox" className="ms-2 font-bold sm:text-l font-bold text-black dark:text-gray-300">Exclusivity</label>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div className="flex  w-full justify-end pb-3">
                            <button type="button" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-center font-bold py-2 px-4 rounded"> Add Opening </button>
                        </div>

                        <div className="overflow-x-auto shadow-md sm:rounded-lg max-w-5xl mx-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                                        <th scope="col" className="px-6 py-3 text-center">Open date</th>
                                        <th scope="col" className="px-6 py-3 text-center">Closed date</th>
                                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                                        <th scope="col" className="px-6 py-3 text-center">Closed Reason</th>
                                        <th scope="col" className="px-6 py-3 text-center">Hours</th>
                                        <th scope="col" className="px-6 py-3 text-center"></th>
                                        <th scope="col" className="px-6 py-3 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="px-3 ">OP01</td>
                                        <td className="px-4 py-4">04/12/2024</td>
                                        <td className="px-3 py-4">
                                            <input type="date" className="border-2 rounded px-2 py-1 w-full" />
                                        </td>
                                        <td className="px-3 py-4">
                                            <select className="border-2 rounded px-2 py-1 w-[135px] ">
                                                <option value="" disabled>Status</option>
                                                <option value="open">Open</option>
                                                <option value="filled">Filled</option>
                                                <option value="client-interview">Client Interview</option>
                                                <option value="cancelled">Canceled</option>
                                                <option value="failed">Failed</option>

                                            </select>
                                        </td>
                                        <td className="px-3 py-4 ">
                                            <input type="text" className="border-2 rounded px-2 py-1 w-[90px]  " placeholder="Reason" />
                                        </td>
                                        <td className="px-3 py-4 ">
                                            <input type="text" className="border-2 rounded px-2 py-1 w-[70px] " placeholder="Hours" />

                                        </td>

                                        <td>
                                            <button type="button" className="ml-3 mt-1 ml-3 pr-1">

                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                        </td>

                                        <td className=" pr-1 py-4">
                                            <button type="button" className="font-medium hover:underline pl-2">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>

                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </form>

                </div >
                <div className="flex px-10 pt-4 w-full justify-end">
                    <div className="px-3">
                        <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                    </div>

                    <div className=" ">
                        <button type="button" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewJobPosition;

