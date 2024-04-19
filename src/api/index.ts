import axios from "axios";
import * as candidateAPI from "./candidateAPI";
import * as jobPositionAPI from "./jobPositionAPI";

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        "Content-type": "application/json"
    }
})


export { candidateAPI, jobPositionAPI }
