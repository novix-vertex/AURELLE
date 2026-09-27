import api from "./apiHelper.js"

export const registerUser = (userData) => {
    return api.post("/auth/register", userData);
}