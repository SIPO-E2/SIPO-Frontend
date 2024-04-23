import React from "react";

interface DeleteModalProps {
    isActive: boolean;
    selectedId: number;
    setDeleteActive: (isActive: boolean) => void;
    onDeleteConfirm: (projectId: number) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isActive, selectedId, setDeleteActive }) => {

    const closeModal = () => setDeleteActive(false);

    const handleDelete = () => {

        closeModal();
    };

    const modalClasses = isActive ? "flex" : "hidden";

    return (
        <div className={`${modalClasses} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-modal md:h-full bg-gray-600 bg-opacity-50`}>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto my-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <button type="button" className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="pt-6 px-6 text-center">
                        <svg className="text-gray-400 dark:text-gray-500 w-12 h-12 mb-3.5 mx-auto my-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <h3 className="mb-4 mt-4 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>

                    </div>

                    <div className="pb-4 flex justify-center gap-3">
                        <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" onClick={closeModal}>Cancel</button>

                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
