import api from "../index";

import {Pipeline} from "../../types"

//GET ALL PIPELINES
export const getAllPipelines = async () => {

    try {
        const res = await api.get(`/pipelines`);
        // console.log(res.data); -> for connection testing purpose
        const pipelines: Pipeline[] = res.data;
        return pipelines;
    } catch (err) {
        console.log(err);
        throw err; // Re-lanzar el error para que pueda ser manejado por quien llama a esta función
    }

};

//GET PIPELINE BY ID
export const getPipelineById = async (id: number) => {
    try {
        const res = await api.get(`/pipeline/${id}`);
        // console.log(res.data); -> for connection testing purpose
        const pipeline: Pipeline = await res.data.payload;
        return pipeline;
    } catch (err) {
        console.log(err);
    }

};

//CREATE PIPELINE
export const createPipeline = async (pipeline: Pipeline) => {
    try {
        const res = await api.post(`/pipeline`, pipeline);
        // console.log(res.data); -> for connection testing purpose
        const newPipeline: Pipeline = await res.data.payload;
        return newPipeline;
    } catch (err) {
        console.log(err);
    }

};

//UPDATE PIPELINE
export const modifyPipeline = async (pipeline: Pipeline) => {

    try {

        const res = await api.patch(`/pipeline/${pipeline.id}`, pipeline);
        // console.log(res.data); -> for connection testing purpose
        const updatedPipeline: Pipeline = await res.data.payload;
        return updatedPipeline;
    } catch (err) {
        console.log(err);
    }

};


//DELETE PIPELINE
export const deletePipeline = async (id: number) => {
    try {
        const res = await api.delete("/pipeline", { data: { id } });
        const action = await res.data.payload;
        return action;
    } catch (err) {
        console.log(err);
    }

};