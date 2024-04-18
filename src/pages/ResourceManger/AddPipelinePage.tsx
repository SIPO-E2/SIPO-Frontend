import { Link } from "react-router-dom";

interface Props{};

const AddPipelinegPage = (props:Props)=>{
  return(<>
  <div className="">

    {/* Main Content */}
    <div className="flex-flex-row">
      <div className="px-5 pt-4 d-flex mb-3">
        <div className="p-2 me-auto">
          <h1> New Pipeline </h1>
        </div>
      </div>

      <div className='ml-20 mr-20 p-4 d-flex justify-content-between border-top border-dark'>
        {/* NO CHANGES */}
        <div className="flex flex-col ml-20">
          <div className=" mb-3">
            <div className="container bg-gray-200 rounded">img</div>
          </div>

          {/* URL */}
          <div className="flex flex-row mb-3">
            <input className="p-2 pl-0 w-full text-sm bg-white" placeholder="Url " />
            <button className="btn btn-secondary">Browse</button>
          </div>   

          {/* Img Workforce */}
          <div className="flex flex-col">

            <div className="flex flex-row mb-3">
              <div className="container bg-blue-300 rounded text-left">
                <p>Id</p>
              </div>
              <div className="container bg-gray-200 rounded text-left">
                <p>A01253056</p>
              </div>
            </div>

            <div className="flex flex-row">
            <div className="container bg-blue-300 rounded text-left">
                <p>Joining Date</p>
              </div>
              <div className="container bg-gray-200 rounded text-left">
                <p>12/12/2023</p>
              </div>
            </div>
          </div>       
        </div>

        {/* AVAILABLE TO EDIT */}

        <div className="flex flex-row ">

          <div className="flex flex-col mr-6">
            <div className="flex flex-col mb-6">
              <p className="text-left">Name</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Gender</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Jon Title</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Propose Action</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Skills</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

          </div>

        </div>
        
        <div className="flex flex-row ">

          <div className="flex flex-col mr-6">
            <div className="flex flex-col mb-6">
              <p className="text-left">Email</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Division</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Tech Stack</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Reason Current State</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>
          </div>
        </div>

        <div className="flex flex-row ">

          <div className="flex flex-col mr-6">
            <div className="flex flex-col mb-6">
              <p className="text-left">Phone</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Job Grade</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Employee Status</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>

            <div className="flex flex-col mb-6">
              <p className="text-left">Salary</p>
              <input className="p-2 pl-0 w-full text-sm bg-white border border-gray-300 rounded-md" placeholder="Name " />
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-row justify-content-end mr-20">
        <div className="mr-6">
          <button className="btn btn-info btn-lg">Cancel</button>
        </div>
        <div className="mr-6"> 
          <button className="btn btn-secondary btn-lg">Create</button>
        </div>
      </div>
    </div>
  </div>
  </>);
};

export default AddPipelinegPage;