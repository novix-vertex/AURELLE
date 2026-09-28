import api from "./apiHelper.js"

export const getProducts = () => {
    return api.get("/products");
}

export const getProduct = (id) => {
    return api.get(`/products/${id}`);
}

export const getSellerProducts = (accessToken) => {
    return api.get("/products/seller", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const updateProductStatus = (id, isActive, accessToken) => {
    return api.patch(
        `/products/${id}/status`,
        { isActive },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
};

export const deleteProduct = (id, accessToken) => {
    return api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const createProduct = (productData, accessToken) => {
    return api.post("/products", productData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const updateProduct = (id, productData, accessToken) => {
    return api.put(`/products/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};