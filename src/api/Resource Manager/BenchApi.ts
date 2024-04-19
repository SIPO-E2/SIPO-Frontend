import api from "../index";

import {Bench} from "../../types"

//GET ALL BENCH
export const getAllBenches = async () => {

    try {

        const res = await api.get(`/benches`);
        // console.log(res.data); -> for connection testing purpose
        const bench: Bench[] = await res.data.payload;
        return bench;
    } catch (err) {
        console.log(err);
    }

};

//GET BENCH BY ID
export const getBenchById = async (id: number) => {
    try {
        const res = await api.get(`/bench/${id}`);
        // console.log(res.data); -> for connection testing purpose
        const bench: Bench = await res.data.payload;
        return bench;
    } catch (err) {
        console.log(err);
    }

};

//CREATE BENCH
export const createBench = async (bench: Bench) => {
    try {
        const res = await api.post(`/bench`, bench);
        // console.log(res.data); -> for connection testing purpose
        const newBench: Bench = await res.data.payload;
        return newBench;
    } catch (err) {
        console.log(err);
    }

};

//UPDATE BENCH
export const modifyBench = async (bench: Bench) => {

    try {

        const res = await api.patch(`/bench/${bench.id}`, bench);
        // console.log(res.data); -> for connection testing purpose
        const updatedBench: Bench = await res.data.payload;
        return updatedBench;
    } catch (err) {
        console.log(err);
    }

};


//DELETE BENCH
export const deleteBench = async (id: number) => {
    try {
        const res = await api.delete("/bench", { data: { id } });
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }

};