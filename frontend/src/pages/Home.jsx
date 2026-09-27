import Featured from "../components/Featured"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <Hero />
            <Featured />
        </div>
    )
}

export default Home