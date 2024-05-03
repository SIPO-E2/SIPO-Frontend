import { useState } from "react";
import { postPerson } from "../../api/personAPI";
import { Gender, Division } from "../../types/enums";
import SkillsInput from "../../components/SkillsInput";
import { Link } from "react-router-dom";

interface Props {}

const AddPersonPage = (props:Props)=>{

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   
    const[formData, setFormData] = useState({
        //Datos de la persona
        name: '',
        email: '',
        celphone: 0,
        gender: Gender.Unknown,
        image: '',
        division: Division.default,
        techStack: '',
        skills: [],
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };    

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const personData = {
                name: formData.name,
                email: formData.email,
                celphone: formData.celphone,
                gender: formData.gender,
                division: formData.division,
                techStack: formData.techStack,
                skills: formData.skills,
            };
            const createdPerson = await postPerson(personData);

            // Limpiar los campos del formulario después de la creación exitosa
            setFormData({
                name: "",
                email: "",
                celphone: 0,
                gender: Gender.Unknown,
                image: "",
                division: Division.default,
                techStack: "",
                skills: [],
            });
            // Mostrar un mensaje de éxito
            alert("Person created successfully");
        } catch (error) {
            // Manejar el error
            alert("Error creating Person")
        };
    }


    return(
        <>
        <div className="w-full">
            <div className="px-5 pt-4 d-flex mb-3">
                <div className="p-2 me-auto">
                    <h1> Add Person </h1>
                </div>
            </div>
            <form className="flex-1 mt-0 bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
                <div className="flex flex-col ">

                    <div className="grid grid-cols-3 gap-4">
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Name
                            </label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Work Force's Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Email
                            </label>
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Work Force's Email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        <div className="mb-3">
                        <label className="font-bold sm:text-l pb-3">
                            Phone
                        </label>
                        <input type="number" name="celphone" value={formData.celphone} onChange={handleInputChange} placeholder="Work Force's Phone"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                    </div>

                    <div className=" grid grid-cols-3 gap-4">
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Gender
                            </label>
                            <select id="gender" 
                            name='gender'
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                            <option value={Gender.Unknown}>Select Gender</option>
                            <option value={Gender.Female}>Female</option>
                            <option value={Gender.Male}>Male</option>
                            </select>
                        </div>
                        <div className="mb-3">
                        <label className="font-bold sm:text-l pb-3">
                            Division
                        </label>
                        <select 
                            id="division" 
                            name='division' 
                            value={formData.division}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                            <option value={Division.default}>Division</option>
                            <option value={Division.Mexico}>Encora Mexico</option>
                            <option value={Division.Brazil}>Encora Brazil</option>
                            <option value={Division.CSA}>Encora Central & South America</option>
                            <option value={Division.US}>Encora United States</option>
                        </select>
                        </div>

                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Tech Stack
                            </label>
                            <input type="text" 
                            name="techStack" 
                            value={formData.techStack} 
                            onChange={handleInputChange} 
                            placeholder="Work Force's Tech Stack"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>

                        <div className=" " >
                            <label className="font-bold sm:text-l pb-3">
                                Skills
                            </label>
                            {/* <SkillsInput/> */}
                        </div>
                    </div>
                    <div className="flex px-10 pt-4 w-full justify-end">
                        <div className="px-3">
                         <button type="button" className=" flex bg-gray-300 hover:bg-gray-500 text-white item-left font-bold py-2 px-4 rounded"> Cancel </button>
                        </div>
                        <div className=" ">
                            <button type="submit" className=" flex bg-blue-500 hover:bg-blue-700 text-white item-left font-bold py-2 px-4 rounded"> Create </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="mt-12 flex justify-center">
                <Link to={'/resourceManager/addNewCandidate'}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Candidate
                    </button>
                </Link>
            </div>
        </div>
         {/* Mensaje de éxito */}
        {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
            Pipeline created successfully!
        </div>
        )}
    </>)
}

export default AddPersonPage;