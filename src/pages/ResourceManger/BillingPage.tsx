import {useState, useEffect} from 'react';
import { Link, Outlet } from "react-router-dom";

interface Props {}  

const BillingPage = (props: Props)=>{
     
    return(<>
        <div className="flex h-screen bg-gray-100">
          {/* Main Content */}
          <div className="flex-grow">
            <Outlet />
      
            {/* Work Force Name */}
            <div className='mt-4 ml-10 p-4'>
              <h1 className="h2 font-weight-bold ">Work Force</h1>
            </div>
      
             {/* Selection Bar  (3 views, add, filter and search)*/}
             <div className='ml-10 mr-10 p-4 d-flex justify-content-between border-top border-bottom border-dark'>
                <div className='d-flex flex-row'>
                    <div className='mr-20'>
                        <Link to="/pipeline">
                            <button className='btn btn-dark btn-lg rounded-0'>Pipeline</button>
                        </Link>
                    </div>
                    <div className='mr-20'>
                        <Link to="/bench">
                            <button className='btn btn-dark btn-lg rounded-0'>Bench</button>
                        </Link>
                    </div>
                    <div className='mr-20'>
                        <Link to="/billing">
                            <button className='btn btn-dark btn-lg rounded-0'>Billing</button>
                        </Link>
                    </div>
                </div>
                <div className='d-flex flex-row'>
                    <div className='mr-5'>
                        <Link to="/addNewBilling">
                            <button type="button" className="btn btn-info">Add Billing</button>
                        </Link>
                    </div>
                    <div className='mr-5'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Filter</button>
                    </div>
                </div>
            </div>
      
            {/* Table */}
            <div className='ml-10 mr-10 p-4'>
              <table className='table'>
                <thead className="thead-dark">
                  <tr>
                    <th className="text-dark">ID</th>
                    <th className="text-dark">Name of Work Force</th>
                    <th className="text-dark">Employee Status</th>
                    <th className="text-dark">Job Title</th>
                    <th className="text-dark">Job Grade</th>
                    <th className="text-dark">Date of Joining</th>
                    <th className="text-dark">Tech Stack</th>
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
                      <button className='btn btn-sm btn-primary'>View</button>
                      <button className='btn btn-sm btn-primary'>Edit</button>
                      <button className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>  
            </div>  
          </div>
        </div>
        </>
    )
};

export default BillingPage;