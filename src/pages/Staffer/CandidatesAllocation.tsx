// import React from "react";
// import { useState } from "react";

import CandidatesAllocationTable from "../../components/CandidatesAllocationTable";


const CandidatesAllocation = () => {


  return (
    <>
          <div className="w-full">
        <div className="px-5 pt-4 d-flex mb-3">
          <div className="p-2 me-auto">
            <h1>Allocations</h1>
          </div>
          <div className="flex items-center space-x-4">
          </div>
        </div>
        <hr className="border-2 ml-6 mr-6 border-black-900" />
      </div>
    <CandidatesAllocationTable/>
    </>

  );
};

export default CandidatesAllocation;