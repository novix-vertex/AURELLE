import axios from "axios"

const api = axios.create({
    baseURL: "https://aurelle-ar6v.onrender.com/api",
    withCredentials: true
})
export default api;