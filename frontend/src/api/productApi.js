import api from "./apiHelper.js"

export const getProducts = () => {
    return api.get("/products");
}

export const getProduct = (id) => {
    return api.get(`/products/${id}`);
}

