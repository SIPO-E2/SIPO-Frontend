import UserProfile from "../../../components/UserProfile";
import SkillsInput from "../../../components/SkillsInput";
import { useState } from "react";

interface Props{};

const AddBillingPage = (props:Props)=>{
  const userName = 'Jane Doe';
  const userRole = 'Developer';
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    
  });

  return(
    <>
      <div className="flex h-screen">
  
        {/* Main Content */}
        <div className="flex-grow">
          <div className="text-left px-5 pt-4 mb-5">
            <h1> New Billing</h1>
          </div>
  
          <div className="flex p-10 gap-4 ml-10 mr-10 border-top border-dark">
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
  
          <form className="flex-1 mt-0 bg-white p-5 shadow rounded">
              <div className="flex flex-col ">
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Name
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Email
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Email"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Phone
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Phone"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>
  
                <div className=" grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Gender
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Gender"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Division
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Division"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Job Grade
                      </label>
                      <select name="" id="" className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                        <option value="C3">C3</option>
                        <option value="C4">C4</option>
                        <option value="C5">C5</option>
                        <option value="C6">C6</option>
                      </select>
                    </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Job Title
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Job Title"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Tech Stack
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Tech Stack"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Employee Status
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Employee Status"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className="mb-3">
                      <label className="font-bold sm:text-l pb-3">
                        Propose Action
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Propose Action"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div className=" ">
                      <label className="font-bold sm:text-l pb-3">
                        Reson Current State
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Reson Current State"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                  </div>
                  <div className="">
                      <label className="font-bold sm:text-l pb-3">
                        Salary
                      </label>
                      <input type="text" id="Name" placeholder="Work Force's Expected Salary"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                </div>
  
                <div className="grid grid-cols-3 gap-4">
                  <div className=" " >
                    <label className="font-bold sm:text-l pb-3">
                      Skills
                    </label>
                    {/* <SkillsInput /> */}
                  </div>
                </div>
  
                <div className="flex px-10 pt-4 w-full justify-end">
                  <div className="px-3">
                    <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                  </div>
                  <div className=" ">
                    <button type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>);
};

export default AddBillingPage;