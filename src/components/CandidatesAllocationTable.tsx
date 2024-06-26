import { useEffect, useState } from 'react';
import { useApisStore } from '../store';
import { updateAllocation } from '../api/allocationAPI';
import { AllocationStatus, InterviewCreation } from '../types';
import { updateCandidateStatus} from '../api/candidateAPI';
import { CandidateStatus, InterviewStatus } from '../types';
import { createInterview, deleteInterview, updateInterview } from '../api/interviewAPI';
import { all } from 'axios';
import { allocationAPI } from '../api';



interface AllocationTableProps {
    selectedStatus: string[];
    searchQuery: string;
    setSearchQuery: (query: string) => void; 
};

const CandidatesAllocationTable = ({ selectedStatus, searchQuery }: AllocationTableProps) => {
    const { allocations, fetchAllocations, fetchPersons, candidates, fetchCandidates, fetchInterviews, interviews, clients, fetchClients, jobPositions, fetchJobPositions} = useApisStore();

    const [selectedDateMap, setSelectedDateMap] = useState<{ [key: number]: string }>(() => {
        const storedSelectedDateMap = localStorage.getItem('selectedDateMap');
        return storedSelectedDateMap ? JSON.parse(storedSelectedDateMap) : {};
    });

    const [reasonStatusMap, setReasonStatusMap] = useState<{ [key: number]: string }>(() => {
        const storedSelectedReasonStatusMap = localStorage.getItem('reasonStatusMap');
        return storedSelectedReasonStatusMap ? JSON.parse(storedSelectedReasonStatusMap) : {};
    });

    const [interviewStatusMap, setInterviewStatusMap] = useState<{ [key: number]: InterviewStatus }>(() => {
        const storedSelectedStatusMap = localStorage.getItem('interviewStatusMap');
        return storedSelectedStatusMap ? JSON.parse(storedSelectedStatusMap) : {};
    });

    useEffect(() => {
        fetchAllocations();
        fetchPersons();
        fetchCandidates();
        fetchInterviews();
        fetchClients();
        fetchJobPositions();
        localStorage.setItem('selectedDateMap', JSON.stringify(selectedDateMap));
        localStorage.setItem('reasonStatusMap', JSON.stringify(reasonStatusMap));
        localStorage.setItem('interviewStatusMap', JSON.stringify(interviewStatusMap));
    }, [selectedDateMap, reasonStatusMap, interviewStatusMap]);

    const [currentAllocationPage, setCurrentAlocationPage] = useState(1);
    const allocationsPerPage = 5;
    const indexOfLastAllocation = currentAllocationPage * allocationsPerPage;
    const indexOfFirstAllocation = indexOfLastAllocation - allocationsPerPage;

    const validAllocations = allocations
    ?.filter(allocation => allocation.activeDB)
    .filter(allocation => allocation.jobPosition.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(allocation => selectedStatus.length === 0 || selectedStatus.every(status => allocation.status.includes(status)))

    const currentAllocation = validAllocations
    .slice(indexOfFirstAllocation, indexOfLastAllocation);

    const totalAllocationPages = Math.ceil(validAllocations.length / allocationsPerPage);

    const handleScheduleDateChange = async (allocationId: number, selectedDate: string) => {
        try {
            const allocation = allocations.find(allocation => allocation.id === allocationId);
            if (!allocation) {
                console.error(`Allocation with ID ${allocationId} not found.`);
                return;
            }

            await updateCandidateStatus(allocation.candidate.id, CandidateStatus.StandBy)
            
            const existingInterview = allocation.interviews.find(interview => interview.activeDB);

            if (!existingInterview || !existingInterview.activeDB) {
                const interviewData: InterviewCreation = {
                    status: InterviewStatus.Scheduled,
                    reason_current_status: "Reason inputted here",
                    allocation_id: allocationId,
                    allocation: allocation,
                    interview_date: new Date(selectedDate),
                };

                await createInterview(interviewData);

                setSelectedDateMap(prevMap => ({
                    ...prevMap,
                    [allocationId]: selectedDate,
                }));

                await updateAllocation(allocation.candidateId, allocation.jobPositionId, AllocationStatus.ClientInterview);

            } else {
                await updateInterview(existingInterview.id, {interview_date: new Date(selectedDate)});

                setSelectedDateMap(prevMap => ({
                    ...prevMap,
                    [allocationId]: selectedDate,
                }));
            }
        } catch (error) {
            console.error('Error scheduling interview:', error);
        }
    };

    const handleStatusChange = async (allocationId: number, status: string) => {
        try {
            const allocation = allocations.find(allocation => allocation.id === allocationId);
            if (!allocation) {
                console.error(`Allocation with ID ${allocationId} not found.`);
                return;
            }

            const interview = allocation.interviews.find(interview => interview.activeDB);
            if (!interview) {
                console.error(`Interview not found for allocation ${allocationId}.`);
                return;
            }

            let interviewStatus: InterviewStatus;
            switch (status) {
                case 'Approved':
                    interviewStatus = InterviewStatus.Approved;
                    break;
                case 'Rejected':
                    interviewStatus = InterviewStatus.Rejected;
                    break;
                default:
                    console.error('Invalid interview status.');
                    return;
            }

            await updateInterview(interview.id, {status: interviewStatus});

            setInterviewStatusMap((prevMap) => ({
                ...prevMap,
                [allocationId]: interviewStatus,
            }));

            const allocationStatus = interviewStatus === InterviewStatus.Approved || interviewStatus === InterviewStatus.Rejected
                ? AllocationStatus.ClientFeedback
                : AllocationStatus.ClientInterview;
            await updateAllocation(allocation.candidateId, allocation.jobPositionId, allocationStatus);

            const candidateStatus = interviewStatus === InterviewStatus.Approved
                ? CandidateStatus.Hired : CandidateStatus.StandBy;
            await updateCandidateStatus(allocation.candidateId, candidateStatus);

        } catch (error) {
            console.error('Error updating interview status:', error);
        }
    };

    const handleReasonStatusChange = async (allocationId: number, interviewReasonStatus: string) => {
        try {
            const allocation = allocations.find(allocation => allocation.id === allocationId);
            if (!allocation) {
                console.error(`Allocation with ID ${allocationId} not found.`);
                return;
            }

            const interview = allocation.interviews.find(interview => interview.activeDB);
            if (!interview) {
                console.error(`Interview not found for allocation ${allocationId}.`);
                return;
            }
            

            await updateInterview(interview.id, {reason_current_status: interviewReasonStatus});

            setReasonStatusMap((prevMap) => ({
                ...prevMap,
                [allocationId]: interviewReasonStatus,
            }));

        } catch (error) {
            console.error('Error updating interview status:', error);
        }
    };

    useEffect(() => {
        interviews.forEach(async (interview) => {
            const correspondingAllocation = allocations.find(allocation => allocation.id === interview.allocation_id);
            if (!correspondingAllocation?.activeDB) {
                await deleteInterview(interview.id);         
             }
        });
    }, [interviews, allocations]);   

    const handlePrevAllocationPage = () => {
        setCurrentAlocationPage(prevAllocationPage => prevAllocationPage - 1);
    };

    const handleNextAllocationPage = () => {
        setCurrentAlocationPage(prevAllocationPage => prevAllocationPage + 1);
    };


    return (
        <>
            <div className="relative sm:rounded-lg p-4 z-3">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">Candidate</th>
                            <th scope="col" className="px-6 py-3 text-center">Allocation</th>
                            <th scope="col" className="px-6 py-3 text-center">Interview</th>
                            <th scope="col" className="px-6 py-3 text-center">Interview status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAllocation
                            .map((allocation) => {
                                const candidate = candidates.find((candidate) => candidate.id == allocation.candidateId);
                                const client = clients.find((client) => client.id === allocation.client_id);
                                const jobPosition = jobPositions.find((jobPosition) => jobPosition.id === allocation.jobPositionId);

                                const interviewDate = selectedDateMap[allocation.id] || '';
                                const interviewReasonStatus = reasonStatusMap[allocation.id] || '';

                                const interview = allocation.interviews.find(interview => interview.activeDB);
                                const interviewStatus = interview ? interviewStatusMap[allocation.id] || InterviewStatus.Scheduled : '';



                                return (
                                    <tr key={allocation.id} className="border-b dark:border-gray-700">
                                        <td className="px-6 py-4 text-center">
                                            {candidate ? candidate.personInformation.name : ''}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {allocation.status}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="btn-group">
                                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {allocation.jobPosition.name} - {allocation.client.name}
                                                </button>
                                                <div className="dropdown-menu">
                                                    <form className="px-4 py-1">
                                                        <div className="mb-3">
                                                            <h5>{client ? <strong>{client.name}</strong> : ''} - {jobPosition ? <strong>{jobPosition.name}</strong> : ''}</h5>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor={`date-picker-${allocation.id}`} className="form-label">Schedule date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id={`date-picker-${allocation.id}`}
                                                                value={interviewDate || ''}
                                                                onChange={(e) => handleScheduleDateChange(allocation.id, e.target.value)}
                                                            />

                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleDropdownFormCheckbox1" className="form-label">Set status</label>
                                                            <div className="row justify-content-left">
                                                                <div className="col">
                                                                    <input type="checkbox" className="btn-check"
                                                                        id={`approved-${allocation.id}`}
                                                                        autoComplete="off"
                                                                        disabled={allocation.status !== AllocationStatus.ClientInterview && allocation.status !== AllocationStatus.ClientFeedback}
                                                                        checked={interviewStatus === InterviewStatus.Approved}
                                                                        onChange={() => handleStatusChange(allocation.id, InterviewStatus.Approved)} />
                                                                    <label className="btn btn-outline-primary mr-2" htmlFor={`approved-${allocation.id}`}>Approved</label>

                                                                    <input type="checkbox" className="btn-check"
                                                                        id={`rejected-${allocation.id}`}
                                                                        autoComplete="off"
                                                                        disabled={allocation.status !== AllocationStatus.ClientInterview && allocation.status !== AllocationStatus.ClientFeedback}
                                                                        checked={interviewStatus === InterviewStatus.Rejected}
                                                                        onChange={() => handleStatusChange(allocation.id, InterviewStatus.Rejected)}
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor={`rejected-${allocation.id}`}>Rejected</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor={`Reason-current-status-${allocation.id}`} className="form-label">Reason status</label>
                                                            <input type="reasonStatus" className="form-control" id={`Reason-current-status-${allocation.id}`} disabled={allocation.status !== AllocationStatus.ClientInterview && allocation.status !== AllocationStatus.ClientFeedback} value={interviewReasonStatus || ''} onChange={(e) => handleReasonStatusChange(allocation.id, e.target.value)} />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {interviewStatus}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className="pagination flex justify-end mt-4 items-center">
                    <button
                        onClick={handlePrevAllocationPage}
                        disabled={currentAllocationPage === 1}
                        className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {currentAllocationPage} of {totalAllocationPages}</span>
                    <button
                        onClick={handleNextAllocationPage}
                        disabled={indexOfLastAllocation >= validAllocations.length}
                        className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default CandidatesAllocationTable;

