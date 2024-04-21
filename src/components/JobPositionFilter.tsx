import React, { useEffect, useState } from 'react';
import { useApisStore } from '../store';

interface FilterProps { };

const JobPositionFilter = (props: FilterProps) => {
    const { jobPositions, fetchJobPositions } = useApisStore();
    const [uniqueSkills, setUniqueSkills] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    useEffect(() => {
        fetchJobPositions();
    }, []);

    useEffect(() => {
        if (jobPositions.length > 0) {
            const allSkills = jobPositions.flatMap(jobPosition => jobPosition.skills_position);
            const uniqueSkillsSet = new Set(allSkills);
            setUniqueSkills(Array.from(uniqueSkillsSet));
        }
    }, [jobPositions]);

    const handleSkillClick = (skill: string) => {
        const newSelectedSkills = new Set(selectedSkills);
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill != skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    }

    return (
        <div className="p-4">
            <h4>Skills</h4>
            {uniqueSkills.map((skill, index) => (
                <span key={index} className={`badge rounded-pill mr-2 ${selectedSkills.includes(skill) ? 'bg-secondary text-white' : 'bg-white text-secondary'}`} onClick={() => handleSkillClick(skill)} style={{ cursor: 'pointer' }}>{skill}</span>
            ))}
        </div>
    );
};

export default JobPositionFilter;
