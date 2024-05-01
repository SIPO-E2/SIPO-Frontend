import { useEffect, useState } from "react";
import { CandidateStatus, CandidateWorkStatus, Division, Gender, ProposedAction, ReasonCurrentStatus } from "../../types/globals.d";
import { postCandidate } from "../../api/candidateAPI";
import { getPersons } from "../../api/personAPI";
import { useApisStore } from "../../store";

interface Props {}

const AddCandidatePage = (props:Props)=>{
    const{persons, fetchPersons} = useApisStore();
    useEffect(()=>{
        fetchPersons();
    },[]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const[formData, setFormData] = useState({
        //Datos del candidato
        personId: 0,
        status: CandidateStatus.Other,
        workStatus: CandidateWorkStatus.Pipeline,
        reason_current_status: ReasonCurrentStatus.OtherRCS,
        status_date: new Date(),
        propose_action: ProposedAction.OtherPA,
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const candidateData = {
                personId: formData.personId,
                status: formData.status,
                workStatus: formData.workStatus,
                reason_current_status: formData.reason_current_status,
                status_date: formData.status_date,
                propose_action: formData.propose_action,
            };
            const createdCandidate = await postCandidate(candidateData);

            // Limpiar los campos del formulario después de la creación exitosa
            setFormData({
                personId: 0,
                status: CandidateStatus.Other,
                workStatus: CandidateWorkStatus.Pipeline,
                reason_current_status: ReasonCurrentStatus.OtherRCS,
                status_date: new Date(),
                propose_action: ProposedAction.OtherPA,
            });
            // Mostrar un mensaje de éxito
            console.log("Candidate created successfully");
            alert("Candidate created successfully");
        } catch (error) {
            // Manejar el error
            alert("Error creating Candidate")
        };
    }

    return(
        <>
        <div className="w-full">
            <div className="px-5 pt-4 d-flex mb-3">
                <div className="p-2 me-auto">
                    <h1> Add Candidate </h1>
                </div>
            </div>

            <form className="flex-1 mt-0 bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
                <div className="flex flex-col ">

                    <div className="grid grid-cols-3 gap-4">
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Person
                            </label>
                            <select
                                name="personId"
                                value={formData.personId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required
                            >
                                <option value="">Select Person</option>
                                {persons.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                            Status
                            </label>
                            <input type="text" name="status" value={formData.status} onChange={handleInputChange} placeholder="Work Force's Email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                        <div className="mb-3">
                        <label className="font-bold sm:text-l pb-3">
                            Work Status
                        </label>
                        <input type="text" name="workStatus" value={formData.workStatus} onChange={handleInputChange} placeholder="Work Force's Phone"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                        </div>
                    </div>

                    <div className=" grid grid-cols-3 gap-4">
                        <div className="mb-3">
                            <label className="font-bold sm:text-l pb-3">
                                Propose Action
                            </label>
                            <select id="client" 
                                name="propose_action" 
                                value={formData.propose_action} 
                                onChange={handleInputChange} 
                                className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                                <option value={ProposedAction.OtherPA}>Propose Action</option>
                                <option value={ProposedAction.ProjectSearch}>Project search</option>
                                <option value={ProposedAction.InternProject}>Using in internal project</option>
                                <option value={ProposedAction.UpSkilling}>Upskilling/Cross training</option>
                                <option value={ProposedAction.OtherPA}>Others</option>
                            </select>
                            </div>

                            <div className="mb-3">
                                <label className="font-bold sm:text-l pb-3">
                                    Status Date
                                </label>
                                <input type="date" name="status_date" value={formData.status_date.toString()} onChange={handleInputChange} placeholder="Status Date"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                            </div>

                            <div className="mb-3 ">
                            <label className="font-bold sm:text-l pb-3">
                                Reson Current Status
                            </label>
                            <select id="client" 
                                name="reason_current_status" 
                                value={formData.reason_current_status} 
                                onChange={handleInputChange} 
                                className="w-full rounded-md border border-[#e0e0e0] bg-white p-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" required>
                                <option value={ReasonCurrentStatus.OtherRCS}>Reason Current Status</option>
                                <option value={ReasonCurrentStatus.InTraining}>In training</option>
                                <option value={ReasonCurrentStatus.Induction}>Induction/Orientation</option>
                                <option value={ReasonCurrentStatus.Shadow}>Shadow resource</option>
                                <option value={ReasonCurrentStatus.OtherRCS}>Others</option>
                            </select>
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
        </div>
        </>
    )

}

export default AddCandidatePage;