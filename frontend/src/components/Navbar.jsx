import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { user } = useAuth();
    return (
        <header className="navbar">

            <div className="logo">AURELLE</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Collections</Link>
                {user && <Link to="/profile">Profile</Link>}
            </nav>

            <button className="shop-now-btn">Shop Now</button>
        </header>
    )
}

export default Navbar