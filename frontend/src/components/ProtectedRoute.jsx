import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
export default ProtectedRoute