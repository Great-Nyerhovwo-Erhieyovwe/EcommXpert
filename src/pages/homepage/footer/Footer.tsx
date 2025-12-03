import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import '../HomePage.css'


const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (email) {
            try {
                await supabase
                    .from('email_subscribers')
                    .insert([{ email, subscribed_at: new Date().toISOString() }]);

                setSubscribed(true);
                setEmail('');
                setTimeout(() => setSubscribed(false), 3000);
            } catch (error) {
                console.error('Subscription error:', error);
            }
        }
    };


    return (
        <>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>EcommXpert</h3>
                            <p>Your all-in-one e-commerce growth engine</p>
                            <div className="footer-logo">
                                <div className="partner-badge">Binance Partner</div>
                                <div className="partner-badge">CBOE Verified</div>
                                <div className="partner-badge">Crypto Certified</div>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4>Platform</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#testimonials">Testimonials</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/help">Help Center</a></li>
                                <li><a href="/community">Community</a></li>
                                <li><a href="/webinars">Webinars</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="/terms">Terms</a></li>
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/security">Security</a></li>
                                <li><a href="/compliance">Compliance</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Subscribe</h4>
                            <form onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit">Subscribe</button>
                            </form>
                            {subscribed && <p className="subscription-success">Thank you for subscribing!</p>}
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 EcommXpert. All rights reserved.</p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-telegram"></i></a>
                            <a href="#"><i className="fab fa-discord"></i></a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;