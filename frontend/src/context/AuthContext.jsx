import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const handleLogin = (user, accessToken) => {
        setUser(user);
        setAccessToken(accessToken);
    }
 
    return (<AuthContext.Provider value={{ user, accessToken, handleLogin }}>
        {children}
    </AuthContext.Provider>);
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider