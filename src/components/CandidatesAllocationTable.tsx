import React, { useEffect } from 'react';
import { useApisStore } from '../store';

const CandidatesAllocationTable = () => {
    const { allocations, fetchAllocations, persons, fetchPersons } = useApisStore();

    useEffect(() => {
        fetchAllocations();
        fetchPersons();
    }, []);

    console.log("Allocations:", allocations);
    console.log("Persons:", persons);

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
                            return (
                                <tr key={allocation.id} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">
                                        {person ? person.name : ''}
                                    </td>
                                    {/* Render other columns */}
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

