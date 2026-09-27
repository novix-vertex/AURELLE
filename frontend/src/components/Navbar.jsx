import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {

    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        await handleLogout();
        navigate("/login");
    }
    return (
        <header className="navbar">

            <NavLink
                to="/"
                className="navbar-logo"
            >
                AURELLE
            </NavLink>

            <nav className="navbar-links">

                <NavLink
                    to="/"
                    end
                    className="navbar-link"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/products"
                    className="navbar-link"
                >
                    Collections
                </NavLink>

            </nav>

            <div className="navbar-actions">

                {user ? (
                    <>
                        <NavLink
                            to="/profile"
                            className="navbar-profile"
                        >
                            Profile
                        </NavLink>

                        <button
                            className="navbar-logout"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="navbar-login"
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className="navbar-register"
                        >
                            Register
                        </NavLink>
                    </>
                )}

            </div>

        </header>
    );
};

export default Navbar;