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
                        <li key={index} className="me-8 mb-2">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`skill-${index}`}
                                    value={skill}
                                    checked={selectedSkills.includes(skill)}
                                    onChange={() => handleSkillClick(skill)}
                                />
                                <label className="form-check-label" htmlFor={`skill-${index}`}>
                                    {skill}
                                </label>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default JobPositionFilter;



