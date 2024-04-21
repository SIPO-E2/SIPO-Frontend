import React, { useEffect, useState } from 'react';
import { useApisStore } from '../store';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FilterProps {
    selectedSkills: string[];
    onSkillClick: (skills: string[]) => void; // Updated type definition
}

const JobPositionFilter = ({ selectedSkills, onSkillClick }: FilterProps) => {
    const { jobPositions, fetchJobPositions } = useApisStore();
    const [uniqueSkills, setUniqueSkills] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchJobPositions();
    }, [fetchJobPositions]);

    useEffect(() => {
        if (jobPositions.length > 0) {
            const allSkills = jobPositions.flatMap(jobPosition => jobPosition.skills_position);
            const uniqueSkillsSet = new Set(allSkills);
            setUniqueSkills(Array.from(uniqueSkillsSet));
        }
    }, [jobPositions]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSkillClick = (skill: string) => {
        const updatedSkills = selectedSkills.includes(skill)
            ? selectedSkills.filter(selectedSkill => selectedSkill !== skill)
            : [...selectedSkills, skill];
        onSkillClick(updatedSkills);
    };

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded={isOpen} onClick={handleToggle}>
                <FontAwesomeIcon icon={faFilter} />
            </button>
            <ul className={`dropdown-menu p-3 ${isOpen ? ' show' : ''}`}>
                <h4>Skills</h4>
            <div className="d-flex flex-wrap">
                {uniqueSkills.map((skill, index) => (
                    <li key={index}>
                        <span
                            className={`badge rounded-pill m-2 px-3 py-2 ${selectedSkills.includes(skill) ?  'bg-secondary text-white' : 'bg-light text-dark'}`}
                            onClick={() => handleSkillClick(skill)}
                            style={{ cursor: 'pointer' }}
                        >
                            {skill}
                        </span>
                    </li>
                ))}
                </div>
            </ul>
        </div>
    );
};

export default JobPositionFilter;



