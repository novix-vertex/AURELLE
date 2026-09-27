import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        await handleLogout();
        navigate("/login");
    };

    return (
        <div className="profile-page">

            <div className="profile-content">

                <span className="profile-label">
                    AURELLE
                </span>

                <h1 className="profile-title">
                    Welcome, {user.name}
                </h1>

                <div className="profile-divider"></div>

                <p className="profile-email">
                    {user.email}
                </p>

                <button
                    className="profile-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Profile;