import { createContext, useContext, useEffect, useState } from "react"
import { getMe, logoutUser, refreshAccessToken } from "../api/authApi"
import toast from "react-hot-toast"

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
                setUser(null);
                setAccessToken(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreLogin();

    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();

            setUser(null);
            setAccessToken(null);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Logout failed"
            );

        }
    };

    return (<AuthContext.Provider value={{ user, accessToken, isLoading, handleLogin, handleLogout }}>
        {children}
    </AuthContext.Provider>);
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider