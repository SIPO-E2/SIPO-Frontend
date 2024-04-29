import { useEffect, useState } from 'react';
import { useApisStore } from '../store';
import { updateAllocation } from '../api/allocationAPI';
import { AllocationStatus } from '../api/allocationAPI';

const CandidatesAllocationTable = () => {
    const { allocations, fetchAllocations, persons, fetchPersons } = useApisStore();
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
    const [checkboxEnabled, setCheckboxEnabled] = useState(false);

    useEffect(() => {
        fetchAllocations();
        fetchPersons();
    }, []);

    console.log("Allocations:", allocations);
    console.log("Persons:", persons);

    const handleAllocationStatusChange = async (id: number, newStatus: string) => {
        try {
            const allocationStatus = newStatus as AllocationStatus;
            setSelectedOptions(prevOptions => ({
                ...prevOptions,
                [id]: allocationStatus,
            }));

            setCheckboxEnabled(allocationStatus === 'Client Feedback');

            await updateAllocation(id.toString(), allocationStatus);
            console.log(`Allocation ${id} updated successfully with status: ${allocationStatus}`);
        } catch (error) {
            console.error('Error updating allocation:', error);
        }
    };
    
    
    

    return (
        <>
            <div className="relative sm:rounded-lg p-4 z-3">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">Candidates</th>
                            <th scope="col" className="px-6 py-3 text-center">Allocation</th>
                            <th scope="col" className="px-6 py-3 text-center">Interview</th>
                            <th scope="col" className="px-6 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map((allocation) => {
                            const person = persons.find((person) => person.id === allocation.candidate.personId);
                            const selectedOption = selectedOptions[allocation.id] || allocation.status;
                            return (
                                <tr key={allocation.id} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">
                                        {person ? person.name : ''}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <select value={selectedOption} onChange={(e) => handleAllocationStatusChange(allocation.id, e.target.value as AllocationStatus)}>
                                            <option value="Allocated">Allocated</option>
                                            <option value="Client Interview">Client Interview</option>
                                            <option value="Client Feedback">Client Feedback</option>
                                        </select>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="container text-center">
                                            <div className="row justify-content-center">
                                                <div className="col">
                                                    <input type="checkbox" className="btn-check" id="btn-check-1" checked={checkboxEnabled} disabled={!checkboxEnabled} autoComplete="off" />
                                                    <label className="btn btn-primary me-2" htmlFor="btn-check-1">Approved</label>
                                                    <input type="checkbox" className="btn-check" id="btn-check-2" checked={checkboxEnabled} disabled={!checkboxEnabled} autoComplete="off" />
                                                    <label className="btn btn-primary" htmlFor="btn-check-2">Approved</label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>


                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CandidatesAllocationTable;

