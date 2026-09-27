import { createContext, useContext, useEffect, useState } from "react";
import { getMe, refreshAccessToken } from "../api/authApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);

    const handleLogin = (user, accessToken) => {
        setUser(user);
        setAccessToken(accessToken);
    }

    useEffect(() => {

        const restoreLogin = async () => {
            try {

                const refreshResponse = await refreshAccessToken();
                const { accessToken } = refreshResponse.data;

                const getMeResponse = await getMe(accessToken);
                const { user } = getMeResponse.data.data;

                setUser(user);
                setAccessToken(accessToken);

            } catch (error) {
                console.error("Auth Context Error: No Login Data", error);
            } finally {
                setIsLoading(false);
            }
        };

        restoreLogin();

    }, []);

    return (<AuthContext.Provider value={{ user, accessToken, isLoading, handleLogin }}>
        {children}
    </AuthContext.Provider>);
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider