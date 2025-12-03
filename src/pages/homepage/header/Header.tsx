import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import VantaBg from "../vantabg/VantaBg";
import '../HomePage.css'

const Header = () => {
    // NEW: Typewriter state
    const [typewriterText, setTypewriterText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();


    // Live Hero Typing
    const phrases = [
        'Learn Dropshipping\nand kickstart your online empire...',
        'Master E-Commerce\nand turn ideas into revenue...',
        'Scale Profits faster\nwith smart strategies...',
        'Invest Smartly\nand watch your money grow...',
        'Build Wealth\nby creating multiple income streams...',
    ]

    // const phrases = [
    //     'Join EcommXpert - \nYour All-In-One Partner for Building, \nAutomating, and Scaling a Profitable E-Commerce Empire',
    //     'Build, Launch, and Scale \nYour E-Commerce Business With Confidence \nand Zero Inventory Stress',
    //     'Transform Your Ideas \nInto High-Converting Online Stores \nand Grow a Profitable Brand From Anywhere in the World',
    //     'Start Your Dropshipping Journey Today \nand Unlock a World of Limitless Products, \nGlobal Suppliers, and Seamless Online Selling'
    // ]


    // Live Typing and Deleting Hero
    useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;

        const currentPhrase = phrases[currentIndex];
        // const isDoneTyping = typewriterText === currentPhrase;
        // const isEmpty = typewriterText === "";

        if (!isDeleting && typewriterText.length < currentPhrase.length) {
            // Typing forward
            timeout = setTimeout(() => {
                setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
            }, 120);

        } else if (!isDeleting && typewriterText.length === currentPhrase.length) {
            // pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), 1500);

        } else if (isDeleting && typewriterText.length > 0) {
            // Deleting
            timeout = setTimeout(() => {
                setTypewriterText(currentPhrase.substring(0, typewriterText.length - 1));
            }, 60);
        } else if (isDeleting && typewriterText.length === 0) {
            // move to next phrase
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % phrases.length);
            }, 300);
        }

        return () => clearTimeout(timeout);
    }, [typewriterText, isDeleting, currentIndex]);

    return (
        <>
            {/* Vanta BG */}
            {/* <VantaBg /> */}

            {/* Hero Section */}
            <section id="hero" className="hero">
                {/* <div className="vanta-container">
                    <img src="../../assets/images/Gemini_bg2.png" alt="" />
                </div> */}
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            {/* NEW: Typewriter title */}
                            <h1 className="typewriter-hero">
                                <span className="typewriter-wrapper">
                                    <span className="typewriter-text">{typewriterText.split('\n').map((line, idx) =>
                                        <div key={idx}>{line}</div>
                                    )}</span>
                                    <span className='cursor'>|</span>
                                </span>
                            </h1>
                            {/* <h1>Learn E-Commerce. Master Dropshipping. Build Wealth. All in One Platform.</h1> */}
                            <p>
                                EcommXpert gives you expert-led courses, a real e-commerce simulator, investment opportunities, and a smart dashboard designed to help anyone—from beginner to pro—build a profitable online business.
                            </p>
                            <p>
                                Join 20,000+ e-commerce learners, creators, and investors worldwide. Trusted by top entrepreneurs and backed by industry leaders.
                            </p>
                            <div className="hero-cta">
                                <button
                                    className="primary-cta"
                                    onClick={() => navigate('/signup')}
                                >
                                    Start Your EcommXpert Journey
                                </button>
                                <button className="secondary-cta">Watch Platform Demo</button>
                            </div>
                            <p className="microcopy">No credit card required. Cancel anytime.</p>
                        </div>
                        <div className="hero-visual">
                            <div className="dashboard-mockup">
                                <div className="dashboard-card">
                                    <h3>Daily Profits</h3>
                                    <div className="counter">$12,840</div>
                                </div>
                                <div className="dashboard-card">
                                    <h3>Course Progress</h3>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: '75%' }}></div>
                                    </div>
                                    <span>75%</span>
                                </div>
                                <div className="dashboard-card">
                                    <h3>Investment Growth</h3>
                                    <div className="chart-placeholder">
                                        <div className="bar" style={{ height: '70%' }}></div>
                                        <div className="bar" style={{ height: '85%' }}></div>
                                        <div className="bar" style={{ height: '60%' }}></div>
                                    </div>
                                </div>
                                <div className="dashboard-card">
                                    <h3>Earnings</h3>
                                    <div className="counter">$8,420</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;