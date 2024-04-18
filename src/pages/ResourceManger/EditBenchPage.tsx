import React from 'react';
import { Link } from "react-router-dom";

interface Props {};

const EditBench: React.FC<Props> = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-grow">
                <div className="px-5 pt-4 d-flex mb-3">
                    <div className="p-2 me-auto">
                        <h1> Edit Bench </h1>
                    </div>
                </div>
  
                {/* Main Content and Sections */}
                <div className="ml-10 mr-10 p-4 d-flex justify-content-between border-top border-dark">
                    {/* First Part */}
                    <div className="flex-1 p-4">
                        <h2>Section One</h2>
                        <p>Here you can put some settings or forms for the first part of the editing process.</p>
                    </div>
  
                    {/* Second Part */}
                    <div className="flex-1 p-4 border-left border-dark">
                        <h2>Section Two</h2>
                        <p>Here you can put additional settings or forms for another part of the editing process.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBench;
