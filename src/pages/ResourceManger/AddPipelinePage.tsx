import { Link } from "react-router-dom";

interface Props{};

const AddPipelinegPage = (props:Props)=>{
  return(<>
  <div className="flex h-screen bg-gray-100">

    {/* Main Content */}
    <div className="flex-grow">
      <div className="px-5 pt-4 d-flex mb-3">
        <div className="p-2 me-auto">
          <h1> New Pipeline </h1>
        </div>
      </div>

      <div className='ml-10 mr-10 p-4 d-flex justify-content-between border-top border-dark'>
        {/* NO CHANGES */}
        <div className="flex flex-col">
          <div>
            img
          </div>

          {/* URL */}
          <div className="flex flex-row">
            <input className="p-2 pl-0 w-full text-sm bg-white" placeholder="Url " />
            <button className="btn btn-secondary">Browse</button>
          </div>   

          {/* Img Workforce */}
          <div className="flex flex-wrap ">
            <div></div>
            <div></div>
            <div></div>

          </div>       
        </div>

        {/* AVAILABLE TO EDIT */}
        <div>

        </div>
      </div>
    </div>
  </div>
  </>);
};

export default AddPipelinegPage;