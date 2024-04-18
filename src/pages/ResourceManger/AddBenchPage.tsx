import { Link } from "react-router-dom";

interface Props{};

const AddBenchPage = (props:Props)=>{
    return(<>
        <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <div className="z top-0 left-0 h-full bg-white w-64 overflow-auto shadow-lg">
                <div className="p-6">
                  {/* Logo */}
                  <div className="flex items-center justify-center p-4 rounded-lg">
                    <img src= "src\assets\encora-logo-dark.svg" alt="Logo" className="h-12 w-auto" />
                  </div>
          
                  <ul className="mt-6">
                    <li className="relative px-5 py-3">
                      <Link to="/" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                        <span className="ml-4">Home</span>
                      </Link>
                    </li>
                    <li className="relative px-5 py-3">
                      <Link to="/dashboard" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                        <span className="ml-4">Dashboard</span>
                      </Link>
                    </li>
                    <li className="relative px-5 py-3">
                      <Link to="/resourceManager" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                        <span className="ml-4">Work Force</span>
                      </Link>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </>);
};

export default AddBenchPage;