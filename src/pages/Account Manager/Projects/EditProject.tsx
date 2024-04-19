import SmallTableJP from "../../../components/SmallTableJP";

interface Props { };

const EditProjects = (props: Props) => {
    return (
        <>
            <div>
                <div className="text-left px-5 pt-4 mb-5">
                    <h1> Edit Project</h1>
                </div>


                <div className="flex p-10 gap-4">

                    <div className=" w-1/4 ">
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

                        <div className="flex-1">
                            <div className="pt-10 semi-bold mb-1">
                                <p> Jose Pérez</p>
                            </div>
                            <div className=" ">
                                <h4> Account Manager</h4>
                            </div>
                        </div>
                    </div>

                    <form className="flex-1 w-2/3 mt-0 bg-white p-5 shadow rounded ">


                        <div className=" flex flex-wrap ">

                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Name
                                    </label>
                                    <input type="text" id="Name" placeholder="Client's Name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>


                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Client
                                    </label>
                                    <select id="client" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="Select Client">Select Client</option>
                                        <option value="Microsoft">Microsoft</option>
                                        <option value="Google">Google</option>
                                        <option value="Temu">Temu</option>
                                    </select>
                                </div>
                            </div>



                            <div className="px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Region
                                    </label>
                                    <select id="client" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                                        <option value="Select Region">Select Region</option>
                                        <option value="Microsoft">Mexico</option>
                                        <option value="Google">Colombia</option>
                                        <option value="Temu">Estados Unidos</option>
                                    </select>
                                </div>
                            </div>


                            <div className=" px-3 sm:w-1/2 align-center">
                                <div className="mb-5">
                                    <label className="font-bold sm:text-l pb-3">
                                        Expected Closure Date
                                    </label>
                                    <input type="date" id="date" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>

                        </div>

                        <div className="flex px-3 w-full justify-end">
                            <button type="button" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded mb-3"> Add Job Position </button>
                        </div>


                        <div className="flex max-h-60  h-1/3 px-6 py-3 border border-t-0 border-gray-200 dark:border-gray-700 rounded">
                            <SmallTableJP />
                        </div>

                    </form>

                </div >
                <div className="flex px-10 pt-4 pb-5 w-full justify-end ">
                    <div className="px-3">
                        <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                    </div>

                    <div className=" ">
                        <button type="button" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Edit </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default EditProjects;