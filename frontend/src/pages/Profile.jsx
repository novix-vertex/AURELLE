import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default Profile;