import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user} = useAuth();

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

            </div>

        </div>
    );
};

export default Profile;