// BillingModal.tsx
import React from 'react';

interface PipelineModalProps {
 data?: any;
 onClose: () => void;
}

const skills:string[] = ["react", "angular", "typescript", "python", "nodejs"]

const PipelineModal: React.FC<PipelineModalProps> = ({ data, onClose }) => {
 return (
    <div className="fixed inset-0 z-10000 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-[80%] h-full max-h-[90%] rounded-[25px]">
        {/* Contenedor del modal */}
        <div className="bg-white rounded-lg max-w-4/5 max-h-4/5 overflow-auto p-6 flex flex-wrap h-100">
          {/* Contenido del modal */}
          <div className="flex gap-4 h-[85%] w-100">
            <div>
              <div className='flex gap-4 w-full flex-wrap'>
                <div className='w-4/4'>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQAq70q7GzSO0piINs0m1JW43qS4ckMOnVkkTkmWW4A&s" alt=""  className=' object-cover rounded-full'/>
                </div>
                <h6 className=''>Mariana Alejandra Garcia Gomez</h6>
              </div>     
              <div className='w-full'>
                <div className="grid grid-cols-1 gap-0">
                    
                </div>
              </div>

            </div>
            <div className='bg-black p-[0.2rem]'>
            </div>

            <div>
              <div className='flex gap-4 flex-wrap'>
                <div className="w-1/4 p-4">
                  <h6>Division</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Job Grade</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Job Title</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Tech Stack</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Employee Status</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Propose Action</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Reason Current State</h6>
                  <p>Division Name</p>
                </div>
                <div className="w-1/4 p-4">
                  <h6>Expected Salary</h6>
                  <p>Division Name</p>
                </div>

                <div className='w-3/4 p-4'>
                  <h6>Skills</h6>
                  <div className="flex flex-wrap items-center ">
                    {skills.map((skill, index) => (
                      <span key={index} className=" mr-2 mb-2 max-w-[430px] bg-gray-200 rounded-full px-4 py-1 text-sm font-medium text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  
                </div>


              </div>
            </div>
          </div>

          {/* Botón para cerrar el modal */}
          <div className='w-[100%] flex justify-end'>
            <button
              className="mt-4 bg-gray-500 transition-colors hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
 );
};

export default PipelineModal;
