import { Link } from "react-router-dom";

interface Props{};

const AddBenchPage = (props:Props)=>{
  return(<>
    <div className="flex h-screen bg-gray-100">
  
      {/* Main Content */}
      <div className="flex-grow">
        <div className="px-5 pt-4 d-flex mb-3">
          <div className="p-2 me-auto">
            <h1> New Bench </h1>
          </div>
        </div>
  
        <div className='ml-10 mr-10 p-4 d-flex justify-content-between border-top border-dark'>
          
        </div>
      </div>
    </div>
    </>);
};

export default AddBenchPage;