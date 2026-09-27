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
    return api.get("/auth/refresh-token", {}, {
        withCredentials: true
    });
};

export const getMe = (accessToken) => {
    return api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const logoutUser = () => {
    return api.post("/auth/logout", {}, {
        withCredentials: true
    });
};