import { useState, ChangeEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { createOpening, getOpenings, updateOpening, getOpening, deleteOpening } from '../api/openingAPI';
import { Status, OpeningCreation, OpeningUpdate} from '../types';
import { toast } from 'react-toastify'
import { format } from 'date-fns'; 

interface CreateOpeningProps {
    ownerJobPositionId: number;
    
}



const CreateOpening: React.FC<CreateOpeningProps> = ({ownerJobPositionId}) => {

    const [openings, setOpenings] = useState<OpeningCreation[] | OpeningUpdate[]>([]);

    useEffect(() => {
        getOpenings().then((openings) => {
            const openingsById = openings.filter(opening => opening.owner_jobPosition_id === ownerJobPositionId);
            console.log(openingsById);
        
            setOpenings(openingsById);
            
        });
    }, [ownerJobPositionId]);

    const addOpening = () => {
        const newOpening: OpeningCreation | OpeningUpdate = {
            owner_jobPosition_id: ownerJobPositionId,
            open_date: new Date(),
            close_date: new Date(),
            status: Status.Open,
            reason_current_status: '',
            close_reason: '',
            hours_required: 0
        };
        setOpenings([...openings, newOpening]);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const index = parseInt(event.target.getAttribute('data-index') || '0');

        setOpenings(openings.map((opening, idx) => {
            if (idx === index) {
                return { ...opening, [name]: value };
            }
            return opening;
        }
        ));
    };

    const handleSave = async(index: number) => {
        try {
            const openingToSave = openings[index];
            const opening = await getOpening((openingToSave as OpeningUpdate).id as number);

            if (opening) {
                await updateOpening((openingToSave as OpeningUpdate).id as number ,openingToSave);
                toast.success('Opening updated successfully');
            } else {
                await createOpening(openingToSave as OpeningCreation);
                toast.success('Opening created successfully');
            }
        } catch (error) {
            console.error('Error creating opening:', error);
            toast.error('Failed to create opening');
        }
        
    };

    const handleDelete = async (index: number) => {
        const openingDelete = openings[index];
        setOpenings(openings.filter((_, i) => i !== index));
        
        console.log(await deleteOpening((openingDelete as OpeningUpdate).id as number));
        
    };

    return (
        <div>
            <div className="flex w-full justify-end pb-3">
                <button type="button" onClick={addOpening} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Opening
                </button>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-center">ID</th>
                            <th className="px-6 py-3 text-center">Open date</th>
                            <th className="px-6 py-3 text-center">Closed date</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Closed Reason</th>
                            <th className="px-6 py-3 text-center">Hours</th>
                            <th className="px-6 py-3 text-center"></th>
                            <th className="px-6 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {openings.map((opening, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4">{index}</td>
                                <td className="px-6 py-4">
                                <input data-index={index} type="date" name="open_date" value={opening.open_date ? format(opening.open_date, 'yyyy-MM-dd') : ''} onChange={handleChange} className="border-2 rounded px-2 py-1 w-full" />                                </td>
                                <td className="px-6 py-4">
                                <input data-index={index} type="date" name="close_date" value={opening.close_date ? format(opening.close_date, 'yyyy-MM-dd') : ''} onChange={handleChange} className="border-2 rounded px-2 py-1 w-full" />                                </td>
                                <td className="px-6 py-4">
                                    <select data-index={index} name="status" value={opening.status} onChange={handleChange} className="border-2 rounded px-2 py-1 w-full">
                                        {Object.values(Status).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <input data-index={index} type="text" name="close_reason" value={opening.close_reason} onChange={handleChange} className="border-2 rounded px-2 py-1 w-full" placeholder="Reason" />
                                </td>
                                <td className="px-6 py-4">
                                    <input data-index={index} type="number" name="hours_required" value={opening.hours_required} onChange={handleChange} className="border-2 rounded px-2 py-1 w-full" placeholder="Hours" />
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button type='button' onClick={() => handleSave(index)} className="text-gray-500 hover:text-blue-700 ">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button type='button' onClick={() => handleDelete(index)} className="text-gray-500 hover:text-red-700 mr-5">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateOpening;
