import api from "./apiHelper.js"

export const getProducts = () => {
    return api.get("/products/get-all-products");
}

export const getProduct = (id) => {
    return api.get(`/products/get-product-by-id/${id}`);
}

