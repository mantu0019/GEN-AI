import axios from "axios";

export const authInstanceApi = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})