import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Navigation */}
            <nav className="glass-nav">
                <div className="nav-container">
                    <div className="logo">
                        <h2><i className='fas fa-globe'></i>EcommXpert</h2>
                    </div>
                    <div className="nav-menu">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#testimonials">Testimonials</a>
                        <button className="nav-cta" onClick={() => navigate('/signup')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;