import { useEffect, useState } from 'react';
import { useApisStore } from '../store';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AllocationFilterProps {
    selectedStatus: string[];
    onStatusClick: (status: string[]) => void;
}

const AllocationFilter = ({ selectedStatus, onStatusClick }: AllocationFilterProps) => {
    const { allocations, fetchAllocations } = useApisStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [statusOptions, setStatusOptions] = useState<string[]>([]);

    useEffect(() => {
        fetchAllocations();
    }, [fetchAllocations]);

    useEffect(() => {
        if (allocations.length > 0) {
            const allStatuses = allocations.flatMap(allocation => allocation.status);
            const uniqueStatusSet = new Set(allStatuses);
            setStatusOptions(Array.from(uniqueStatusSet));
        }
    }, [allocations]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusClick = (status: string) => {
        const updatedStatuses = selectedStatus.includes(status)
            ? selectedStatus.filter(selectedStatus => selectedStatus !== status)
            : [...selectedStatus, status];
        onStatusClick(updatedStatuses);
    };

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded={isOpen} onClick={handleToggle}>
                <FontAwesomeIcon icon={faFilter} />
            </button>
            <ul className={`dropdown-menu p-3 ${isOpen ? ' show' : ''}`}>
                <h4>Allocation status</h4>
                <div className="d-flex flex-wrap pt-4">
                    {statusOptions.map((status, index) => (
                        <li key={index} className="me-8 mb-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`status-${index}`}
                                    value={status}
                                    checked={selectedStatus.includes(status)}
                                    onChange={() => handleStatusClick(status)}/>
                                <label className="form-check-label" htmlFor={`status-${index}`}>
                                    {status}
                                </label>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default AllocationFilter;
