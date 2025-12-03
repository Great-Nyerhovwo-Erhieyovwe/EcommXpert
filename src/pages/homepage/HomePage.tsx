import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import TestimonyCard from './testimonyCards/TestimonyCard';
import LiveEarningsCard from './liveearnings/LiveEarningsCard';
import PlatformFeatures from './platformfeatures/PlatformFeatures';
import InvestmentOpportunityCard from './investmentopportunitycard/InvestmentOpportunityCard';
import GuideCard from './guidecard/GuideCard';
import FeaturesCard from './featurescard/FeaturesCard';
import Partnership from './partnership/Partnership';
import Navbar from './navbar/Navbar';
// import VantaBg from '../../components/vantabg/VantaBg';


const HomePage = () => {
    const [showEarningsPopup, setShowEarningsPopup] = useState(false);
    const [showSupportChat, setShowSupportChat] = useState(false);


    const openEarningsPopup = () => {
        setShowEarningsPopup(true);
    };

    const closeEarningsPopup = () => {
        setShowEarningsPopup(false);
    };

    const openSupportChat = () => {
        setShowSupportChat(true);
    };

    const closeSupportChat = () => {
        setShowSupportChat(false);
    };

    const navigate = useNavigate();

    return (
        <div className="app">
            <Navbar />
            <Header />

            {/* Live Earnings Popup Button */}
            <div className="live-earnings-trigger" onClick={openEarningsPopup}>
                <div className="earnings-icon">💰</div>
                <div className="earnings-text">
                    <span>Live Earnings</span>
                    <span className="earnings-amount">$2.4M+</span>
                </div>
            </div>

            <Partnership />
            <FeaturesCard />
            <GuideCard />
            <PlatformFeatures />
            <LiveEarningsCard />
            <InvestmentOpportunityCard />
            <TestimonyCard />

            {/* Smart Support Section */}
            <section className="smart-support">
                <div className="container">
                    <h2>Smart Support - Always Available</h2>
                    <div className="support-grid">
                        <div className="support-card">
                            <div className="support-icon">💬</div>
                            <h3>24/7 Chat Support</h3>
                            <p>Get instant help from our AI-powered support system</p>
                        </div>
                        <div className="support-card">
                            <div className="support-icon">📹</div>
                            <h3>Live Video Sessions</h3>
                            <p>Connect with experts for personalized guidance</p>
                        </div>
                        <div className="support-card">
                            <div className="support-icon">📚</div>
                            <h3>Knowledge Base</h3>
                            <p>Access our comprehensive library of guides and tutorials</p>
                        </div>
                        <div className="support-card">
                            <div className="support-icon">🎯</div>
                            <h3>Smart Troubleshooting</h3>
                            <p>AI-powered issue resolution and recommendations</p>
                        </div>
                    </div>
                    <button className="support-button" onClick={openSupportChat}>
                        <i className="fas fa-comments"></i>
                        Start Support Chat
                    </button>
                </div>
            </section>

            {/* Pricing Plans */}
            <section id="pricing" className="pricing-section">
                <div className="container">
                    <h2>Choose Your Plan</h2>
                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <h3>Starter</h3>
                            <div className="price">$499<span>/month</span></div>
                            <ul>
                                <li>Access to basic courses</li>
                                <li>Demo store access</li>
                                <li>Community support</li>
                                <li>Basic analytics</li>
                                <li>1 investment pool access</li>
                            </ul>
                            <button className="pricing-cta">Get Started</button>
                        </div>
                        <div className="pricing-card popular">
                            <div className="popular-tag">Most Popular</div>
                            <h3>Pro</h3>
                            <div className="price">$999<span>/month</span></div>
                            <ul>
                                <li>All starter features</li>
                                <li>Advanced courses</li>
                                <li>Full dashboard access</li>
                                <li>Investment opportunities</li>
                                <li>Priority support</li>
                                <li>Smart automation</li>
                            </ul>
                            <button className="pricing-cta">Get Started</button>
                        </div>
                        <div className="pricing-card">
                            <h3>Elite</h3>
                            <div className="price">$1999<span>/month</span></div>
                            <ul>
                                <li>All pro features</li>
                                <li>Premium mentorship</li>
                                <li>Advanced analytics</li>
                                <li>Custom learning paths</li>
                                <li>VIP community access</li>
                                <li>Exclusive investment pools</li>
                            </ul>
                            <button className="pricing-cta">Get Started</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <div className="container">
                    <h2>Join EcommXpert Today and Transform Your E-Commerce Future.</h2>
                    <div className="cta-buttons">
                        <button
                            className="primary-cta"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </button>
                        <button className="secondary-cta">Book a Demo</button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Earnings Popup */}
            {showEarningsPopup && (
                <div className="popup-overlay" onClick={closeEarningsPopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h3>🏆 Live Earnings Dashboard</h3>
                            <button className="close-btn" onClick={closeEarningsPopup}>×</button>
                        </div>
                        <div className="popup-body">
                            <div className="earnings-summary">
                                <div className="summary-card">
                                    <h4>Total Earnings</h4>
                                    <p className="amount">$2,450,890</p>
                                    <p className="change">+12% this week</p>
                                </div>
                                <div className="summary-card">
                                    <h4>Active Users</h4>
                                    <p className="amount">24,850</p>
                                    <p className="change">+8% this month</p>
                                </div>
                                <div className="summary-card">
                                    <h4>Investment Volume</h4>
                                    <p className="amount">$8,920,450</p>
                                    <p className="change">+15% this week</p>
                                </div>
                            </div>

                            <h4>Recent Withdrawals</h4>
                            <div className="withdrawal-list">
                                <div className="withdrawal-item">
                                    <div className="user">Sarah J.</div>
                                    <div className="amount">$12,450</div>
                                    <div className="status">Completed</div>
                                </div>
                                <div className="withdrawal-item">
                                    <div className="user">Michael C.</div>
                                    <div className="amount">$8,920</div>
                                    <div className="status">Processing</div>
                                </div>
                                <div className="withdrawal-item">
                                    <div className="user">Emma R.</div>
                                    <div className="amount">$15,680</div>
                                    <div className="status">Completed</div>
                                </div>
                                <div className="withdrawal-item">
                                    <div className="user">David K.</div>
                                    <div className="amount">$9,340</div>
                                    <div className="status">Completed</div>
                                </div>
                            </div>

                            <div className="earnings-chart">
                                <h4>Weekly Earnings Trend</h4>
                                <div className="chart-placeholder">
                                    <div className="bar" style={{ height: '60%' }}></div>
                                    <div className="bar" style={{ height: '75%' }}></div>
                                    <div className="bar" style={{ height: '85%' }}></div>
                                    <div className="bar" style={{ height: '90%' }}></div>
                                    <div className="bar" style={{ height: '95%' }}></div>
                                    <div className="bar" style={{ height: '100%' }}></div>
                                    <div className="bar" style={{ height: '88%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Support Chat Popup */}
            {showSupportChat && (
                <div className="popup-overlay" onClick={closeSupportChat}>
                    <div className="chat-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="chat-header">
                            <h3>Smart Support Chat</h3>
                            <button className="close-btn" onClick={closeSupportChat}>×</button>
                        </div>
                        <div className="chat-messages">
                            <div className="message bot">
                                <div className="avatar">🤖</div>
                                <div className="content">
                                    <p>Hello! I'm your EcommXpert support assistant. How can I help you today?</p>
                                </div>
                            </div>
                            <div className="message user">
                                <div className="avatar">👤</div>
                                <div className="content">
                                    <p>Hi, I need help with my investment portfolio.</p>
                                </div>
                            </div>
                            <div className="message bot">
                                <div className="avatar">🤖</div>
                                <div className="content">
                                    <p>I can help with that! Would you like me to connect you with an investment specialist or check your current portfolio performance?</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-input">
                            <input type="text" placeholder="Type your message..." />
                            <button>Send</button>
                        </div>
                        <div className="chat-footer">
                            <p>Or connect with a human expert in <span className="wait-time">2-3 minutes</span></p>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Support Button */}
            <div className="floating-support" onClick={openSupportChat}>
                <i className="fas fa-headset"></i>
                <span>Support</span>
            </div>
        </div>
    );
};

export default HomePage;
