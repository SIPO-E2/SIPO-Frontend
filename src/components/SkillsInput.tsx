
import {useState , ChangeEvent, KeyboardEvent } from 'react';

const SkillsInput = () => {
    const [skills, setSkills] = useState<string[]>([]); //guardará la lista de skills
    const [input, setInput] = useState(''); //valor actual del input

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); //actualiza el estado del input mientras el usuario  lo escribe
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input) { // Check for 'Enter' key and non-empty input
          e.preventDefault(); // Prevent the default form submit
          if (!skills.includes(input)) {
            setSkills([...skills, input]); // Add the input to the list of skills, avoiding duplicates
          }
          setInput(''); // Clear the input field
        }
      };

      return (
        <div className="p-[10.5px] border-2 border-gray-200 rounded-md shadow-sm ">
          <div className="flex flex-wrap items-center ">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-4 py-1 text-sm font-medium text-gray-700">
                {skill}
              </span>
            ))}
          </div>
          <div className= "flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="Type a skill and press Enter..."
            className="mt-1 mb-1 block w-full border-none bg-gray-100 rounded-full py-2 pl-4 pr-10 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        </div>
      );
    };

    export default SkillsInput;