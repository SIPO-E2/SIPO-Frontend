
import {useState , ChangeEvent, KeyboardEvent } from 'react';

interface Props {
  onChange: (skills: string[]) => void;
}

const SkillsInput: React.FC<Props> = ({ onChange }) => {
    const [skills, setSkills] = useState<string[]>([]); //guardará la lista de skills
    const [input, setInput] = useState(''); //valor actual del input

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); //actualiza el estado del input mientras el usuario  lo escribe
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && input) {
        e.preventDefault();
        if (!skills.includes(input)) {
          const newSkills = [...skills, input];
          setSkills(newSkills);
          onChange(newSkills);
        }
        setInput('');
      } else if (e.key === 'Backspace' && !input && skills.length > 0) {
        const newSkills = skills.slice(0, skills.length - 1);
        setSkills(newSkills);
        onChange(newSkills);
      }
    };

    const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
    onChange(newSkills);
    };
    
    return (
        <div className="p-[10.5px] border-2 border-gray-200 rounded-md shadow-sm ">
          <div className="flex flex-wrap items-center ">
            {skills.map((skill, index) => (
              <span key={index} className=" mr-2 mb-2 max-w-[430px] bg-gray-200 rounded-full px-4 py-1 text-sm font-medium text-gray-700"
              onClick={() => handleRemoveSkill(index)}
              >
            {skill}
              </span>
            ))}
          </div>
          <div className= "flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            maxLength={40}
            placeholder="Type a skill and press Enter..."
            className="mt-1 mb-1 block w-full border-none bg-gray-100 rounded-full py-2 pl-4 pr-10 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        </div>
      );
    };

    export default SkillsInput;