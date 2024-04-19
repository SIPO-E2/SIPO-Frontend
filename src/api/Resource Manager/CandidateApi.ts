import api from "../index";
import {Candidate} from "../../types"

//GET ALL BENCH
export const getAllCandidates = async () => {

    try {
        const res = await api.get(`/candidates`);
        // console.log(res.data); -> for connection testing purpose
        const candidate: Candidate[] = res.data;
        return candidate;
    } catch (err) {
        console.log(err);
        throw err; // Re-lanzar el error para que pueda ser manejado por quien llama a esta función
    }

};


//GET BENCH BY ID
export const getCandidateById = async (id: number) => {
    try {
        const res = await api.get(`/candidate/${id}`);
        // console.log(res.data); -> for connection testing purpose
        const candidate: Candidate = await res.data.payload;
        return candidate;
    } catch (err) {
        console.log(err);
    }

};

//CREATE BENCH
export const createCandidate = async (candidate: Candidate) => {
    try {
        const res = await api.post(`/candidate`, candidate);
        // console.log(res.data); -> for connection testing purpose
        const newCandidate: Candidate = await res.data.payload;
        return newCandidate;
    } catch (err) {
        console.log(err);
    }

};

//UPDATE BENCH
export const modifyCandidate = async (candidate: Candidate) => {

    try {

        const res = await api.patch(`/candidate/${candidate.id}`, candidate);
        // console.log(res.data); -> for connection testing purpose
        const updatedCandidate: Candidate = await res.data.payload;
        return updatedCandidate;
    } catch (err) {
        console.log(err);
    }

};


//DELETE BENCH
export const deleteCandidate = async (id: number) => {
    try {
        const res = await api.delete("/candidate", { data: { id } });
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }

};