//import { useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import { Outlet } from "react-router";

interface Props {}
const App = (props: Props) => {
  return (
    <>
      <div>
        <h1>Pagina principal</h1>

        <div className='view'>
          <p className="level-item">
              <Link to="/accountManager"><a>Account Manager</a></Link>
          </p>
        </div>
        <div className='view'>
          <p className="level-item">
                <Link to="/resourceManager"><a>Resource Manager</a></Link>
            </p>
          </div>
        <div className='view'>
          <p className="level-item">
                <Link to="/staffer"><a>Staffer</a></Link>
          </p>
        </div>
      </div>
    <Outlet />
    </>
  )
}

export default App
