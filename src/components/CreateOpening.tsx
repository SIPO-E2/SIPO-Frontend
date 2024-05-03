// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { createOpening } from '../api/openingAPI';
// import { Status } from '../types';

// interface Opening {
//     id: string;
//     open_date: Date;
//     close_date: Date;
//     status: Status;
//     close_reason: string;
//     hours_required: number;
// }

// const CreateOpening = () => {
//     const [openings, setOpenings] = useState<Opening[]>([]);
//     const [nextId, setNextId] = useState(1);

//     const addOpening = () => {
//         const newOpening: Opening = {
//             id: `OP${String(nextId).padStart(2, '0')}`,
//             open_date: new Date(),
//             close_date: new Date(),
//             status: Status.Open,
//             close_reason: '',
//             hours_required: 0
//         };
//         setOpenings([...openings, newOpening]);
//         setNextId(nextId + 1);
//     };

//     const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         const updatedOpenings = openings.map((opening, i) =>
//             i === index ? { ...opening, [name]: value } : opening
//         );
//         setOpenings(updatedOpenings);
//     };

//     const handleSave = async(index: number) => {
//         const openingToSave = openings[index];
//         console.log(await createOpening(openingToSave));
//         console.log(openingToSave);
//     };

//     const handleDelete = (index: number) => {
//         setOpenings(openings.filter((_, i) => i !== index));
//     };

//     return (
//         <div>
//             <div className="flex w-full justify-end pb-3">
//                 <button type="button" onClick={addOpening} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Add Opening
//                 </button>
//             </div>
//             <div className="overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto">
//                 <table className="w-full text-sm text-left text-gray-500">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-center">ID</th>
//                             <th className="px-6 py-3 text-center">Open date</th>
//                             <th className="px-6 py-3 text-center">Closed date</th>
//                             <th className="px-6 py-3 text-center">Status</th>
//                             <th className="px-6 py-3 text-center">Closed Reason</th>
//                             <th className="px-6 py-3 text-center">Hours</th>
//                             <th className="px-6 py-3 text-center"></th>
//                             <th className="px-6 py-3 text-center"></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {openings.map((opening, index) => (
//                             <tr key={opening.id} className="bg-white border-b">
//                                 <td className="px-6 py-4">{opening.id}</td>
//                                 <td className="px-6 py-4">
//                                     <input type="date" name="openDate" value={opening.open_date} onChange={(e) => handleInputChange(index, e)} className="border-2 rounded px-2 py-1 w-full" />
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <input type="date" name="closedDate" value={opening.open_date} onChange={(e) => handleInputChange(index, e)} className="border-2 rounded px-2 py-1 w-full" />
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <select name="status" value={opening.status} onChange={(e) => handleInputChange(index, e)} className="border-2 rounded px-2 py-1 w-full">
//                                         <option value="" disabled>Status</option>
//                                         <option value="open">Open</option>
//                                         <option value="filled">Filled</option>
//                                         <option value="client-interview">Client Interview</option>
//                                         <option value="cancelled">Canceled</option>
//                                         <option value="failed">Failed</option>
//                                     </select>
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <input type="text" name="closedReason" value={opening.closedReason} onChange={(e) => handleInputChange(index, e)} className="border-2 rounded px-2 py-1 w-full" placeholder="Reason" />
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <input type="text" name="hours" value={opening.hours} onChange={(e) => handleInputChange(index, e)} className="border-2 rounded px-2 py-1 w-full" placeholder="Hours" />
//                                 </td>

//                                 <td className="px-6 py-4 text-center">
//                                     <button onClick={() => handleSave(index)} className="text-gray-500 hover:text-blue-700 ">
//                                         <FontAwesomeIcon icon={faCheck} />
//                                     </button>
//                                 </td>

//                                 <td className="px-6 py-4 text-center">
//                                     <button onClick={() => handleDelete(index)} className="text-gray-500 hover:text-red-700 mr-5">
//                                         <FontAwesomeIcon icon={faTrash} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default CreateOpening;
