import api from "./apiHelper.js"

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
}

export const loginUser = (userData) => {
    return api.post("/auth/login", userData, {
        withCredentials: true
    });
};

export const refreshAccessToken = () => {
    return api.post("/auth/refresh", {}, {
        withCredentials: true
    });
};

export const getMe = (accessToken) => {
    return api.get("/auth/getMe", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};