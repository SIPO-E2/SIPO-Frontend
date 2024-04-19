import api from "../index";

import {Billing} from "../../types"

//GET ALL BENCH
export const getAllBillings = async () => {

    try {
        const res = await api.get(`/billings`);
        // console.log(res.data); -> for connection testing purpose
        const billings: Billing[] = res.data;
        return billings;
    } catch (err) {
        console.log(err);
        throw err; // Re-lanzar el error para que pueda ser manejado por quien llama a esta función
    }

};


//GET BENCH BY ID
export const getBillingById = async (id: number) => {
    try {
        const res = await api.get(`/billing/${id}`);
        // console.log(res.data); -> for connection testing purpose
        const billing: Billing = await res.data.payload;
        return billing;
    } catch (err) {
        console.log(err);
    }

};

//CREATE BENCH
export const createBilling = async (billing: Billing) => {
    try {
        const res = await api.post(`/billing`, billing);
        // console.log(res.data); -> for connection testing purpose
        const newBilling: Billing = await res.data.payload;
        return newBilling;
    } catch (err) {
        console.log(err);
    }

};

//UPDATE BENCH
export const modifyBench = async (billing: Billing) => {

    try {

        const res = await api.patch(`/billing/${billing.id}`, billing);
        // console.log(res.data); -> for connection testing purpose
        const updatedBilling: Billing = await res.data.payload;
        return updatedBilling;
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