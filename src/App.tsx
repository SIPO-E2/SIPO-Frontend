import { Outlet, Link } from 'react-router-dom';
import logo from "./assets/encora-logo-dark.svg"
//import "~bootstrap/dist/css/bootstrap.min.css";

const App = () => {
 return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="z top-0 left-0 h-full bg-white w-64 overflow-auto shadow-lg">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-center p-4 rounded-lg">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>
          <ul className="mt-6">
            <li className="relative px-5 py-3">
              <Link to="/" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span className="ml-4">Home</span>
              </Link>
            </li>
            <li className="relative px-5 py-3">
              <Link to="/accountManager" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span className="ml-4">Account Manager</span>
              </Link>
            </li>
            <li className="relative px-5 py-3">
              <Link to="/resourceManager" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span className="ml-4">Resource Manager</span>
              </Link>
            </li>
            <li className="relative px-5 py-3">
              <Link to="/staffer" className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span className="ml-4">Staffer</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
 );
};

export default App;
