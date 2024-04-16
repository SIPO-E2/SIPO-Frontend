import React from "react";

interface Props{};

const Projects = (props:Props)=>{
  return (
      <>
      <div>
        <div className="px-5 py-3 mt-5 font-bold text-xl align-self">
          <h1>Projects</h1>
          <button type="button" className="btn btn-primary"> + Project </button>
        </div>

      </div>
      </>
  )
};

export default Projects;