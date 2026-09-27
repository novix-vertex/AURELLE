import { Link } from "react-router"

const Navbar = () => {
    return (
        <header className="navbar">

            <div className="logo">AURELLE</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Collections</Link>
                <Link to="/">Women</Link>
                <Link to="/">Men</Link>
            </nav>

            <button className="shop-now-btn">Shop Now</button>
        </header>
    )
}

export default Navbar