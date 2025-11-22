import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './HomePage.css';
import { User } from '@supabase/supabase-js';
import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';


const HomePage = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [showEarningsPopup, setShowEarningsPopup] = useState(false);
    const [showSupportChat, setShowSupportChat] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [_currentUser, setCurrentUser] = useState<User | null>(null);

    // NEW: Ref for Vanta container
    const vantaRef = useRef(null);
    const vantaInstance = useRef(null);


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


    // Mock earnings data
    const earningsData = [
        { user: 'Sarah J.', amount: '$12,450', platform: 'Crypto', date: '2 hours ago' },
        { user: 'Michael C.', amount: '$8,920', platform: 'E-commerce', date: '4 hours ago' },
        { user: 'Emma R.', amount: '$15,680', platform: 'Investment', date: '6 hours ago' },
        { user: 'David K.', amount: '$9,340', platform: 'Crypto', date: '8 hours ago' },
        { user: 'James W.', amount: '$22,150', platform: 'E-commerce', date: '12 hours ago' },
        { user: 'Adam L.', amount: '$72,050', platform: 'Investment', date: '1 hours ago' },
        { user: 'Ritesh K.', amount: '$9,700', platform: 'E-commerce', date: '12 hours ago' },
        { user: 'Olivia P.', amount: '$66,320', platform: 'Crypto', date: '11 hours ago' },
        { user: 'Annalisa L.', amount: '$32,900', platform: 'Crypto', date: '8 hours ago' },
        { user: 'Wilson Z.', amount: '$30,000', platform: 'E-commerce', date: '19 hours ago' },
        { user: 'Lucas L.', amount: '$52,400', platform: 'Investment', date: '3 hours ago' },
        { user: 'Boss B.', amount: '$11,000', platform: 'E-commerce', date: '9 hours ago' },
    ];

    // Mock testimonials
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "E-commerce Entrepreneur",
            content: "EcommXpert transformed my business from $0 to $50k/month in just 6 months. The courses and tools are invaluable!",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=32"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Dropshipping Beginner",
            content: "As a complete beginner, I was skeptical, but the step-by-step guidance and demo stores made everything click.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Marketing Professional",
            content: "The analytics tools alone are worth the price. I can now track exactly what's driving my sales.",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=5"
        }
    ];

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

    
    // NEW: Initialize Vanta Globe
    useEffect(() => {
        if (!vantaInstance.current && vantaRef.current) {
            vantaInstance.current = GLOBE({
                el: vantaRef.current,
                THREE: THREE,
                // Globe-specific options
                color: 0x4a90e2,           // Main color
                color2: 0x7b68ee,          // Secondary color
                size: 1.5,                 // Size of the globe particles
                backgroundColor: 0x0a0a0a, // Dark background
                points: 15.0,              // Number of points
                maxDistance: 20.0,         // Max distance for connections
                spacing: 15.0,             // Spacing between points
                // Performance options
                scale: 1.0,
                scaleMobile: 1.0,
            });
        }

        return () => {
            if (vantaInstance.current) {
                // vantaInstance.current.destroy();
                vantaInstance.current = null;
            }
        };
    }, []);


    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // check if user is already logged in
    useEffect(() => {
        const checkSession = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error.message);
                setCurrentUser(null)
                return;
            }
            setCurrentUser(user);
        };
        checkSession();
    }, []);

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

    return (
        <div className="app">
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

            {/* Hero Section */}
            <section id="hero" className="hero">
                {/* <div className="vanta-container">
                    <img src="../../assets/images/Gemini_bg2.png" alt="" />
                </div> */}
                {/* Vanta Globe Background (full screen) */}
                <div ref={vantaRef} className="vanta-container"></div>

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

            {/* Live Earnings Popup Button */}
            <div className="live-earnings-trigger" onClick={openEarningsPopup}>
                <div className="earnings-icon">💰</div>
                <div className="earnings-text">
                    <span>Live Earnings</span>
                    <span className="earnings-amount">$2.4M+</span>
                </div>
            </div>

            {/* Trust Strip with Partners */}
            <section className="trust-strip">
                <div className="trust-container">
                    <p>Trusted by over 20,000+ e-commerce learners, creators, and investors worldwide.</p>

                    {/* Partners Logos */}
                    <div className="partners-section">
                        <h3>Partners & Sponsors</h3>
                        <div className="partners-logos">
                            <div className="partner-logo">Binance</div>
                            <div className="partner-logo">CBOE</div>
                            <div className="partner-logo">Coinbase</div>
                            <div className="partner-logo">Shopify</div>
                            <div className="partner-logo">Amazon</div>
                            <div className="partner-logo">Ebay</div>
                        </div>
                    </div>

                    <div className="rating">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span>4.9/5 Satisfaction Score</span>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section id="features" className="value-section">
                <div className="container">
                    <h2>Why EcommXpert Is the Only Platform You Need to Start and Scale Your E-Commerce Journey.</h2>
                    <div className="value-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <h3>Expert-Led Courses From Top Sellers</h3>
                            <p>Learn directly from 6-figure e-commerce earners, with step-by-step video lessons, worksheets, and real examples.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-store"></i>
                            </div>
                            <h3>Practice with Realistic Demo Stores</h3>
                            <p>Use a pre-built practice environment to test product research, marketing strategies, pricing, and sales funnels.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-coins"></i>
                            </div>
                            <h3>Earn While You Learn</h3>
                            <p>Optional investment plans allow users to earn passive returns through vetted e-commerce growth pools.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3>Advanced Analytics & Tracking Tools</h3>
                            <p>Understand your progress, predict sales outcomes, and see exactly what drives results.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3>Community + Mentorship</h3>
                            <p>Join a global network of learners, receive guidance from mentors, and exchange insights.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-robot"></i>
                            </div>
                            <h3>Automated Learning Paths</h3>
                            <p>AI recommends courses, investments, and products based on your goals.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3>Safe, Secure, Transparent</h3>
                            <p>Encrypted payments, two-factor security, and verified data transparency.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3>Smart Automation</h3>
                            <p>Automated email sequences, investment tracking, and performance alerts.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2>Start in Minutes. Learn and Earn for a Lifetime.</h2>
                    <div className="timeline">
                        <div className="timeline-step">
                            <div className="step-number">1</div>
                            <h3>Create Your Account</h3>
                            <p>Signup using email or Google. Choose your goal: Learn, Invest, or Both.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">2</div>
                            <h3>Complete Onboarding</h3>
                            <p>Personalized questions tailor your dashboard and course roadmap.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">3</div>
                            <h3>Start Learning</h3>
                            <p>Watch video lessons, download templates, complete quizzes, practice with demo stores.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">4</div>
                            <h3>Begin Earning (Optional)</h3>
                            <p>Invest in vetted e-commerce growth plans with transparent ROI.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">5</div>
                            <h3>Track Your Progress</h3>
                            <p>Use the dashboard to monitor earnings, learning milestones, store performance, investment growth.</p>
                        </div>
                        <div className="timeline-step">
                            <div className="step-number">6</div>
                            <h3>Withdraw or Reinvest</h3>
                            <p>Instant payouts, transparent fees, secure transactions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section className="platform-features">
                <div className="container">
                    <h2>Platform Features</h2>
                    <div className="features-grid">
                        <div className="feature-category">
                            <h3>Learning Features</h3>
                            <ul>
                                <li>100+ tutorials</li>
                                <li>Step-by-step course progression</li>
                                <li>Interactive projects</li>
                                <li>Downloadable PDFs/templates</li>
                                <li>Real assignments</li>
                                <li>Live mentor sessions</li>
                                <li>Progress tracking</li>
                            </ul>
                        </div>
                        <div className="feature-category">
                            <h3>Ecommerce Practice Features</h3>
                            <ul>
                                <li>Product research sandbox</li>
                                <li>Ad testing simulator</li>
                                <li>Refund/return scenarios</li>
                                <li>Profit calculator</li>
                                <li>Market analysis tools</li>
                                <li>Competitor research</li>
                                <li>SEO optimization</li>
                            </ul>
                        </div>
                        <div className="feature-category">
                            <h3>Investment Features</h3>
                            <ul>
                                <li>E-commerce asset pools</li>
                                <li>ROI trackers</li>
                                <li>Automated contributions</li>
                                <li>Growth analytics</li>
                                <li>Risk assessment</li>
                                <li>Portfolio management</li>
                                <li>Withdrawal automation</li>
                            </ul>
                        </div>
                        <div className="feature-category">
                            <h3>Tools & Utilities</h3>
                            <ul>
                                <li>AI product recommender</li>
                                <li>AI ad generator</li>
                                <li>Profit analyzer</li>
                                <li>Real-time notifications</li>
                                <li>Market trend alerts</li>
                                <li>Performance dashboards</li>
                                <li>Integration tools</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Earnings Section */}
            <section className="live-earnings">
                <div className="container">
                    <h2>Real User Earnings - Live Updates</h2>
                    <div className="earnings-grid">
                        {earningsData.map((earning, index) => (
                            <div key={index} className="earning-card">
                                <div className="user-info">
                                    <div className="user-avatar">👤</div>
                                    <div className="user-details">
                                        <h4>{earning.user}</h4>
                                        <p className="platform">{earning.platform}</p>
                                    </div>
                                </div>
                                <div className="earning-amount">
                                    <span className="amount">{earning.amount}</span>
                                    <span className="date">{earning.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Opportunities */}
            <section className="investment-opportunities">
                <div className="container">
                    <h2>Earn Smarter With E-Commerce Growth Plans</h2>
                    <div className="investment-plans">
                        <div className="investment-plan">
                            <h3>Starter Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $100</div>
                                <div>ROI: 8-12%</div>
                                <div>Risk: Low</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                            </div>
                        </div>
                        <div className="investment-plan">
                            <h3>Growth Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $500</div>
                                <div>ROI: 12-18%</div>
                                <div>Risk: Medium</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar" style={{ height: '95%' }}></div>
                            </div>
                        </div>
                        <div className="investment-plan">
                            <h3>Premium Pool</h3>
                            <div className="plan-details">
                                <div>Min Deposit: $1,000</div>
                                <div>ROI: 18-25%</div>
                                <div>Risk: High</div>
                            </div>
                            <div className="performance-chart">
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                                <div className="bar" style={{ height: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="testimonials">
                <div className="container">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial-carousel">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
                            >
                                <div className="stars">
                                    {'⭐'.repeat(testimonial.rating)}
                                </div>
                                <p>{testimonial.content}</p>
                                <div className="testimonial-author">
                                    <img src={testimonial.avatar} alt={testimonial.name} />
                                    <div>
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testimonial-indicators">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={index === currentTestimonial ? 'active' : ''}
                                onClick={() => setCurrentTestimonial(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>

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

// function setCurrentUser(_p0: null) {
//     throw new Error('Function not implemented.');
// }
