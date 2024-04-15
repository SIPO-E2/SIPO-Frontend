import {useState, useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";

interface Props {}  

const BillingPage = (props: Props)=>{
     
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
      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
  
        {/* Work Force Name */}
        <div className='mt-4 ml-10 p-4'>
          <h1 className="is-size-3 has-text-weight-bold">Work Force</h1>
        </div>
  
        {/* Selection Bar */}
        <div className='ml-10 mr-10 p-4 flex is-justify-content-left border-t-2 border-b-2 border-black'>
          <div className='mr-20'>
            <Link to="/pipeline">
              <button className='button is-large rounded-none '>Pipeline</button>
            </Link>
          </div>
          <div className='mr-20'>
            <Link to="/bench">
              <button className='button is-large rounded-none'>Bench</button>
            </Link>
          </div>
          <div className='mr-20'>
            <Link to="/billing">
              <button className='button is-large rounded-none'>Billing</button>
            </Link>
          </div>
        </div>
  
        {/* Table */}
        <div className='ml-10 mr-10 p-4'>
          <table className='table is-fullwidth'>
            <thead className="text-black">
              <tr>
                <th className="has-text-black">ID</th>
                <th className="has-text-black">Name of Work Force</th>
                <th className="has-text-black">Employee Status</th>
                <th className="has-text-black">Job Title</th>
                <th className="has-text-black">Job Grade</th>
                <th className="has-text-black">Date of Joining</th>
                <th className="has-text-black">Tech Stack</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A01253056</td>
                <td>Mariana Alejandra García Gómez</td>
                <td>Billing</td>
                <td>Developer</td>
                <td>C2</td>
                <td>01/01/2021</td>
                <td>JavaScript</td>
                <td>
                  <button className='button is-small is-primary'>View</button>
                  <button className='button is-small is-primary'>Edit</button>
                  <button className='button is-small is-danger'>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>  
        </div>  
      </div>
    </div>
    </>
    );
};

export default BillingPage;