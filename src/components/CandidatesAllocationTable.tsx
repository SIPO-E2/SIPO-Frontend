import { useEffect, useState } from 'react';
import { useApisStore } from '../store';
import { updateAllocation } from '../api/allocationAPI';
import { AllocationStatus } from '../api/allocationAPI';
import { updateCandidateStatus } from '../api/candidateAPI';
import { CandidateStatus } from '../api/candidateAPI';
import { InterviewStatus, createInterview } from '../api/interviewAPI';
import { updateInterviewStatus } from '../api/interviewAPI';
import { updateInterviewDate } from '../api/interviewAPI';

// interface Interview {
//     allocation_id: string;
//     status_date: Date;
//     reason_current_status: string;
// }

const CandidatesAllocationTable = () => {
    const { allocations, fetchAllocations, persons, fetchPersons, candidates, fetchCandidates, fetchInterviews, interviews, clients, fetchClients, jobPositions, fetchJobPositions } = useApisStore();
    // const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
    const [checkboxEnabled, setCheckboxEnabled] = useState<{ [key: number]: boolean }>({});
    const [selectedDateMap, setSelectedDateMap] = useState<{ [key: number]: string }>({});


    useEffect(() => {
        fetchAllocations();
        fetchPersons();
        fetchCandidates();
        fetchInterviews();
        fetchClients();
        fetchJobPositions();
    }, []);

    console.log("Allocations:", allocations);
    console.log("Persons:", persons);
    console.log("Candidates:", candidates);
    console.log("Interviews: ", interviews)

    const handleScheduleDateChange = async (allocationId: number, selectedDate: string) => {
        try {
            await updateInterviewStatus(allocationId.toString(), InterviewStatus.Scheduled);

            await updateInterviewDate(allocationId.toString(), selectedDate);

            const allocation = allocations.find(allocation => allocation.id === allocationId);

            if (allocation) {
                await updateAllocation(allocationId.toString(), AllocationStatus.ClientInterview);

                const interviewData: InterviewCreationAttributes = {
                    status: InterviewStatus.Scheduled,
                    reason_current_status: "Reason inputted here",
                    status_date: new Date(selectedDate),
                    allocation_id: allocationId,
                    allocation: allocation,
                    interview_date: new Date(selectedDate),

                };
                await createInterview(interviewData);

                setSelectedDateMap(prevMap => ({
                    ...prevMap,
                    [allocationId]: selectedDate,
                }));


                console.log(`Interview scheduled successfully for allocation ${allocationId} on date ${selectedDate}`);
            } else {
                console.error(`Allocation with ID ${allocationId} not found.`);
            }

        } catch (error) {
            console.error('Error scheduling interview:', error);
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
                            <th scope="col" className="px-6 py-3 text-center">Candidate</th>
                            <th scope="col" className="px-6 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map((allocation) => {
                            const person = persons.find((person) => person.id === allocation.candidate.personId);
                            const client = clients.find((client) => client.id === allocation.client_id);
                            const jobPosition = jobPositions.find((jobPosition) => jobPosition.id === allocation.jobPositionId);
                            // const selectedDate = selectedDateMap[allocation.id] || '';
                            // const selectedOption = selectedOptions[allocation.id] || allocation.status;
                            const checkboxEnabledRow = checkboxEnabled[allocation.id] || false;
                            return (
                                <tr key={allocation.id} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">
                                        {person ? person.name : ''}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {/* <select value={selectedOption} onChange={(e) => handleAllocationStatusChange(allocation.id, e.target.value as AllocationStatus)}>
                                            <option value="Allocated">Allocated</option>
                                            <option value="Client Interview">Client Interview</option>
                                            <option value="Client Feedback">Client Feedback</option>
                                        </select> */}
                                        {allocation.status}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="btn-group">
                                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropdown
                                            </button>
                                            <div className="dropdown-menu">
                                                <form className="px-4 py-1">
                                                    <div className="mb-3">
                                                        <h5>{client ? <strong>{client.name}</strong> : ''} - {jobPosition ? <strong>{jobPosition.name}</strong> : ''}</h5>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor={`date-picker-${allocation.id}`} className="form-label">Schedule date</label>
                                                        <input type="date"
                                                            className="form-control"
                                                            id="exampleDropdownFormDate1"
                                                            placeholder="mm-dd-yyyy"
                                                            onChange={(e) => handleScheduleDateChange(allocation.id, e.target.value)}
                                                        />

                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleDropdownFormCheckbox1" className="form-label">Set status</label>
                                                        <div className="row justify-content-left">
                                                            <div className="col">
                                                                <input type="checkbox" className="btn-check" id={`btn-check-${allocation.id}-1`} checked={checkboxEnabledRow} disabled={!checkboxEnabledRow} autoComplete="off" />
                                                                <label className="btn btn-primary mr-2" htmlFor={`btn-check-${allocation.id}-1`}>Approved</label>
                                                                <input type="checkbox" className="btn-check" id={`btn-check-${allocation.id}-2`} checked={checkboxEnabledRow} disabled={!checkboxEnabledRow} autoComplete="off" />
                                                                <label className="btn btn-primary" htmlFor={`btn-check-${allocation.id}-2`}>Rejected</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleDropdownFormStatus1" className="form-label">Reason status</label>
                                                        <input type="status" className="form-control" id="exampleDropdownFormStatus1" placeholder="Reason..." />
                                                    </div>
                                                </form>
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

