import { NavLink } from "react-router"
const Hero = () => {
    return (
        <main className="hero">
            <div className="hero-content">
                <p className="small-title">THE NEW COLLECTION</p>

                <h1 className="title">AURELLE</h1>

                <p className="tagline">Defined by Elegence</p>

                <p className="description">
                    Timeless pieces designed for those who appreciate
                    simplicity, confidence and refined style.
                </p>

                <NavLink className="explore-btn" to="/products">Explore Collection</NavLink>
            </div>
        </main>
    )
}

export default Hero