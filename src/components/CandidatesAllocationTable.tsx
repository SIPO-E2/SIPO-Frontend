import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useApisStore } from '../store';
import { updateAllocation } from '../api/allocationAPI';
import { AllocationStatus, InterviewCreation } from '../types';
import { updateCandidateStatus} from '../api/candidateAPI';
import { CandidateStatus, InterviewStatus } from '../types';
import { createInterview, deleteInterview, updateInterview } from '../api/interviewAPI';



interface AllocationTableProps {
    selectedStatus: string[];
    searchQuery: string;
    setSearchQuery: (query: string) => void; 
};

const CandidatesAllocationTable = ({ selectedStatus, searchQuery }: AllocationTableProps) => {
    const { allocations, fetchAllocations, persons, fetchPersons, candidates, fetchCandidates, fetchInterviews, interviews, clients, fetchClients, jobPositions, fetchJobPositions} = useApisStore();
 console.log('hola');
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
        console.log(persons);
        console.log(candidates);
        console.log(allocations);
        console.log(interviews);
    }, [selectedDateMap, reasonStatusMap, interviewStatusMap]);

    const [currentPage, setCurrentPage] = useState(1);
    const allocationsPerPage = 5;
    const indexOfLastAllocation = currentPage * allocationsPerPage;
    const indexOfFirstAllocation = indexOfLastAllocation - allocationsPerPage;
    const currentAllocation = allocations
    ?.filter(allocation => allocation.activeDB)
    .filter(allocation => allocation.jobPosition.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(allocation => selectedStatus.length === 0 || selectedStatus.every(status => allocation.status.includes(status)))
    .slice(indexOfFirstAllocation, indexOfLastAllocation);

    const logActiveEntities = () => {
        console.log("Active Allocations:", allocations.filter(allocation => allocation.activeDB));
        console.log("Active Persons:", persons.filter(person => person.activeDB));
        console.log("Active Candidates:", candidates.filter(candidate => candidate.activeDB));
        console.log("Active Interviews:", interviews.filter(interview => interview.activeDB));
    };

    if (allocations.length > 0 && persons.length > 0 && candidates.length > 0 && interviews.length > 0) {
        logActiveEntities();
    }

    const handleScheduleDateChange = async (allocationId: number, selectedDate: string) => {
        try {
            const allocation = allocations.find(allocation => allocation.id === allocationId);
            if (!allocation) {
                console.error(`Allocation with ID ${allocationId} not found.`);
                return;
            }

            await updateCandidateStatus(allocation.candidate.id, CandidateStatus.StandBy)
            console.log(`Candidate ${allocation.candidate.id} allocated to allocation ${allocation.id} changed status to ${allocation.candidate.status}`)

            const existingInterview = allocation.interviews.find(interview => interview.activeDB);

            if (!existingInterview || !existingInterview.activeDB) {
                const interviewData: InterviewCreation = {
                    status: InterviewStatus.Scheduled,
                    reason_current_status: "Reason inputted here",
                    allocation_id: allocationId,
                    allocation: allocation,
                    interview_date: new Date(selectedDate),
                };
                const newInterview = await createInterview(interviewData);

                setSelectedDateMap(prevMap => ({
                    ...prevMap,
                    [allocationId]: selectedDate,
                }));

                console.log(`New interview created with ID ${newInterview.id} for allocation ${allocationId} on date ${selectedDate}`);

                await updateAllocation(allocation.candidateId, allocation.jobPositionId, AllocationStatus.ClientInterview);
                console.log(`Allocation status updated to ClientInterview for candidate ${allocation.candidateId} and job position ${allocation.jobPositionId}.`);

            } else {
                await updateInterview(existingInterview.id, {interview_date: new Date(selectedDate)});

                setSelectedDateMap(prevMap => ({
                    ...prevMap,
                    [allocationId]: selectedDate,
                }));

                console.log(`Interview with ID ${existingInterview.id} updated successfully for allocation ${allocationId} on date ${selectedDate}`);
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
            console.log(`Interview status updated to ${status} for allocation ${interview.id}.`);

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
            console.log(`Interview reson status updated to ${interviewReasonStatus} for allocation ${interview.id}.`);

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
                console.log(`Interview with ID ${interview.id} deleted because corresponding allocation doesn't exist.`);            }
        });
    }, [interviews, allocations]);   

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
                <div className="flex justify-end  m-6">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="mr-2 font-medium hover:underline"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={indexOfLastAllocation >= allocations.length}
                        className="font-medium hover:underline"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CandidatesAllocationTable;

