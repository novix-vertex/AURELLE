import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const getProducts = () => {
    return api.get("/products/get-all-products");
}

