import React, { useEffect, useState } from 'react';
import { useApisStore } from '../store';

interface FilterProps { };

const JobPositionFilter = (props: FilterProps) => {
    const { jobPositions, fetchJobPositions } = useApisStore();
    const [uniqueSkills, setUniqueSkills] = useState<string[]>([]);

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

    return (
        <div className="p-4">
            <h4>Skills</h4>
            {uniqueSkills.map((skill, index) => (
                <span key={index} className="badge rounded-pill text-bg-primary mr-2">{skill}</span>
            ))}
        </div>
    );
};

export default JobPositionFilter;
