// BillingModal.tsx
import React from 'react';

interface BillingModalProps {
 data?: any;
 onClose: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ data, onClose }) => {
 return (
<div className="fixed inset-0 z-10000 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-[80%] h-full max-h-[90%] rounded-[25px]">
        {/* Contenedor del modal */}
      <div className="bg-white rounded-lg max-w-4/5 max-h-4/5 overflow-auto p-6">
        {/* Contenido del modal */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
          {/* Aquí puedes agregar el contenido específico del modal */}
          <p>Some Billing information goes here...</p>
        </div>

        {/* Botón para cerrar el modal */}
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      </div>
    </div>
 );
};

export default BillingModal;
