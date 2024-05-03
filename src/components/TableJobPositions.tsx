import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import TableOpenings from './TableOpenings';
import { useApisStore } from '../store';
import { deleteJobPosition } from '../api/jobPositionAPI';
import DeleteModal from './DeleteModal';
import React from 'react';
import { JobPosition } from '../types';
import { Link } from 'react-router-dom';
import JobPositionDetailsModal from '../pages/Account Manager/Job Positions/ViewJobPosition';

interface Props {
    searchTerm: string;
}

const TableJobPositions = ({ searchTerm }: Props) => {
    const { jobPositions, fetchJobPositions } = useApisStore();
    const [open, setOpen] = useState<boolean[]>([]);
    const [deleteActive, setDeleteActive] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(-1);
    const [detailsActive, setDetailsActive] = useState<boolean>(false);
    const [selectedJobPosition, setSelectedJobPosition] = useState<JobPosition | null>(null);

    useEffect(() => {
        fetchJobPositions();
    }, []);

    useEffect(() => {
        setOpen(new Array(jobPositions.length).fill(false));
    }, [jobPositions.length]);

    const toggleAccordion = (index: number) => {
        setOpen(open.map((state, i) => i === index ? !state : state));
    };

    const handleViewDetails = (jobPosition: JobPosition) => {
        setSelectedJobPosition(jobPosition);
        setDetailsActive(true);
    };

    const handleDeleteJobPosition = async (jobPositionId: number) => {
        try {
            await deleteJobPosition(jobPositionId);
        } catch (error) {
            console.error('Error deleting project: ', error);
            alert('Failed to delete project');
        }
    };

    const filteredJobPositions = jobPositions.filter(jobPosition =>
        jobPosition.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Name</th>
                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Owner</th>
                        <th scope="col" className="px-6 py-3 text-center">Division</th>
                        <th scope="col" className="px-6 py-3 text-center">Bill Rate</th>
                        <th scope="col" className="px-6 py-3 text-center">Posting Type</th>
                        <th scope="col" className="px-6 py-3 text-center">Demand Curation</th>
                        <th scope="col" className="px-6 py-3" colSpan={4}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobPositions.map((jobPosition, index) => (
                        <React.Fragment key={jobPosition.id}>
                            {/* Main row with job position data */}
                            <tr className="border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium ">{jobPosition.id}</th>
                                <td className="px-6 py-4 text-center">{jobPosition.name}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.status}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.owner_project.owner_user.name}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.division}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.bill_rate}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.posting_type}</td>
                                <td className="px-6 py-4 text-center">{jobPosition.demand_curation}</td>
                                <td className="pl-12 py-4">
                                    <button
                                        type="button"
                                        className="font-medium hover:underline"
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <FontAwesomeIcon icon={faCircleChevronDown} className={`transition-transform ${open[index] ? 'rotate-180 text-black hover:text-gray-700' : 'rotate-0 text-black hover:text-gray-700'}`} />
                                    </button>
                                </td>
                                <td className="pl-6 py-4">
                                    <button
                                        type="button"
                                        className="font-medium hover:underline text-black"
                                        onClick={() => handleViewDetails(jobPosition)}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </td>
                                <td className="pl-3 py-4">
                                    <Link to={`/accountManager/jobPositions/editJobPosition/${jobPosition.id}`}>
                                        <button type="button" className="font-medium text-black hover:text-gray-700 mr-3">
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                    </Link>
                                </td>
                                <td className="pr-6 py-4">
                                    <button
                                        onClick={() => { setDeleteActive(true); setSelectedId(jobPosition.id) }}
                                        type="button"
                                        className="font-medium hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className='font-medium text-black hover:text-gray-700' />
                                    </button>
                                </td>
                            </tr>
                            {/* Additional detail row for job position */}
                            {open[index] && (
                                <tr className="border-b dark:border-gray-700">
                                    <td colSpan={12}>
                                        <div id={`accordion-arrow-icon-${index}`} className={!open[index] ? "hidden" : ""}>
                                            <div className="pl-6 pr-6 border border-t-0 border-gray-200 dark:border-gray-700">
                                                <TableOpenings openings={jobPosition.openings_list} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <JobPositionDetailsModal isActive={detailsActive} jobPosition={selectedJobPosition} setActive={setDetailsActive} />
            <DeleteModal isActive={deleteActive} selectedId={selectedId} setDeleteActive={setDeleteActive} onDeleteConfirm={handleDeleteJobPosition} />
        </div>
    );
};

export default TableJobPositions;
