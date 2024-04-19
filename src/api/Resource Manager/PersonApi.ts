import api from "../index";

import {Person} from "../../types"

//GET ALL BENCH
export const getAllPersons = async () => {

    try {

        const res = await api.get(`/persons`);
        // console.log(res.data); -> for connection testing purpose
        const persons: Person[] = await res.data.payload;
        return persons;
    } catch (err) {
        console.log(err);
    }

};